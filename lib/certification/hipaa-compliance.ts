// Утилиты для обеспечения соответствия HIPAA

// Типы данных, защищаемых HIPAA
export enum PHIDataType {
  NAME = "name",
  ADDRESS = "address",
  DATES = "dates",
  PHONE = "phone",
  EMAIL = "email",
  SSN = "ssn",
  MEDICAL_RECORD = "medical_record",
  HEALTH_PLAN = "health_plan",
  ACCOUNT = "account",
  CERTIFICATE = "certificate",
  VEHICLE = "vehicle",
  DEVICE = "device",
  URL = "url",
  IP = "ip",
  BIOMETRIC = "biometric",
  PHOTO = "photo",
  OTHER = "other",
}

// Интерфейс для аудита доступа к PHI
interface PHIAccessLog {
  userId: string
  userRole: string
  dataType: PHIDataType
  patientId: string
  action: "view" | "create" | "update" | "delete"
  timestamp: Date
  ipAddress: string
  success: boolean
  reason?: string
}

// Класс для обеспечения соответствия HIPAA
export class HIPAACompliance {
  private static instance: HIPAACompliance
  private loggingEndpoint: string

  private constructor(loggingEndpoint: string) {
    this.loggingEndpoint = loggingEndpoint
  }

  // Получение экземпляра (Singleton)
  static getInstance(loggingEndpoint: string): HIPAACompliance {
    if (!HIPAACompliance.instance) {
      HIPAACompliance.instance = new HIPAACompliance(loggingEndpoint)
    }
    return HIPAACompliance.instance
  }

  // Логирование доступа к PHI
  async logPHIAccess(accessLog: Omit<PHIAccessLog, "timestamp">): Promise<void> {
    const logEntry: PHIAccessLog = {
      ...accessLog,
      timestamp: new Date(),
    }

    try {
      await fetch(this.loggingEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logEntry),
        keepalive: true,
      })
    } catch (error) {
      console.error("Failed to log PHI access:", error)
      // В production необходимо обеспечить гарантированную доставку логов
      // Например, через очередь с повторными попытками
    }
  }

  // Проверка авторизации для доступа к PHI
  static checkPHIAuthorization(
    userRole: string,
    dataType: PHIDataType,
    action: "view" | "create" | "update" | "delete",
  ): boolean {
    // Здесь должна быть реализована логика проверки авторизации
    // в соответствии с политиками организации

    // Пример простой проверки:
    if (userRole === "admin") return true

    if (userRole === "doctor") {
      return true // Врачи имеют доступ ко всем типам PHI
    }

    if (userRole === "nurse") {
      // Медсестры могут просматривать большинство данных, но не могут удалять
      if (action === "delete") return false

      // Ограничения на определенные типы данных
      if (dataType === PHIDataType.MEDICAL_RECORD && action === "update") {
        return false
      }

      return true
    }

    if (userRole === "patient") {
      // Пациенты могут просматривать только свои данные
      return action === "view"
    }

    return false
  }

  // Маскирование PHI для логов и отладки
  static maskPHI(data: any, types: PHIDataType[]): any {
    if (!data) return data

    if (typeof data === "string") {
      // Маскирование строки
      return "********"
    }

    if (Array.isArray(data)) {
      // Рекурсивная обработка массива
      return data.map((item) => this.maskPHI(item, types))
    }

    if (typeof data === "object") {
      // Рекурсивная обработка объекта
      const result: Record<string, any> = {}

      for (const key in data) {
        if (types.some((type) => key.toLowerCase().includes(type.toLowerCase()))) {
          // Если ключ содержит название типа PHI, маскируем значение
          result[key] = "********"
        } else {
          // Иначе рекурсивно обрабатываем значение
          result[key] = this.maskPHI(data[key], types)
        }
      }

      return result
    }

    return data
  }
}

