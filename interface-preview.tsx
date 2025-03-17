"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Tablet, Monitor, Moon, Sun, Languages, PaintBucket, ZoomIn, Accessibility } from "lucide-react"

export default function InterfacePreview() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Интерфейс системы</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="mr-2 h-5 w-5 text-blue-500" />
              Адаптивный дизайн
            </CardTitle>
            <CardDescription>Система адаптируется под различные устройства и размеры экранов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center">
                <Smartphone className="h-12 w-12 text-gray-500 mb-2" />
                <span className="text-sm font-medium">Мобильные</span>
                <span className="text-xs text-gray-500">320px - 767px</span>
              </div>
              <div className="flex flex-col items-center">
                <Tablet className="h-12 w-12 text-gray-500 mb-2" />
                <span className="text-sm font-medium">Планшеты</span>
                <span className="text-xs text-gray-500">768px - 1023px</span>
              </div>
              <div className="flex flex-col items-center">
                <Monitor className="h-12 w-12 text-gray-500 mb-2" />
                <span className="text-sm font-medium">Десктоп</span>
                <span className="text-xs text-gray-500">1024px+</span>
              </div>
            </div>

            <p className="text-sm mb-4">
              Интерфейс автоматически адаптируется под размер экрана устройства, обеспечивая оптимальный
              пользовательский опыт на любом устройстве:
            </p>

            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Отзывчивая сетка с использованием CSS Grid и Flexbox</li>
              <li>Оптимизированные компоненты для сенсорных экранов</li>
              <li>Адаптивная навигация (боковая панель на десктопе, нижняя панель на мобильных)</li>
              <li>Оптимизированные таблицы с горизонтальной прокруткой на малых экранах</li>
              <li>Адаптивные графики и визуализации данных</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Accessibility className="mr-2 h-5 w-5 text-purple-500" />
              Доступность
            </CardTitle>
            <CardDescription>
              Система разработана с учетом требований доступности для всех пользователей
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Интерфейс соответствует стандартам WCAG 2.1 AA, обеспечивая доступность для пользователей с различными
              особенностями:
            </p>

            <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
              <li>Семантическая HTML-структура для корректной работы скринридеров</li>
              <li>Достаточный контраст текста и фона (минимум 4.5:1)</li>
              <li>Поддержка навигации с клавиатуры и фокусные состояния</li>
              <li>Альтернативный текст для всех информативных изображений</li>
              <li>ARIA-атрибуты для сложных интерактивных компонентов</li>
              <li>Возможность изменения размера шрифта без потери функциональности</li>
            </ul>

            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Тестирование доступности</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Система регулярно тестируется с использованием автоматизированных инструментов (Axe, Lighthouse) и с
                привлечением пользователей с различными особенностями для обеспечения реальной доступности.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Настраиваемый интерфейс</CardTitle>
          <CardDescription>Пользователи могут настроить интерфейс под свои предпочтения</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-3">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-amber-500" />
                  <Moon className="h-5 w-5 text-indigo-500" />
                </div>
                <h3 className="font-medium ml-2">Тема оформления</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Выбор между светлой, темной и системной темой.
              </p>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-white border rounded-full"></div>
                <div className="w-8 h-8 bg-gray-900 border rounded-full"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-900 border rounded-full"></div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-3">
                <ZoomIn className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium ml-2">Размер шрифта</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Настройка размера текста от 80% до 150%.</p>
              <div className="flex items-end gap-1">
                <div className="text-xs">A</div>
                <div className="text-sm">A</div>
                <div className="text-base">A</div>
                <div className="text-lg">A</div>
                <div className="text-xl">A</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-3">
                <Languages className="h-5 w-5 text-green-500" />
                <h3 className="font-medium ml-2">Язык интерфейса</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Поддержка нескольких языков интерфейса.</p>
              <div className="flex gap-2">
                <div className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">Русский</div>
                <div className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">English</div>
                <div className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">Deutsch</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-3">
                <PaintBucket className="h-5 w-5 text-red-500" />
                <h3 className="font-medium ml-2">Цветовая схема</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Выбор основного цвета интерфейса.</p>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-medium mb-2">Персонализация рабочего пространства</h3>
            <p className="text-sm mb-3">
              Помимо визуальных настроек, пользователи могут настраивать свое рабочее пространство:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Выбор стартовой страницы при входе в систему</li>
              <li>Настройка отображаемых виджетов на панели мониторинга</li>
              <li>Сохранение пользовательских фильтров и представлений</li>
              <li>Настройка уведомлений и оповещений</li>
              <li>Персонализация горячих клавиш для часто используемых функций</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Примеры экранов</CardTitle>
          <CardDescription>Основные экраны системы MedEHR</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
              <TabsTrigger value="dashboard">Панель</TabsTrigger>
              <TabsTrigger value="patients">Пациенты</TabsTrigger>
              <TabsTrigger value="schedule">Расписание</TabsTrigger>
              <TabsTrigger value="documents">Документы</TabsTrigger>
              <TabsTrigger value="alerts">Алерты</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Панель мониторинга</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Комплексный обзор состояния пациента с визуализацией жизненных показателей
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patients">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Список пациентов</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Управление данными пациентов с возможностью поиска и фильтрации
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Расписание</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Планирование приемов и управление расписанием врачей
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Документы</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Управление медицинской документацией и результатами исследований
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alerts">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Критические алерты</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Система оповещения о критических состояниях пациентов
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Настройки</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Персонализация системы и управление пользователями
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

