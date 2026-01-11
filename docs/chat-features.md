### Real-time Messaging

Message Structure:
```js
{
  text: "Message content",
  sender: "user" | "gemini"
}
```

Message Flow:
1. User types in ChatInput
2. Presses Enter or clicks Send
3. Message added to local state
4. API request sent to backend
5. Loading indicator shown
6. Response received and displayed
7. Session ID updated/saved

### Session Management

Session Lifecycle:
New Conversation:
└─ sessionId = null
   └─ First message sent
      └─ Backend creates session
         └─ sessionId returned
            └─ Stored for subsequent messages

Loading Existing Session:
└─ User clicks session in sidebar
   └─ loadSessionMessages(sessionId)
      └─ Fetch session data
         └─ Populate messages
            └─ Set currentSessionId

Deleting Session:
└─ User clicks delete
   └─ Confirmation dialog
      └─ DELETE /sessions/{id}
         └─ Remove from sidebar
            └─ Reset if current session

Message Formatting

Text Processing:
```js
const formattedMessage = botMessage
  .replace(/\n{2,}/g, '<br><br>')  // Paragraphs
  .replace(/\n/g, '<br>')          // Line breaks
  .replace(/•/g, '•&nbsp;');       // Bullet spacing
```

Display Features:
 * Pre-wrap whitespace
 * Word wrapping
 * Scrollable container
 * Auto-scroll to latest

