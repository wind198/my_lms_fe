const Secret = 'K8MqxnljyV'
import CryptoJS from 'crypto-js'

function encryptToken(token: string) {
  return CryptoJS.AES.encrypt(token, Secret).toString()
}

function decryptToken(encryptedToken: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, Secret)
  return bytes.toString(CryptoJS.enc.Utf8)
}
export const appLocalStorage = {
  setItem(k: string, v: string) {
    return localStorage.setItem(k, v)
  },
  getItem(k: string) {
    return localStorage.getItem(k)
  },
  setJwtToken(token: string) {
    return localStorage.setItem('jwtToken', encryptToken(token))
  },
  removeJwtToken() {
    return localStorage.removeItem('jwtToken')
  },
  getJwtToken() {
    const token = localStorage.getItem('jwtToken')
    if (!token) return null
    return decryptToken(token)
  }
}
