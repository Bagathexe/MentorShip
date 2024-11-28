import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Connection {
  id: string
  mentorId: string
  menteeId: string
  status: 'pending' | 'accepted' | 'declined'
  createdAt: string
}

interface ConnectionState {
  connections: Connection[]
  sendRequest: (mentorId: string, menteeId: string) => void
  acceptRequest: (connectionId: string) => void
  declineRequest: (connectionId: string) => void
  withdrawRequest: (connectionId: string) => void
  getConnectionStatus: (mentorId: string, menteeId: string) => Connection | undefined
}

export const useConnectionStore = create<ConnectionState>()(
  persist(
    (set, get) => ({
      connections: [],
      sendRequest: (mentorId, menteeId) =>
        set((state) => ({
          connections: [
            ...state.connections,
            {
              id: Math.random().toString(36).substring(7),
              mentorId,
              menteeId,
              status: 'pending',
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      acceptRequest: (connectionId) =>
        set((state) => ({
          connections: state.connections.map((connection) =>
            connection.id === connectionId
              ? { ...connection, status: 'accepted' }
              : connection
          ),
        })),
      declineRequest: (connectionId) =>
        set((state) => ({
          connections: state.connections.map((connection) =>
            connection.id === connectionId
              ? { ...connection, status: 'declined' }
              : connection
          ),
        })),
      withdrawRequest: (connectionId) =>
        set((state) => ({
          connections: state.connections.filter(
            (connection) => connection.id !== connectionId
          ),
        })),
      getConnectionStatus: (mentorId, menteeId) => {
        const state = get()
        return state.connections.find(
          (connection) =>
            connection.mentorId === mentorId && connection.menteeId === menteeId
        )
      },
    }),
    {
      name: 'connection-storage',
    }
  )
)