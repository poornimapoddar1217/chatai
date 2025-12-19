# ChatAI - AI Chatbot Application

A beautiful AI-powered chatbot built with Node.js, Express, and OpenAI API.

## Features

- 🤖 AI-powered conversations using OpenAI GPT-3.5
- 💬 Beautiful, modern chat interface
- 💾 Conversation history management
- 🔄 Real-time typing indicators
- 🎨 Responsive design
- 🔒 Secure API key handling
- 🎭 Demo mode (works without API key)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy your API key

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
OPENAI_API_KEY=your-api-key-here
PORT=3001
```

### 4. Start the Server

```bash
npm start
```

The server will run on `http://localhost:3001`

## Usage

- Type your message in the input field
- Press **Enter** to send (Shift+Enter for new line)
- Click **Clear Chat** to start a new conversation
- The AI will respond based on the conversation history

## Demo Mode

If no API key is configured, the app runs in demo mode with limited responses. This allows you to test the interface without an API key.

## API Endpoints

- `POST /api/chat` - Send a message and get AI response
- `POST /api/clear` - Clear conversation history
- `GET /api/health` - Check server status and API key configuration

## Technologies Used

- Node.js
- Express.js
- OpenAI API
- HTML/CSS/JavaScript

## License

MIT
