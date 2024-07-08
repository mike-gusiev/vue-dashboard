<template>
    <div class="filters">
        <label :for="filterId">{{ filterLabel }}</label>
        <select :id="filterId" v-model="selectedValue" @change="applyFilter">
            <option
                v-for="option in filterOptions"
                :key="option"
                :value="option"
            >
                ≤ {{ option }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';

export default defineComponent({
    name: 'ChartFilters',
    props: {
        type: {
            type: String,
            required: true,
            validator: (value: string) => ['line', 'bar'].includes(value),
        },
        data: {
            type: Array,
            required: true,
        },
    },
    setup(props, { emit }) {
        const selectedValue = ref<number | null>(null);
        const filterId = ref<string>('');
        const filterLabel = ref<string>('');
        const filterOptions = ref<number[]>([]);

        const maxSalesOptions = computed(() => [150, 180, 200, 230, 250]);
        const maxAmountOptions = computed(() => [500, 1000, 1500, 3000]);

        const applyFilter = () => {
            emit('filter-change', selectedValue.value);
        };

        watch(
            () => props.type,
            (newType) => {
                if (newType === 'line') {
                    filterId.value = 'salesFilter';
                    filterLabel.value = 'Filter by Sales:';
                    filterOptions.value = maxSalesOptions.value;
                } else if (newType === 'bar') {
                    filterId.value = 'amountFilter';
                    filterLabel.value = 'Filter by Amount:';
                    filterOptions.value = maxAmountOptions.value;
                }
            },
            { immediate: true }
        );

        return {
            selectedValue,
            filterId,
            filterLabel,
            filterOptions,
            applyFilter,
        };
    },
});
</script>
