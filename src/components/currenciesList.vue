<template>
  <div class="px-4">
    <h2 class="text-xl font-bold text-left my-4">Preferred</h2>
    <div class="grid grid-cols-4 gap-4 justify-between">
      <div
        v-for="key in preferredKeys"
        v-bind:key="key"
        class="bg-white m-2 border border-gray-300 hover:border-primary-hover hover:text-primary-hover p-2 truncate cursor-pointer"
        v-on:click="$emit('select', key)"
      >
        {{ allCurrencies.get(key) || key }}
      </div>
    </div>

    <h2 class="text-xl font-bold text-left my-4">Others</h2>
    <input
      v-model="filter"
      placeholder="Filter currencies"
      class="p-2 mb-2 border border-gray-200 rounded-md"
    />
    <div class="grid grid-cols-4 gap-2 justify-between">
      <div
        v-for="key in nonPreferredKeys"
        v-bind:key="key"
        class="bg-white m-2 border border-gray-300 hover:border-primary-hover hover:text-primary-hover p-2 truncate cursor-pointer"
        v-on:click="$emit('select', key)"
      >
        {{ allCurrencies.get(key) || key }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCurrencyService } from '../services/currencyFactory'

defineEmits<{
  (e: 'select', value: string): void
}>()

const preferredKeys = ref(['eur', 'usd', 'cny', 'inr'])
const allCurrencies = ref(new Map<string, string>())
const filter = ref('')

useCurrencyService()
  .loadCurrencies()
  .then(() => {
    allCurrencies.value = useCurrencyService().getCurrencies()
  })

const nonPreferredKeys = computed<string[]>(() => {
  const all = [...allCurrencies.value.keys()]
  return all
    .filter((currency) => !preferredKeys.value.includes(currency))
    .filter((currency) => currency.trim().length > 1)
    .filter(
      (currency) =>
        currency.includes(filter.value) ||
        allCurrencies.value.get(currency)?.toLowerCase().includes(filter.value),
    )
})
</script>
