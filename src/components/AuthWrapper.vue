<script setup>
import { ref, onMounted } from 'vue';
import { NConfigProvider, darkTheme } from 'naive-ui';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';
import RegistrationSuccess from './RegistrationSuccess.vue';
import VerificationSuccess from './VerificationSuccess.vue';
import { authService } from '../services/authService';

const emit = defineEmits(['auth-success']);

const currentView = ref('login'); // 'login', 'register', 'registration-success', 'verification-success'
const registeredEmail = ref('');

// Check for email verification token in URL
onMounted(() => {
  console.log('🔍 Checking URL for verification token...');
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    console.log('🔑 Verification token found:', token.substring(0, 20) + '...');
    verifyEmail(token);
  } else {
    console.log('ℹ️ No token in URL');
  }
});

const verifyEmail = async (token) => {
  console.log('📧 Attempting to verify email with token...');
  try {
    const result = await authService.verifyEmail(token);
    console.log('✅ Email verified successfully:', result);
    currentView.value = 'verification-success';
    
    // Clean URL (remove token from address bar)
    window.history.replaceState({}, document.title, window.location.pathname);
  } catch (error) {
    console.error('❌ Verification failed:', error);
    alert('Email verification failed: ' + error.message + '\nPlease try clicking the link again or contact support.');
    currentView.value = 'login';
  }
};

const handleLoginSuccess = () => {
  console.log('✅ User logged in successfully');
  emit('auth-success');
};

const handleRegistrationComplete = (email) => {
  console.log('✅ Registration complete for:', email);
  registeredEmail.value = email;
  currentView.value = 'registration-success';
};

const switchToRegister = () => {
  console.log('🔄 Switching to register view');
  currentView.value = 'register';
};

const switchToLogin = () => {
  console.log('🔄 Switching to login view');
  currentView.value = 'login';
};
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <div style="min-height: 100vh; width: 100vw; background: linear-gradient(135deg, #1a1a1a 0%, #0f172a 100%); display: flex; align-items: center; justify-content: center; padding: 2rem; font-family: system-ui, -apple-system, sans-serif;">
      
      <!-- Animated Background -->
      <div style="position: absolute; inset: 0; overflow: hidden; opacity: 0.1;">
        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, #3b82f6 0%, transparent 50%); animation: pulse 15s ease-in-out infinite;"></div>
        <div style="position: absolute; bottom: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle, #8b5cf6 0%, transparent 50%); animation: pulse 20s ease-in-out infinite reverse;"></div>
      </div>

      <!-- Auth Form Container -->
      <div style="position: relative; z-index: 1; width: 100%; max-width: 500px;">
        
        <!-- Login Form -->
        <transition name="fade" mode="out-in">
          <LoginForm
            v-if="currentView === 'login'"
            key="login"
            @login-success="handleLoginSuccess"
            @switch-to-register="switchToRegister"
          />
          
          <!-- Register Form -->
              <RegisterForm
                v-else-if="currentView === 'register'"
                key="register"
                @registration-complete="handleRegistrationComplete"
                @switch-to-login="switchToLogin"
              />

          <!-- Registration Success (Check Email) -->
          <RegistrationSuccess
            v-else-if="currentView === 'registration-success'"
            key="registration-success"
            :email="registeredEmail"
            @back-to-login="switchToLogin"
          />

          <!-- Verification Success -->
          <VerificationSuccess
            v-else-if="currentView === 'verification-success'"
            key="verification-success"
            @go-to-login="switchToLogin"
          />
        </transition>
      </div>
    </div>
  </n-config-provider>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    transform: scale(1) translate(0, 0);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.1) translate(-5%, -5%);
    opacity: 0.15;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>