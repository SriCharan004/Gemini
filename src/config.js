// Configuration file for API keys and settings
export const config = {
  // Your Google Gemini API key
  GEMINI_API_KEY: 'AIzaSyCi2c-Fas9aqS-0Z6mrlRmvyxel-tjkfqE',
  
  // API settings
  API_SETTINGS: {
    maxTokens: 2048,
    temperature: 0.7,
    topP: 0.8,
    topK: 40
  },
  
  // App settings
  APP_SETTINGS: {
    maxImageSize: 20 * 1024 * 1024, // 20MB
    supportedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    autoSaveInterval: 30000 // 30 seconds
  }
}

// Helper function to get API key (checks localStorage first, then config)
export const getApiKey = () => {
  const storedKey = localStorage.getItem('gemini-api-key')
  return storedKey || config.GEMINI_API_KEY
}

// Helper function to set API key
export const setApiKey = (key) => {
  localStorage.setItem('gemini-api-key', key)
} 