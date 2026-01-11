## Application Flow

┌─────────────────────────────────────────────────────────────┐
│                         App.vue                             │
│                    (Root Component)                         │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      ChatApp.vue                            │
│              (Main Application Container)                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Authentication Check                                  │ │
│  └──────────┬─────────────────────────────────────────────┘ │
│             │                                               │
│    ┌────────▼────────┐                                      │
│    │  Authenticated? │                                      │
│    └────────┬────────┘                                      │
│             │                                               │
│      ┌──────┴──────┐                                        │
│      │             │                                        │
│   NO │             │ YES                                    │
│      ▼             ▼                                        │
│ ┌───────────┐ ┌──────────────────────────────────────────┐  │
│ │AuthWrapper│ │ Chat Interface                           │  │
│ │           │ │ ┌────────────────┐  ┌─────────────────┐  │  │
│ │ ├─Login   │ │ │Conversation    │  │   Chat Area     │  │  │
│ │ ├─Register│ │ │Sidebar         │  │   - Messages    │  │  │
│ │ ├─Verify  │ │ │ - Sessions     │  │   - Input       │  │  │
│ │ └─Success │ │ │ - New Chat     │  │   - Loading     │  │  │
│ └───────────┘ │ └────────────────┘  └─────────────────┘  │  │
│               └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

## Component Hierarchy

App.vue
└── ChatApp.vue
    ├── AuthWrapper.vue (conditional)
    │   ├── LoginForm.vue
    │   ├── RegisterForm.vue
    │   ├── RegistrationSuccess.vue
    │   └── VerificationSuccess.vue
    └── Chat Interface (conditional)
        ├── ConversationSidebar.vue
        ├── ChatHeader.vue
        ├── ChatMessage.vue (multiple instances)
        └── ChatInput.vue