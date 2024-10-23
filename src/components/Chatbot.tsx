"use client";
import React, { useState, createContext } from 'react';
import { Box, Center, Flex, Title, Text, Image, Button } from '@mantine/core';
import { IconBrandGithub, IconWallet } from '@tabler/icons-react';
import ChatInput from './Input';
import Message from './Message';
import ChatbotWindow from './ChatbotWindow';
import ConnectButton from './blockchain/ConnectButton'
import styles from '../styles/chatbot.module.css';

interface MessageType {
  message: string;
  sender: string;
  loading?: boolean;
}

interface ChatbotProps {
  sparkEngineApiRoute: string;
  chatApiRoute: string;
  projectId: string;
  callSparkEngineWhen: string;
  title?: string;
  logo?: string;
  description?: string;
  width?: string | number;
  height?: string | number;
  position?: 'left' | 'center' | 'right';
  offsetX?: string | number;
  offsetY?: string | number;
  sx?: React.CSSProperties;
  conversationHistoryLength?: number;
  responseIndices?: number[] | 'all';
  username?: string;
  userColor?: string;
  userBackground?: string;
  botColor?: string;
  botBackground?: string;
  initialBackgroundColor?: string;
  windowScrollbarSize?: number;
  windowBorderRadius?: string;
  windowBoxShadow?: string;
  windowPadding?: string;
  children?: React.ReactNode;
}

const Chatbot: React.FC<ChatbotProps> = ({
  sparkEngineApiRoute,
  chatApiRoute,
  projectId,
  callSparkEngineWhen,
  title = 'Sparkchat SDK',
  logo = 'https://sparkengine.ai/logo.png',
  description = 'Chat with Spark Engine projects',
  username = 'You',
  width = '100%',
  height = '70vh',
  position = 'center',
  offsetX = 0,
  offsetY = 0,
  sx = {},
  conversationHistoryLength = 5,
  responseIndices = [0],
  userColor,
  userBackground,
  botColor,
  initialBackgroundColor,
  windowScrollbarSize,
  windowBorderRadius,
  windowBoxShadow,
  windowPadding,
  children,
  botBackground,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const fetchChatResponse = async (
    prompt: string,
    callSparkEngineWhen: string,
    conversationHistory: MessageType[]
  ) => {
    try {
      const messages = [
        {
          role: 'system',
          content: `Your task is: ${callSparkEngineWhen}. Once you have completed this task, respond only with "<$>CALL SYSTEM</$>".
          
          Remember:
          - Only ask 1 question at a time
          - Never ask unrelated questions
          - Be friendly and talk to the user like a friend
          - Once you have reached/completed the task, confirm with the user if it's "okay to take a moment to think" using the information`,
        },
        ...conversationHistory.map((msg) => ({
          role: msg.sender === username ? 'user' : 'assistant',
          content: msg.message,
        })),
        {
          role: 'user',
          content: prompt,
        },
      ];
  
      const response = await fetch(chatApiRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch the chat response');
      }
  
      const data = await response.json();
      return data.message || 'Sorry, something went wrong.';
    } catch (error) {
      console.error('Error fetching from chat API:', error);
      return 'Sorry, something went wrong.';
    }
  };
  

  const fetchSummaryForSparkEngine = async (conversationHistory: string) => {
    try {
      const response = await fetch(chatApiRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Summarize the following conversation:\n${conversationHistory}\n Task met: ${callSparkEngineWhen}` }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch the summary');
      }
  
      const summaryData = await response.json();
      return summaryData.output;
    } catch (error) {
      console.error('Error fetching summary:', error);
      return 'Sorry, something went wrong while summarizing.';
    }
  };
  
  const sendToSparkEngine = async (summary: string) => {
    try {
      const response = await fetch(sparkEngineApiRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: summary, projectId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch the Spark Engine response');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching from Spark Engine API:', error);
      return { output: 'Sorry, something went wrong with Spark Engine.', name: 'Spark Engine' };
    }
  };
  
  const handleSendMessage = async (message: string) => {
    const userMessage: MessageType = { message, sender: username || 'You' };
  
    const updatedMessages = [...messages, userMessage];
    setMessages([...updatedMessages, { message: '', sender: 'Loading', loading: true }]);
    setIsLoading(true);
  
    const conversationHistory = updatedMessages.slice(-conversationHistoryLength);
  
    const conversationHistoryString = conversationHistory
      .map((msg) => `${msg.sender === username ? 'User' : 'CrossFi Chatbot'}: ${msg.message}`)
      .join('\n');
  
    const chatResponse = await fetchChatResponse(
      message,
      callSparkEngineWhen,
      conversationHistory
    );
  
    if (chatResponse.includes('<$>CALL SYSTEM</$>')) {
      const summary = await fetchSummaryForSparkEngine(conversationHistoryString);
  
      const sparkEngineResponse = await sendToSparkEngine(summary);
  
      const selectedResponses = sparkEngineResponse.data.map((item: any) => ({
        message: item?.output || 'Invalid data',
        sender: item?.name || 'Sparkchat',
      }));
  
      setMessages((prev) => [...prev.slice(0, prev.length - 1), ...selectedResponses]);
    } else {
      const chatMessage: MessageType = {
        message: chatResponse,
        sender: 'CrossFi Chatbot',
        loading: false,
      };
  
      setMessages((prev) => [...prev.slice(0, prev.length - 1), chatMessage]);
    }
  
    setIsLoading(false);
  };
  
  const positionStyles = {
    left: { marginLeft: offsetX, marginRight: 'auto' },
    center: { marginLeft: 'auto', marginRight: 'auto' },
    right: { marginLeft: 'auto', marginRight: offsetX },
  };

  const adjustedHeight = typeof height === 'string' && height.endsWith('vh')
  ? `${parseFloat(height) * 0.7}vh`
  : typeof height === 'string' && height.endsWith('px')
  ? `${parseFloat(height) * 0.7}px`
  : typeof height === 'number'
  ? height * 0.7
  : '70%';

    return (
      <Box
        className={styles.chatbot}
        style={{
          width,
          height,
          position: 'relative',
          marginTop: offsetY,
          ...positionStyles[position],
          ...sx,
        }}
      >
        <ChatbotContext.Provider value={{ messages, handleSendMessage, isLoading }}>
          {children && messages.length !== 0 ? (
            children
          ) : (
            <>
              <ChatbotWindow
                backgroundColor={initialBackgroundColor}
                scrollbarSize={windowScrollbarSize}
                height="80vh"
                borderRadius={windowBorderRadius}
                boxShadow={windowBoxShadow}
                style={{borderTop:'5px solid #0cc2fe', borderBottom: '1px solid #0cc2fe', borderLeft: '1px solid #0cc2fe', borderRight:'1px solid #0cc2fe'}}
              >
                {messages.length === 0 ? (
                  <Center style={{ height: '77vh' }}>
                    <Flex justify="center" align="center" direction="column">
                      <Image src={logo} w={80} h={80} />
                      <Title order={1} mt="md">{title}</Title>
                      <Text c="dimmed">{description}</Text>
                      <Flex mt="lg" gap="md">
        <ConnectButton setIsConnected={setIsConnected} isConnected={isConnected}/>
      </Flex>
                    </Flex>
                  </Center>
                ) : (
                  <Message
                    sender="Bot"
                    userColor={userColor}
                    userBackground={userBackground}
                    botColor={botColor}
                    botBackground={botBackground}
                  />
                )}
              </ChatbotWindow>
              {isConnected && (
                <ChatInput buttonColor='#0cc2fe' />

              )}
            </>
          )}
        </ChatbotContext.Provider>
      </Box>
    );
  };

  export interface ChatbotContextProps {
    messages: MessageType[];
    handleSendMessage: (message: string) => Promise<void>;
    isLoading: boolean;
  }
  
  export const ChatbotContext = createContext<ChatbotContextProps | undefined>(undefined);

export default Chatbot;
