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
  const userId = getOrCreateUserId()

  // Load memories from backend on mount
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const res = await fetch(`/api/getMemories?userId=${userId}`)
        if (res.ok) {
          const data = await res.json()
          setMemories(data.map(m => ({
            id: m._id || Date.now() + Math.random(),
            content: m.content,
            timestamp: m.timestamp
          })))
        } else {
          // fallback to localStorage
          const savedMemories = localStorage.getItem(MEMORIES_KEY)
          if (savedMemories) {
            setMemories(JSON.parse(savedMemories))
          }
        }
      } catch {
        // fallback to localStorage
        const savedMemories = localStorage.getItem(MEMORIES_KEY)
        if (savedMemories) {
          setMemories(JSON.parse(savedMemories))
        }
      }
    }
    fetchMemories()
  }, [userId])

  // Save memories to localStorage whenever memories change
  useEffect(() => {
    localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories))
  }, [memories])

  const addMemory = async (content) => {
    const newMemory = {
      id: Date.now(),
      content,
      timestamp: new Date().toISOString()
    }
    setMemories(prev => [...prev, newMemory])
    // Save to backend
    try {
      await fetch('/api/saveMemory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, content })
      })
    } catch {
      // ignore errors, fallback to localStorage
    }
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

const getOrCreateUserId = () => {
  let userId = localStorage.getItem('chatbot_user_id')
  if (!userId) {
    userId = 'user-' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('chatbot_user_id', userId)
  }
  return userId
} 