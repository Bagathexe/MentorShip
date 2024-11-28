import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useAuthStore } from '../store/authStore'
import { generateId } from '../lib/utils'

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  role: z.enum(['mentor', 'mentee']).optional(),
})

type AuthFormData = z.infer<typeof authSchema>

interface AuthProps {
  mode: 'login' | 'signup'
}

export const Auth: React.FC<AuthProps> = ({ mode }) => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  })

  const onSubmit = (data: AuthFormData) => {
    // Simulate authentication
    const user = {
      id: generateId(),
      email: data.email,
      name: data.name || data.email.split('@')[0],
      role: data.role || 'mentee',
    }
    login(user)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-gray-600">
            {mode === 'login'
              ? 'Sign in to your account'
              : 'Join our mentorship community'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {mode === 'signup' && (
            <Input
              label="Name"
              {...register('name')}
              error={errors.name?.message}
              placeholder="Your name"
            />
          )}

          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            placeholder="••••••••"
          />

          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                I want to be a
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="mentee"
                    {...register('role')}
                    defaultChecked
                  />
                  <span>Mentee</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" value="mentor" {...register('role')} />
                  <span>Mentor</span>
                </label>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}