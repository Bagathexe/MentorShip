import React from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useConnectionStore } from '../../store/connectionStore'
import { mentors } from '../../data/mentors'
import { Button } from '../ui/Button'

export const MentorList: React.FC = () => {
  const { user } = useAuthStore()
  const { connections } = useConnectionStore()

  const connectedMentors = connections
    .filter(
      (connection) =>
        connection.menteeId === user?.id && connection.status === 'accepted'
    )
    .map((connection) =>
      mentors.find((mentor) => mentor.id === connection.mentorId)
    )
    .filter((mentor): mentor is NonNullable<typeof mentor> => mentor != null)

  if (connectedMentors.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">My Mentors</h2>
        <div className="text-center">
          <p className="mb-4 text-gray-600">
            You haven't connected with any mentors yet.
          </p>
          <Link to="/network">
            <Button>Find Mentors</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold">My Mentors</h2>
      <div className="space-y-4">
        {connectedMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.title}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link to={`/chat/${mentor.id}`}>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}