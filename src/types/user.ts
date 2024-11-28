export type UserRole = 'mentor' | 'mentee'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  bio?: string
  expertise?: string[]
  avatar?: string
}

export interface MentorshipRequest {
  id: string
  mentorId: string
  menteeId: string
  status: 'pending' | 'accepted' | 'rejected'
  message: string
  createdAt: Date
}