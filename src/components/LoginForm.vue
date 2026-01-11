<script setup>
import { ref } from 'vue';
import { NInput, NButton, NAlert } from 'naive-ui';
import { LogIn, Mail, Lock } from 'lucide-vue-next';
import { authService } from '../services/authService';

const emit = defineEmits(['login-success', 'switch-to-register']);

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    await authService.login(email.value, password.value);
    console.log('✅ Login successful!');
    emit('login-success');
  } catch (err) {
    console.error('❌ Login error:', err);
    error.value = err.message || 'Login failed. Please check your credentials.';
  } finally {
    loading.value = false;
  }
};

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleLogin();
  }
};
</script>

<template>
  <div style="width: 100%; max-width: 400px; margin: 0 auto;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 2rem;">
      <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <LogIn size="40" style="color: white;" />
      </div>
      <h1 style="font-size: 2rem; font-weight: bold; margin: 0 0 0.5rem 0; color: white;">Welcome Back</h1>
      <p style="color: #9ca3af; margin: 0;">Sign in to your weather assistant</p>
    </div>

    <!-- Error Alert -->
    <n-alert
      v-if="error"
      type="error"
      :title="error"
      closable
      @close="error = ''"
      style="margin-bottom: 1.5rem;"
    />

    <!-- Login Form -->
    <div style="background: #1f2937; padding: 2rem; border-radius: 1rem; border: 1px solid #374151;">
      
      <!-- Email Input -->
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; color: #d1d5db; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">
          Email Address
        </label>
        <div style="position: relative;">
          <div style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #6b7280;">
            <Mail size="20" />
          </div>
          <n-input
            v-model:value="email"
            type="email"
            placeholder="your.email@example.com"
            size="large"
            :disabled="loading"
            @keydown="handleKeyPress"
            style="padding-left: 2.5rem;"
          />
        </div>
      </div>

      <!-- Password Input -->
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; color: #d1d5db; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">
          Password
        </label>
        <div style="position: relative;">
          <div style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #6b7280; z-index: 1;">
            <Lock size="20" />
          </div>
          <n-input
            v-model:value="password"
            type="password"
            placeholder="Enter your password"
            size="large"
            :disabled="loading"
            @keydown="handleKeyPress"
            show-password-on="click"
            style="padding-left: 2.5rem;"
          />
        </div>
      </div>

      <!-- Login Button -->
      <n-button
        type="primary"
        size="large"
        block
        :loading="loading"
        @click="handleLogin"
        style="margin-bottom: 1rem; height: 48px; font-size: 1rem; font-weight: 600;"
      >
        <template #icon>
          <LogIn size="20" />
        </template>
        Sign In
      </n-button>

      <!-- Register Link -->
      <div style="text-align: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #374151;">
        <span style="color: #9ca3af; font-size: 0.875rem;">Don't have an account? </span>
        <button
          @click="emit('switch-to-register')"
          style="color: #3b82f6; font-weight: 600; background: none; border: none; cursor: pointer; font-size: 0.875rem; text-decoration: underline;"
        >
          Sign up
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.n-input) {
  background-color: #374151 !important;
  border: 1px solid #4b5563 !important;
  border-radius: 0.5rem !important;
}

:deep(.n-input .n-input__input-el) {
  color: white !important;
  padding-left: 2.5rem !important;
}

:deep(.n-input .n-input__placeholder) {
  color: #6b7280 !important;
}

:deep(.n-button--primary-type) {
  background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
  border: none !important;
}

:deep(.n-button--primary-type:hover) {
  background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
}

:deep(.n-alert) {
  border-radius: 0.5rem !important;
}
</style>