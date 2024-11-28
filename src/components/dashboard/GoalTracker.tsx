import React, { useState } from 'react'
import { Plus, Check, Clock, AlertCircle, Trash2 } from 'lucide-react'
import { Goal, GoalStatus, GoalPriority } from '../../types/goal'
import { Button } from '../ui/Button'
import { useGoalStore } from '../../store/goalStore'
import { motion, AnimatePresence } from 'framer-motion'

export const GoalTracker: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useGoalStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    priority: 'medium' as GoalPriority,
    status: 'pending' as GoalStatus,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGoal.title.trim()) {
      addGoal({
        ...newGoal,
        userId: 'current-user-id', // This should come from auth context
      })
      setNewGoal({
        title: '',
        priority: 'medium',
        status: 'pending',
      })
      setShowAddForm(false)
    }
  }

  const getPriorityColor = (priority: GoalPriority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500'
      case 'medium':
        return 'text-yellow-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: GoalStatus) => {
    switch (status) {
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-gray-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Goals</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4 overflow-hidden"
          >
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              placeholder="Enter goal title"
              className="w-full rounded-lg border p-2"
            />
            <div className="flex space-x-4">
              <select
                value={newGoal.priority}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    priority: e.target.value as GoalPriority,
                  })
                }
                className="rounded-lg border p-2"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <Button type="submit">Add Goal</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <AnimatePresence>
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(goal.status)}
                <span className="font-medium">{goal.title}</span>
                <span className={`text-sm ${getPriorityColor(goal.priority)}`}>
                  {goal.priority}
                </span>
              </div>
              <div className="flex space-x-2">
                {goal.status !== 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateGoal(goal.id, {
                        status:
                          goal.status === 'pending'
                            ? 'in-progress'
                            : 'completed',
                      })
                    }
                  >
                    {goal.status === 'pending' ? 'Start' : 'Complete'}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteGoal(goal.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}