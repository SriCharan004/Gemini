import React from 'react'
import { User, Bot, AlertCircle } from 'lucide-react'

const Message = ({ message }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatContent = (content) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < content.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))
  }

  return (
    <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.type === 'ai' && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          {message.isError ? (
            <AlertCircle className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
      )}
      
      <div className={`max-w-[70%] ${message.type === 'user' ? 'order-first' : ''}`}>
        <div className={`rounded-lg p-3 ${
          message.type === 'user' 
            ? 'bg-blue-600 text-white' 
            : message.isError 
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-gray-100 text-gray-900'
        }`}>
          {message.image && (
            <div className="mb-2">
              <img 
                src={message.image} 
                alt="Uploaded content" 
                className="max-w-full h-auto rounded border"
                style={{ maxHeight: '200px' }}
              />
            </div>
          )}
          
          <div className="whitespace-pre-wrap">
            {formatContent(message.content)}
          </div>
        </div>
        
        <div className={`text-xs text-gray-500 mt-1 ${
          message.type === 'user' ? 'text-right' : 'text-left'
        }`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
      
      {message.type === 'user' && (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      )}
    </div>
  )
}

export default Message 