# Core Components

AuthWrapper.vue
- Ensures user is authenticated before showing `ChatApp`.

ChatHeader.vue
- Displays conversation title and top-level controls.

ConversationSidebar.vue
- Lists conversations, allows creation and selection.

ChatMessage.vue
- Renders incoming and outgoing messages, handles formatting and timestamps.

ChatInput.vue
- Message composer; debounced typing events and send action.

LoginForm.vue / RegisterForm.vue
- Handles form validation and calls to `authService`.

Design guidance:
- Keep components focused, accept props and emit events rather than modifying global state.
