import React, { createContext, useContext, useState, useEffect } from 'react'

const MemoryContext = createContext()

export const useMemory = () => {
  const context = useContext(MemoryContext)
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider')
  }
  return context
}

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [pendingMemory, setPendingMemory] = useState(null)

  const PASSWORD = 'SriCh'
  const MEMORIES_KEY = 'chatbot_memories'

  // Load memories from localStorage on component mount
  useEffect(() => {
    const savedMemories = localStorage.getItem(MEMORIES_KEY)
    if (savedMemories) {
      try {
        setMemories(JSON.parse(savedMemories))
      } catch (error) {
        console.error('Error loading memories:', error)
      }
    }
  }, [])

  // Save memories to localStorage whenever memories change
  useEffect(() => {
    localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories))
  }, [memories])

  const addMemory = (content) => {
    const newMemory = {
      id: Date.now(),
      content,
      timestamp: new Date().toISOString()
    }
    setMemories(prev => [...prev, newMemory])
    return newMemory
  }

  const removeMemory = (id) => {
    setMemories(prev => prev.filter(memory => memory.id !== id))
  }

  const clearAllMemories = () => {
    setMemories([])
  }

  const requestMemoryAccess = (content) => {
    setPendingMemory(content)
    setShowPasswordModal(true)
  }

  const verifyPassword = (password) => {
    if (password === PASSWORD) {
      setIsAuthenticated(true)
      setShowPasswordModal(false)
      if (pendingMemory) {
        addMemory(pendingMemory)
        setPendingMemory(null)
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setShowPasswordModal(false)
    setPendingMemory(null)
  }

  const value = {
    memories,
    isAuthenticated,
    showPasswordModal,
    addMemory,
    removeMemory,
    clearAllMemories,
    requestMemoryAccess,
    verifyPassword,
    logout,
    setShowPasswordModal
  }

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  )
} 