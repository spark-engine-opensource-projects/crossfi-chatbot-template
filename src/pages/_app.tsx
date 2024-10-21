import React from 'react';
import { Chatbot, ChatbotWindow, ChatInput, Message, SparkEngineProvider } from '../index';
import '@mantine/core/styles.css';

const HomePage: React.FC = () => {
  return (
    <SparkEngineProvider theme="dark">
      <Chatbot
        projectId="adbfd15b-1499-4a7a-8cdc-416e8630c33c"
        chatApiRoute="/api/chatbot"
        sparkEngineApiRoute="/api/complete"
        callSparkEngineWhen="Collect user's favorite color, favorite food, and workplace skills"
        width="90%"
        height="90vh"
        position="center"
        offsetY="5vh"
        conversationHistoryLength={10}
        responseIndices={[0]}
        initialBackgroundColor="#222"
        title="CrossFi Chatbot"
        description="Use advanced AI systems using Spark Engine and $XFI"
        logo="xfi-logo.png"
      >
        <ChatbotWindow
          backgroundColor="#222"
          scrollbarSize={6}
          height="80vh"
          borderRadius="10px"
          boxShadow="0 2px 10px rgba(0,0,0,0.1)"
          px="20px"
          style={{borderTop:'5px solid #0cc2fe', borderBottom: '1px solid #0cc2fe', borderLeft: '1px solid #0cc2fe', borderRight:'1px solid #0cc2fe'}}
          >
          <Message
            userColor="#0cc2fe"
            botColor="#999"
            userBackground="#053747"
            botBackground="#252525"
            userFontSize="1rem"
            botFontSize="1rem"
            px="16px"
            py="8px"
            userBorderRadius="20px 20px 0 20px"
            botBorderRadius="20px 20px 20px 0"
            userBorder="2px solid #0cc2fe"
            botBorder="1px solid #777"
            m="10px 0"
            my="15px"
            mx="10px"
          />
        </ChatbotWindow>
        <ChatInput buttonColor='#0cc2fe' />
      </Chatbot>
    </SparkEngineProvider>
  );
};

export default HomePage;
