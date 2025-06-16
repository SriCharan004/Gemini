import React, { useRef } from 'react'
import { Send, Image as ImageIcon, X } from 'lucide-react'

const MessageInput = ({ 
  value, 
  onChange, 
  onSend, 
  onKeyPress, 
  selectedImage, 
  setSelectedImage, 
  isLoading 
}) => {
  const fileInputRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSend = () => {
    if ((!value.trim() && !selectedImage) || isLoading) return
    onSend()
  }

  return (
    <div className="space-y-3">
      {selectedImage && (
        <div className="relative inline-block">
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="max-h-32 rounded border"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Type your message here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="1"
            style={{ minHeight: '48px', maxHeight: '120px' }}
            disabled={isLoading}
          />
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
            title="Upload image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleSend}
            disabled={(!value.trim() && !selectedImage) || isLoading}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="text-xs text-gray-500">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  )
}

export default MessageInput 