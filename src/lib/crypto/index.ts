/**
 * crypto-js 隔離層：業務程式請自 `@/lib/crypto` 匯入，勿直接依賴 `crypto-js`。
 */
import CryptoJS from 'crypto-js'

const CREDENTIAL_KEY = CryptoJS.SHA256('BITFINEX')

const buildAesCbcOptions = (iv: CryptoJS.lib.WordArray) => ({
  iv,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
})

/** 解密 API 憑證顯示用密文之參數 */
export interface DecryptCredentialForDisplayParams {
  /** 格式為 `ivHex:base64Cipher` 的密文字串 */
  payload: string
}

/**
 * 將 `ivHex:base64Cipher` 格式的密文解密為 UTF-8 明文字串。
 *
 * @param params - 含密文字串的參數物件。
 * @returns 解密後文字；格式錯誤或空字串時回傳空字串。
 */
export const decryptCredentialForDisplay = ({
  payload,
}: DecryptCredentialForDisplayParams): string => {
  const s = String(payload ?? '')
  if (!s) return ''
  const colon = s.indexOf(':')
  if (colon <= 0) return ''
  const ivHex = s.slice(0, colon)
  const cipherB64 = s.slice(colon + 1)
  if (!ivHex || !cipherB64) return ''
  const iv = CryptoJS.enc.Hex.parse(ivHex)
  const ciphertext = CryptoJS.enc.Base64.parse(cipherB64)
  const decrypted = CryptoJS.AES.decrypt(
    CryptoJS.lib.CipherParams.create({ ciphertext }),
    CREDENTIAL_KEY,
    buildAesCbcOptions(iv),
  )
  return decrypted.toString(CryptoJS.enc.Utf8)
}

/** 加密 API 憑證為顯示用密文之參數 */
export interface EncryptCredentialForDisplayParams {
  /** 要加密的明文字串 */
  plainText: string
}

/**
 * 以 AES-CBC（隨機 IV）將明文加密為 `ivHex:base64Cipher` 格式，供與 {@link decryptCredentialForDisplay} 對應。
 *
 * @param params - 含明文字串的參數物件。
 * @returns 密文字串；明文為空時回傳空字串。
 */
export const encryptCredentialForDisplay = ({
  plainText,
}: EncryptCredentialForDisplayParams): string => {
  const text = String(plainText ?? '')
  if (!text) return ''
  const iv = CryptoJS.lib.WordArray.random(128 / 8)
  const encrypted = CryptoJS.AES.encrypt(text, CREDENTIAL_KEY, buildAesCbcOptions(iv))
  const ivHex = iv.toString(CryptoJS.enc.Hex)
  const cipherB64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  return `${ivHex}:${cipherB64}`
}
