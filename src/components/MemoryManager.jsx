import React, { useState } from 'react'
import { Brain, Trash2, Eye, EyeOff, Lock } from 'lucide-react'

const MemoryManager = ({ memories, onRemoveMemory, onClearAll, isAuthenticated, onLogout }) => {
  const [showMemories, setShowMemories] = useState(false)

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Memories</span>
          {!isAuthenticated && <Lock className="w-3 h-3 text-gray-400" />}
        </div>
        <button
          onClick={() => setShowMemories(!showMemories)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showMemories ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {!isAuthenticated && (
        <div className="text-xs text-gray-500 mb-3">
          Enter password to view memories
        </div>
      )}

      {isAuthenticated && (
        <>
          {showMemories && memories.length > 0 && (
            <div className="space-y-2 mb-3 max-h-60 overflow-y-auto">
              {memories.map((memory) => (
                <div
                  key={memory.id}
                  className="bg-gray-50 rounded-lg p-3 text-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-gray-700 flex-1">{memory.content}</p>
                    <button
                      onClick={() => onRemoveMemory(memory.id)}
                      className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                      title="Delete memory"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(memory.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {showMemories && memories.length === 0 && (
            <div className="text-sm text-gray-500 text-center py-4">
              No memories stored yet
            </div>
          )}

          {memories.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={onClearAll}
                className="flex-1 px-3 py-2 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={onLogout}
                className="px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MemoryManager 