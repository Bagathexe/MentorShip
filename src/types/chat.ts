export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
}

export interface Chat {
  id: string
  participants: [string, string]
  messages: Message[]
  lastMessage?: Message
}