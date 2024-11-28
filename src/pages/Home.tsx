import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Target, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { sampleMentors } from '../data/sampleMentors'

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Find Your Perfect Mentor
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Connect with industry experts who can guide you through your professional journey
              and help you achieve your career goals.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/signup">
                <Button size="lg" className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/mentors">
                <Button variant="outline" size="lg">
                  Browse Mentors
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: 'Find Your Match',
                description: 'Browse through our curated list of experienced mentors.',
              },
              {
                icon: Target,
                title: 'Set Your Goals',
                description: 'Define your objectives and create a learning path.',
              },
              {
                icon: Calendar,
                title: 'Schedule Sessions',
                description: 'Book mentoring sessions at your convenience.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg bg-white p-6 shadow-lg"
              >
                <feature.icon className="mb-4 h-12 w-12 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mentors Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Featured Mentors</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {sampleMentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg bg-white shadow-lg"
              >
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{mentor.name}</h3>
                  <p className="mb-4 text-sm text-gray-600">{mentor.bio}</p>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}