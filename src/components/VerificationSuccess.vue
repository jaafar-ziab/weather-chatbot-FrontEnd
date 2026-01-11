<script setup>
import { CheckCircle } from 'lucide-vue-next';
import { NButton } from 'naive-ui';

const emit = defineEmits(['go-to-login']);

const handleGoToLogin = () => {
  emit('go-to-login');
};
</script>

<template>
  <div style="width: 100%; max-width: 500px; margin: 0 auto; text-align: center;">
    <!-- Success Icon -->
    <div style="width: 120px; height: 120px; margin: 0 auto 2rem; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 60px rgba(16, 185, 129, 0.3);">
      <CheckCircle size="60" style="color: white;" />
    </div>

    <!-- Success Message -->
    <h1 style="font-size: 2.5rem; font-weight: bold; margin: 0 0 1rem 0; color: white;">
      Email Verified! 🎉
    </h1>
    
    <p style="color: #9ca3af; font-size: 1.125rem; margin: 0 0 0.5rem 0;">
      Your email has been successfully verified.
    </p>
    
    <p style="color: #6b7280; font-size: 0.875rem; margin: 0 0 2rem 0;">
      You can now login and start using the weather assistant.
    </p>

    <!-- Login Button -->
    <n-button
      type="success"
      size="large"
      @click="handleGoToLogin"
      style="padding: 0 3rem; height: 52px; font-size: 1rem; font-weight: 600;"
    >
      Continue to Login
    </n-button>

    <!-- Decorative elements -->
    <div style="margin-top: 3rem; display: flex; justify-content: center; gap: 0.5rem;">
      <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: bounce 1s infinite;"></div>
      <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: bounce 1s infinite 0.2s;"></div>
      <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: bounce 1s infinite 0.4s;"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

:deep(.n-button--success-type) {
  background: linear-gradient(135deg, #10b981, #059669) !important;
  border: none !important;
}

:deep(.n-button--success-type:hover) {
  background: linear-gradient(135deg, #059669, #047857) !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
}
</style>