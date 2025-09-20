"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Lightbulb, Globe } from "lucide-react"
import { searchKnowledge, getRandomTips, type KnowledgeEntry } from "@/lib/landscape-knowledge-base"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: KnowledgeEntry[]
}

interface AILandscapeAssistantProps {
  language: "en" | "es"
}

export function AILandscapeAssistant({ language }: AILandscapeAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const translations = {
    en: {
      title: "Landscape AI Assistant",
      placeholder: "Ask me about irrigation, hardscape, plants, or maintenance...",
      send: "Send",
      typing: "AI is thinking...",
      welcome:
        "Hi! I'm your landscape expert. Ask me anything about irrigation, hardscape materials, plant selection, soil preparation, lighting, or maintenance.",
      noResults: "I don't have specific information about that topic, but here are some helpful landscape tips:",
      suggestions: "Related topics you might find helpful:",
      randomTips: "Here are some helpful landscape tips to get you started:",
    },
    es: {
      title: "Asistente de IA Paisajística",
      placeholder: "Pregúntame sobre riego, paisajismo duro, plantas, o mantenimiento...",
      send: "Enviar",
      typing: "La IA está pensando...",
      welcome:
        "¡Hola! Soy tu experto en paisajismo. Pregúntame sobre riego, materiales de paisajismo duro, selección de plantas, preparación del suelo, iluminación, o mantenimiento.",
      noResults:
        "No tengo información específica sobre ese tema, pero aquí tienes algunos consejos útiles de paisajismo:",
      suggestions: "Temas relacionados que podrían ser útiles:",
      randomTips: "Aquí tienes algunos consejos útiles de paisajismo para comenzar:",
    },
  }

  const t = translations[language]

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      const welcomeMessage: Message = {
        id: "welcome",
        type: "assistant",
        content: t.welcome,
        timestamp: new Date(),
        suggestions: getRandomTips(language, 3),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, language, t.welcome])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const searchResults = searchKnowledge(inputValue, language)

      let assistantResponse: string
      let suggestions: KnowledgeEntry[] = []

      if (searchResults.length > 0) {
        assistantResponse = searchResults[0].answer
        suggestions = searchResults.slice(1)
      } else {
        assistantResponse = t.noResults
        suggestions = getRandomTips(language, 3)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: assistantResponse,
        timestamp: new Date(),
        suggestions,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: KnowledgeEntry) => {
    setInputValue(suggestion.question)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t.title}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-4 pt-0">
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>

                    {message.type === "assistant" && message.suggestions && message.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Lightbulb className="h-3 w-3" />
                          {message.id === "welcome" ? t.randomTips : t.suggestions}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {message.suggestions.map((suggestion) => (
                            <Badge
                              key={suggestion.id}
                              variant="outline"
                              className="cursor-pointer hover:bg-accent text-xs"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion.category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">{t.typing}</div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.placeholder}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
