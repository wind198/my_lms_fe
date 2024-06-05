import { isEmpty } from 'lodash-es'

export const generateRandomId = (length = 24) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export const uppercaseFirstLetter = (i: string) => i[0].toUpperCase().concat(i.slice(1))

export const removeNullUndefineOrEmptyKeyFromObject = (i: Record<string, any>) => {
  return Object.keys(i).reduce((acc, key) => {
    if (i[key] !== null && i[key] !== undefined && (typeof i[key] !== 'object' || !isEmpty(i[key]))) {
      acc[key] = i[key]
    }
    return acc
  }, {})
}
