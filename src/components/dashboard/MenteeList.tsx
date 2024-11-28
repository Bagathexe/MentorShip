import React from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, UserCheck, UserX } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useConnectionStore } from '../../store/connectionStore'
import { Button } from '../ui/Button'
import { mentors } from '../../data/mentors'

export const MenteeList: React.FC = () => {
  const { user } = useAuthStore()
  const { connections, acceptRequest, declineRequest } = useConnectionStore()

  const pendingRequests = connections.filter(
    (connection) =>
      connection.mentorId === user?.id && connection.status === 'pending'
  )

  const connectedMentees = connections.filter(
    (connection) =>
      connection.mentorId === user?.id && connection.status === 'accepted'
  )

  if (pendingRequests.length === 0 && connectedMentees.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">My Mentees</h2>
        <p className="text-center text-gray-600">
          You don't have any mentees or pending requests yet.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold">My Mentees</h2>

      {pendingRequests.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 font-medium">Pending Requests</h3>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50&h=50"
                    alt="Mentee"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">New Request</h4>
                    <p className="text-sm text-gray-600">
                      Someone wants to connect with you
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => acceptRequest(request.id)}
                  >
                    <UserCheck className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => declineRequest(request.id)}
                  >
                    <UserX className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {connectedMentees.length > 0 && (
        <div>
          <h3 className="mb-3 font-medium">Connected Mentees</h3>
          <div className="space-y-4">
            {connectedMentees.map((connection) => (
              <div
                key={connection.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50&h=50"
                    alt="Mentee"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">Connected Mentee</h4>
                    <p className="text-sm text-gray-600">
                      Start mentoring your mentee
                    </p>
                  </div>
                </div>
                <Link to={`/chat/${connection.menteeId}`}>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}