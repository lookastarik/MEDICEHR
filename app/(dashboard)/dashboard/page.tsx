import { Activity, Heart, Brain, TreesIcon as Lungs, ChevronDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import PatientCard from "@/components/patient-card"
import VitalSigns from "@/components/vital-signs/vital-signs-web"
import BloodCirculatorySystem from "@/components/blood-circulatory-system"
import NervousSystem from "@/components/nervous-system"
import RespiratorySystem from "@/components/respiratory-system"
import PatientTimeline from "@/components/patient-timeline"
import CriticalAlerts from "@/components/critical-alerts"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Left Column - Patient Card */}
      <div className="col-span-12 lg:col-span-3 space-y-4">
        <PatientCard />
        <VitalSigns />
        <CriticalAlerts />
      </div>

      {/* Middle Column - Analytics */}
      <div className="col-span-12 lg:col-span-6 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Обзор пациента</CardTitle>
                <CardDescription>Аналитическая панель состояния здоровья</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-auto hidden sm:flex">
                    Статус <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Все</DropdownMenuItem>
                  <DropdownMenuItem>Стабильные</DropdownMenuItem>
                  <DropdownMenuItem>Критические</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="circulatory">
              <TabsList className="mb-4 w-full overflow-x-auto flex flex-nowrap">
                <TabsTrigger value="circulatory" className="flex-shrink-0">
                  <Heart className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Кровеносная</span>
                  <span className="sm:hidden">Кров.</span>
                </TabsTrigger>
                <TabsTrigger value="nervous" className="flex-shrink-0">
                  <Brain className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Нервная</span>
                  <span className="sm:hidden">Нерв.</span>
                </TabsTrigger>
                <TabsTrigger value="respiratory" className="flex-shrink-0">
                  <Lungs className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Дыхательная</span>
                  <span className="sm:hidden">Дых.</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="circulatory">
                <BloodCirculatorySystem />
              </TabsContent>

              <TabsContent value="nervous">
                <NervousSystem />
              </TabsContent>

              <TabsContent value="respiratory">
                <RespiratorySystem />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>AI-рекомендации</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                Обновлено 5 мин. назад
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
              <div className="flex gap-2 mb-2">
                <Activity className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Рекомендация по лечению</h4>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Повысить дозу инсулина при глюкозе {">"} 200 мг/дл. Последнее измерение: 210 мг/дл (15 мин. назад).
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
      <div className="col-span-12 lg:col-span-3">
        <PatientTimeline />
      </div>
    </div>
  )
}

