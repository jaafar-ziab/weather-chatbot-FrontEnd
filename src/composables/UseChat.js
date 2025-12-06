// composables/useChat.js
import { ref, nextTick } from 'vue';

export function useChat() {
  const messages = ref([
    { text: "Hello! I'm your weather assistant. How can I help you today?", sender: "gemini" },
    
  ]);
  console.log("this is the first");
  const inputValue = ref('');
  const isLoading = ref(false);
  const sessionId = ref(null); // Store session_id
  
  const messagesEndRef = ref(null);

  const scrollToBottom = async () => {
    await nextTick();
    if (messagesEndRef.value) {
      messagesEndRef.value.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendMessage = async () => {
    console.log("=" . repeat(50));
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
      const API_URL = import.meta.env.VITE_API_URL;
      
      const requestBody = {
        message: messageText
      };
      
      // Add session_id to request if it exists
      if (sessionId.value) {
        requestBody.session_id = sessionId.value;
      }
      
      console.log('Sending request:', requestBody); 
      
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received response:', data);
      
      // Save session_id if it's in the response
      if (data.session_id && !sessionId.value) {
        sessionId.value = data.session_id;
        console.log('Session ID saved:', sessionId.value);
      }
      
      
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

      console.log("bot message befor", botMessage);
      const formattedMessage = botMessage
        .replace(/\n{2,}/g, '<br><br>')  
        .replace(/\n/g, '<br>')          
        .replace(/•/g, '•&nbsp;');       
        
      console.log("bot message after", botMessage);
      const botResponse = { text: botMessage, sender: "gemini" };
      messages.value.push(botResponse);
    } catch (error) {
      console.error("Error calling backend:", error);
      messages.value.push({
        text: "Sorry, I couldn't reach the backend service. Please make sure it's running properly",
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
    messages.value = [
      { text: "Hello! I'm your weather assistant. How can I help you today?", sender: "gemini" },
    ];
  };

  return {
    // State
    messages,
    inputValue,
    isLoading,
    sessionId,
    messagesEndRef,
    
    // Methods
    sendMessage,
    handleKeyPress,
    scrollToBottom,
    resetConversation
  };
}