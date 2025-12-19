const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Store conversation history (in production, use a database)
const conversations = new Map();

// OpenAI API endpoint
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create conversation history
    let conversationHistory = conversations.get(conversationId) || [];
    
    // Add user message to history
    conversationHistory.push({
      role: 'user',
      content: message.trim()
    });

    // Check if API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    const useDemoMode = !apiKey || apiKey === 'your-api-key-here' || apiKey === 'demo';
    
    let aiResponse;
    
    if (useDemoMode) {
      // Demo mode - simple rule-based responses
      const userMessage = message.trim().toLowerCase();
      const lastUserMsg = conversationHistory[conversationHistory.length - 1]?.content?.toLowerCase() || '';
      
      // Simple demo responses
      if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
        aiResponse = "Hello! I'm a demo AI assistant. To use the real AI, please set up your OpenAI API key in the .env file. How can I help you?";
      } else if (userMessage.includes('help')) {
        aiResponse = "I'm here to help! This is demo mode. To enable full AI capabilities:\n\n1. Get an API key from https://platform.openai.com/api-keys\n2. Add it to your .env file: OPENAI_API_KEY=your-key-here\n3. Restart the server";
      } else if (userMessage.includes('weather')) {
        aiResponse = "I'd love to help with weather, but I'm in demo mode. Set up your OpenAI API key to get real AI responses!";
      } else if (userMessage.includes('name')) {
        aiResponse = "I'm a demo AI chatbot. Once you add your OpenAI API key, I'll have much smarter responses!";
      } else if (userMessage.includes('bye') || userMessage.includes('goodbye')) {
        aiResponse = "Goodbye! Don't forget to set up your OpenAI API key for the full experience!";
      } else {
        // Echo back with a twist
        const responses = [
          `I understand you said "${message.trim()}". This is demo mode - add your OpenAI API key for intelligent responses!`,
          `You mentioned: "${message.trim()}". To get real AI answers, configure your OPENAI_API_KEY in the .env file.`,
          `Interesting! "${message.trim()}". I'm currently in demo mode. Set up your API key to unlock full AI capabilities!`
        ];
        aiResponse = responses[Math.floor(Math.random() * responses.length)];
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } else {
      // Real OpenAI API call
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful, friendly, and knowledgeable AI assistant. Be concise and helpful in your responses.'
            },
            ...conversationHistory
          ],
          max_tokens: 500,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      aiResponse = response.data.choices[0].message.content;
    }
    
    // Add AI response to history
    conversationHistory.push({
      role: 'assistant',
      content: aiResponse
    });

    // Save conversation history
    conversations.set(conversationId, conversationHistory);

    res.json({
      response: aiResponse,
      conversationId: conversationId
    });

  } catch (error) {
    console.error('Chat error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'Invalid API key. Please check your OPENAI_API_KEY in .env file' 
      });
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: 'API rate limit exceeded. Please try again later.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to get response from AI. Please check your API key and try again.' 
    });
  }
});

// Clear conversation endpoint
app.post('/api/clear', (req, res) => {
  const { conversationId } = req.body;
  if (conversationId) {
    conversations.delete(conversationId);
  }
  res.json({ message: 'Conversation cleared' });
});

// Health check
app.get('/api/health', (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const hasValidKey = apiKey && apiKey !== 'your-api-key-here' && apiKey !== 'demo';
  
  res.json({ 
    status: 'ok', 
    hasApiKey: hasValidKey,
    mode: hasValidKey ? 'production' : 'demo',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  const apiKey = process.env.OPENAI_API_KEY;
  const isDemoMode = !apiKey || apiKey === 'your-api-key-here' || apiKey === 'demo';
  
  console.log(`🤖 AI Chatbot server running on http://localhost:${PORT}`);
  
  if (isDemoMode) {
    console.log(`⚠️  Running in DEMO MODE - Limited responses`);
    console.log(`📝 To enable full AI: Set OPENAI_API_KEY in .env file`);
    console.log(`   Get your key at: https://platform.openai.com/api-keys`);
  } else {
    console.log(`✅ Running in PRODUCTION MODE with OpenAI API`);
  }
});

