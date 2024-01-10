/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import { defineComponent, ref, h } from 'vue'
import ModalComponent from '../components/modal.vue'
import CurrienciesList from '../components/currenciesList.vue'

export function useCurrencyModal() {
  const isShown = ref(false)

  const component = defineComponent({
    emits: ['select'],
    setup(_, ctx) {
      return () =>
        h(
          ModalComponent,
          {
            value: isShown.value,
            onClose: () => (isShown.value = false),
          },
          () =>
            h(CurrienciesList, {
              onSelect: (value: string) => {
                isShown.value = false
                ctx.emit('select', value)
              },
            }),
        )
    },
  })

  return {
    component,
    show: () => (isShown.value = true),
  }
}
