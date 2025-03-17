"use client"

import { useState } from "react"
import { format, addDays, startOfWeek, isSameDay } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample appointment data
const appointments = [
  {
    id: 1,
    patientName: "Кристиан Лоуп",
    patientId: "P-23891",
    doctorName: "Др. Иванов",
    type: "Осмотр",
    date: new Date(2025, 2, 16, 10, 30), // March 16, 2025, 10:30 AM
    duration: 30, // in minutes
    status: "confirmed",
    room: "304",
  },
  {
    id: 2,
    patientName: "Анна Петрова",
    patientId: "P-23892",
    doctorName: "Др. Смирнова",
    type: "Консультация",
    date: new Date(2025, 2, 16, 14, 0), // March 16, 2025, 2:00 PM
    duration: 45,
    status: "confirmed",
    room: "212",
  },
  {
    id: 3,
    patientName: "Сергей Иванов",
    patientId: "P-23893",
    doctorName: "Др. Петров",
    type: "Процедура",
    date: new Date(2025, 2, 17, 11, 15), // March 17, 2025, 11:15 AM
    duration: 60,
    status: "confirmed",
    room: "115",
  },
  {
    id: 4,
    patientName: "Елена Смирнова",
    patientId: "P-23894",
    doctorName: "Др. Иванов",
    type: "Осмотр",
    date: new Date(2025, 2, 17, 9, 0), // March 17, 2025, 9:00 AM
    duration: 30,
    status: "confirmed",
    room: "201",
  },
  {
    id: 5,
    patientName: "Олег Федоров",
    patientId: "P-23895",
    doctorName: "Др. Козлова",
    type: "Консультация",
    date: new Date(2025, 2, 18, 15, 30), // March 18, 2025, 3:30 PM
    duration: 45,
    status: "pending",
    room: "324",
  },
]

export default function SchedulePage() {
  const { userRole } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 2, 16)) // March 16, 2025
  const [selectedView, setSelectedView] = useState("day")
  const [calendarOpen, setCalendarOpen] = useState(false)

  // Get dates for the week view
  const startDate = startOfWeek(selectedDate || new Date(), { weekStartsOn: 1 }) // Start from Monday
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

  // Filter appointments based on selected date and view
  const filteredAppointments = appointments.filter((appointment) => {
    if (selectedView === "day" && selectedDate) {
      return isSameDay(appointment.date, selectedDate)
    }
    // For week view, we would filter based on the week's range
    return true
  })

  const isDoctorOrAdmin = userRole === "doctor" || userRole === "admin"

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Расписание</h1>
        <div className="flex gap-2">
          {isDoctorOrAdmin && (
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Новая запись
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar with Calendar */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader className="pb-3">
            <CardTitle>Календарь</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              locale={ru}
            />

            <div>
              <div className="space-y-2 mt-4">
                <h3 className="font-medium text-sm">Статусы записей</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Подтверждено</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Ожидание</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Отменено</span>
                  </div>
                </div>
              </div>

              {isDoctorOrAdmin && (
                <div className="space-y-2 mt-4">
                  <h3 className="font-medium text-sm">Фильтры</h3>
                  <Select defaultValue="all-patients">
                    <SelectTrigger>
                      <SelectValue placeholder="Пациенты" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-patients">Все пациенты</SelectItem>
                      <SelectItem value="critical">Критические</SelectItem>
                      <SelectItem value="regular">Регулярные</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="all-types">
                    <SelectTrigger>
                      <SelectValue placeholder="Типы приемов" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">Все типы</SelectItem>
                      <SelectItem value="exam">Осмотры</SelectItem>
                      <SelectItem value="consult">Консультации</SelectItem>
                      <SelectItem value="procedure">Процедуры</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Schedule Content */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal w-[260px]">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: ru }) : <span>Выберите дату</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      setCalendarOpen(false)
                    }}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>

              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (selectedDate) {
                      setSelectedDate(addDays(selectedDate, -1))
                    }
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (selectedDate) {
                      setSelectedDate(addDays(selectedDate, 1))
                    }
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs
              defaultValue="day"
              value={selectedView}
              onValueChange={setSelectedView}
              className="w-[260px] sm:w-auto"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="day">День</TabsTrigger>
                <TabsTrigger value="week">Неделя</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="day" className="mt-0">
              <div className="space-y-4">
                <div className="text-center my-4">
                  <h2 className="text-xl font-medium">
                    {selectedDate ? format(selectedDate, "EEEE, d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                  </h2>
                </div>

                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-32">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{format(appointment.date, "HH:mm")}</span>
                          <span className="text-sm text-gray-500">({appointment.duration} мин.)</span>
                        </div>

                        <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt={appointment.patientName} />
                              <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{appointment.patientName}</p>
                              <p className="text-sm text-gray-500">{appointment.patientId}</p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0 sm:ml-auto">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                            >
                              {appointment.type}
                            </Badge>

                            <span className="text-sm">
                              Кабинет: <span className="font-medium">{appointment.room}</span>
                            </span>

                            <Badge
                              variant="outline"
                              className={
                                appointment.status === "confirmed"
                                  ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                                  : appointment.status === "pending"
                                    ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                                    : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                              }
                            >
                              {appointment.status === "confirmed" ? "Подтверждено" : "Ожидание"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">Нет записей на этот день</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="week" className="mt-0">
              <div className="space-y-4">
                <div className="text-center my-4">
                  <h2 className="text-xl font-medium">
                    {format(weekDates[0], "d MMMM", { locale: ru })} -{" "}
                    {format(weekDates[6], "d MMMM yyyy", { locale: ru })}
                  </h2>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {weekDates.map((date, index) => (
                    <div key={index} className="text-center">
                      <div className="font-medium mb-1">{format(date, "EEE", { locale: ru })}</div>
                      <Button
                        variant={isSameDay(date, selectedDate || new Date()) ? "default" : "outline"}
                        className="w-10 h-10 p-0 rounded-full"
                        onClick={() => setSelectedDate(date)}
                      >
                        {format(date, "d")}
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Here would go the week view calendar with slots */}
                <div className="text-center py-10 text-gray-500">
                  Недельный вид будет доступен в следующем обновлении
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

