<script setup>
import { ref, onMounted } from 'vue';
import { MessageSquare, Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { NButton, NScrollbar } from 'naive-ui';
import { authService } from '../services/authService';

const emit = defineEmits(['new-chat', 'load-session', 'delete-session']);

const props = defineProps({
  currentSessionId: {
    type: String,
    default: null
  }
});

const sessions = ref([]);
const loading = ref(false);
const isCollapsed = ref(false);

const loadSessions = async () => {
  loading.value = true;
  try {
    const data = await authService.getSessions();
    sessions.value = data.sessions || [];
    console.log('✅ Loaded sessions:', sessions.value.length);
  } catch (error) {
    console.error('❌ Failed to load sessions:', error);
  } finally {
    loading.value = false;
  }
};

const handleNewChat = () => {
  emit('new-chat');
};

const handleLoadSession = (sessionId) => {
  emit('load-session', sessionId);
};

const handleDeleteSession = async (sessionId, event) => {
  event.stopPropagation();
  if (confirm('Delete this conversation?')) {
    try {
      await authService.deleteSession(sessionId);
      await loadSessions();
      emit('delete-session', sessionId);
      console.log('✅ Session deleted:', sessionId);
    } catch (error) {
      console.error('❌ Failed to delete session:', error);
    }
  }
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

onMounted(() => {
  loadSessions();
});
</script>

<template>
  <div 
    :style="{
      width: isCollapsed ? '60px' : '280px',
      transition: 'width 0.3s ease',
      background: '#0f172a',
      borderRight: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }"
  >
    <!-- Toggle Button -->
    <button
      @click="toggleSidebar"
      :style="{
        position: 'absolute',
        right: '-12px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '24px',
        height: '48px',
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '0 8px 8px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        color: '#94a3b8'
      }"
    >
      <ChevronRight v-if="isCollapsed" size="16" />
      <ChevronLeft v-else size="16" />
    </button>

    <!-- Header -->
    <div :style="{ padding: '1rem', borderBottom: '1px solid #1e293b' }">
      <n-button
        type="primary"
        block
        size="large"
        @click="handleNewChat"
        :style="{ height: '48px' }"
      >
        <template #icon>
          <Plus size="20" />
        </template>
        <span v-if="!isCollapsed">New Chat</span>
      </n-button>
    </div>

    <!-- Sessions List -->
    <div style="flex: 1; overflow: hidden;">
      <n-scrollbar style="height: 100%;">
        <div style="padding: 0.5rem;">
          
          <!-- Loading State -->
          <div v-if="loading" style="padding: 2rem; text-align: center; color: #64748b;">
            <div style="animation: spin 1s linear infinite; display: inline-block;">⚙️</div>
            <p v-if="!isCollapsed" style="margin-top: 0.5rem; font-size: 0.875rem;">Loading...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="sessions.length === 0 && !isCollapsed" style="padding: 2rem 1rem; text-align: center; color: #64748b;">
            <MessageSquare size="32" style="margin: 0 auto 1rem; opacity: 0.5;" />
            <p style="font-size: 0.875rem;">No conversations yet</p>
            <p style="font-size: 0.75rem; margin-top: 0.5rem;">Start a new chat to begin</p>
          </div>

          <!-- Sessions -->
          <div
            v-for="session in sessions"
            :key="session.id"
            @click="handleLoadSession(session.id)"
            :style="{
              padding: isCollapsed ? '0.75rem 0.5rem' : '0.75rem 1rem',
              marginBottom: '0.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              background: currentSessionId === session.id ? '#1e293b' : 'transparent',
              border: '1px solid',
              borderColor: currentSessionId === session.id ? '#334155' : 'transparent',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              position: 'relative'
            }"
            :class="{ 'session-item': true }"
          >
            <MessageSquare 
              size="18" 
              :style="{ 
                color: currentSessionId === session.id ? '#3b82f6' : '#64748b',
                flexShrink: 0
              }" 
            />
            
            <div v-if="!isCollapsed" style="flex: 1; min-width: 0;">
              <div style="color: #e2e8f0; font-size: 0.875rem; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                {{ session.title || 'New Conversation' }}
              </div>
              <div style="color: #64748b; font-size: 0.75rem; margin-top: 0.25rem;">
                {{ formatDate(session.updated_at) }} · {{ session.message_count }} msgs
              </div>
            </div>

            <button
              v-if="!isCollapsed"
              @click="handleDeleteSession(session.id, $event)"
              :style="{
                padding: '0.25rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b',
                opacity: 0,
                transition: 'opacity 0.2s'
              }"
              class="delete-btn"
            >
              <Trash2 size="16" />
            </button>
          </div>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.session-item:hover {
  background: #1e293b !important;
}

.session-item:hover .delete-btn {
  opacity: 1 !important;
}

.delete-btn:hover {
  color: #ef4444 !important;
}
</style>