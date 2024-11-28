import React, { useState } from 'react'
import { Calendar, Clock, User, X } from 'lucide-react'
import { Session } from '../../types/session'
import { Button } from '../ui/Button'
import { useSessionStore } from '../../store/sessionStore'
import { motion, AnimatePresence } from 'framer-motion'
import { mentors } from '../../data/mentors'

export const SessionScheduler: React.FC = () => {
  const { sessions, addSession, cancelSession } = useSessionStore()
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [newSession, setNewSession] = useState({
    mentorId: '',
    date: '',
    startTime: '',
    endTime: '',
    topic: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSession.mentorId && newSession.date && newSession.startTime) {
      addSession({
        ...newSession,
        menteeId: 'current-user-id', // This should come from auth context
        status: 'pending',
      })
      setNewSession({
        mentorId: '',
        date: '',
        startTime: '',
        endTime: '',
        topic: '',
      })
      setShowScheduleForm(false)
    }
  }

  const getStatusColor = (status: Session['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getMentorName = (mentorId: string) => {
    const mentor = mentors.find((m) => m.id === mentorId)
    return mentor ? mentor.name : 'Unknown Mentor'
  }

  return (
    <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sessions</h2>
        <Button
          onClick={() => setShowScheduleForm(true)}
          className="flex items-center space-x-2"
        >
          <Calendar className="h-4 w-4" />
          <span>Schedule Session</span>
        </Button>
      </div>

      <AnimatePresence>
        {showScheduleForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4 overflow-hidden"
          >
            <select
              value={newSession.mentorId}
              onChange={(e) =>
                setNewSession({ ...newSession, mentorId: e.target.value })
              }
              className="w-full rounded-lg border p-2"
            >
              <option value="">Select a mentor</option>
              {mentors.map((mentor) => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name} - {mentor.title}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={newSession.date}
                onChange={(e) =>
                  setNewSession({ ...newSession, date: e.target.value })
                }
                className="rounded-lg border p-2"
              />
              <input
                type="time"
                value={newSession.startTime}
                onChange={(e) =>
                  setNewSession({ ...newSession, startTime: e.target.value })
                }
                className="rounded-lg border p-2"
              />
            </div>
            <input
              type="text"
              value={newSession.topic}
              onChange={(e) =>
                setNewSession({ ...newSession, topic: e.target.value })
              }
              placeholder="Session topic"
              className="w-full rounded-lg border p-2"
            />
            <div className="flex space-x-4">
              <Button type="submit">Schedule</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowScheduleForm(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <AnimatePresence>
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{session.date}</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>
                    {session.startTime} - {session.endTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Session with {getMentorName(session.mentorId)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{session.topic}</div>
              </div>
              <div className="flex items-center space-x-4">
                {session.status === 'pending' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => cancelSession(session.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <span
                  className={`rounded-full px-3 py-1 text-sm ${getStatusColor(
                    session.status
                  )}`}
                >
                  {session.status}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}