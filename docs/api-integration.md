Base Configuration
```js
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
```

### Endpoints

**Authentication Endpoints**

# POST /register
```js
Body: {
  email: string,
  username: string,
  password: string
}

Response: {
  message: string,
  user_id: string
}
```

# POST /login
```js
Body: {
  email: string,
  password: string
}

Response: {
  access_token: string,
  user_id: string,
  username: string,
  is_verified: boolean
}
```

# POST /verify-email
```js
Body: {
  token: string
}

Response: {
  message: string
}
```

# GET /me
```js
Headers: {
  Authorization: "Bearer {token}"
}

Response: {
  user_id: string,
  username: string,
  email: string,
  is_verified: boolean
}
```

**Chat Endpoints**

# POST /chat

```js
Headers: {
  Authorization: "Bearer {token}",
  Content-Type: "application/json"
}

Body: {
  message: string,
  session_id?: string  // Optional, for continuing conversation
}

Response: {
  response: string,
  session_id: string,
  history?: Array<Message>
}
```

# GET /sessions
javascript
```js
Headers: {
  Authorization: "Bearer {token}"
}

Response: {
  sessions: [
    {
      id: string,
      title: string,
      updated_at: string,
      message_count: number
    }
  ]
}
```

# GET /sessions/{session_id}
javascript
```js
Headers: {
  Authorization: "Bearer {token}"
}

Response: {
  id: string,
  title: string,
  messages: [
    {
      role: "user" | "assistant",
      content: string
    }
  ]
}
```

DELETE /sessions/{session_id}
javascript
```js
Headers: {
  Authorization: "Bearer {token}"
}

Response: {
  message: string
}
```

Error Handling

HTTP Status Codes:
 * 200: Success
 * 401: Unauthorized (triggers logout)
 * 400: Bad request (validation error)
 * 404: Not found
 * 500: Server error

Error Response Format:
```js
{
  detail: string  // Error message
}
```

Client-side Handling:
```js
try {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    if (response.status === 401) {
      authService.logout();
      throw new Error('Session expired');
    }
    
    const error = await response.json();
    throw new Error(error.detail || 'Request failed');
  }
  
  return await response.json();
} catch (error) {
  console.error('API Error:', error);
  // Display user-friendly message
}
```