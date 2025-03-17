"use client"

import { useState } from "react"
import { Moon, PaintBucket, SettingsIcon, Sun, User, Bell, Monitor, Languages } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useAuth } from "@/components/auth-provider"

export default function SettingsPage() {
  const { userRole } = useAuth()
  const [theme, setTheme] = useState("light")
  const [fontSize, setFontSize] = useState(100)
  const [language, setLanguage] = useState("ru")
  const [notifications, setNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [autoLogout, setAutoLogout] = useState(true)

  const isAdmin = userRole === "admin"

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Настройки</h1>
      </div>

      <Tabs defaultValue="interface">
        <TabsList>
          <TabsTrigger value="interface">Интерфейс</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="account">Аккаунт</TabsTrigger>
          {isAdmin && <TabsTrigger value="system">Система</TabsTrigger>}
        </TabsList>

        <TabsContent value="interface" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки отображения</CardTitle>
              <CardDescription>Настройте интерфейс системы под свои предпочтения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Тема оформления</Label>
                </div>
                <RadioGroup defaultValue={theme} onValueChange={setTheme} className="flex">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="flex items-center cursor-pointer">
                      <Sun className="mr-2 h-4 w-4" />
                      Светлая
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="flex items-center cursor-pointer">
                      <Moon className="mr-2 h-4 w-4" />
                      Темная
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system" className="flex items-center cursor-pointer">
                      <Monitor className="mr-2 h-4 w-4" />
                      Системная
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Размер шрифта</Label>
                  <span className="text-sm">{fontSize}%</span>
                </div>
                <Slider
                  defaultValue={[fontSize]}
                  min={80}
                  max={150}
                  step={5}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>A</span>
                  <span className="text-xl">A</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Язык интерфейса</Label>
                </div>
                <Select defaultValue={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите язык" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-base">Цветовая гамма</Label>
                </div>
                <Select defaultValue="blue">
                  <SelectTrigger className="w-full">
                    <PaintBucket className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Выберите основной цвет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Синий</SelectItem>
                    <SelectItem value="green">Зеленый</SelectItem>
                    <SelectItem value="purple">Фиолетовый</SelectItem>
                    <SelectItem value="orange">Оранжевый</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-mode">Компактный режим</Label>
                    <p className="text-sm text-muted-foreground">Уменьшает размеры элементов интерфейса</p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
              </div>

              <Button className="w-full">Сохранить настройки</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>Управляйте тем, как и когда вы получаете уведомления</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-notifications">Уведомления в браузере</Label>
                    <p className="text-sm text-muted-foreground">Получать уведомления в браузере</p>
                  </div>
                  <Switch id="browser-notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email уведомления</Label>
                    <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sound-notifications">Звуковые уведомления</Label>
                    <p className="text-sm text-muted-foreground">Проигрывать звук при получении уведомления</p>
                  </div>
                  <Switch id="sound-notifications" defaultChecked />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-base">Частота уведомлений</Label>
                  </div>
                  <Select defaultValue="instant">
                    <SelectTrigger className="w-full">
                      <Bell className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Выберите частоту уведомлений" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Мгновенно</SelectItem>
                      <SelectItem value="batch-5m">Пакетно (каждые 5 минут)</SelectItem>
                      <SelectItem value="batch-15m">Пакетно (каждые 15 минут)</SelectItem>
                      <SelectItem value="batch-30m">Пакетно (каждые 30 минут)</SelectItem>
                      <SelectItem value="batch-1h">Пакетно (каждый час)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full">Сохранить настройки</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки аккаунта</CardTitle>
              <CardDescription>Управляйте своим аккаунтом и персональными данными</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="display-name">Отображаемое имя</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="dr">
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Титул" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr">Др.</SelectItem>
                        <SelectItem value="prof">Проф.</SelectItem>
                        <SelectItem value="mr">Г-н</SelectItem>
                        <SelectItem value="ms">Г-жа</SelectItem>
                      </SelectContent>
                    </Select>
                    <input
                      id="display-name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="Иванов"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="doctor@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <input
                    id="phone"
                    type="tel"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="+7 (999) 123-45-67"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Предпочитаемый язык</Label>
                  <Select defaultValue="ru">
                    <SelectTrigger className="w-full">
                      <Languages className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Выберите язык" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-logout">Автоматический выход</Label>
                    <p className="text-sm text-muted-foreground">Автоматически выходить после 30 минут бездействия</p>
                  </div>
                  <Switch id="auto-logout" checked={autoLogout} onCheckedChange={setAutoLogout} />
                </div>
              </div>

              <Button className="w-full">Сохранить настройки</Button>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Безопасность</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="flex-1">
                    Изменить пароль
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Двухфакторная аутентификация
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Системные настройки</CardTitle>
                <CardDescription>Настройки системы доступны только для администраторов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Название организации</Label>
                    <input
                      id="organization"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="Городская клиническая больница"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-department">Отделение по умолчанию</Label>
                    <Select defaultValue="cardiology">
                      <SelectTrigger className="w-full" id="default-department">
                        <SelectValue placeholder="Выберите отделение" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Кардиология</SelectItem>
                        <SelectItem value="neurology">Неврология</SelectItem>
                        <SelectItem value="pulmonology">Пульмонология</SelectItem>
                        <SelectItem value="surgery">Хирургия</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-mode">Режим обслуживания</Label>
                      <p className="text-sm text-muted-foreground">
                        Система будет недоступна для всех, кроме администраторов
                      </p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="debug-mode">Режим отладки</Label>
                      <p className="text-sm text-muted-foreground">Включить расширенное логирование ошибок</p>
                    </div>
                    <Switch id="debug-mode" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-access">API доступ</Label>
                      <p className="text-sm text-muted-foreground">Разрешить доступ к API для сторонних приложений</p>
                    </div>
                    <Switch id="api-access" defaultChecked />
                  </div>
                </div>

                <Button className="w-full">Сохранить системные настройки</Button>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Действия системы</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button variant="outline">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Конфигурация системы
                    </Button>
                    <Button variant="outline">
                      <Bell className="mr-2 h-4 w-4" />
                      Глобальные уведомления
                    </Button>
                    <Button variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      Управление пользователями
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Перезапустить систему
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

