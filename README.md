# Gemini Clone - AI Chat Interface

A modern, responsive web application that mimics Google Gemini's interface with API key integration for both text and image capabilities.

## Features

- 🎨 **Modern UI**: Clean, responsive design similar to Google Gemini
- 🔑 **API Key Integration**: Secure API key management for Google Gemini
- 💬 **Text Chat**: Full conversation support with message history
- 🖼️ **Image Analysis**: Upload and analyze images with Gemini Vision
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🔒 **Local Storage**: API keys stored securely in browser
- ⚡ **Real-time**: Instant responses with loading states

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Google Gemini API key

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key (you'll need it for the app)

### 3. Run the Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### 4. Configure API Key

1. When you first open the app, you'll see a modal asking for your API key
2. Paste your Google Gemini API key
3. Click "Save API Key"
4. The key is stored locally in your browser

## Usage

### Text Chat
- Type your message in the input field
- Press Enter or click the send button
- Gemini will respond with AI-generated text

### Image Analysis
- Click the image icon in the input area
- Select an image file
- Add optional text description
- Send to get AI analysis of the image

### Features
- **New Chat**: Start a fresh conversation
- **API Key Management**: Update your API key anytime
- **Message History**: View all conversations in the current session
- **Error Handling**: Graceful error messages for API issues

## Project Structure

```
src/
├── components/
│   ├── ApiKeyModal.jsx    # API key configuration modal
│   ├── ChatArea.jsx       # Main chat interface
│   ├── Message.jsx        # Individual message component
│   ├── MessageInput.jsx   # Input area with image upload
│   └── Sidebar.jsx        # Navigation sidebar
├── App.jsx                # Main application component
├── main.jsx              # React entry point
└── index.css             # Global styles
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **Google Generative AI**: Official Gemini API client

## API Models Used

- **gemini-pro**: For text-only conversations
- **gemini-pro-vision**: For image analysis

## Security

- API keys are stored locally in browser localStorage
- No data is sent to external servers except Google's Gemini API
- All communication is encrypted via HTTPS

## Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Deployment

The built application can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## Troubleshooting

### API Key Issues
- Ensure your API key is valid and active
- Check that you have sufficient quota in Google AI Studio
- Verify the API key format (should start with "AIza")

### Image Upload Issues
- Supported formats: JPG, PNG, GIF, WebP
- Maximum file size: 20MB
- Ensure images are not corrupted

### Performance Issues
- Clear browser cache if experiencing slow loading
- Check network connectivity
- Ensure you're using a modern browser

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Google Gemini API documentation
3. Open an issue on GitHub

---

**Note**: This is a clone/educational project. For production use, ensure compliance with Google's API terms of service and implement appropriate rate limiting and error handling. 