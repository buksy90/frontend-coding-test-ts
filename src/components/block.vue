<template>
  <BlockSkeleton v-if="!isLoaded" />

  <div v-else class="bg-white rounded-xl p-4 my-8">
    <div class="flex">
      <h2 class="font-semibold text-gray-900 mb-4">
        {{ currency1.toUpperCase() }} / {{ currency2.toUpperCase() }}
      </h2>
      <div class="flex-grow"></div>
      <IconClose
        class="text-gray-300 hover:text-black cursor-pointer"
        v-on:click="$emit('close')"
      />
    </div>

    <CurrencyInput
      v-model:currency="currency1"
      v-model:value="value1"
      class="mb-2"
    />
    <div class="flex justify-center -mt-4 -mb-2">
      <IconExchange
        class="hover:animate-spin text-primary hover:text-primary-hover bg-white cursor-pointer border rounded-full p-1"
        v-on:click="exchangeCurrencies"
      />
    </div>

    <CurrencyInput
      v-bind:value="value2"
      v-bind:currency="currency2"
      disabled
      v-on:update:currency="(event) => ((currency2 = event), loadCurencies())"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BlockSkeleton from './blockSkeleton.vue'
import CurrencyInput from './currencyInput.vue'
import IconExchange from './icons/exchange.vue'
import IconClose from './icons/close.vue'
import { useCurrencyService } from '../services/currencyFactory'
import { useToast } from '../composables/useToast'
import { TOAST_TYPE } from '../types/toast'

const emit = defineEmits(['close'])

const isLoaded = ref(false)
const currency1 = ref('EUR')
const currency2 = ref('USD')

async function loadCurencies() {
  const cService = useCurrencyService()
  if (cService.hasRate(currency1.value) && cService.hasRate(currency2.value)) {
    isLoaded.value = true
    return
  }

  useToast().show('Loading curriencies')
  isLoaded.value = false

  try {
    await Promise.all([
      cService.loadCurrencies(),
      cService.loadCurrencyExchange(currency1.value),
      cService.loadCurrencyExchange(currency2.value),
    ])

    useToast().show('Done loading curriencies', TOAST_TYPE.Success)
    isLoaded.value = true
  } catch {
    useToast().show('Failed loading curriences', TOAST_TYPE.Error)
    emit('close')
  }
}

watch([() => currency1.value, () => currency2.value], () => loadCurencies(), {
  immediate: true,
})

const value1 = ref(1)
const value2 = computed(() => {
  return useCurrencyService().convert(
    value1.value,
    currency1.value,
    currency2.value,
  )
})

function exchangeCurrencies() {
  value1.value = value2.value
  ;[currency1.value, currency2.value] = [currency2.value, currency1.value]
  loadCurencies()
}
</script>
