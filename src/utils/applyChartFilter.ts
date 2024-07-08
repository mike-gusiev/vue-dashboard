import { ChartDataType, ChartData, SalesData, ExpenseData } from '../types';

export const applyChartFilter = (
    data: ChartDataType,
    selectedValue: number | null,
    type: 'sales' | 'expenses',
    defaultChartData: ChartData
) => {
    if (selectedValue !== null) {
        return {
            labels: data
                .filter(
                    (item) =>
                        (type === 'sales'
                            ? (item as SalesData).sales
                            : (item as ExpenseData).amount) <= selectedValue
                )
                .map((item) =>
                    type === 'sales'
                        ? (item as SalesData).month
                        : (item as ExpenseData).category
                ),
            datasets: [
                {
                    label: type === 'sales' ? 'Sales' : 'Expenses',
                    data: data
                        .filter(
                            (item) =>
                                (type === 'sales'
                                    ? (item as SalesData).sales
                                    : (item as ExpenseData).amount) <=
                                selectedValue
                        )
                        .map((item) =>
                            type === 'sales'
                                ? (item as SalesData).sales
                                : (item as ExpenseData).amount
                        ),
                },
            ],
        };
    } else {
        return { ...defaultChartData };
    }
};
