import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { Auth } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { BrowseMentors } from './pages/BrowseMentors'
import { MentorNetwork } from './pages/MentorNetwork'
import { Chat } from './pages/Chat'
import { useAuthStore } from './store/authStore'

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? element : <Navigate to="/login" replace />
}

export const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/browse-mentors"
              element={<PrivateRoute element={<BrowseMentors />} />}
            />
            <Route
              path="/network"
              element={<PrivateRoute element={<MentorNetwork />} />}
            />
            <Route
              path="/chat/:partnerId"
              element={<PrivateRoute element={<Chat />} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}