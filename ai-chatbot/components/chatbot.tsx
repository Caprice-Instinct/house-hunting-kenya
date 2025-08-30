"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, Send, X, Minimize2 } from 'lucide-react'
import { ChatMessage, ChatbotProps } from '../types'
import { OpenAIService } from '../lib/openai'

export function Chatbot({ onFiltersUpdate }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m here to help you find the perfect rental property in Kenya. You can ask me about locations, price ranges, number of bedrooms, or specific amenities you\'re looking for.',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const openAIService = useRef<OpenAIService | null>(null)

  useEffect(() => {
    // Initialize OpenAI service with API key from environment
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    openAIService.current = new OpenAIService(apiKey)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      let response = 'I\'m here to help you find properties! Try asking about specific locations, price ranges, or amenities.'
      
      if (openAIService.current) {
        const result = await openAIService.current.getChatResponse(inputValue)
        response = result.response
        
        // Update filters if extracted
        if (result.filters && onFiltersUpdate) {
          onFiltersUpdate(result.filters)
        }
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className={`fixed bottom-4 right-4 w-80 max-w-[calc(100vw-2rem)] shadow-xl z-50 transition-all duration-300 ${
      isMinimized ? 'h-14' : 'h-[32rem] max-h-[calc(100vh-2rem)]'
    }`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer" 
                  onClick={() => setIsMinimized(!isMinimized)}>
        <CardTitle className="text-sm font-medium">Property Assistant</CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Minimize2 className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(32rem-3.5rem)]">
          <ScrollArea className="flex-1 p-4 min-h-0">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="flex-shrink-0 p-3 border-t bg-background">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about properties..."
                className="flex-1 text-sm"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                size="sm"
                disabled={isLoading || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}