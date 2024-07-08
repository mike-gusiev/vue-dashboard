export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
    }[];
}
export interface SalesData {
    month: string;
    sales: number;
}

export type ChartDataType = SalesData[] | ExpenseData[];
export interface ExpenseData {
    category: string;
    amount: number;
}
