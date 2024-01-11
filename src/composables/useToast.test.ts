import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useToast } from './useToast'
import { TOAST_TYPE } from '../types/toast'

describe('useToast', () => {
  const wrapper = useToast()

  it('is not shown by default', () => {
    const mounted = mount(wrapper.component)
    expect(mounted.isVisible()).to.equal(false)
  })

  describe('can be temporary shown', () => {
    it('show', () => {
      wrapper.show('test', TOAST_TYPE.Error, 10)
      const mounted = mount(wrapper.component)
      expect(mounted.isVisible()).to.equal(true)
    })

    it('auto hide', async () => {
      const mounted = mount(wrapper.component)
      expect(mounted.isVisible()).to.equal(true)

      await new Promise((resolve) => {
        setTimeout(resolve, 15)
      })

      expect(mounted.isVisible()).to.equal(false)
    })
  })
})
