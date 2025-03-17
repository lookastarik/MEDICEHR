"use client"
import { Brain, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function NervousSystem() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-indigo-500 text-white p-4 rounded-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-xs mb-2">3 случая</div>
            <h3 className="text-2xl font-bold mb-4">Нервная</h3>
            <h3 className="text-2xl font-bold">Система</h3>
          </div>
          <div className="absolute right-0 bottom-0 opacity-50">
            <Brain className="h-32 w-32 text-indigo-300" />
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
          <Tabs defaultValue="mri">
            <TabsList className="mb-4">
              <TabsTrigger value="mri">МРТ</TabsTrigger>
              <TabsTrigger value="ct">КТ</TabsTrigger>
              <TabsTrigger value="cognitive">Когнитивные тесты</TabsTrigger>
            </TabsList>

            <TabsContent value="mri" className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden border dark:border-gray-700">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="МРТ головного мозга"
                  width={400}
                  height={400}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
                  МРТ головного мозга от 12.03.2025
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  Предыдущее
                </Button>
                <Button variant="outline" size="sm">
                  Следующее
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="ct" className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden border dark:border-gray-700">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="КТ головного мозга"
                  width={400}
                  height={400}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
                  КТ головного мозга от 10.03.2025
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  Предыдущее
                </Button>
                <Button variant="outline" size="sm">
                  Следующее
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="cognitive" className="space-y-4">
              <div className="p-4 border rounded-lg dark:border-gray-700">
                <h4 className="font-medium mb-2">Mini-Mental State Exam (MMSE)</h4>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Дата: 14.03.2025</div>
                  <Badge>28/30 баллов</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ориентация</span>
                    <span className="font-medium">10/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Запоминание</span>
                    <span className="font-medium">3/3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Внимание и счет</span>
                    <span className="font-medium">4/5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Воспроизведение</span>
                    <span className="font-medium">2/3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Речь</span>
                    <span className="font-medium">9/9</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  Полный отчет
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium">Неврологические состояния</h4>

        <div className="p-3 rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h5 className="font-medium">Транзиторная амнезия</h5>
            <Badge>Последний эпизод</Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Дата: 05.03.2025, продолжительность: 45 минут</p>
        </div>

        <div className="p-3 rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h5 className="font-medium">Атеросклероз сосудов головного мозга</h5>
            <Badge variant="outline">Хроническое</Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Степень: умеренная, последнее обследование: 12.03.2025
          </p>
        </div>

        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Добавить состояние
        </Button>
      </div>
    </div>
  )
}

