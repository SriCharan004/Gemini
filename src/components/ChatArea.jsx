import React, { useState, useRef, useEffect } from 'react'
import MessageInput from './MessageInput'
import Message from './Message'
import { Send, Image as ImageIcon, Loader2 } from 'lucide-react'

const ChatArea = ({ messages, addMessage, isLoading, setIsLoading, apiKey }) => {
  const messagesEndRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedImage) return
    if (!apiKey) {
      alert('Please configure your API key first')
      return
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      image: selectedImage,
      timestamp: new Date()
    }

    addMessage(userMessage)
    setInputValue('')
    setSelectedImage(null)
    setIsLoading(true)

    try {
      const response = await sendToGemini(userMessage, apiKey)
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: new Date()
      }
      addMessage(aiMessage)
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'Sorry, I encountered an error. Please check your API key and try again.',
        timestamp: new Date(),
        isError: true
      }
      addMessage(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Gemini Chat</h2>
        <p className="text-sm text-gray-600">Ask me anything or upload an image</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Gemini Clone</h3>
              <p className="text-gray-600 max-w-md">
                Start a conversation or upload an image to get started. I can help you with text analysis, 
                image understanding, and much more.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )}
        
        {isLoading && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span className="text-gray-600">Gemini is thinking...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <MessageInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

// Function to send message to Gemini API
const sendToGemini = async (message, apiKey) => {
  const { GoogleGenerativeAI } = await import('@google/generative-ai')
  
  const genAI = new GoogleGenerativeAI(apiKey)
  
  let model
  if (message.image) {
    model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })
  } else {
    model = genAI.getGenerativeModel({ model: "gemini-pro" })
  }

  let result
  if (message.image) {
    // Convert base64 image to Uint8Array
    const imageData = message.image.split(',')[1]
    const imageBytes = Uint8Array.from(atob(imageData), c => c.charCodeAt(0))
    
    const imagePart = {
      inlineData: {
        data: btoa(String.fromCharCode(...imageBytes)),
        mimeType: "image/jpeg"
      }
    }
    
    result = await model.generateContent([message.content, imagePart])
  } else {
    result = await model.generateContent(message.content)
  }

  const response = await result.response
  return response.text()
}

export default ChatArea 