"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, LogIn } from "lucide-react"

export default function PreviewPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("doctor")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login process
    setTimeout(() => {
      // Store role in localStorage for role-based UI
      localStorage.setItem("userRole", role)
      localStorage.setItem("isLoggedIn", "true")

      // Redirect to dashboard
      router.push("/dashboard")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">MedEHR</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">Демонстрационный режим</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Вход в систему</CardTitle>
          <CardDescription className="text-center">Выберите роль для входа в демонстрационный режим</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@medehr.example.com"
                defaultValue="demo@medehr.example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  defaultValue="demo1234"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">Показать/скрыть пароль</span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Роль для демонстрации</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Врач</SelectItem>
                  <SelectItem value="nurse">Медсестра</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                  <SelectItem value="patient">Пациент</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Выбранная роль определяет доступные функции и интерфейс системы
              </p>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    Вход...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Войти в демо-режим
                  </div>
                )}
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
              <p>Это демонстрационная версия системы MedEHR.</p>
              <p>Все данные являются тестовыми и будут сброшены при выходе.</p>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

