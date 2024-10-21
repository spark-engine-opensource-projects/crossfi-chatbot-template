import { useContext } from 'react';
import { ChatbotContext, ChatbotContextProps } from './Chatbot';

export function useChatbotContext(): ChatbotContextProps {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbotContext must be used within a ChatbotProvider');
  }
  return context;
}
