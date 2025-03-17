"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/components/auth-provider"
import { type Permission, RBACService } from "@/lib/auth/rbac"

interface PermissionGateProps {
  children: ReactNode
  permissions: Permission | Permission[]
  fallback?: ReactNode
  requireAll?: boolean
}

// Компонент для условного рендеринга на основе разрешений пользователя
export function PermissionGate({ children, permissions, fallback = null, requireAll = true }: PermissionGateProps) {
  const { userRole } = useAuth()

  if (!userRole) return fallback

  const permissionsArray = Array.isArray(permissions) ? permissions : [permissions]

  const hasAccess = requireAll
    ? RBACService.hasAllPermissions(userRole, permissionsArray)
    : RBACService.hasAnyPermission(userRole, permissionsArray)

  return hasAccess ? <>{children}</> : <>{fallback}</>
}

