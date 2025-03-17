// Система отслеживания ошибок

interface ErrorData {
  message: string
  stack?: string
  componentStack?: string
  url: string
  timestamp: number
  userAgent: string
  userId?: string
  sessionId?: string
  metadata?: Record<string, any>
}

export class ErrorTracker {
  private static instance: ErrorTracker
  private endpoint: string
  private metadata: Record<string, any> = {}

  private constructor(endpoint: string) {
    this.endpoint = endpoint
    this.setupGlobalHandlers()
  }

  // Получение экземпляра (Singleton)
  static getInstance(endpoint: string): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker(endpoint)
    }
    return ErrorTracker.instance
  }

  // Настройка обработчиков ошибок
  private setupGlobalHandlers(): void {
    // Обработка необработанных исключений
    window.addEventListener("error", (event) => {
      this.captureError({
        message: event.message,
        stack: event.error?.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        metadata: this.metadata,
      })

      // Не блокируем стандартную обработку ошибок
      return false
    })

    // Обработка необработанных отклонений промисов
    window.addEventListener("unhandledrejection", (event) => {
      const error = event.reason

      this.captureError({
        message: error?.message || "Unhandled Promise Rejection",
        stack: error?.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        metadata: this.metadata,
      })

      // Не блокируем стандартную обработку ошибок
      return false
    })
  }

  // Установка метаданных для ошибок
  setMetadata(key: string, value: any): void {
    this.metadata[key] = value
  }

  // Установка идентификатора пользователя
  setUserId(userId: string): void {
    this.metadata.userId = userId
  }

  // Установка идентификатора сессии
  setSessionId(sessionId: string): void {
    this.metadata.sessionId = sessionId
  }

  // Ручной захват ошибки
  captureError(errorData: ErrorData): void {
    // В реальном приложении отправка на сервер аналитики
    console.error("Captured error:", errorData)

    // Отправка на сервер
    fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorData),
      // Используем keepalive для гарантии отправки даже при закрытии страницы
      keepalive: true,
    }).catch((error) => {
      console.error("Error sending error data:", error)
    })
  }

  // Обертка для функций с автоматическим захватом ошибок
  withErrorTracking<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> {
    return (...args: Parameters<T>): ReturnType<T> => {
      try {
        return fn(...args)
      } catch (error: any) {
        this.captureError({
          message: error.message || "Unknown error",
          stack: error.stack,
          url: window.location.href,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          metadata: this.metadata,
        })
        throw error
      }
    }
  }
}

