// Система ролевого доступа (Role-Based Access Control)

// Определение возможных ролей
export type Role = "admin" | "doctor" | "nurse" | "patient"

// Определение возможных разрешений
export type Permission =
  | "view:patient"
  | "edit:patient"
  | "delete:patient"
  | "view:medical_record"
  | "edit:medical_record"
  | "view:vitals"
  | "edit:vitals"
  | "view:schedule"
  | "edit:schedule"
  | "view:documents"
  | "upload:documents"
  | "delete:documents"
  | "view:alerts"
  | "manage:alerts"
  | "view:settings"
  | "edit:settings"
  | "manage:users"
  | "manage:system"

// Карта разрешений для каждой роли
const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    "view:patient",
    "edit:patient",
    "delete:patient",
    "view:medical_record",
    "edit:medical_record",
    "view:vitals",
    "edit:vitals",
    "view:schedule",
    "edit:schedule",
    "view:documents",
    "upload:documents",
    "delete:documents",
    "view:alerts",
    "manage:alerts",
    "view:settings",
    "edit:settings",
    "manage:users",
    "manage:system",
  ],
  doctor: [
    "view:patient",
    "edit:patient",
    "view:medical_record",
    "edit:medical_record",
    "view:vitals",
    "edit:vitals",
    "view:schedule",
    "edit:schedule",
    "view:documents",
    "upload:documents",
    "view:alerts",
    "manage:alerts",
    "view:settings",
    "edit:settings",
  ],
  nurse: [
    "view:patient",
    "view:medical_record",
    "edit:medical_record",
    "view:vitals",
    "edit:vitals",
    "view:schedule",
    "view:documents",
    "upload:documents",
    "view:alerts",
    "view:settings",
  ],
  patient: ["view:patient", "view:medical_record", "view:vitals", "view:schedule", "view:documents", "view:settings"],
}

// Класс для проверки разрешений
export class RBACService {
  // Проверка наличия разрешения у роли
  static hasPermission(role: Role, permission: Permission): boolean {
    return rolePermissions[role]?.includes(permission) || false
  }

  // Проверка наличия всех указанных разрешений у роли
  static hasAllPermissions(role: Role, permissions: Permission[]): boolean {
    return permissions.every((permission) => this.hasPermission(role, permission))
  }

  // Проверка наличия хотя бы одного из указанных разрешений у роли
  static hasAnyPermission(role: Role, permissions: Permission[]): boolean {
    return permissions.some((permission) => this.hasPermission(role, permission))
  }

  // Получение всех разрешений для роли
  static getPermissionsForRole(role: Role): Permission[] {
    return [...rolePermissions[role]]
  }
}

