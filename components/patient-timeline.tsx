"use client"

import { useState } from "react"
import { Calendar, FileText, Activity, Heart, Brain, TreesIcon as Lungs, ChevronDown, Plus, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const timelineEvents = [
  {
    id: 1,
    date: "15.03.2025",
    type: "hospitalization",
    title: "Госпитализация",
    description: "Поступление в кардиологическое отделение",
    icon: Heart,
  },
  {
    id: 2,
    date: "15.03.2025",
    type: "lab",
    title: "Анализы крови",
    description: "Общий анализ, биохимия, липидный профиль",
    icon: FileText,
  },
  {
    id: 3,
    date: "15.03.2025",
    type: "imaging",
    title: "ЭКГ",
    description: "Синусовый ритм, ЧСС 80 уд/мин",
    icon: Activity,
  },
  {
    id: 4,
    date: "16.03.2025",
    type: "imaging",
    title: "ЭхоКГ",
    description: "ФВ 52%, умеренная гипертрофия ЛЖ",
    icon: Heart,
  },
  {
    id: 5,
    date: "16.03.2025",
    type: "consultation",
    title: "Консультация кардиолога",
    description: "Др. Иванов И.И.",
    icon: FileText,
  },
  {
    id: 6,
    date: "17.03.2025",
    type: "imaging",
    title: "МРТ головного мозга",
    description: "Без патологических изменений",
    icon: Brain,
  },
  {
    id: 7,
    date: "17.03.2025",
    type: "lab",
    title: "Спирометрия",
    description: "Умеренная обструкция",
    icon: Lungs,
  },
]

export default function PatientTimeline() {
  const [filter, setFilter] = useState("all")

  const filteredEvents = filter === "all" ? timelineEvents : timelineEvents.filter((event) => event.type === filter)

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Хронология событий</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                {filter === "all"
                  ? "Все события"
                  : filter === "lab"
                    ? "Лаборатория"
                    : filter === "imaging"
                      ? "Визуализация"
                      : filter === "consultation"
                        ? "Консультации"
                        : filter === "hospitalization"
                          ? "Госпитализация"
                          : "Фильтр"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter("all")}>Все события</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("lab")}>Лаборатория</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("imaging")}>Визуализация</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("consultation")}>Консультации</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("hospitalization")}>Госпитализация</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 border-l border-dashed dark:border-gray-700"></div>
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="flex gap-4 relative">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 z-10">
                  <event.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 pt-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.date}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Календарь
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

