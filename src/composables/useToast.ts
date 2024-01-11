/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import { defineComponent, ref, h } from 'vue'
import ToastComponent from '../components/toast.vue'
import { TOAST_TYPE } from '../types/toast'

const isShown = ref(false)
const lastMessage = ref('')
const lastType = ref<TOAST_TYPE | undefined>(undefined)
let lastTimeout: number | undefined

const globalComponent = defineComponent({
  setup(_, ctx) {
    return () =>
      isShown.value
        ? h(ToastComponent, {
            text: lastMessage.value,
            type: lastType.value,
          })
        : ctx.slots.default
  },
})

export function useToast() {
  return {
    component: globalComponent,
    show: (text: string, type?: TOAST_TYPE, timeout = 2000) => {
      lastType.value = type
      lastMessage.value = text
      isShown.value = true

      window.clearTimeout(lastTimeout)
      lastTimeout = window.setTimeout(() => {
        isShown.value = false
      }, timeout)
    },
  }
}
