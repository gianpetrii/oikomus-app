'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  sender: 'user' | 'agent'
  text: string
  timestamp: Date
}

export default function PropertyChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        text: newMessage.trim(),
        timestamp: new Date(),
      }
      setMessages([...messages, userMessage])
      setNewMessage('')

      // Simulate agent response
      setTimeout(() => {
        const agentMessage: Message = {
          id: messages.length + 2,
          sender: 'agent',
          text: 'Gracias por su mensaje. Un agente se pondrá en contacto con usted pronto.',
          timestamp: new Date(),
        }
        setMessages(prevMessages => [...prevMessages, agentMessage])
      }, 1000)
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        Chatear
      </Button>
    )
  }

  return (
    <Card className="w-80 h-96 fixed bottom-4 right-4 flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Chat
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            X
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 p-2 rounded-lg ${
                message.sender === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-secondary'
              } max-w-[80%]`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-50">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex w-full gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <Button type="submit">Enviar</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

