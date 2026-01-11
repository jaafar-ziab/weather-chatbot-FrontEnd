# Composables

`UseChat.js` (concept):

- Exposes reactive state: `messages`, `conversations`, `loading`, `error`.
- Actions: `fetchConversations()`, `fetchMessages(conversationId)`, `sendMessage(payload)`, `startPolling()`.
- Keep side effects (network) inside composables but separate pure helpers to ease testing.

Testing:
- Mock service calls and assert state transitions.
