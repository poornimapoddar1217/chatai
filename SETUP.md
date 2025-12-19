# Quick Setup Guide

## Step 1: Get OpenAI API Key

1. Visit: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your API key

## Step 2: Create .env File

Create a file named `.env` in the `ai-chatbot` folder with this content:

```
OPENAI_API_KEY=your-api-key-here
PORT=3001
```

Replace `your-api-key-here` with your actual API key.

## Step 3: Start the Server

```bash
npm start
```

## Step 4: Open Browser

Go to: http://localhost:3001

---

**Note:** You need an OpenAI API key for the chatbot to work. The API usage is charged based on tokens, but GPT-3.5-turbo is very affordable.

