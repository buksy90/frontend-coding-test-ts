<template>
  <div
    id="toast-bottom-right"
    class="fixed flex items-center w-full max-w-xs p-4 space-x-4 divide-x rtl:divide-x-reverse rounded-lg shadow right-5 bottom-5 space-x"
    v-bind:class="classType"
    role="alert"
  >
    <div class="text-sm font-normal">{{ text }}</div>
  </div>
</template>
<script setup lang="ts">
// Layout from Tailwind example
// https://flowbite.com/docs/components/toast/#positioning

import { PropType, computed } from 'vue'
import { TOAST_TYPE } from '../types/toast'

const props = defineProps({
  text: { type: String, required: true },
  type: { type: String as PropType<TOAST_TYPE>, default: TOAST_TYPE.Info },
})

const classType = computed(() => {
  return {
    'bg-gray-800': props.type === TOAST_TYPE.Info,
    'text-gray-400': props.type === TOAST_TYPE.Info,
    'divide-gray-700': props.type === TOAST_TYPE.Info,
    'bg-red-800': props.type === TOAST_TYPE.Error,
    'text-red-400': props.type === TOAST_TYPE.Error,
    'divide-red-700': props.type === TOAST_TYPE.Error,
    'bg-green-800': props.type === TOAST_TYPE.Success,
    'text-green-400': props.type === TOAST_TYPE.Success,
    'divide-green-700': props.type === TOAST_TYPE.Success,
  }
})
</script>
