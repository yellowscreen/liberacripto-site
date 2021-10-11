export function shouldRequired(target: HTMLInputElement, errorMessage: string) {
  const validity = target.validity

  validity.valueMissing && target.setCustomValidity(errorMessage)

  !validity.valueMissing && target.setCustomValidity('')
}

export function shouldPattern(target: HTMLInputElement, errorMessage: string) {
  const validity = target.validity

  validity.patternMismatch && target.setCustomValidity(errorMessage)

  !validity.patternMismatch && target.setCustomValidity('')
}
