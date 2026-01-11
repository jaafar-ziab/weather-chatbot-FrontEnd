<script setup>
import { ref, onMounted, watch } from 'vue';
import { NScrollbar, NConfigProvider, darkTheme, NButton } from 'naive-ui';
import { LogOut } from 'lucide-vue-next';
import { useChat } from './composables/useChat.js';
import { authService } from './services/authService.js';
import ChatMessage from './components/ChatMessage.vue';
import ChatInput from './components/ChatInput.vue';
//import VisualLogger from './components/VisualLogger.vue';
import AuthWrapper from './components/AuthWrapper.vue';
import ConversationSidebar from './components/ConversationSidebar.vue';

console.log("🚀 ChatApp.vue is loading!");

const isAuthenticated = ref(false);
const username = ref('');

// Use the chat composable
const {
  messages,
  inputValue,
  isLoading,
  messagesEndRef,
  sendMessage,
  handleKeyPress,
  resetConversation,
  currentSessionId,
  loadSessionMessages
} = useChat();

// Check authentication on mount
onMounted(() => {
  if (authService.isAuthenticated()) {
    isAuthenticated.value = true;
    username.value = authService.getUsername();
    console.log('✅ User is authenticated:', username.value);
  } else {
    console.log('❌ User not authenticated - showing login page');
  }
});

const handleAuthSuccess = () => {
  isAuthenticated.value = true;
  username.value = authService.getUsername();
  console.log('✅ Authentication successful:', username.value);
};

const handleLogout = () => {
  authService.logout();
  isAuthenticated.value = false;
  username.value = '';
  resetConversation();
  console.log('👋 User logged out');
};

const handleNewChat = () => {
  resetConversation();
  console.log('🆕 Starting new conversation');
};

const handleLoadSession = async (sessionId) => {
  console.log('📂 Loading session:', sessionId);
  await loadSessionMessages(sessionId);
};

const handleDeleteSession = (sessionId) => {
  if (currentSessionId.value === sessionId) {
    resetConversation();
  }
};

console.log("✅ ChatApp.vue setup complete!");
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <!-- Show login/register if not authenticated -->
    <AuthWrapper 
      v-if="!isAuthenticated"
      @auth-success="handleAuthSuccess"
    />

    <!-- Show chat app if authenticated -->
    <div v-else style="display: flex; height: 100vh; width: 100vw; background-color: #1a1a1a; color: white; font-family: system-ui, -apple-system, sans-serif;">
      
      <!-- Visual Logger Component -->
      <VisualLogger />

      <!-- Conversation Sidebar -->
      <ConversationSidebar
        :current-session-id="currentSessionId"
        @new-chat="handleNewChat"
        @load-session="handleLoadSession"
        @delete-session="handleDeleteSession"
      />
      
      <!-- Main Chat Area -->
      <div style="flex: 1; display: flex; flex-direction: column;">
        
        <!-- Header with user info and logout button -->
        <header style="flex: none; border-bottom: 1px solid #374151; background-color: #1f2937;">
          <div style="max-width: 100%; margin: 0 auto; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1rem; color: white;">
                {{ username.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h1 style="font-size: 1.125rem; font-weight: 600; margin: 0;">Weather Assistant</h1>
                <p style="font-size: 0.75rem; color: #9ca3af; margin: 0;">Logged in as {{ username }}</p>
              </div>
            </div>
            <n-button
              @click="handleLogout"
              size="small"
              secondary
              style="display: flex; align-items: center; gap: 0.5rem;"
            >
              <template #icon>
                <LogOut size="16" />
              </template>
              Logout
            </n-button>
          </div>
        </header>

        <!-- Main chat area -->
        <main style="flex: 1; overflow: hidden;">
          <n-scrollbar style="height: 100%;">
            <div style="max-width: 48rem; margin: 0 auto; padding: 1.5rem;">
              <div style="display: flex; flex-direction: column; gap: 2rem;">
                
                <!-- Messages -->
                <ChatMessage
                  v-for="(message, index) in messages"
                  :key="index"
                  :message="message"
                />

                <!-- Loading indicator -->
                <div 
                  v-if="isLoading"
                  style="display: flex; align-items: center; gap: 1rem;"
                >
                  <div style="width: 2rem; height: 2rem; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center;">
                    <div style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                  </div>
                  <div style="padding: 0.875rem 1rem; border-radius: 1rem; background-color: #374151; color: #9ca3af; font-size: 0.875rem;">
                    Typing...
                  </div>
                </div>

                <!-- Scroll anchor -->
                <div ref="messagesEndRef" />
              </div>
            </div>
          </n-scrollbar>
        </main>

        <!-- Input area -->
        <ChatInput
          v-model:input-value="inputValue"
          :is-loading="isLoading"
          @send="sendMessage"
          @keypress="handleKeyPress"
        />
      </div>
    </div>
  </n-config-provider>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>