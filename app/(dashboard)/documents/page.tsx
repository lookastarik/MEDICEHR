"use client"

import { useState } from "react"
import {
  FileText,
  FolderOpen,
  Search,
  Upload,
  Download,
  FolderPlus,
  MoreHorizontal,
  CheckCircle2,
  ClipboardList,
  FileImage,
  AlarmClock,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/components/auth-provider"

// Sample documents data
const documents = [
  {
    id: "doc-001",
    name: "Анализы крови.pdf",
    type: "lab",
    icon: FileText,
    size: "1.2 MB",
    date: "15.03.2025",
    author: "Др. Иванов",
    status: "approved",
  },
  {
    id: "doc-002",
    name: "ЭКГ результаты.pdf",
    type: "exam",
    icon: Activity,
    size: "4.5 MB",
    date: "15.03.2025",
    author: "Др. Петров",
    status: "pending",
  },
  {
    id: "doc-003",
    name: "МРТ головного мозга.jpg",
    type: "imaging",
    icon: FileImage,
    size: "8.3 MB",
    date: "12.03.2025",
    author: "Др. Смирнова",
    status: "approved",
  },
  {
    id: "doc-004",
    name: "План лечения.docx",
    type: "treatment",
    icon: ClipboardList,
    size: "568 KB",
    date: "14.03.2025",
    author: "Др. Иванов",
    status: "approved",
  },
  {
    id: "doc-005",
    name: "График приема лекарств.xlsx",
    type: "prescription",
    icon: AlarmClock,
    size: "320 KB",
    date: "15.03.2025",
    author: "Др. Иванов",
    status: "approved",
  },
]

// Sample folders
const folders = [
  { id: "folder-001", name: "Результаты анализов", documents: 12 },
  { id: "folder-002", name: "История болезни", documents: 8 },
  { id: "folder-003", name: "Визуализация", documents: 15 },
  { id: "folder-004", name: "Рецепты", documents: 5 },
]

export default function DocumentsPage() {
  const { userRole } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTab, setCurrentTab] = useState("all")

  // Filter documents based on search term and current tab
  const filteredDocuments = documents.filter((document) => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = currentTab === "all" || document.type === currentTab
    return matchesSearch && matchesTab
  })

  const canUploadDocuments = userRole === "doctor" || userRole === "admin"

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Документы</h1>
        <div className="flex flex-wrap gap-2">
          {canUploadDocuments && (
            <>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Загрузить документ
              </Button>
              <Button variant="outline" size="sm">
                <FolderPlus className="h-4 w-4 mr-2" />
                Новая папка
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Folders Sidebar */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Папки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <Button variant="ghost" className="w-full justify-start">
              <FolderOpen className="h-4 w-4 mr-2" />
              Все документы
              <Badge className="ml-auto">{documents.length}</Badge>
            </Button>
            {folders.map((folder) => (
              <Button key={folder.id} variant="ghost" className="w-full justify-start">
                <FolderOpen className="h-4 w-4 mr-2" />
                {folder.name}
                <Badge className="ml-auto">{folder.documents}</Badge>
              </Button>
            ))}
            {canUploadDocuments && (
              <Button variant="outline" className="w-full mt-4">
                <FolderPlus className="h-4 w-4 mr-2" />
                Новая папка
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card className="lg:col-span-9">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Документы пациента</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Поиск документов"
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setCurrentTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="lab">Анализы</TabsTrigger>
                <TabsTrigger value="exam">Обследования</TabsTrigger>
                <TabsTrigger value="imaging">Визуализация</TabsTrigger>
                <TabsTrigger value="treatment">Лечение</TabsTrigger>
              </TabsList>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Документ</TableHead>
                      <TableHead className="hidden md:table-cell">Размер</TableHead>
                      <TableHead className="hidden md:table-cell">Дата</TableHead>
                      <TableHead className="hidden md:table-cell">Автор</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <document.icon className="h-5 w-5 text-blue-500" />
                              <span>{document.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{document.size}</TableCell>
                          <TableCell className="hidden md:table-cell">{document.date}</TableCell>
                          <TableCell className="hidden md:table-cell">{document.author}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                document.status === "approved"
                                  ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                                  : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                              }
                            >
                              {document.status === "approved" ? (
                                <div className="flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  <span>Утвержден</span>
                                </div>
                              ) : (
                                "На рассмотрении"
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <span className="sr-only">Меню действий</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Просмотр</DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Скачать
                                </DropdownMenuItem>
                                {canUploadDocuments && (
                                  <>
                                    <DropdownMenuItem>Редактировать</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500 hover:text-red-600">
                                      Удалить
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          Документы не найдены
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

