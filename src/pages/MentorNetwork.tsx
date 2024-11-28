import React, { useState } from 'react'
import { Search, UserPlus, UserCheck, UserX, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { mentors } from '../data/mentors'
import { useAuthStore } from '../store/authStore'
import { useConnectionStore } from '../store/connectionStore'
import { Button } from '../components/ui/Button'

export const MentorNetwork: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useAuthStore()
  const { sendRequest, withdrawRequest, getConnectionStatus } = useConnectionStore()

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise.some((skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const handleConnect = (mentorId: string) => {
    if (user) {
      sendRequest(mentorId, user.id)
    }
  }

  const handleWithdraw = (mentorId: string) => {
    if (user) {
      const connection = getConnectionStatus(mentorId, user.id)
      if (connection) {
        withdrawRequest(connection.id)
      }
    }
  }

  const getConnectionButton = (mentorId: string) => {
    if (!user) return null

    const connection = getConnectionStatus(mentorId, user.id)
    
    if (!connection) {
      return (
        <Button
          onClick={() => handleConnect(mentorId)}
          className="flex items-center space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Connect</span>
        </Button>
      )
    }

    switch (connection.status) {
      case 'pending':
        return (
          <Button
            variant="outline"
            onClick={() => handleWithdraw(mentorId)}
            className="flex items-center space-x-2"
          >
            <Clock className="h-4 w-4" />
            <span>Pending</span>
          </Button>
        )
      case 'accepted':
        return (
          <Button variant="secondary" className="flex items-center space-x-2">
            <UserCheck className="h-4 w-4" />
            <span>Connected</span>
          </Button>
        )
      case 'declined':
        return (
          <Button
            variant="outline"
            onClick={() => handleConnect(mentorId)}
            className="flex items-center space-x-2"
          >
            <UserX className="h-4 w-4" />
            <span>Connect</span>
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Find Mentors</h1>
          <p className="mt-2 text-gray-600">
            Connect with mentors who can help you grow in your career
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div className="relative">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                  <p className="text-sm text-gray-200">{mentor.title}</p>
                </div>
              </div>

              <div className="p-4">
                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                  {mentor.bio}
                </p>

                <div className="mb-4">
                  <h4 className="mb-2 font-semibold">Expertise</h4>
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
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">{mentor.totalSessions}</span>{' '}
                    sessions completed
                  </div>
                  {getConnectionButton(mentor.id)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}