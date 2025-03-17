"use client"

import { useState } from "react"
import { Bell, Filter, Heart, Search, User, Activity, Droplets } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample alerts data
const alerts = [
  {
    id: 1,
    patientId: "P-23891",
    patientName: "Кристиан Лоуп",
    type: "vital",
    parameter: "heart-rate",
    icon: Heart,
    value: "130 уд/мин",
    threshold: "> 120 уд/мин",
    timestamp: "16.03.2025 10:45",
    status: "active",
    severity: "high",
  },
  {
    id: 2,
    patientId: "P-23894",
    patientName: "Елена Смирнова",
    type: "vital",
    parameter: "blood-pressure",
    icon: Activity,
    value: "180/110 мм рт.ст.",
    threshold: "> 160/100 мм рт.ст.",
    timestamp: "16.03.2025 10:30",
    status: "active",
    severity: "high",
  },
  {
    id: 3,
    patientId: "P-23897",
    patientName: "Дмитрий Комаров",
    type: "vital",
    parameter: "oxygen",
    icon: Droplets,
    value: "91%",
    threshold: "< 92%",
    timestamp: "16.03.2025 10:15",
    status: "active",
    severity: "medium",
  },
  {
    id: 4,
    patientId: "P-23892",
    patientName: "Анна Петрова",
    type: "medication",
    parameter: "medication-reminder",
    icon: Bell,
    value: "Пропущен прием лекарства",
    threshold: "Beta-блокаторы 14:00",
    timestamp: "16.03.2025 14:30",
    status: "active",
    severity: "medium",
  },
  {
    id: 5,
    patientId: "P-23895",
    patientName: "Олег Федоров",
    type: "vital",
    parameter: "heart-rate",
    icon: Heart,
    value: "110 уд/мин",
    threshold: "> 100 уд/мин",
    timestamp: "16.03.2025 09:45",
    status: "resolved",
    severity: "low",
  },
]

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [alertsEnabled, setAlertsEnabled] = useState(true)

  // Filter alerts based on search term and filters
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.value.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter

    return matchesSearch && matchesSeverity && matchesStatus
  })

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Критические алерты</h1>
          <Badge className="bg-red-500">{alerts.filter((alert) => alert.status === "active").length}</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="alerts-toggle" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
            <Label htmlFor="alerts-toggle">{alertsEnabled ? "Уведомления включены" : "Уведомления выключены"}</Label>
          </div>
        </div>
      </div>

      <Tabs defaultValue="alerts">
        <TabsList>
          <TabsTrigger value="alerts">Активные алерты</TabsTrigger>
          <TabsTrigger value="settings">Настройки алертов</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Мониторинг состояний пациентов</CardTitle>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Поиск по пациенту, параметру"
                      className="pl-8 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Select value={severityFilter} onValueChange={setSeverityFilter}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Приоритет" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все уровни</SelectItem>
                        <SelectItem value="high">Высокий</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="low">Низкий</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="active">Активные</SelectItem>
                        <SelectItem value="resolved">Решенные</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Приоритет</TableHead>
                      <TableHead>Пациент</TableHead>
                      <TableHead>Показатель</TableHead>
                      <TableHead className="hidden sm:table-cell">Пороговое значение</TableHead>
                      <TableHead className="hidden md:table-cell">Время</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.length > 0 ? (
                      filteredAlerts.map((alert) => (
                        <TableRow key={alert.id} className={alert.status === "resolved" ? "opacity-60" : ""}>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                alert.severity === "high"
                                  ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                  : alert.severity === "medium"
                                    ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                                    : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                              }
                            >
                              {alert.severity === "high"
                                ? "Высокий"
                                : alert.severity === "medium"
                                  ? "Средний"
                                  : "Низкий"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{alert.patientName}</div>
                                <div className="text-xs text-gray-500">{alert.patientId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <alert.icon
                                className={`h-4 w-4 ${
                                  alert.severity === "high"
                                    ? "text-red-500"
                                    : alert.severity === "medium"
                                      ? "text-yellow-500"
                                      : "text-blue-500"
                                }`}
                              />
                              <span>{alert.value}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{alert.threshold}</TableCell>
                          <TableCell className="hidden md:table-cell">{alert.timestamp}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                Просмотр
                              </Button>
                              {alert.status === "active" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                                >
                                  Решено
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          Алерты не найдены
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Настройки пороговых значений</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <Label htmlFor="heart-rate">Частота пульса</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {"<"} 50 или {">"}
                      </span>
                      <Input id="heart-rate" type="number" className="w-16 h-8" defaultValue="120" />
                      <span>уд/мин</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <Label htmlFor="blood-pressure-high">Артериальное давление (высокое)</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{">"}</span>
                      <Input id="blood-pressure-high" type="number" className="w-16 h-8" defaultValue="160" />
                      <span>/</span>
                      <Input id="blood-pressure-high-d" type="number" className="w-16 h-8" defaultValue="100" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <Label htmlFor="blood-pressure-low">Артериальное давление (низкое)</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{"<"}</span>
                      <Input id="blood-pressure-low" type="number" className="w-16 h-8" defaultValue="90" />
                      <span>/</span>
                      <Input id="blood-pressure-low-d" type="number" className="w-16 h-8" defaultValue="60" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-indigo-500" />
                      <Label htmlFor="oxygen">Сатурация кислорода</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{"<"}</span>
                      <Input id="oxygen" type="number" className="w-16 h-8" defaultValue="92" />
                      <span>%</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Сохранить настройки</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push-уведомления</Label>
                      <p className="text-sm text-muted-foreground">Получать уведомления на телефон</p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email уведомления</Label>
                      <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS уведомления</Label>
                      <p className="text-sm text-muted-foreground">Получать уведомления по SMS</p>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="critical-only">Только критические</Label>
                      <p className="text-sm text-muted-foreground">Уведомлять только о критически важных алертах</p>
                    </div>
                    <Switch id="critical-only" />
                  </div>
                </div>

                <Button className="w-full">Сохранить настройки</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

