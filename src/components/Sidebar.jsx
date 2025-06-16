import React from 'react'
import { Plus, Settings, Key, Sparkles } from 'lucide-react'
import MemoryManager from './MemoryManager'

const Sidebar = ({ 
  onNewChat, 
  onApiKeyClick, 
  hasApiKey,
  memories,
  onRemoveMemory,
  onClearAllMemories,
  isAuthenticated,
  onLogout
}) => {
  return (
    <div className="sidebar">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Gemini Clone</h1>
        </div>

        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          New chat
        </button>

        <div className="mt-6 space-y-2">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
            Settings
          </h3>
          
          <button
            onClick={onApiKeyClick}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Key className="w-4 h-4" />
            <span className="flex-1 text-left">API Key</span>
            {hasApiKey && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </button>
        </div>

        <MemoryManager
          memories={memories}
          onRemoveMemory={onRemoveMemory}
          onClearAll={onClearAllMemories}
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
        />

        <div className="mt-8 px-3">
          <p className="text-xs text-gray-500">
            Powered by Google Gemini API
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 