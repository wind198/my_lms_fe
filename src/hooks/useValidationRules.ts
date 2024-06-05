import { textMap } from '../common/constants/text'

export function useValidationRules() {
  const required = (msg?: string) => (v: any) => {
    msg = msg || textMap.validations.required
    const valueAsString = v.toString()
    return !!valueAsString.trim() || msg
  }
  const min = (min: number, msg?: string) => (v: any) => {
    msg = msg || textMap.validations.min(min)

    if (typeof v !== 'number') {
      return true
    }
    return v >= min || msg
  }
  const max = (max: number, msg?: string) => (v: any) => {
    msg = msg || textMap.validations.max(max)

    if (typeof v !== 'number') {
      return true
    }
    return v >= max || msg
  }
  const maxLength = (maxLength: number, msg?: string) => (v: any) => {
    msg = msg || textMap.validations.maxLength(maxLength)

    if (typeof v !== 'number') {
      return true
    }
    return v >= maxLength || msg
  }
  const minLength = (minLength: number, msg?: string) => (v: any) => {
    msg = msg || textMap.validations.minLength(minLength)

    if (typeof v !== 'number') {
      return true
    }
    return v >= minLength || msg
  }

  return { required, minLength, maxLength, min, max }
}
