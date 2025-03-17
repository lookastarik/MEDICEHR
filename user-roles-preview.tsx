"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ShieldCheck,
  Users,
  UserCog,
  User,
  Stethoscope,
  ClipboardList,
  FileText,
  Calendar,
  Settings,
  Activity,
  AlertTriangle,
  Lock,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function UserRolesPreview() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Ролевая модель доступа</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5 text-green-500" />
              Ролевая модель (RBAC)
            </CardTitle>
            <CardDescription>
              Система использует ролевую модель контроля доступа для обеспечения безопасности
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Ролевая модель контроля доступа (RBAC) позволяет гибко настраивать права пользователей в зависимости от их
              должностных обязанностей, обеспечивая принцип наименьших привилегий.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <UserCog className="h-8 w-8 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Администратор</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Полный доступ ко всем функциям системы, включая управление пользователями и системные настройки.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Stethoscope className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Врач</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Доступ к медицинским данным пациентов, возможность создания и редактирования записей, назначения
                    лечения.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ClipboardList className="h-8 w-8 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Медсестра</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Доступ к основным данным пациентов, возможность регистрации показателей и выполнения назначений.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-8 w-8 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Пациент</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Доступ только к собственным медицинским данным, возможность просмотра назначений и записи на прием.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-5 w-5 text-blue-500" />
              Матрица доступа к модулям
            </CardTitle>
            <CardDescription>Разграничение доступа к функциональным модулям системы</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Модуль</th>
                    <th className="text-center py-2 px-2">Админ</th>
                    <th className="text-center py-2 px-2">Врач</th>
                    <th className="text-center py-2 px-2">Медсестра</th>
                    <th className="text-center py-2 px-2">Пациент</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4 flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-blue-500" />
                      Панель мониторинга
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-indigo-500" />
                      Пациенты
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-green-500" />
                      Расписание
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-amber-500" />
                      Документы
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                      Критические алерты
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-gray-500" />
                      Настройки
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 flex items-center">
                      <UserCog className="h-4 w-4 mr-2 text-purple-500" />
                      Системное администрирование
                    </td>
                    <td className="text-center py-2 px-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                    </td>
                    <td className="text-center py-2 px-2">
                      <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Примечание:</span> Доступ к функциям внутри модулей также дополнительно
                ограничивается на уровне отдельных действий (просмотр, создание, редактирование, удаление).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Детальные разрешения по ролям</CardTitle>
          <CardDescription>Подробная информация о правах доступа для каждой роли в системе</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="admin">Администратор</TabsTrigger>
              <TabsTrigger value="doctor">Врач</TabsTrigger>
              <TabsTrigger value="nurse">Медсестра</TabsTrigger>
              <TabsTrigger value="patient">Пациент</TabsTrigger>
            </TabsList>

            <TabsContent value="admin">
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Управление пользователями</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Создание пользователей
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Редактирование пользователей
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Блокировка пользователей
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Назначение ролей
                    </Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Системные настройки</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Конфигурация системы
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Управление отделениями
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Резервное копирование
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Аудит действий
                    </Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Доступ к данным</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Полный доступ ко всем данным
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Экспорт данных
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Импорт данных
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="doctor">
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Работа с пациентами</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Просмотр карт пациентов
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Добавление пациентов
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Редактирование данных пациентов
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                      Удаление пациентов
                    </Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Медицинские записи</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Создание записей
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Редактирование записей
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Назначение лечения
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Загрузка документов
                    </Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Расписание</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Просмотр расписания
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Создание приемов
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Отмена приемов
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nurse">
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Работа с пациентами</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Просмотр карт пациентов
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                      Добавление пациентов
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                      Редактирование данных пациентов
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                      Удаление пациентов
                    </Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Медицинские записи</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Просмотр записей
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Регистрация показателей
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                      Назначение лечения
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Загрузка документов
                    </Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Расписание</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Просмотр расписания
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                      Создание приемов
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                      Отмена приемов
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patient">
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Личные данные</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Просмотр своей карты
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Редактирование контактной информации
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                      Просмотр других пациентов
                    </Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Медицинские данные</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Просмотр своих записей
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Просмотр назначений
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Просмотр результатов анализов
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                      Редактирование медицинских данных
                    </Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="font-medium mb-2">Расписание</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Просмотр своих приемов
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Запись на прием
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Отмена своих приемов
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

