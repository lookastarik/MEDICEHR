// Клиент для работы с FHIR API
// FHIR (Fast Healthcare Interoperability Resources) - стандарт обмена медицинскими данными

export interface FHIRResource {
  resourceType: string
  id?: string
  [key: string]: any
}

export interface FHIRPatient extends FHIRResource {
  resourceType: "Patient"
  name?: Array<{
    family?: string
    given?: string[]
    text?: string
  }>
  birthDate?: string
  gender?: "male" | "female" | "other" | "unknown"
  identifier?: Array<{
    system?: string
    value?: string
  }>
}

export interface FHIRObservation extends FHIRResource {
  resourceType: "Observation"
  status: "registered" | "preliminary" | "final" | "amended"
  code: {
    coding: Array<{
      system: string
      code: string
      display?: string
    }>
  }
  subject: {
    reference: string
  }
  effectiveDateTime?: string
  valueQuantity?: {
    value: number
    unit: string
    system?: string
    code?: string
  }
}

export class FHIRClient {
  private baseUrl: string
  private headers: HeadersInit

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl
    this.headers = {
      "Content-Type": "application/fhir+json",
      Accept: "application/fhir+json",
    }

    if (token) {
      this.headers["Authorization"] = `Bearer ${token}`
    }
  }

  // Получение пациента по ID
  async getPatient(id: string): Promise<FHIRPatient> {
    return this.getResource(`Patient/${id}`)
  }

  // Поиск пациентов
  async searchPatients(params: Record<string, string>): Promise<FHIRPatient[]> {
    const searchParams = new URLSearchParams(params)
    const response = await this.getResource(`Patient?${searchParams.toString()}`)

    if (response.resourceType === "Bundle" && response.entry) {
      return response.entry
        .filter((entry) => entry.resource && entry.resource.resourceType === "Patient")
        .map((entry) => entry.resource)
    }

    return []
  }

  // Получение наблюдений (показателей) для пациента
  async getPatientObservations(patientId: string, code?: string): Promise<FHIRObservation[]> {
    let url = `Observation?subject=Patient/${patientId}`
    if (code) {
      url += `&code=${code}`
    }

    const response = await this.getResource(url)

    if (response.resourceType === "Bundle" && response.entry) {
      return response.entry
        .filter((entry) => entry.resource && entry.resource.resourceType === "Observation")
        .map((entry) => entry.resource)
    }

    return []
  }

  // Создание нового ресурса
  async createResource<T extends FHIRResource>(resource: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${resource.resourceType}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(resource),
    })

    if (!response.ok) {
      throw new Error(`Ошибка при создании ресурса: ${response.statusText}`)
    }

    return response.json()
  }

  // Обновление ресурса
  async updateResource<T extends FHIRResource>(resource: T): Promise<T> {
    if (!resource.id) {
      throw new Error("Ресурс должен иметь ID для обновления")
    }

    const response = await fetch(`${this.baseUrl}/${resource.resourceType}/${resource.id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(resource),
    })

    if (!response.ok) {
      throw new Error(`Ошибка при обновлении ресурса: ${response.statusText}`)
    }

    return response.json()
  }

  // Получение ресурса по URL
  private async getResource(url: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: this.headers,
    })

    if (!response.ok) {
      throw new Error(`Ошибка при получении ресурса: ${response.statusText}`)
    }

    return response.json()
  }
}

