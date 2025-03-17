import { encryptData, decryptData } from "../security/encryption"

// Типы для системы управления конфликтами
type SyncStatus = "synced" | "pending" | "conflict"

interface StorageItem<T> {
  data: T
  timestamp: number
  syncStatus: SyncStatus
  version: number
}

// Класс для работы с локальным хранилищем с поддержкой шифрования и синхронизации
export class SecureOfflineStorage<T> {
  private storageKey: string

  constructor(key: string) {
    this.storageKey = `ehr_${key}`
  }

  // Сохранение данных в локальное хранилище
  async save(data: T): Promise<void> {
    try {
      const item: StorageItem<T> = {
        data,
        timestamp: Date.now(),
        syncStatus: "pending",
        version: 1,
      }

      const encryptedData = await encryptData(item)
      localStorage.setItem(this.storageKey, encryptedData)
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error)
      throw error
    }
  }

  // Получение данных из локального хранилища
  async get(): Promise<T | null> {
    try {
      const encryptedData = localStorage.getItem(this.storageKey)
      if (!encryptedData) return null

      const item: StorageItem<T> = await decryptData(encryptedData)
      return item.data
    } catch (error) {
      console.error("Ошибка при получении данных:", error)
      return null
    }
  }

  // Синхронизация с сервером
  async sync(serverData?: T): Promise<T | null> {
    const localData = await this.get()

    // Если нет локальных данных, просто сохраняем серверные
    if (!localData && serverData) {
      await this.save(serverData)
      return serverData
    }

    // Если нет серверных данных, отмечаем локальные как ожидающие синхронизации
    if (!serverData && localData) {
      const encryptedData = localStorage.getItem(this.storageKey)
      if (encryptedData) {
        const item: StorageItem<T> = await decryptData(encryptedData)
        item.syncStatus = "pending"
        const updatedEncryptedData = await encryptData(item)
        localStorage.setItem(this.storageKey, updatedEncryptedData)
      }
      return localData
    }

    // Если есть и локальные, и серверные данные, разрешаем конфликты
    if (localData && serverData) {
      // Здесь должна быть логика разрешения конфликтов
      // В простейшем случае можно использовать timestamp
      const encryptedData = localStorage.getItem(this.storageKey)
      if (encryptedData) {
        const item: StorageItem<T> = await decryptData(encryptedData)

        // Пример простой стратегии разрешения конфликтов
        // В реальном приложении нужна более сложная логика
        const mergedData = this.mergeData(localData, serverData)
        item.data = mergedData
        item.syncStatus = "synced"
        item.version += 1

        const updatedEncryptedData = await encryptData(item)
        localStorage.setItem(this.storageKey, updatedEncryptedData)

        return mergedData
      }
    }

    return null
  }

  // Простая стратегия слияния данных
  // В реальном приложении нужна более сложная логика
  private mergeData(localData: T, serverData: T): T {
    // Пример: для объектов можно объединить свойства
    if (typeof localData === "object" && typeof serverData === "object") {
      return { ...serverData, ...localData }
    }

    // По умолчанию используем более новые данные (серверные)
    return serverData
  }

  // Очистка хранилища
  async clear(): Promise<void> {
    localStorage.removeItem(this.storageKey)
  }
}

