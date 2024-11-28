import React from 'react'
import { GoalTracker } from './GoalTracker'
import { SessionScheduler } from './SessionScheduler'
import { MenteeList } from './MenteeList'

export const MentorDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <GoalTracker />
            <MenteeList />
          </div>
          <SessionScheduler />
        </div>
      </div>
    </div>
  )
}