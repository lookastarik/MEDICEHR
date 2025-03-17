import { ExternalLink, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function PatientCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Карта пациента</CardTitle>
          <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Фото пациента" />
            <AvatarFallback>КЛ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Кристиан Лоуп</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">30 лет, муж.</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                Коронарная болезнь
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="text-gray-500 dark:text-gray-400">ID пациента</div>
            <div className="font-medium">P-23891</div>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="text-gray-500 dark:text-gray-400">Госпитализация</div>
            <div className="font-medium">15.03.2025</div>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="text-gray-500 dark:text-gray-400">Группа крови</div>
            <div className="font-medium">A+ (II)</div>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="text-gray-500 dark:text-gray-400">Лечащий врач</div>
            <div className="font-medium">Др. Иванов</div>
          </div>
        </div>

        <div className="border-t pt-3 dark:border-gray-700">
          <h4 className="font-medium mb-2">Аллергии</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span>Пенициллин IV</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span>Контрастное вещество</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span>Красители</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

