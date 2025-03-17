"use client"
import { TreesIcon as Lungs, FileText, Plus, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const spirometryData = [
  { name: "FVC", value: 85, normal: "≥80%" },
  { name: "FEV1", value: 72, normal: "≥80%" },
  { name: "FEV1/FVC", value: 68, normal: "≥70%" },
  { name: "PEF", value: 65, normal: "≥80%" },
]

const oxygenData = [
  { time: "08:00", value: 98 },
  { time: "09:00", value: 97 },
  { time: "10:00", value: 98 },
  { time: "11:00", value: 96 },
  { time: "12:00", value: 97 },
  { time: "13:00", value: 98 },
  { time: "14:00", value: 97 },
  { time: "15:00", value: 96 },
  { time: "16:00", value: 97 },
]

export default function RespiratorySystem() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-500 text-white p-4 rounded-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-xs mb-2">2 случая</div>
            <h3 className="text-2xl font-bold mb-4">Дыхательная</h3>
            <h3 className="text-2xl font-bold">Система</h3>
          </div>
          <div className="absolute right-0 bottom-0 opacity-50">
            <Lungs className="h-32 w-32 text-emerald-300" />
          </div>

          <div className="absolute bottom-4 left-4 flex space-x-2">
            <Button size="icon" variant="outline" className="rounded-full bg-white/20 border-0 h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full bg-white/20 border-0 h-8 w-8">
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border dark:border-gray-700">
          <h4 className="font-medium mb-4">Спирометрия (% от должного)</h4>
          <div className="space-y-4">
            {spirometryData.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <span>{item.name}</span>
                    {item.value < 80 && item.name !== "FEV1/FVC" && (
                      <AlertTriangle className="h-4 w-4 text-amber-500 ml-1" />
                    )}
                    {item.value < 70 && item.name === "FEV1/FVC" && (
                      <AlertTriangle className="h-4 w-4 text-amber-500 ml-1" />
                    )}
                  </div>
                  <div>
                    <span className="font-medium">{item.value}%</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">{item.normal}</span>
                  </div>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
            <div className="pt-2 text-sm text-gray-500 dark:text-gray-400">
              Заключение: Умеренная обструкция дыхательных путей
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Сатурация кислорода (SpO₂)</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={oxygenData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" tickMargin={10} />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
              Текущее значение: 97%
            </Badge>
            <div className="text-sm text-gray-500 dark:text-gray-400">Порог тревоги: {"<"} 92%</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Респираторные состояния</h4>
          <div className="space-y-3">
            <div className="p-3 rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Бронхиальная астма</h5>
                <Badge variant="outline">Контролируемая</Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Последнее обострение: 15.01.2025</p>
            </div>

            <div className="p-3 rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Постковидный синдром</h5>
                <Badge variant="outline">Наблюдение</Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">COVID-19: 11.2024, остаточные явления</p>
            </div>

            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Добавить состояние
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

