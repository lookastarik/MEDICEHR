"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  Settings,
  Shield,
  Database,
  Globe,
  Layers,
  Smartphone,
  Server,
} from "lucide-react"

export default function SystemOverview() {
  const [activeTab, setActiveTab] = useState("architecture")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">MedEHR: Обзор системы</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="architecture">Архитектура</TabsTrigger>
          <TabsTrigger value="modules">Модули</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="roadmap">Развитие</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Архитектура системы</CardTitle>
              <CardDescription>
                Многоуровневая архитектура с разделением на клиентскую и серверную части
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Smartphone className="mr-2 h-5 w-5" />
                      Клиентский уровень
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>React + Next.js (App Router)</li>
                      <li>Адаптивный интерфейс</li>
                      <li>Кроссплатформенность</li>
                      <li>Оффлайн-режим</li>
                      <li>PWA-возможности</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Server className="mr-2 h-5 w-5" />
                      Серверный уровень
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>API на Node.js/Express</li>
                      <li>FHIR-совместимость</li>
                      <li>Микросервисная архитектура</li>
                      <li>Горизонтальное масштабирование</li>
                      <li>Очереди сообщений</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Database className="mr-2 h-5 w-5" />
                      Уровень данных
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>PostgreSQL (основная БД)</li>
                      <li>MongoDB (медицинские документы)</li>
                      <li>Redis (кэширование)</li>
                      <li>Шифрование данных</li>
                      <li>Резервное копирование</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="font-medium mb-2">Ключевые технические особенности:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Реактивная архитектура с обновлениями в реальном времени</li>
                  <li>Интеграция с медицинским оборудованием через API</li>
                  <li>Поддержка стандартов HL7 FHIR для обмена медицинскими данными</li>
                  <li>Масштабируемость для поддержки от небольших клиник до крупных больниц</li>
                  <li>Модульная структура для гибкой настройки под нужды учреждения</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Модули системы</CardTitle>
              <CardDescription>Основные функциональные блоки MedEHR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-blue-500" />
                      Панель мониторинга
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Комплексный обзор состояния пациента с визуализацией жизненных показателей.
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Мониторинг в реальном времени</li>
                      <li>Графики динамики показателей</li>
                      <li>AI-рекомендации по лечению</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Users className="mr-2 h-5 w-5 text-indigo-500" />
                      Пациенты
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Управление данными пациентов и их медицинскими картами.
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Поиск и фильтрация пациентов</li>
                      <li>Детальные карточки пациентов</li>
                      <li>История болезни и аллергии</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-green-500" />
                      Расписание
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Планирование приемов и управление расписанием врачей.
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Календарь с дневным/недельным видом</li>
                      <li>Запись пациентов на прием</li>
                      <li>Уведомления о предстоящих визитах</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-amber-500" />
                      Документы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Управление медицинской документацией и результатами исследований.
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Загрузка и категоризация документов</li>
                      <li>Просмотр результатов анализов</li>
                      <li>Цифровое подписание документов</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                      Критические алерты
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Система оповещения о критических состояниях пациентов.
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Настраиваемые пороговые значения</li>
                      <li>Приоритизация уведомлений</li>
                      <li>Режим "Код Синий" для экстренных ситуаций</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Settings className="mr-2 h-5 w-5 text-gray-500" />
                      Настройки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Персонализация системы и управление пользователями.
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Настройки интерфейса</li>
                      <li>Управление уведомлениями</li>
                      <li>Системные настройки (для администраторов)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Безопасность и соответствие стандартам</CardTitle>
              <CardDescription>
                Меры по защите медицинских данных и соответствию нормативным требованиям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-green-500" />
                    Защита данных
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">Шифрование в состоянии покоя:</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Все конфиденциальные данные шифруются с использованием AES-256.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Защита при передаче:</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        TLS 1.3 для всех коммуникаций, дополнительное шифрование для особо чувствительных данных.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Управление доступом:</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ролевая модель доступа (RBAC) с детальными разрешениями для каждой роли.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Аудит действий:</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Подробное логирование всех действий с PHI (Protected Health Information).
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-blue-500" />
                    Соответствие стандартам
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">HIPAA:</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Соответствие требованиям по защите медицинской информации в США.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">GDPR:</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Соблюдение европейских норм по защите персональных данных.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">ISO 27001:</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Соответствие международному стандарту информационной безопасности.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">HL7 FHIR:</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Поддержка стандарта обмена медицинскими данными для совместимости с другими системами.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <h3 className="font-medium mb-2 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600" />
                  Реагирование на инциденты
                </h3>
                <p className="text-sm mb-2">
                  Система включает комплексный план реагирования на инциденты безопасности:
                </p>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Автоматическое обнаружение подозрительной активности</li>
                  <li>Процедуры оповещения ответственных лиц</li>
                  <li>Документированные шаги по локализации и устранению угроз</li>
                  <li>Процессы восстановления данных и систем</li>
                  <li>Анализ инцидентов и предотвращение повторений</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>План развития системы</CardTitle>
              <CardDescription>Ключевые направления и этапы развития MedEHR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Layers className="mr-2 h-5 w-5 text-blue-500" />
                    Этап 1: Техническая модернизация
                  </h3>
                  <div className="pl-7 space-y-3">
                    <div>
                      <h4 className="font-medium">Кроссплатформенная адаптация</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Переход на React Native для поддержки мобильных устройств и планшетов.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Оптимизация производительности</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Улучшение скорости работы и отзывчивости интерфейса, особенно на мобильных устройствах.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Усиление безопасности</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Внедрение дополнительных мер защиты данных и соответствие международным стандартам.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Layers className="mr-2 h-5 w-5 text-green-500" />
                    Этап 2: Интеграция и масштабирование
                  </h3>
                  <div className="pl-7 space-y-3">
                    <div>
                      <h4 className="font-medium">FHIR API</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Полная реализация FHIR API для интеграции с другими медицинскими системами.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Поддержка оффлайн-режима</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Возможность работы без подключения к интернету с последующей синхронизацией.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Горизонтальное масштабирование</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Архитектурные изменения для поддержки крупных медицинских учреждений.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Layers className="mr-2 h-5 w-5 text-purple-500" />
                    Этап 3: Тестирование и сертификация
                  </h3>
                  <div className="pl-7 space-y-3">
                    <div>
                      <h4 className="font-medium">Комплексное тестирование</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Функциональное, нагрузочное и пенетрационное тестирование системы.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Соответствие HIPAA и ISO 27001</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Получение сертификатов соответствия международным стандартам безопасности.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Документация и обучение</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Разработка подробной документации и обучающих материалов для пользователей.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="font-medium mb-2">Перспективные направления развития:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Интеграция с системами телемедицины для удаленных консультаций</li>
                    <li>Расширенная аналитика с использованием машинного обучения</li>
                    <li>Поддержка медицинских устройств IoT для непрерывного мониторинга</li>
                    <li>Модули для специализированных областей медицины (кардиология, неврология и т.д.)</li>
                    <li>Интеграция с системами медицинского страхования и биллинга</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

