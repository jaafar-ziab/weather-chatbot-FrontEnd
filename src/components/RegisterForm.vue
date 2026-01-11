<script setup>
import { ref } from 'vue';
import { NInput, NButton, NAlert } from 'naive-ui';
import { UserPlus, User, Lock, Mail } from 'lucide-vue-next';
import { authService } from '../services/authService';

const emit = defineEmits(['registration-complete', 'switch-to-login']);

const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');

const validateForm = () => {
  if (!email.value || !username.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields';
    return false;
  }

  if (username.value.length < 3) {
    error.value = 'Username must be at least 3 characters';
    return false;
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters';
    return false;
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email address';
    return false;
  }

  return true;
};

const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    await authService.register(email.value, username.value, password.value);
    console.log('✅ Registration successful!');
    emit('registration-complete', email.value);
  } catch (err) {
    console.error('❌ Registration error:', err);
    error.value = err.message || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleRegister();
  }
};
</script>

<template>
  <div style="width: 100%; max-width: 400px; margin: 0 auto;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 2rem;">
      <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: linear-gradient(135deg, #8b5cf6, #ec4899); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <UserPlus size="40" style="color: white;" />
      </div>
      <h1 style="font-size: 2rem; font-weight: bold; margin: 0 0 0.5rem 0; color: white;">Create Account</h1>
      <p style="color: #9ca3af; margin: 0;">Join to start chatting with your weather assistant</p>
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

    <!-- Register Form -->
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

      <!-- Username Input -->
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; color: #d1d5db; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">
          Username
        </label>
        <div style="position: relative;">
          <div style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #6b7280;">
            <User size="20" />
          </div>
          <n-input
            v-model:value="username"
            placeholder="Choose a username (min 3 characters)"
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
            placeholder="Min 6 characters"
            size="large"
            :disabled="loading"
            @keydown="handleKeyPress"
            show-password-on="click"
            style="padding-left: 2.5rem;"
          />
        </div>
      </div>

      <!-- Confirm Password Input -->
      <div style="margin-bottom: 1.5rem;">
        <label style="display: block; color: #d1d5db; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">
          Confirm Password
        </label>
        <div style="position: relative;">
          <div style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #6b7280; z-index: 1;">
            <Lock size="20" />
          </div>
          <n-input
            v-model:value="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            size="large"
            :disabled="loading"
            @keydown="handleKeyPress"
            show-password-on="click"
            style="padding-left: 2.5rem;"
          />
        </div>
      </div>

      <!-- Register Button -->
      <n-button
        type="primary"
        size="large"
        block
        :loading="loading"
        @click="handleRegister"
        style="margin-bottom: 1rem; height: 48px; font-size: 1rem; font-weight: 600;"
      >
        <template #icon>
          <UserPlus size="20" />
        </template>
        Create Account
      </n-button>

      <!-- Login Link -->
      <div style="text-align: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #374151;">
        <span style="color: #9ca3af; font-size: 0.875rem;">Already have an account? </span>
        <button
          @click="emit('switch-to-login')"
          style="color: #8b5cf6; font-weight: 600; background: none; border: none; cursor: pointer; font-size: 0.875rem; text-decoration: underline;"
        >
          Sign in
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
  background: linear-gradient(135deg, #8b5cf6, #ec4899) !important;
  border: none !important;
}

:deep(.n-button--primary-type:hover) {
  background: linear-gradient(135deg, #7c3aed, #db2777) !important;
}

:deep(.n-alert) {
  border-radius: 0.5rem !important;
}
</style>