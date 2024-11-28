import { create } from 'zustand'
import { Session } from '../types/session'
import { generateId } from '../lib/utils'

interface SessionStore {
  sessions: Session[]
  addSession: (session: Omit<Session, 'id'>) => void
  updateSession: (sessionId: string, updates: Partial<Session>) => void
  cancelSession: (sessionId: string) => void
}

export const useSessionStore = create<SessionStore>((set) => ({
  sessions: [],
  addSession: (session) =>
    set((state) => ({
      sessions: [
        ...state.sessions,
        {
          ...session,
          id: generateId(),
        },
      ],
    })),
  updateSession: (sessionId, updates) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId ? { ...session, ...updates } : session
      ),
    })),
  cancelSession: (sessionId) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? { ...session, status: 'cancelled' as const }
          : session
      ),
    })),
}))