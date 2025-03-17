"use client"

import { useState } from "react"
import { AlertTriangle, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function CriticalAlerts() {
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [codeBlueMode, setCodeBlueMode] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Критические алерты
          </CardTitle>
          <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Артериальное давление</div>
            <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
              {">"} 180/120 мм рт.ст.
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Сатурация (SpO₂)</div>
            <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
              {"<"} 92%
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Глюкоза</div>
            <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
              {">"} 250 мг/дл или {"<"} 70 мг/дл
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Аритмия</div>
            <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
              Автоопределение
            </Badge>
          </div>
        </div>

        <div className="pt-2 border-t dark:border-gray-700">
          <h4 className="font-medium mb-3">Режим "Код Синий"</h4>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Мгновенный доступ к истории болезни и координация реаниматологов
            </div>
            <Switch checked={codeBlueMode} onCheckedChange={setCodeBlueMode} />
          </div>
          <Button
            variant={codeBlueMode ? "default" : "outline"}
            className={`w-full ${codeBlueMode ? "bg-red-600 hover:bg-red-700" : ""}`}
            disabled={!codeBlueMode}
          >
            <Phone className="h-4 w-4 mr-2" />
            Вызов дежурной бригады
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

