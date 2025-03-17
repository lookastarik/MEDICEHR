"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Activity, Users, Calendar, FileText, AlertTriangle, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Панель мониторинга",
    href: "/dashboard",
    icon: Activity,
    roles: ["doctor", "nurse", "admin"],
  },
  {
    title: "Пациенты",
    href: "/patients",
    icon: Users,
    roles: ["doctor", "nurse", "admin"],
  },
  {
    title: "Расписание",
    href: "/schedule",
    icon: Calendar,
    roles: ["doctor", "nurse", "admin"],
  },
  {
    title: "Документы",
    href: "/documents",
    icon: FileText,
    roles: ["doctor", "nurse", "admin"],
  },
  {
    title: "Критические алерты",
    href: "/alerts",
    icon: AlertTriangle,
    roles: ["doctor", "nurse", "admin"],
  },
  {
    title: "Настройки",
    href: "/settings",
    icon: Settings,
    roles: ["doctor", "nurse", "admin"],
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  const { userRole, logout } = useAuth()

  // Filter items based on user role
  const filteredItems = sidebarItems.filter((item) => userRole && item.roles.includes(userRole))

  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid gap-1 px-2">
        {filteredItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "justify-start",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        ))}
        <Button
          variant="ghost"
          onClick={logout}
          className="justify-start mt-4 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </Button>
      </nav>
    </div>
  )
}

