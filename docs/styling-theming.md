### Design System

# Color Palette:
```css
/* Dark Theme */
--bg-primary: #1a1a1a;
--bg-secondary: #1f2937;
--bg-tertiary: #374151;
--border-color: #4b5563;

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: #9ca3af;
--text-tertiary: #6b7280;

/* Accent Colors */
--blue-500: #3b82f6;
--blue-600: #2563eb;
--purple-500: #8b5cf6;
--green-500: #10b981;
--red-500: #ef4444;

/* Gradients */
--gradient-blue: linear-gradient(135deg, #3b82f6, #8b5cf6);
--gradient-purple: linear-gradient(135deg, #8b5cf6, #ec4899);
--gradient-green: linear-gradient(135deg, #10b981, #059669);
```


# Component Styling Patterns

Naive UI Customization:
```vue
<style scoped>
:deep(.n-input) {
  background-color: #374151 !important;
  border: 1px solid #4b5563 !important;
  border-radius: 0.75rem !important;
}

:deep(.n-button--primary-type) {
  background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
}
</style>
```

# Animations

Pulse Animation:
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

Bounce Animation:
```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

Fade Transition:
```js
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
```