// Платформенно-независимый слой для абстрагирования нативных и веб-компонентов

export type Platform = "web" | "ios" | "android"

// Определяем текущую платформу
export const getCurrentPlatform = (): Platform => {
  if (typeof window === "undefined") return "web" // SSR

  // Определение мобильных платформ
  const userAgent = window.navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(userAgent)) return "ios"
  if (/android/.test(userAgent)) return "android"

  return "web"
}

// Хук для использования платформенно-зависимой логики
export const usePlatform = () => {
  const platform = getCurrentPlatform()

  return {
    platform,
    isWeb: platform === "web",
    isIOS: platform === "ios",
    isAndroid: platform === "android",
    isMobile: platform === "ios" || platform === "android",
  }
}

