import { AES, enc } from "crypto-js"

// Ключ шифрования должен храниться в безопасном хранилище
// В реальном приложении использовать Secure Storage или KeyChain
const getEncryptionKey = async (): Promise<string> => {
  // В production-версии ключ должен быть получен из защищенного хранилища
  return process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default-dev-key-not-for-production"
}

// Шифрование данных
export const encryptData = async (data: any): Promise<string> => {
  const key = await getEncryptionKey()
  return AES.encrypt(JSON.stringify(data), key).toString()
}

// Дешифрование данных
export const decryptData = async (encryptedData: string): Promise<any> => {
  const key = await getEncryptionKey()
  const bytes = AES.decrypt(encryptedData, key)
  return JSON.parse(bytes.toString(enc.Utf8))
}

// Хеширование чувствительных данных (например, для идентификаторов пациентов)
export const hashData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

