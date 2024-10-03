import React, { useState } from 'react';
import './RJchatbot.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

// ใช้ API Key ปลอมตามที่คุณให้มา
const API_KEY = 'sk-7VJq3oFkcQQSajsl6yPMDpkffcQ5cxFWgG1cDRuNesT3BlbkFJXaP-G7gc5Hw4QoVHR1aE9Uqg1gHVskYA-zuGun5nIA';

const systemMessage = {
  "role": "system",
  "content": "Explain things like you're talking to a software professional with 2 years of experience."
};

function RJchatbot() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm RJChatbot! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    if (!message) return; // ป้องกันการส่งข้อความว่างเปล่า

    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setIsTyping(true);
    await processMessageToChatGPT([...messages, newMessage]);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo-instruct-0914",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error in OpenAI API response:", errorData);
        setMessages(prevMessages => [...prevMessages, {
          message: `Error: ${errorData.error.message || 'An error occurred'}`,
          sender: "ChatGPT"
        }]);
      } else {
        const data = await response.json();
        setMessages(prevMessages => [...prevMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
      setMessages(prevMessages => [...prevMessages, {
        message: "Oops! Something went wrong. Please check your internet connection and try again.",
        sender: "ChatGPT"
      }]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="Chatbot">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default RJchatbot;
