<script setup>
import { useChat } from '@/composables/UseChat.js'
import { NInput, NButton, NScrollbar, NConfigProvider, darkTheme } from 'naive-ui'
import { SendHorizonal, Bot, User } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  messages,
  inputValue,
  isLoading,
  handleKeyPress,
  sendMessage,
  messagesEndRef
} = useChat()

// Helper: parse links safely (returns array of parts)
function parseMessage(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', text: text.slice(lastIndex, match.index) })
    }
    parts.push({ type: 'link', text: match[0], href: match[0] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', text: text.slice(lastIndex) })
  }

  return parts
}

console.log("🚀 ChatApp.vue loaded — useChat() is active")
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <div
      style="display: flex; flex-direction: column; height: 100vh; width: 100vw; background-color: #1a1a1a; color: white; font-family: system-ui, -apple-system, sans-serif;"
    >
      <!-- Header -->
      <header
        style="flex: none; border-bottom: 1px solid #374151; background-color: #1f2937; padding: 1rem;"
      >
        <div
          style="max-width: 48rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;"
        >
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div
              style="width: 2rem; height: 2rem; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center;"
            >
              <Bot size="18" style="color: white;" />
            </div>
            <h1 style="font-size: 1.125rem; font-weight: 600; margin: 0;">Weather Assistant</h1>
          </div>
          <div style="font-size: 0.875rem; color: #9ca3af;">
            {{ messages.length }} messages
          </div>
        </div>
      </header>

      <!-- Main chat area -->
      <main style="flex: 1; overflow: hidden;">
        <n-scrollbar style="height: 100%;">
          <div style="max-width: 48rem; margin: 0 auto; padding: 1.5rem;">
            <div style="display: flex; flex-direction: column; gap: 2rem;">
              <div
                v-for="(message, index) in messages"
                :key="index"
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
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }"
                >
                  <template v-for="(part, i) in parseMessage(message.text)" :key="i">
                    <template v-if="part.type === 'link'">
                      <a
                        :href="part.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        style="color: #93c5fd; text-decoration: underline;"
                      >
                        {{ part.text }}
                      </a>
                    </template>
                    <template v-else>
                      {{ part.text }}
                    </template>
                  </template>
                </div>
              </div>

              <!-- Scroll anchor -->
              <div ref="messagesEndRef" />
            </div>
          </div>
        </n-scrollbar>
      </main>

      <!-- Input area -->
      <footer
        style="flex: none; border-top: 1px solid #374151; background-color: #1f2937; padding: 1rem;"
      >
        <div style="max-width: 48rem; margin: 0 auto;">
          <div style="position: relative; display: flex; align-items: flex-end; gap: 0.75rem;">
            <div style="flex: 1; position: relative;">
              <n-input
                v-model:value="inputValue"
                type="textarea"
                placeholder="Type your message here..."
                :autosize="{ minRows: 1, maxRows: 4 }"
                @keydown="handleKeyPress"
                style="width: 100%;"
              />
            </div>

            <n-button
              type="primary"
              circle
              size="medium"
              @click="sendMessage"
              :disabled="!inputValue.trim() || isLoading"
              style="flex-shrink: 0;"
            >
              <template #icon>
                <SendHorizonal size="18" />
              </template>
            </n-button>
          </div>

          <!-- Footer text -->
          <div
            style="font-size: 0.75rem; color: #6b7280; text-align: center; margin-top: 0.5rem;"
          >
          </div>
        </div>
      </footer>
    </div>
  </n-config-provider>
</template>

<style scoped>
:deep(.n-input) {
  background-color: #374151 !important;
  border: 1px solid #4b5563 !important;
  border-radius: 0.75rem !important;
}
:deep(.n-input .n-input-wrapper) {
  background-color: #374151 !important;
}
:deep(.n-input .n-input__input-el) {
  color: white !important;
  background-color: transparent !important;
}
:deep(.n-input .n-input__placeholder) {
  color: #9ca3af !important;
}
:deep(.n-input:focus-within) {
  border-color: #3b82f6 !important;
}
:deep(.n-button--primary-type) {
  background-color: #2563eb !important;
}
:deep(.n-button--primary-type:hover) {
  background-color: #1d4ed8 !important;
}
:deep(.n-button--primary-type:disabled) {
  background-color: #4b5563 !important;
  opacity: 0.5;
}
</style>