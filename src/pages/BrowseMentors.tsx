import React, { useState } from 'react'
import { MentorCard } from '../components/mentors/MentorCard'
import { MentorFilter } from '../components/mentors/MentorFilter'
import { MentorFilter as MentorFilterType } from '../types/mentor'
import { mentors } from '../data/mentors'

export const BrowseMentors: React.FC = () => {
  const [filters, setFilters] = useState<MentorFilterType>({})

  const handleFilterChange = (newFilters: MentorFilterType) => {
    setFilters(newFilters)
    console.log('Applying filters:', newFilters)
  }

  const handleRequestSession = (mentorId: string) => {
    console.log('Requesting session with mentor:', mentorId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-3xl font-bold">Find Your Mentor</h1>
        
        <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
          <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
            <MentorFilter filters={filters} onFilterChange={handleFilterChange} />
          </aside>
          
          <main className="grid gap-6 md:grid-cols-2">
            {mentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onRequestSession={handleRequestSession}
              />
            ))}
          </main>
        </div>
      </div>
    </div>
  )
}