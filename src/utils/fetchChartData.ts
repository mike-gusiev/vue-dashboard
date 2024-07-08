import { ref } from 'vue';

import { ChartDataType, SalesData, ExpenseData, ChartData } from '../types';
import api from '../api/chartApi';

export function useChartData(type: 'sales' | 'expenses') {
    const loadingState = ref(true);
    const data = ref<ChartDataType>([]);
    const defaultChartData: ChartData = {
        labels: [],
        datasets: [
            {
                label: type === 'sales' ? 'Sales' : 'Expenses',
                data: [],
            },
        ],
    };
    const filteredChartData = ref<ChartData>(defaultChartData);

    const fetchData = async () => {
        try {
            if (type === 'sales') {
                const response = await api.getSalesData();
                data.value = response as SalesData[];
                defaultChartData.labels = (data.value as SalesData[]).map(
                    (item) => item.month
                );
                defaultChartData.datasets[0].data = (
                    data.value as SalesData[]
                ).map((item) => item.sales);
            } else {
                const response = await api.getExpenseData();
                data.value = response as ExpenseData[];
                defaultChartData.labels = (data.value as ExpenseData[]).map(
                    (item) => item.category
                );
                defaultChartData.datasets[0].data = (
                    data.value as ExpenseData[]
                ).map((item) => item.amount);
            }
            filteredChartData.value = { ...defaultChartData };
            loadingState.value = false;
        } catch (error) {
            console.error('Failed to fetch data:', error);
            loadingState.value = false;
        }
    };

    return {
        loadingState,
        data,
        filteredChartData,
        defaultChartData,
        fetchData,
    };
}
