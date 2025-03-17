"use client"

import { useState } from "react"
import { ExternalLink, Plus, FileText, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts"

const riskFactorData = [
  { name: "Возраст", value: 65 },
  { name: "Холестерин", value: 78 },
  { name: "Давление", value: 82 },
  { name: "Курение", value: 40 },
  { name: "Диабет", value: 75 },
]

export default function BloodCirculatorySystem() {
  const [activeCondition, setActiveCondition] = useState("cad")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-xs mb-2">2 случая</div>
            <h3 className="text-2xl font-bold mb-4">Кровеносная</h3>
            <h3 className="text-2xl font-bold">Система</h3>
          </div>
          <div className="absolute right-0 bottom-0 opacity-50">
            <Heart className="h-32 w-32 text-blue-300" />
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

        <div
          className={`${activeCondition === "cad" ? "bg-gray-800" : "bg-gray-100 dark:bg-gray-800"} text-white p-4 rounded-lg relative overflow-hidden cursor-pointer`}
          onClick={() => setActiveCondition("cad")}
        >
          <div className="flex justify-between mb-2">
            <div className="text-xs text-gray-400">Период рецессии</div>
            <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          <h3 className="text-xl font-bold">Коронарная</h3>
          <h3 className="text-xl font-bold">Болезнь</h3>
          <h3 className="text-xl font-bold">Сердца</h3>

          <div className="text-xs text-gray-400 mt-2">19 маркеров</div>

          <Button
            size="icon"
            variant="outline"
            className="absolute bottom-4 right-4 rounded-full bg-white/10 border-0 h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Прогноз риска инфаркта</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskFactorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <Badge
              variant="outline"
              className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
            >
              Средний риск (32%)
            </Badge>
            <Button variant="outline" size="sm">
              Подробный анализ
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Связанные состояния</h4>
          <div className="space-y-3">
            <div
              className={`p-3 rounded-lg border ${activeCondition === "tachycardia" ? "bg-gray-100 dark:bg-gray-800 border-blue-500" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"} cursor-pointer`}
              onClick={() => setActiveCondition("tachycardia")}
            >
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Узловая тахикардия</h5>
                <Badge>Активно</Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Последний эпизод: 14.03.2025</p>
            </div>

            <div
              className={`p-3 rounded-lg border ${activeCondition === "aneurysm" ? "bg-gray-100 dark:bg-gray-800 border-blue-500" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"} cursor-pointer`}
              onClick={() => setActiveCondition("aneurysm")}
            >
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Сосудистая аневризма</h5>
                <Badge variant="outline">Мониторинг</Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Последнее обследование: 10.03.2025</p>
            </div>

            <div
              className={`p-3 rounded-lg border ${activeCondition === "atherosclerosis" ? "bg-gray-100 dark:bg-gray-800 border-blue-500" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"} cursor-pointer`}
              onClick={() => setActiveCondition("atherosclerosis")}
            >
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Атеросклероз</h5>
                <Badge variant="outline">Хроническое</Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Степень: умеренная</p>
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

