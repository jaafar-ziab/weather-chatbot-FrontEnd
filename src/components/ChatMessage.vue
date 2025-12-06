<script setup>
import { Bot, User } from 'lucide-vue-next';

defineProps({
  message: {
    type: Object,
    required: true,
    validator: (message) => {
      return message.text && message.sender;
    }
  }
});
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
      alignItems: 'flex-start',
      gap: '1rem',
      marginLeft: message.sender === 'user' ? '3rem' : '0',
      marginRight: message.sender === 'user' ? '0' : '3rem'
    }"
  >
    <!-- Avatar -->
    <div
      :style="{
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        background: message.sender === 'user' 
          ? '#059669' 
          : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: '0'
      }"
    >
      <Bot v-if="message.sender !== 'user'" size="18" style="color: white;" />
      <User v-else size="18" style="color: white;" />
    </div>
    
    <!-- Message bubble -->
    <div
      :style="{
        padding: '0.875rem 1rem',
        borderRadius: '1rem',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        maxWidth: message.sender === 'user' ? '24rem' : '100%',
        backgroundColor: message.sender === 'user' ? '#2563eb' : '#374151',
        color: 'white',
        border: message.sender === 'user' ? 'none' : '1px solid #4b5563',
        wordWrap: 'break-word'
        whiteSpace: 'pre-wrap', // ✅ PRESERVE newlines and spacing
      }"
    >
      {{ message.text }}
    </div>
</template>