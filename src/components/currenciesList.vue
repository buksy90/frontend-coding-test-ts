<template>
  <div class="px-4 bg-gray-50 py-6">
    <h2 class="text-xl font-bold text-left mb-6">Preferred</h2>
    <div class="grid grid-cols-4 gap-4 justify-between">
      <div
        v-for="key in preferredKeys"
        v-bind:key="key"
        class="bg-gray-200 text-gray-500 font-semibold rounded-xl text-center uppercase text-xs border-gray-300 hover:bg-primary-100 hover:border-primary-hover hover:text-primary-hover p-2 truncate cursor-pointer"
        v-bind:title="allCurrencies.get(key)"
        v-on:click="$emit('select', key)"
      >
        {{ key }}
      </div>
    </div>

    <div class="flex my-6 mt-9 op">
      <h2 class="text-xl font-bold text-left">Others</h2>
      <div class="flex-grow"></div>
      <input
        v-model="filter"
        placeholder="Filter currencies"
        class="border border-gray-200 rounded-md px-2 py-1 focus-visible:outline-primary focus-visible:text-primary"
      />
    </div>
    <div class="grid grid-cols-4 gap-4 justify-between">
      <div
        v-for="key in nonPreferredKeys"
        v-bind:key="key"
        class="bg-gray-200 text-gray-500 font-semibold rounded-xl text-center uppercase text-xs border-gray-300 hover:bg-primary-100 hover:border-primary-hover hover:text-primary-hover p-2 truncate cursor-pointer"
        v-bind:title="allCurrencies.get(key)"
        v-on:click="$emit('select', key)"
      >
        {{ key }}
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
