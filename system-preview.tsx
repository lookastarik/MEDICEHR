"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Eye,
  EyeOff,
  LogIn,
  Activity,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  Settings,
  Bell,
  ChevronDown,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SystemPreview() {
  const [currentView, setCurrentView] = useState("login")
  const [role, setRole] = useState("doctor")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login process
    setTimeout(() => {
      setCurrentView("dashboard")
      setLoading(false)
    }, 1000)
  }

  // Login Screen
  if (currentView === "login") {
    return (
      <div className="flex min-h-[600px] flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">MedEHR</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">Демонстрационный режим</p>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Вход в систему</CardTitle>
            <CardDescription className="text-center">Выберите роль для входа в демонстрационный режим</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="demo@medehr.example.com"
                  defaultValue="demo@medehr.example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    defaultValue="demo1234"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Показать/скрыть пароль</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Роль для демонстрации</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Врач</SelectItem>
                    <SelectItem value="nurse">Медсестра</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                    <SelectItem value="patient">Пациент</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Выбранная роль определяет доступные функции и интерфейс системы
                </p>
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                      Вход...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Войти в демо-режим
                    </div>
                  )}
                </Button>
              </div>

              <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                <p>Это демонстрационная версия системы MedEHR.</p>
                <p>Все данные являются тестовыми и будут сброшены при выходе.</p>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    )
  }

  // Dashboard Screen
  return (
    <div className="flex flex-col min-h-[600px] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex h-14 items-center px-4 gap-4">
          <div className="text-xl font-bold mr-4">MedEHR</div>

          <div className="relative flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Поиск пациентов по имени, ID, диагнозу..."
              className="pl-8 bg-gray-50 dark:bg-gray-950"
            />
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          <Button variant="outline" className="gap-2">
            Отделение: Кардиология
            <ChevronDown className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Аватар" />
            <AvatarFallback>ВР</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-white dark:bg-gray-800 border-r dark:border-gray-700">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              <Button variant="ghost" className="justify-start bg-accent text-accent-foreground">
                <Activity className="mr-2 h-4 w-4" />
                Панель мониторинга
              </Button>
              <Button variant="ghost" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                Пациенты
              </Button>
              <Button variant="ghost" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Расписание
              </Button>
              <Button variant="ghost" className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Документы
              </Button>
              <Button variant="ghost" className="justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Критические алерты
              </Button>
              <Button variant="ghost" className="justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Настройки
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-12 gap-4">
            {/* Left Column - Patient Card */}
            <div className="col-span-12 md:col-span-3 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Карта пациента</CardTitle>
                    <Button variant="ghost" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Фото пациента" />
                      <AvatarFallback>КЛ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Кристиан Лоуп</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">30 лет, муж.</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                        >
                          Коронарная болезнь
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="text-gray-500 dark:text-gray-400">ID пациента</div>
                      <div className="font-medium">P-23891</div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="text-gray-500 dark:text-gray-400">Госпитализация</div>
                      <div className="font-medium">15.03.2025</div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="text-gray-500 dark:text-gray-400">Группа крови</div>
                      <div className="font-medium">A+ (II)</div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="text-gray-500 dark:text-gray-400">Лечащий врач</div>
                      <div className="font-medium">Др. Иванов</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vital Signs Card (simplified) */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Жизненные показатели</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Онлайн
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="heart">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="heart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </TabsTrigger>
                      <TabsTrigger value="bp">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </TabsTrigger>
                      <TabsTrigger value="oxygen">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M8 14a6 6 0 1 0 12 0 6 6 0 1 0-12 0Z" />
                          <path d="M4 14a10 10 0 0 1 2-6" />
                        </svg>
                      </TabsTrigger>
                      <TabsTrigger value="glucose">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                        </svg>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="heart" className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Пульс</h4>
                        <div className="text-2xl font-bold text-red-500">
                          80 <span className="text-sm font-normal text-gray-500">уд/мин</span>
                        </div>
                      </div>
                      <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                        <p className="text-sm text-gray-500">График пульса</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Middle Column - Analytics */}
            <div className="col-span-12 md:col-span-6 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl">Обзор пациента</CardTitle>
                      <CardDescription>Аналитическая панель состояния здоровья</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="circulatory">
                    <TabsList>
                      <TabsTrigger value="circulatory">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-2"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        Кровеносная
                      </TabsTrigger>
                      <TabsTrigger value="nervous">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-2"
                        >
                          <path d="M9.5 2h5" />
                          <path d="M12 2v4" />
                          <path d="M15.5 11h.5c1.1 0 2-.9 2-2V7h1" />
                          <path d="M2 7h5m0 0v2c0 1.1.9 2 2 2h.5" />
                          <path d="M4 11h1" />
                          <path d="M6 15.5V13" />
                          <path d="M12 13v8" />
                          <path d="M18 15.5V13" />
                          <path d="M15 18h-1.5a2 2 0 1 0-4 0H8" />
                          <path d="M20 8v.5" />
                          <path d="M20 12v.5" />
                          <path d="M4 8v.5" />
                          <path d="M4 12v.5" />
                        </svg>
                        Нервная
                      </TabsTrigger>
                      <TabsTrigger value="respiratory">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-2"
                        >
                          <path d="M12 22v-6" />
                          <path d="M9 8h6" />
                          <path d="M7 6h10" />
                          <path d="M8 22h8" />
                          <path d="M17 14a5 5 0 0 0-10 0" />
                          <path d="M12 2v4" />
                        </svg>
                        Дыхательная
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="circulatory">
                      <div className="space-y-6 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-500 text-white p-4 rounded-lg relative overflow-hidden">
                            <div className="relative z-10">
                              <div className="text-xs mb-2">2 случая</div>
                              <h3 className="text-2xl font-bold mb-4">Кровеносная</h3>
                              <h3 className="text-2xl font-bold">Система</h3>
                            </div>
                          </div>

                          <div className="bg-gray-800 text-white p-4 rounded-lg relative overflow-hidden">
                            <div className="flex justify-between mb-2">
                              <div className="text-xs text-gray-400">Период рецессии</div>
                            </div>
                            <h3 className="text-xl font-bold">Коронарная</h3>
                            <h3 className="text-xl font-bold">Болезнь</h3>
                            <h3 className="text-xl font-bold">Сердца</h3>
                            <div className="text-xs text-gray-400 mt-2">19 маркеров</div>
                          </div>
                        </div>

                        <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                          <p className="text-sm text-gray-500">График прогноза риска инфаркта</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>AI-рекомендации</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                    >
                      Обновлено 5 мин. назад
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
                    <div className="flex gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Рекомендация по лечению</h4>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Повысить дозу инсулина при глюкозе {">"} 200 мг/дл. Последнее измерение: 210 мг/дл (15 мин.
                      назад).
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                    <div className="flex gap-2 mb-2">
                      <Activity className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                      <h4 className="font-medium text-blue-800 dark:text-blue-400">Прогноз риска</h4>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Средний риск сердечно-сосудистых осложнений (32%). Рекомендуется контроль АД и липидного профиля.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Timeline */}
            <div className="col-span-12 md:col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Хронология событий</CardTitle>
                    <Button variant="outline" size="sm" className="gap-1">
                      Все события
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-6 border-l border-dashed dark:border-gray-700"></div>
                    <div className="space-y-4">
                      <div className="flex gap-4 relative">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 z-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-blue-600 dark:text-blue-400"
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </div>
                        <div className="flex-1 pt-1.5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Госпитализация</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Поступление в кардиологическое отделение
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              15.03.2025
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 relative">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 z-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-blue-600 dark:text-blue-400"
                          >
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
                          </svg>
                        </div>
                        <div className="flex-1 pt-1.5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">Анализы крови</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Общий анализ, биохимия, липидный профиль
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              15.03.2025
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 relative">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 z-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-blue-600 dark:text-blue-400"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                          </svg>
                        </div>
                        <div className="flex-1 pt-1.5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">ЭКГ</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Синусовый ритм, ЧСС 80 уд/мин</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              15.03.2025
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

