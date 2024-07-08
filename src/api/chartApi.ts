import axios from 'axios';

import { ExpenseData, SalesData } from '../types';

const apiClient = axios.create({
    baseURL: 'http://demo2663713.mockable.io/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    getSalesData(): Promise<SalesData[]> {
        return apiClient.get('/salesData').then((response) => response.data);
    },
    getExpenseData(): Promise<ExpenseData[]> {
        return apiClient.get('/expenseData').then((response) => response.data);
    },
};
