<template>
    <DashboardHeader />
    <div class="container-fluid">
        <div class="row">
            <div
                class="col-lg-6 col-md-12 mb-3"
                v-for="chart in charts"
                :key="chart.title"
            >
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ chart.title }}</h5>
                        <component :is="chart.component" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { DashboardHeader, SalesLineChart, ExpensesBarChart } from './index';

export default defineComponent({
    name: 'Dashboard',
    components: {
        DashboardHeader,
        SalesLineChart,
        ExpensesBarChart,
    },
    setup() {
        const charts = [
            {
                title: 'Sales Line Chart',
                component: 'SalesLineChart',
            },
            {
                title: 'Expenses Bar Chart',
                component: 'ExpensesBarChart',
            },
        ];

        return {
            charts,
        };
    },
});
</script>
