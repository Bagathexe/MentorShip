import { create } from 'zustand'
import { Goal } from '../types/goal'
import { generateId } from '../lib/utils'

interface GoalStore {
  goals: Goal[]
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void
  updateGoal: (goalId: string, updates: Partial<Goal>) => void
  deleteGoal: (goalId: string) => void
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  addGoal: (goal) =>
    set((state) => ({
      goals: [
        ...state.goals,
        {
          ...goal,
          id: generateId(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  updateGoal: (goalId, updates) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === goalId ? { ...goal, ...updates } : goal
      ),
    })),
  deleteGoal: (goalId) =>
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== goalId),
    })),
}))