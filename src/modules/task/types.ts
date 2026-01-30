export interface Task {
  description?: string
  expiredDate?: Date
  id: string
  priority: 'HIGH' | 'LOW' | 'MEDIUM'
  status: 'DONE' | 'IN_PROGRESS' | 'TODO'
  tags: string[]
  title: string
}
