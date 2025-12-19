# Quick Start Guide

## Option 1: Interactive Setup (Easiest)

Run this command to set up your API key interactively:

```bash
node setup-api-key.js
```

Then paste your API key when prompted.

## Option 2: Manual Setup

### Step 1: Get Your API Key

1. Go to: **https://platform.openai.com/api-keys**
2. Sign up or log in to your OpenAI account
3. Click **"Create new secret key"**
4. Copy the key (it starts with `sk-`)

### Step 2: Edit .env File

Open the `.env` file in the `ai-chatbot` folder and replace `your-api-key-here` with your actual key:

```
OPENAI_API_KEY=sk-proj-your-actual-key-here
PORT=3001
```

### Step 3: Restart Server

Stop the server (Ctrl+C) and restart it:

```bash
npm start
```

## Verify It Works

1. Open: http://localhost:3001
2. The error message should be gone
3. Try sending a message!

---

**Need Help?**
- Make sure the `.env` file is in the `ai-chatbot` folder (same folder as `server.js`)
- Make sure there are no extra spaces around the `=` sign
- Restart the server after changing `.env`

