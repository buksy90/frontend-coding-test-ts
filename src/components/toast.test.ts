import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToastComponent from './toast.vue'
import { TOAST_TYPE } from '../types/toast'

describe('Toast', () => {
  it('Has info type by default', () => {
    const wrapper = mount(ToastComponent, {
      props: {
        text: 'abc',
      },
    })

    expect(wrapper.text()).to.equal('abc')
    expect(wrapper.classes()).includes('bg-gray-800')
  })

  it('Supports error', () => {
    const wrapper = mount(ToastComponent, {
      props: {
        text: 'error',
        type: TOAST_TYPE.Error,
      },
    })

    expect(wrapper.text()).to.equal('error')
    expect(wrapper.classes()).includes('bg-red-800')
  })
})
