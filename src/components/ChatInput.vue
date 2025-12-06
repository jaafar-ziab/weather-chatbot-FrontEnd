<script setup>
import { SendHorizonal } from 'lucide-vue-next';
import { NInput, NButton } from 'naive-ui';

defineProps({
  inputValue: {
    type: String,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:inputValue', 'send', 'keypress']);

const handleInput = (value) => {
  emit('update:inputValue', value);
};

const handleSend = () => {
  emit('send');
};

const handleKeyPress = (e) => {
  emit('keypress', e);
};
</script>

<template>
  <footer style="flex: none; border-top: 1px solid #374151; background-color: #1f2937; padding: 1rem;">
    <div style="max-width: 48rem; margin: 0 auto;">
      <div style="position: relative; display: flex; align-items: flex-end; gap: 0.75rem;">
        <div style="flex: 1; position: relative;">
          <n-input
            :value="inputValue"
            @update:value="handleInput"
            type="textarea"
            placeholder="Type your message here..."
            :autosize="{ minRows: 1, maxRows: 4 }"
            @keydown="handleKeyPress"
            :disabled="isLoading"
            style="width: 100%;"
          />
        </div>
        
        <n-button
          type="primary"
          circle
          size="medium"
          @click="handleSend"
          :disabled="!inputValue.trim() || isLoading"
          :loading="isLoading"
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