import React from 'react'
import { useAuthStore } from '../store/authStore'
import { MentorDashboard } from '../components/dashboard/MentorDashboard'
import { MenteeDashboard } from '../components/dashboard/MenteeDashboard'

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore()

  if (!user) return null

  return user.role === 'mentor' ? <MentorDashboard /> : <MenteeDashboard />
}