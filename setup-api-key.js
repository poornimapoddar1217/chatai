const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🤖 OpenAI API Key Setup\n');
console.log('To get your API key:');
console.log('1. Visit: https://platform.openai.com/api-keys');
console.log('2. Sign up or log in');
console.log('3. Click "Create new secret key"');
console.log('4. Copy your API key\n');

rl.question('Paste your OpenAI API key here: ', (apiKey) => {
  const trimmedKey = apiKey.trim();
  
  if (!trimmedKey || trimmedKey === 'your-api-key-here') {
    console.log('\n❌ Invalid API key. Please provide a valid key.');
    rl.close();
    return;
  }

  const envContent = `OPENAI_API_KEY=${trimmedKey}\nPORT=3001\n`;
  
  fs.writeFileSync('.env', envContent, 'utf8');
  console.log('\n✅ API key saved successfully!');
  console.log('📝 Restart your server with: npm start\n');
  rl.close();
});

