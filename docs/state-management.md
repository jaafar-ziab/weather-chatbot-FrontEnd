### Reactive State Pattern

Component State:
```js
import { ref } from 'vue';

const messages = ref([]);
const isLoading = ref(false);
const sessionId = ref(null);
```

Shared State (via composable):
```js
// useChat.js
export function useChat() {
  const messages = ref([]);
  
  return {
    messages,
    // ... methods
  };
}

// Component
import { useChat } from '@/composables/useChat';
const { messages } = useChat();

### Data Flow

User Action
    │
    ▼
Component Method
    │
    ▼
Update Local State (ref)
    │
    ▼
API Call (if needed)
    │
    ▼
Update State with Response
    │
    ▼
Vue Reactivity System
    │
    ▼
DOM Update
```

localStorage Pattern

Write:
```js
localStorage.setItem('access_token', token);
```

Read:
```js
const token = localStorage.getItem('access_token');
```

Clear:
```js
localStorage.removeItem('access_token');
// or
localStorage.clear();
```