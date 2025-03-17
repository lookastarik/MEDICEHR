"use client"

import { useState } from "react"
import { DownloadIcon, PlusIcon, SearchIcon, SlidersHorizontal, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"

// Sample patients data
const patients = [
  {
    id: "P-23891",
    name: "Кристиан Лоуп",
    age: 30,
    gender: "Муж.",
    diagnosis: "Коронарная болезнь",
    doctor: "Др. Иванов",
    status: "critical",
    lastVisit: "15.03.2025",
    room: "304",
  },
  {
    id: "P-23892",
    name: "Анна Петрова",
    age: 45,
    gender: "Жен.",
    diagnosis: "Гипертония",
    doctor: "Др. Смирнова",
    status: "stable",
    lastVisit: "14.03.2025",
    room: "212",
  },
  {
    id: "P-23893",
    name: "Сергей Иванов",
    age: 52,
    gender: "Муж.",
    diagnosis: "Диабет II типа",
    doctor: "Др. Петров",
    status: "stable",
    lastVisit: "13.03.2025",
    room: "115",
  },
  {
    id: "P-23894",
    name: "Елена Смирнова",
    age: 67,
    gender: "Жен.",
    diagnosis: "ХОБЛ",
    doctor: "Др. Иванов",
    status: "warning",
    lastVisit: "12.03.2025",
    room: "201",
  },
  {
    id: "P-23895",
    name: "Олег Федоров",
    age: 58,
    gender: "Муж.",
    diagnosis: "Инсульт (реабилитация)",
    doctor: "Др. Козлова",
    status: "stable",
    lastVisit: "11.03.2025",
    room: "324",
  },
  {
    id: "P-23896",
    name: "Наталья Кузнецова",
    age: 34,
    gender: "Жен.",
    diagnosis: "Бронхиальная астма",
    doctor: "Др. Петров",
    status: "warning",
    lastVisit: "10.03.2025",
    room: "105",
  },
  {
    id: "P-23897",
    name: "Дмитрий Комаров",
    age: 41,
    gender: "Муж.",
    diagnosis: "Пневмония",
    doctor: "Др. Смирнова",
    status: "critical",
    lastVisit: "09.03.2025",
    room: "316",
  },
]

export default function PatientsPage() {
  const { userRole } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Filter patients based on search term and filters
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || patient.status === statusFilter

    // For this demo, we're not filtering by department
    return matchesSearch && matchesStatus
  })

  // Determine if user can add/edit patients based on role
  const canManagePatients = userRole === "doctor" || userRole === "admin"

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Пациенты</h1>
        <div className="flex flex-wrap gap-2">
          {canManagePatients && (
            <Button size="sm">
              <PlusIcon className="h-4 w-4 mr-2" />
              Добавить пациента
            </Button>
          )}
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Список пациентов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Поиск по имени, ID или диагнозу"
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="stable">Стабильные</SelectItem>
                    <SelectItem value="warning">Требуют внимания</SelectItem>
                    <SelectItem value="critical">Критические</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Отделение" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все отделения</SelectItem>
                    <SelectItem value="cardiology">Кардиология</SelectItem>
                    <SelectItem value="neurology">Неврология</SelectItem>
                    <SelectItem value="pulmonology">Пульмонология</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Пациент</TableHead>
                  <TableHead className="hidden md:table-cell">Возраст</TableHead>
                  <TableHead className="hidden md:table-cell">Пол</TableHead>
                  <TableHead>Диагноз</TableHead>
                  <TableHead className="hidden lg:table-cell">Врач</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="hidden lg:table-cell">Палата</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <span>{patient.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{patient.age}</TableCell>
                      <TableCell className="hidden md:table-cell">{patient.gender}</TableCell>
                      <TableCell>{patient.diagnosis}</TableCell>
                      <TableCell className="hidden lg:table-cell">{patient.doctor}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            patient.status === "stable"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                              : patient.status === "warning"
                                ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                                : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                          }
                        >
                          {patient.status === "stable"
                            ? "Стабильный"
                            : patient.status === "warning"
                              ? "Наблюдение"
                              : "Критический"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{patient.room}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Меню действий</span>
                              <SlidersHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Просмотр карты</DropdownMenuItem>
                            <DropdownMenuItem>Назначить прием</DropdownMenuItem>
                            {canManagePatients && <DropdownMenuItem>Редактировать</DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                      Пациенты не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

