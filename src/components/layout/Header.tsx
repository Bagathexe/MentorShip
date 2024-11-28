import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../ui/Button'
import { Users, Network } from 'lucide-react'

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Users className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">MentorMatch</span>
        </Link>

        <nav className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/network" className="text-gray-600 hover:text-blue-600">
                <div className="flex items-center space-x-1">
                  <Network className="h-4 w-4" />
                  <span>Network</span>
                </div>
              </Link>
              <Link
                to="/browse-mentors"
                className="text-gray-600 hover:text-blue-600"
              >
                Browse Mentors
              </Link>
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}