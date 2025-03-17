"use client"
import { Activity, Heart, Thermometer, Droplets } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const heartRateData = [
  { time: "08:00", value: 72 },
  { time: "09:00", value: 74 },
  { time: "10:00", value: 78 },
  { time: "11:00", value: 82 },
  { time: "12:00", value: 79 },
  { time: "13:00", value: 76 },
  { time: "14:00", value: 75 },
  { time: "15:00", value: 77 },
  { time: "16:00", value: 80 },
]

const bloodPressureData = [
  { time: "08:00", systolic: 120, diastolic: 80 },
  { time: "09:00", systolic: 122, diastolic: 82 },
  { time: "10:00", systolic: 125, diastolic: 83 },
  { time: "11:00", systolic: 130, diastolic: 85 },
  { time: "12:00", systolic: 128, diastolic: 84 },
  { time: "13:00", systolic: 126, diastolic: 83 },
  { time: "14:00", systolic: 125, diastolic: 82 },
  { time: "15:00", systolic: 127, diastolic: 83 },
  { time: "16:00", systolic: 129, diastolic: 84 },
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

const glucoseData = [
  { time: "08:00", value: 110 },
  { time: "09:00", value: 130 },
  { time: "10:00", value: 145 },
  { time: "11:00", value: 160 },
  { time: "12:00", value: 180 },
  { time: "13:00", value: 195 },
  { time: "14:00", value: 210 },
  { time: "15:00", value: 200 },
  { time: "16:00", value: 190 },
]

export default function VitalSignsWeb() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Жизненные показатели</CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
            Онлайн
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="heart">
          <TabsList className="mb-4">
            <TabsTrigger value="heart">
              <Heart className="h-4 w-4 mr-2" />
              Пульс
            </TabsTrigger>
            <TabsTrigger value="bloodPressure">
              <Activity className="h-4 w-4 mr-2" />
              Давление
            </TabsTrigger>
            <TabsTrigger value="oxygen">
              <Droplets className="h-4 w-4 mr-2" />
              SpO₂
            </TabsTrigger>
            <TabsTrigger value="glucose">
              <Thermometer className="h-4 w-4 mr-2" />
              Глюкоза
            </TabsTrigger>
          </TabsList>

          <TabsContent value="heart">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tickMargin={10} />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                Текущее значение: 78 уд/мин
              </Badge>
              <div className="text-sm text-gray-500 dark:text-gray-400">Порог тревоги: {">"} 100 уд/мин</div>
            </div>
          </TabsContent>

          <TabsContent value="bloodPressure">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tickMargin={10} />
                  <YAxis domain={[60, 140]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="systolic" stroke="#3b82f6" strokeWidth={2} name="Систолическое" />
                  <Line type="monotone" dataKey="diastolic" stroke="#10b981" strokeWidth={2} name="Диастолическое" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                Текущее значение: 125/83 мм рт.ст.
              </Badge>
              <div className="text-sm text-gray-500 dark:text-gray-400">Порог тревоги: {">"} 140/90 мм рт.ст.</div>
            </div>
          </TabsContent>

          <TabsContent value="oxygen">
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
          </TabsContent>

          <TabsContent value="glucose">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={glucoseData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tickMargin={10} />
                  <YAxis domain={[50, 250]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <Badge
                variant="outline"
                className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
              >
                Текущее значение: 190 мг/дл
              </Badge>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Порог тревоги: {">"} 200 мг/дл или {"<"} 70 мг/дл
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

