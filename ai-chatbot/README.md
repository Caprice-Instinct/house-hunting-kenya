# AI Chatbot for House Hunting

This chatbot helps tenants filter and find rental properties using natural language queries powered by OpenAI.

## Features

- Natural language property search
- Automatic filter extraction from user queries
- Integration with property filtering system
- Responsive chat interface
- Minimizable chat window

## Setup

1. Install dependencies:
```bash
npm install openai
```

2. Add your OpenAI API key to `.env.local`:
```
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

## Usage

The chatbot can understand queries like:
- "Show me 2-bedroom apartments in Nairobi under 50k"
- "I need a house with parking and a garden in Mombasa"
- "Find studios with WiFi and security"
- "Properties between 30k and 80k with swimming pool"

## Integration

The chatbot is integrated into the tenant dashboard and automatically updates the property filters based on user conversations.

## Components

- `Chatbot`: Main chat interface component
- `OpenAIService`: Service for handling OpenAI API calls
- Types: TypeScript interfaces for chat messages and filters