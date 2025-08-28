<script setup>
import { ref, nextTick } from 'vue';
import { SendHorizonal, Bot, User } from 'lucide-vue-next';
import { NInput, NButton, NScrollbar, NConfigProvider, darkTheme } from 'naive-ui'

// Welcome message from the Ollama models.
const messages = ref([
  { text: "Hello! I'm your AI assistant. How can I help you today?", sender: "ollama" },
]);

// State to hold the current value of the input field.
const inputValue = ref('');

// Ref for the element that we will scroll into view.
const messagesEndRef = ref(null);

// Function to automatically scroll to the bottom of the chat window.
const scrollToBottom = async () => {
  await nextTick();
  if (messagesEndRef.value) {
    messagesEndRef.value.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleSend = async () => {
  if (inputValue.value.trim() === '') return;

  const userMessage = { text: inputValue.value, sender: "user" };
  messages.value.push(userMessage);
  inputValue.value = '';
  scrollToBottom();

  try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage.text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const lastMessage = data.history[data.history.length - 1];
    const botResponse = { text: lastMessage.content, sender: "ollama" };
    messages.value.push(botResponse);
    scrollToBottom();
  } catch (error) {
    console.error("Error calling backend:", error);
    messages.value.push({
      text: "Sorry, I couldn't reach the backend service.",
      sender: "ollama",
    });
    scrollToBottom();
  }
};

// Handle key press in the input field, specifically for 'Enter'.
const handleKeyPress = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
};
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <div style="display: flex; flex-direction: column; height: 100vh; width: 100vw; background-color: #1a1a1a; color: white; font-family: system-ui, -apple-system, sans-serif;">
      
      <!-- Header -->
      <header style="flex: none; border-bottom: 1px solid #374151; background-color: #1f2937; padding: 1rem;">
        <div style="max-width: 48rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 2rem; height: 2rem; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center;">
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
                    border: message.sender === 'user' ? 'none' : '1px solid #4b5563'
                  }"
                >
                  {{ message.text }}
                </div>
              </div>

              <!-- Scroll anchor -->
              <div ref="messagesEndRef" />
            </div>
          </div>
        </n-scrollbar>
      </main>

      <!-- Input area -->
      <footer style="flex: none; border-top: 1px solid #374151; background-color: #1f2937; padding: 1rem;">
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
              @click="handleSend"
              :disabled="!inputValue.trim()"
              style="flex-shrink: 0;"
            >
              <template #icon>
                <SendHorizonal size="18" />
              </template>
            </n-button>
          </div>
          
          <!-- Footer text -->
          <div style="font-size: 0.75rem; color: #6b7280; text-align: center; margin-top: 0.5rem;">
            AI can make mistakes. Please verify important information.
          </div>
        </div>
      </footer>
    </div>
  </n-config-provider>
</template>

<style scoped>
/* Ensure proper styling for Naive UI components */
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