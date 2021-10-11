import { DirectiveBinding } from 'vue'
import { ViteModule } from '@/@types/globals'

enum DecimalPlaces {
  UNIT = 1 + 6,
  TEN = 2 + 6,
  HUNDRED = 3 + 6,
  THOUSAND = 4 + 7,
  TEN_THOUSAND = 5 + 7,
  HUNDRED_THOUSAND = 6 + 7,
  MILLION = 7 + 8,
}

export const money = {
  beforeMount(
    elementInput: HTMLInputElement,
    binding: DirectiveBinding<{ precision: keyof typeof DecimalPlaces }>,
  ) {
    const precision: keyof typeof DecimalPlaces
      = binding.value?.precision ?? 'MILLION'

    elementInput.setAttribute('maxlength', `${DecimalPlaces[precision]}`)

    const formatNumber = (n: string): string =>
      n
        .replace(/\D/g, '')
        .replace(/(\d+)(\d{2}$)/g, '$1,$2')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    function formatCurrency(input: HTMLInputElement) {
      if (['', '0'].includes(input.value)) {
        input.value = ''
        return
      }

      const inputFormatted = formatNumber(input.value)
      const formattedWithSymbol = inputFormatted.length
        ? `R$ ${inputFormatted}`
        : ''

      input.value = formattedWithSymbol

      const cursorCaretPosition = formattedWithSymbol.length
      input.setSelectionRange(cursorCaretPosition, cursorCaretPosition)
    }

    elementInput.oninput = function() {
      formatCurrency(elementInput)
    }
  },

  beforeUnmount(el: HTMLInputElement) {
    el.removeEventListener('input', () => {})
  },
}

export const install: ViteModule = ({ app }) => {
  app.directive('money', money)
}
