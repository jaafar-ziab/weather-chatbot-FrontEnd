<script setup>
import { Bot } from 'lucide-vue-next';

// Props
defineProps({
  messageCount: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: 'Weather Assistant'
  }
});
</script>

<template>
  <header style="flex: none; border-bottom: 1px solid #374151; background-color: #1f2937; padding: 1rem;">
    <div style="max-width: 48rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 2rem; height: 2rem; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center;">
          <Bot size="18" style="color: white;" />
        </div>
        <h1 style="font-size: 1.125rem; font-weight: 600; margin: 0;">{{ title }}</h1>
      </div>
      <div style="font-size: 0.875rem; color: #9ca3af;">
        {{ messageCount }} messages
      </div>
    </div>
    <!-- Slide 14: Live Demo & Resources -->
<div class="slide">
    <div class="slide-number">Slide 14/15</div>
    <h2>Live Demo & Project Resources</h2>
    
    <h3>Chatbot in Action</h3>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 15px 0;">
        <div style="border: 2px solid #667eea; border-radius: 8px; padding: 10px; background: #f7fafc;">
            <img src="screenshot1.png" alt="Initial greeting" style="width: 100%; border-radius: 4px;">
            <p style="text-align: center; margin-top: 8px; font-size: 13px; color: #4a5568;">
                <strong>1. Initial Greeting</strong><br>
                Chatbot welcomes user and asks how to help
            </p>
        </div>
        <div style="border: 2px solid #667eea; border-radius: 8px; padding: 10px; background: #f7fafc;">
            <img src="screenshot2.png" alt="Weather query" style="width: 100%; border-radius: 4px;">
            <p style="text-align: center; margin-top: 8px; font-size: 13px; color: #4a5568;">
                <strong>2. Weather Query</strong><br>
                User requests current weather for a city
            </p>
        </div>
        <div style="border: 2px solid #667eea; border-radius: 8px; padding: 10px; background: #f7fafc;">
            <img src="screenshot3.png" alt="Current weather" style="width: 100%; border-radius: 4px;">
            <p style="text-align: center; margin-top: 8px; font-size: 13px; color: #4a5568;">
                <strong>3. Current Weather</strong><br>
                Bot provides weather with follow-up suggestion
            </p>
        </div>
        <div style="border: 2px solid #667eea; border-radius: 8px; padding: 10px; background: #f7fafc;">
            <img src="screenshot4.png" alt="5-day forecast" style="width: 100%; border-radius: 4px;">
            <p style="text-align: center; margin-top: 8px; font-size: 13px; color: #4a5568;">
                <strong>4. 5-Day Forecast</strong><br>
                Detailed forecast with daily breakdown
            </p>
        </div>
    </div>
    
    <h3 style="margin-top: 25px;">Project Resources & Links</h3>
    <div class="feature-list" style="margin-top: 12px;">
        <div class="feature-item" style="background: #e8f4f8; border-left-color: #3b82f6;">
            <strong>🔗 Live Demo</strong>
            <p style="margin-top: 5px;">
                <a href="https://your-chatbot.vercel.app" target="_blank" style="color: #2563eb; text-decoration: underline;">
                    your-chatbot.vercel.app
                </a>
            </p>
            <p style="font-size: 12px; margin-top: 5px;">Try the chatbot live in your browser</p>
        </div>
        
        <div class="feature-item" style="background: #f0fdf4; border-left-color: #10b981;">
            <strong>💻 Backend Repository</strong>
            <p style="margin-top: 5px;">
                <a href="https://github.com/yourusername/weather-chatbot-backend" target="_blank" style="color: #059669; text-decoration: underline;">
                    github.com/yourusername/backend
                </a>
            </p>
            <p style="font-size: 12px; margin-top: 5px;">FastAPI + Gemini + OpenWeather</p>
        </div>
        
        <div class="feature-item" style="background: #fef3c7; border-left-color: #f59e0b;">
            <strong>🎨 Frontend Repository</strong>
            <p style="margin-top: 5px;">
                <a href="https://github.com/yourusername/weather-chatbot-frontend" target="_blank" style="color: #d97706; text-decoration: underline;">
                    github.com/yourusername/frontend
                </a>
            </p>
            <p style="font-size: 12px; margin-top: 5px;">Vue.js + Naive UI components</p>
        </div>
        
        <div class="feature-item" style="background: #fce7f3; border-left-color: #ec4899;">
            <strong>📚 Documentation</strong>
            <p style="margin-top: 5px;">
                <a href="https://github.com/yourusername/weather-chatbot/wiki" target="_blank" style="color: #db2777; text-decoration: underline;">
                    Project Wiki & Setup Guide
                </a>
            </p>
            <p style="font-size: 12px; margin-top: 5px;">Installation and deployment guide</p>
        </div>
    </div>
</div>
  </header>
</template>