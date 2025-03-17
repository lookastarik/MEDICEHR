// Утилиты для мониторинга производительности

// Интерфейс для метрик производительности
interface PerformanceMetrics {
  pageLoadTime: number
  ttfb: number // Time to First Byte
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
}

// Класс для сбора и отправки метрик производительности
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Partial<PerformanceMetrics> = {}
  private endpoint: string

  private constructor(endpoint: string) {
    this.endpoint = endpoint
    this.setupListeners()
  }

  // Получение экземпляра (Singleton)
  static getInstance(endpoint: string): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor(endpoint)
    }
    return PerformanceMonitor.instance
  }

  // Настройка слушателей для сбора метрик
  private setupListeners(): void {
    // Измерение времени загрузки страницы
    window.addEventListener("load", () => {
      const pageLoadTime = performance.now()
      this.metrics.pageLoadTime = pageLoadTime

      // Получение TTFB из Performance API
      const navigationEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
      if (navigationEntries.length > 0) {
        this.metrics.ttfb = navigationEntries[0].responseStart
      }

      // Отправка начальных метрик
      this.sendMetrics()
    })

    // Измерение FCP
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      if (entries.length > 0) {
        const fcp = entries[0].startTime
        this.metrics.fcp = fcp
        this.sendMetrics()
      }
    })

    fcpObserver.observe({ type: "paint", buffered: true })

    // Измерение LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.metrics.lcp = lastEntry.startTime
      this.sendMetrics()
    })

    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

    // Измерение FID
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      if (entries.length > 0) {
        const firstInput = entries[0]
        this.metrics.fid = firstInput.processingStart - firstInput.startTime
        this.sendMetrics()
      }
    })

    fidObserver.observe({ type: "first-input", buffered: true })

    // Измерение CLS
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      let clsValue = 0

      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value
        }
      })

      this.metrics.cls = clsValue
      this.sendMetrics()
    })

    clsObserver.observe({ type: "layout-shift", buffered: true })
  }

  // Отправка метрик на сервер
  private sendMetrics(): void {
    // В реальном приложении отправка на сервер аналитики
    // Здесь для примера просто логируем
    console.log("Performance metrics:", this.metrics)

    // Отправка на сервер
    fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.metrics),
      // Используем keepalive для гарантии отправки даже при закрытии страницы
      keepalive: true,
    }).catch((error) => {
      console.error("Error sending performance metrics:", error)
    })
  }
}

