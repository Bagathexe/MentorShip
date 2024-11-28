export type GoalStatus = 'pending' | 'in-progress' | 'completed'
export type GoalPriority = 'low' | 'medium' | 'high'

export interface Goal {
  id: string
  userId: string
  title: string
  description?: string
  status: GoalStatus
  priority: GoalPriority
  dueDate?: string
  createdAt: string
  completedAt?: string
}