import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">MentorMatch</h3>
            <p className="text-sm text-gray-600">
              Connecting mentors and mentees for meaningful growth and learning.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link to="/mentors" className="text-gray-600 hover:text-blue-600">Find Mentors</Link></li>
              <li><Link to="/become-mentor" className="text-gray-600 hover:text-blue-600">Become a Mentor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} MentorMatch. All rights reserved.
        </div>
      </div>
    </footer>
  )
}