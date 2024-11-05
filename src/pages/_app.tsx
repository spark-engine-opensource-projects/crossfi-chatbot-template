import React from "react";
import {
  Chatbot,
  ChatbotWindow,
  ChatInput,
  Message,
  SparkEngineProvider,
} from "../index";
import "@mantine/core/styles.css";

const HomePage: React.FC = () => {
  return (
    <html lang="en">
            <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <SparkEngineProvider theme="dark">
      <Chatbot
        projectId="362bc660-dd60-4b89-9ab7-79560cdece73"
        chatApiRoute="/api/chatbot"
        sparkEngineApiRoute="/api/web3completion"
        callSparkEngineWhen="When user need game design document"
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
          style={{
            borderTop: "5px solid #0cc2fe",
            borderBottom: "1px solid #0cc2fe",
            borderLeft: "1px solid #0cc2fe",
            borderRight: "1px solid #0cc2fe",
          }}
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
        <ChatInput buttonColor="#0cc2fe" />
      </Chatbot>
    </SparkEngineProvider>
    </html>
  );
};

export default HomePage;
