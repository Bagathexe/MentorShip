import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Chat, Message } from '../types/chat'
import { generateId } from '../lib/utils'

interface ChatState {
  chats: Chat[]
  sendMessage: (senderId: string, receiverId: string, content: string) => void
  markAsRead: (chatId: string, userId: string) => void
  getChat: (participant1: string, participant2: string) => Chat | undefined
  getUserChats: (userId: string) => Chat[]
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      sendMessage: (senderId, receiverId, content) => {
        const message: Message = {
          id: generateId(),
          senderId,
          receiverId,
          content,
          timestamp: new Date().toISOString(),
          read: false,
        }

        set((state) => {
          const existingChat = state.chats.find(
            (chat) =>
              chat.participants.includes(senderId) &&
              chat.participants.includes(receiverId)
          )

          if (existingChat) {
            return {
              chats: state.chats.map((chat) =>
                chat.id === existingChat.id
                  ? {
                      ...chat,
                      messages: [...chat.messages, message],
                      lastMessage: message,
                    }
                  : chat
              ),
            }
          }

          const newChat: Chat = {
            id: generateId(),
            participants: [senderId, receiverId],
            messages: [message],
            lastMessage: message,
          }

          return { chats: [...state.chats, newChat] }
        })
      },
      markAsRead: (chatId, userId) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.receiverId === userId ? { ...msg, read: true } : msg
                  ),
                }
              : chat
          ),
        })),
      getChat: (participant1, participant2) => {
        const state = get()
        return state.chats.find(
          (chat) =>
            chat.participants.includes(participant1) &&
            chat.participants.includes(participant2)
        )
      },
      getUserChats: (userId) => {
        const state = get()
        return state.chats.filter((chat) =>
          chat.participants.includes(userId)
        )
      },
    }),
    {
      name: 'chat-storage',
    }
  )
)