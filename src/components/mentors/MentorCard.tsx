import React from 'react'
import { Star, Clock, Globe } from 'lucide-react'
import { Mentor } from '../../types/mentor'
import { Button } from '../ui/Button'

interface MentorCardProps {
  mentor: Mentor
  onRequestSession?: (mentorId: string) => void
}

export const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  onRequestSession,
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
      <div className="relative h-48">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
          <p className="text-sm text-gray-200">{mentor.title}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{mentor.rating}</span>
            <span className="text-sm text-gray-500">
              ({mentor.totalSessions} sessions)
            </span>
          </div>
          <span className="text-lg font-semibold">${mentor.hourlyRate}/hr</span>
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{mentor.bio}</p>

        <div className="mb-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Available: {mentor.availability.days.join(', ')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Languages: {mentor.languages.join(', ')}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
          <Button
            onClick={() => onRequestSession?.(mentor.id)}
            className="w-full"
          >
            Request Session
          </Button>
        </div>
      </div>
    </div>
  )
}