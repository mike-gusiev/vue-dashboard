<template>
    <div>
        <p v-if="loadingState">Loading...</p>
        <div v-else>
            <LineChart :chartData="filteredChartData" :options="options" />
            <ChartFilters
                type="line"
                :data="salesData"
                @filter-change="handleFilterChange"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
import { LineChart } from 'vue-chart-3';
import { onMounted } from 'vue';

import { ChartFilters } from './index';

import { useChartData, applyChartFilter } from '../utils/index';

Chart.register(...registerables);

export default {
    name: 'SalesLineChart',
    components: { LineChart, ChartFilters },
    setup() {
        const {
            loadingState,
            data,
            defaultChartData,
            filteredChartData,
            fetchData,
        } = useChartData('sales');

        onMounted(fetchData);

        const handleFilterChange = (maxSales: number | null) => {
            filteredChartData.value = applyChartFilter(
                data.value,
                maxSales,
                'sales',
                defaultChartData
            );
        };

        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
            loadingState,
            salesData: data,
            filteredChartData,
            handleFilterChange,
        };
    },
};
</script>
