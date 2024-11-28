import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { useChatStore } from '../store/chatStore'
import { Button } from '../components/ui/Button'

export const Chat: React.FC = () => {
  const { partnerId } = useParams<{ partnerId: string }>()
  const { user } = useAuthStore()
  const { sendMessage, getChat, markAsRead } = useChatStore()
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chat = partnerId && user ? getChat(user.id, partnerId) : undefined

  useEffect(() => {
    if (chat?.id && user) {
      markAsRead(chat.id, user.id)
    }
  }, [chat?.id, user])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !partnerId || !message.trim()) return

    sendMessage(user.id, partnerId, message.trim())
    setMessage('')
  }

  if (!user || !partnerId) return null

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {chat?.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.senderId === user.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  msg.senderId === user.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900'
                }`}
              >
                <p>{msg.content}</p>
                <p
                  className={`text-right text-xs ${
                    msg.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {format(new Date(msg.timestamp), 'HH:mm')}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSend} className="border-t bg-white p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Button type="submit" disabled={!message.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}