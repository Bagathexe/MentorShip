export interface Mentor {
  id: string
  name: string
  title: string
  expertise: string[]
  bio: string
  rating: number
  availability: {
    days: string[]
    hours: string[]
  }
  avatar: string
  hourlyRate: number
  totalSessions: number
  languages: string[]
}

export interface MentorFilter {
  expertise?: string[]
  languages?: string[]
  availability?: string[]
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
}