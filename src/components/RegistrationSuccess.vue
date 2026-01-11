<script setup>
import { Mail, ArrowLeft } from 'lucide-vue-next';
import { NButton } from 'naive-ui';

const props = defineProps({
  email: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['back-to-login']);

const handleBackToLogin = () => {
  emit('back-to-login');
};
</script>

<template>
  <div style="width: 100%; max-width: 500px; margin: 0 auto; text-align: center;">
    <!-- Email Icon -->
    <div style="width: 120px; height: 120px; margin: 0 auto 2rem; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 60px rgba(59, 130, 246, 0.3); animation: pulse-ring 2s infinite;">
      <Mail size="60" style="color: white;" />
    </div>

    <!-- Title -->
    <h1 style="font-size: 2.5rem; font-weight: bold; margin: 0 0 1rem 0; color: white;">
      Check Your Email 📧
    </h1>
    
    <p style="color: #9ca3af; font-size: 1.125rem; margin: 0 0 0.5rem 0;">
      We've sent a verification link to
    </p>
    
    <p style="color: #3b82f6; font-size: 1.125rem; font-weight: 600; margin: 0 0 2rem 0;">
      {{ email }}
    </p>

    <!-- Instructions -->
    <div style="background: #1f2937; padding: 1.5rem; border-radius: 1rem; border: 1px solid #374151; margin-bottom: 2rem; text-align: left;">
      <h3 style="color: white; font-size: 1rem; font-weight: 600; margin: 0 0 1rem 0;">
        Next Steps:
      </h3>
      <ol style="color: #9ca3af; font-size: 0.875rem; line-height: 1.8; margin: 0; padding-left: 1.5rem;">
        <li>Check your email inbox (and spam folder)</li>
        <li>Click the verification link in the email</li>
        <li>You'll be redirected back here</li>
        <li>Login with your credentials</li>
      </ol>
    </div>

    <!-- Back to Login Button -->
    <n-button
      @click="handleBackToLogin"
      secondary
      size="large"
      style="width: 100%; height: 52px; font-size: 1rem; font-weight: 600;"
    >
      <template #icon>
        <ArrowLeft size="20" />
      </template>
      Back to Login
    </n-button>

    <!-- Note -->
    <p style="color: #6b7280; font-size: 0.75rem; margin-top: 2rem;">
      Didn't receive the email? Check your spam folder or contact support.
    </p>
  </div>
</template>

<style scoped>
@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 30px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

:deep(.n-button--secondary-type) {
  background-color: #374151 !important;
  border: 1px solid #4b5563 !important;
  color: white !important;
}

:deep(.n-button--secondary-type:hover) {
  background-color: #4b5563 !important;
}
</style>