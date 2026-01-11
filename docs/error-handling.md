## Error Types
# Network Errors:
```js
try {
  const response = await fetch(url);
} catch (error) {
  // Network failure, backend down
  console.error('Connection failed:', error);
  displayError('Unable to connect to server');
}
```

# HTTP Errors:
```js
if (!response.ok) {
  const error = await response.json();
  throw new Error(error.detail);
}
```

# Validation Errors:
```js
if (!email.value || !password.value) {
  error.value = 'Please fill in all fields';
  return;
}
```

## User-Facing Error Messages

# Authentication:
 * "Please fill in all fields"
 * "Login failed. Please check your credentials."
 * "Please verify your email before logging in"
 * "Session expired. Please login again."

# Chat:
 * "Sorry, I couldn't reach the backend service"
 * "Failed to load session"
 * "Failed to delete session"

# Registration:
 * "Username must be at least 3 characters"
 * "Password must be at least 6 characters"
 * "Passwords do not match"
 * "Please enter a valid email address"

## Error Display Components

Alert Component (Naive UI):
```vue
<n-alert
  v-if="error"
  type="error"
  :title="error"
  closable
  @close="error = ''"
/>
```

Inline Errors:
```vue
<div v-if="error" style="color: #ef4444;">
  {{ error }}
</div>
```