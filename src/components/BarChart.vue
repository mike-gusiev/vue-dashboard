<template>
    <div>
        <p v-if="loadingState">Loading...</p>
        <div v-else>
            <BarChart :chartData="filteredChartData" :options="options" />
            <ChartFilters
                type="bar"
                :data="expenseData"
                @filter-change="handleFilterChange"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
import { BarChart } from 'vue-chart-3';
import { onMounted } from 'vue';

import { ChartFilters } from './index';

import { useChartData, applyChartFilter } from '../utils/index';

Chart.register(...registerables);

export default {
    name: 'ExpensesBarChart',
    components: { BarChart, ChartFilters },
    setup() {
        const {
            loadingState,
            data,
            defaultChartData,
            filteredChartData,
            fetchData,
        } = useChartData('expenses');

        onMounted(fetchData);

        const handleFilterChange = (maxAmount: number | null) => {
            filteredChartData.value = applyChartFilter(
                data.value,
                maxAmount,
                'expenses',
                defaultChartData
            );
        };

        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
            loadingState,
            expenseData: data,
            filteredChartData,
            handleFilterChange,
        };
    },
};
</script>
