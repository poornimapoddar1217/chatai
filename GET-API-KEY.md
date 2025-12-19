# How to Get Your OpenAI API Key

## Step-by-Step Guide

### Step 1: Go to OpenAI Platform
Visit: **https://platform.openai.com**

### Step 2: Sign Up or Log In
- If you don't have an account: Click **"Sign Up"** and create an account
- If you have an account: Click **"Log In"**

### Step 3: Navigate to API Keys
- Once logged in, click on your **profile/account icon** (top right)
- Select **"API keys"** from the menu
- Or go directly to: **https://platform.openai.com/api-keys**

### Step 4: Create a New API Key
- Click the **"+ Create new secret key"** button
- Give it a name (optional, e.g., "My Chatbot")
- Click **"Create secret key"**

### Step 5: Copy Your Key
- **IMPORTANT:** Copy the key immediately - you won't be able to see it again!
- The key will look like: `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- It starts with `sk-` and is about 50+ characters long

### Step 6: Add Credits (If Needed)
- Go to: **https://platform.openai.com/account/billing**
- Add payment method and credits if required
- OpenAI often gives free credits to new users

### Step 7: Use Your Key
- Open the `.env` file in the `ai-chatbot` folder
- Replace `your-api-key-here` with your actual key:
  ```
  OPENAI_API_KEY=sk-proj-your-actual-key-here
  ```
- Save the file
- Restart your server: `npm start`

## Important Notes

⚠️ **Keep Your Key Secret**
- Never share your API key publicly
- Don't commit it to GitHub or public repositories
- The `.env` file is already in `.gitignore` to protect it

💰 **Cost Information**
- GPT-3.5-turbo is very affordable (~$0.0015 per 1K tokens)
- You can set usage limits in your OpenAI account
- Monitor usage at: https://platform.openai.com/usage

🔑 **If You Lose Your Key**
- You can create a new one anytime
- Old keys can be deleted from the API keys page

## Quick Links

- **Get API Key:** https://platform.openai.com/api-keys
- **Add Credits:** https://platform.openai.com/account/billing
- **Usage Dashboard:** https://platform.openai.com/usage
- **Documentation:** https://platform.openai.com/docs

## Troubleshooting

**"Invalid API key" error:**
- Make sure you copied the entire key (no spaces)
- Check that there are no extra characters
- Verify the key starts with `sk-`

**"Insufficient credits" error:**
- Add credits to your OpenAI account
- Check your usage limits

**"Rate limit exceeded" error:**
- You've hit the API rate limit
- Wait a few minutes and try again
- Consider upgrading your plan

