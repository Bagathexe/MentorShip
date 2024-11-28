import React from 'react'
import { GoalTracker } from './GoalTracker'
import { SessionScheduler } from './SessionScheduler'
import { MentorList } from './MentorList'

export const MenteeDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <GoalTracker />
            <MentorList />
          </div>
          <SessionScheduler />
        </div>
      </div>
    </div>
  )
}