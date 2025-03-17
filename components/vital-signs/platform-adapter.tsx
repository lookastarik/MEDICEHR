import { usePlatform } from "@/lib/platform"
import VitalSignsWeb from "./vital-signs-web"
import VitalSignsMobile from "./vital-signs-mobile"

// Адаптер для выбора правильной реализации компонента в зависимости от платформы
export default function VitalSigns(props: any) {
  const { isWeb } = usePlatform()

  // Выбираем подходящую реализацию в зависимости от платформы
  if (isWeb) {
    return <VitalSignsWeb {...props} />
  }

  return <VitalSignsMobile {...props} />
}

// В реальном приложении мы бы использовали React Native Web для общих компонентов
// и специфичные реализации для нативных функций

