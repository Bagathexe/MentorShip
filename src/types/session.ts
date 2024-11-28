export type SessionStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface Session {
  id: string
  mentorId: string
  menteeId: string
  date: string
  startTime: string
  endTime: string
  status: SessionStatus
  topic: string
  notes?: string
}