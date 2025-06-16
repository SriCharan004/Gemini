import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import ApiKeyModal from './components/ApiKeyModal'
import { getApiKey, setApiKey } from './config'

function App() {
  const [apiKey, setApiKeyState] = useState(getApiKey())
  const [showApiModal, setShowApiModal] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!apiKey) {
      setShowApiModal(true)
    }
  }, [apiKey])

  const handleApiKeySave = (key) => {
    setApiKeyState(key)
    setApiKey(key)
    setShowApiModal(false)
  }

  const addMessage = (message) => {
    setMessages(prev => [...prev, message])
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar 
        onNewChat={clearChat}
        onApiKeyClick={() => setShowApiModal(true)}
        hasApiKey={!!apiKey}
      />
      
      <div className="flex-1 flex flex-col">
        <ChatArea 
          messages={messages}
          addMessage={addMessage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          apiKey={apiKey}
        />
      </div>

      {showApiModal && (
        <ApiKeyModal 
          onSave={handleApiKeySave}
          onClose={() => setShowApiModal(false)}
          currentKey={apiKey}
        />
      )}
    </div>
  )
}

export default App 