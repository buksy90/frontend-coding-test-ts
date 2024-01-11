<template>
  <div class="border border-gray-100 rounded-xl p-4">
    <div class="flex">
      <input
        ref="input"
        class="w-[200px]"
        type="number"
        step="any"
        v-bind:disabled="disabled"
        v-bind:class="inputClasses"
        v-bind:value="value"
        v-on:input="
          ($event) =>
            $emit(
              'update:value',
              sanitizeNumberInput(($event.target! as HTMLInputElement).value),
            )
        "
      />
      <div class="min-w-[20px]" />
      <div
        class="p-2 bg-primary hover:bg-primary-hover cursor-pointer text-white rounded-xl text-center text-xs"
        v-on:click="modal.show"
      >
        {{ currency.toUpperCase() }}
      </div>
    </div>
    <div class="text-left text-gray-400 pt-1">
      {{ formatted }}
    </div>
    <modal.component v-on:select="(event) => $emit('update:currency', event)" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatCurrency } from '../services/formatter'
import { sanitizeNumberInput } from '../services/helpers'
import { useCurrencyModal } from '../composables/useCurrencyModal'

const props = defineProps({
  currency: { type: String, required: true },
  value: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false },
})

defineEmits<{
  (e: 'update:value', value: number): void
  (e: 'update:currency', value: string): void
}>()
const input = ref<HTMLInputElement>()

const modal = useCurrencyModal()

const formatted = computed(() => {
  return formatCurrency(props.value, props.currency)
})

const inputClasses = computed(() => ({
  'text-2xl': true,
  'border-0': true,
  'focus-visible:border-0': true,
  'focus-visible:outline-0': true,
  'cursor-not-allowed': props.disabled,
}))
</script>
