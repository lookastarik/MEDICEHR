"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Search, Bell, ChevronDown, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { useAuth } from "@/components/auth-provider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { userRole } = useAuth()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  if (!mounted) return null

  // Get display name based on role
  const getRoleDisplay = () => {
    switch (userRole) {
      case "doctor":
        return "Врач"
      case "nurse":
        return "Медсестра"
      case "admin":
        return "Администратор"
      default:
        return ""
    }
  }

  // Get initials for avatar
  const getInitials = () => {
    switch (userRole) {
      case "doctor":
        return "ВР"
      case "nurse":
        return "МС"
      case "admin":
        return "АД"
      default:
        return ""
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="flex h-14 items-center px-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold">MedEHR</h1>
        </div>
        <SidebarNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="flex h-14 items-center px-4 gap-4">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <div className="flex h-14 items-center px-4 border-b dark:border-gray-700">
                    <h1 className="text-xl font-bold">MedEHR</h1>
                  </div>
                  <SidebarNav />
                </SheetContent>
              </Sheet>
            )}

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Поиск пациентов по имени, ID, диагнозу..."
                className="pl-8 bg-gray-50 dark:bg-gray-950"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 hidden sm:flex">
                  Отделение: Кардиология
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Кардиология</DropdownMenuItem>
                <DropdownMenuItem>Неврология</DropdownMenuItem>
                <DropdownMenuItem>Пульмонология</DropdownMenuItem>
                <DropdownMenuItem>Хирургия</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Аватар" />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline-block">{getRoleDisplay()}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Профиль</DropdownMenuItem>
                <DropdownMenuItem>Настройки</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Dashboard */}
        <main>{children}</main>
      </div>
    </div>
  )
}

