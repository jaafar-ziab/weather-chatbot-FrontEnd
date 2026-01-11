import { ref, nextTick } from 'vue';
import { authService } from '../services/authService';

// Logs come AFTER imports
console.log("🚀 useChat.js file loaded!");
console.info("✅ Starting frontend composable");

export function useChat() {
  console.log("🔵 useChat() function called");
  console.info("📋 Initializing chat state...");

  // State
  const messages = ref([
    { text: "Hello! I'm your weather assistant. How can I help you today?", sender: "gemini" },
  ]);
  const inputValue = ref('');
  const isLoading = ref(false);
  const sessionId = ref(null); // Store session_id
  const currentSessionId = ref(null); // Current loaded session
  
  // Refs
  const messagesEndRef = ref(null);

  // Methods
  const scrollToBottom = async () => {
    await nextTick();
    if (messagesEndRef.value) {
      messagesEndRef.value.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendMessage = async () => {
    console.log("=".repeat(50));
    console.log("🔵 SEND MESSAGE STARTED");
    console.log("Current session_id:", sessionId.value);
    
    if (inputValue.value.trim() === '' || isLoading.value) {
      console.warn("⚠️ Message blocked - empty or loading");
      return;
    }

    const userMessage = { text: inputValue.value, sender: "user" };
    messages.value.push(userMessage);
    
    const messageText = inputValue.value;
    inputValue.value = '';
    isLoading.value = true;
    
    scrollToBottom();

    try {
      // Use environment variable or default to localhost
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      
      // Get authentication token
      const token = authService.getToken();
      
      console.log('🔐 Token exists:', !!token);
      console.log('🔐 Token preview:', token ? token.substring(0, 20) + '...' : 'NO TOKEN');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      // Build request body - include session_id if we have it
      const requestBody = {
        message: messageText
      };
      
      // Add session_id to request if it exists
      if (sessionId.value) {
        requestBody.session_id = sessionId.value;
        console.info('✅ Including existing session_id:', sessionId.value);
      } else {
        console.info('🆕 No session_id yet - this is first message');
      }
      
      console.info('📤 Request URL:', `${API_URL}/chat`);
      console.info('📤 Request body:', requestBody);
      console.info('📤 Auth header:', `Bearer ${token.substring(0, 20)}...`);
      
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response OK:', response.ok);

      if (!response.ok) {
        if (response.status === 401) {
          authService.logout();
          throw new Error('Session expired. Please login again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.info('📥 Received response:', data);
      
      // Save session_id if it's in the response (always update it)
      if (data.session_id) {
        if (!sessionId.value) {
          console.info('🆕 New Session ID saved:', data.session_id);
        } else {
          console.info('🔄 Session ID confirmed:', data.session_id);
        }
        sessionId.value = data.session_id;
        currentSessionId.value = data.session_id;
      } else {
        console.warn('⚠️ No session_id in response!');
      }
      
      // Handle different response formats from FastAPI
      let botMessage;
      if (data.response) {
        botMessage = data.response;
      } else if (data.history && data.history.length > 0) {
        const lastMessage = data.history[data.history.length - 1];
        botMessage = lastMessage.content || lastMessage.message || lastMessage.text;
      } else if (data.message) {
        botMessage = data.message;
      } else {
        botMessage = JSON.stringify(data);
      }

       const formattedMessage = botMessage
        .replace(/\n{2,}/g, '<br><br>')  
        .replace(/\n/g, '<br>')          
        .replace(/•/g, '•&nbsp;');  
      
      const botResponse = { text: botMessage, sender: "gemini" };
      messages.value.push(botResponse);
      
      console.log("✅ MESSAGE SENT SUCCESSFULLY");
      console.log("Current session_id after response:", sessionId.value);
      console.log("=".repeat(50));
    } catch (error) {
      console.error("❌ Error calling backend:", error);
      messages.value.push({
        text: error.message || "Sorry, I couldn't reach the backend service. Please make sure it's running on http://127.0.0.1:8000",
        sender: "gemini",
      });
    } finally {
      isLoading.value = false;
      scrollToBottom();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Reset conversation (clear session)
  const resetConversation = () => {
    sessionId.value = null;
    currentSessionId.value = null;
    messages.value = [
      { text: "Hello! I'm your weather assistant. How can I help you today?", sender: "gemini" },
    ];
    console.log("🔄 Conversation reset");
  };

  // Load session messages
  const loadSessionMessages = async (sessionIdToLoad) => {
    try {
      console.log("📂 Loading session messages:", sessionIdToLoad);
      const data = await authService.getSession(sessionIdToLoad);
      
      // Clear current messages
      messages.value = [];
      
      // Load messages from session
      data.messages.forEach(msg => {
        messages.value.push({
          text: msg.content,
          sender: msg.role === 'user' ? 'user' : 'gemini'
        });
      });
      
      // Set current session
      sessionId.value = sessionIdToLoad;
      currentSessionId.value = sessionIdToLoad;
      
      console.log("✅ Session loaded with", messages.value.length, "messages");
      scrollToBottom();
    } catch (error) {
      console.error("❌ Failed to load session:", error);
    }
  };

  return {
    // State
    messages,
    inputValue,
    isLoading,
    sessionId,
    currentSessionId,
    messagesEndRef,
    
    // Methods
    sendMessage,
    handleKeyPress,
    scrollToBottom,
    resetConversation,
    loadSessionMessages
  };
}