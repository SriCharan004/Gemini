import React, { useState } from 'react'
import { Plus, Key, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const [isExpanded, setIsExpanded] = useState(true)

  const callGemini = async (prompt) => {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    // handle data
  };

  return (
    <div
      className={`sidebar ${isExpanded ? 'w-64' : 'w-20'} h-full bg-white border-r transition-all duration-300 flex flex-col relative`}
    >
      {/* Toggle Button */}
      <button
        className="absolute top-4 -right-3 z-10 bg-white border rounded-full shadow p-1"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-label="Toggle sidebar"
        style={{ transition: 'right 0.3s' }}
      >
        {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {isExpanded && (
            <h1 className="text-xl font-semibold text-gray-900">AI Friend</h1>
          )}
        </div>

        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          {isExpanded && 'New chat'}
        </button>

        <div className="mt-6 space-y-2">
          {isExpanded && (
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3">
              Settings
            </h3>
          )}
          
          <button
            onClick={onApiKeyClick}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Key className="w-4 h-4" />
            {isExpanded && <span className="flex-1 text-left">API Key</span>}
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
          isSidebarExpanded={isExpanded}
        />

        <div className="mt-8 px-3">
          {isExpanded && (
            <p className="text-xs text-gray-500">
              Powered by Google Open Source AI Models
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar 