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
  </header>
</template>