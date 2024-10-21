"use client";
import React from 'react';
import { Text } from '@mantine/core';
import styles from '../styles/message.module.css';
import Loader from './Loader';
import MarkdownAi from './Markdown';
import { useChatbotContext } from './useChatbotContext';

interface MessageProps {
  userColor?: string;
  userBackground?: string;
  botColor?: string;
  botBackground?: string;
  userFontSize?: string;
  botFontSize?: string;
  p?: string;
  pt?: string;
  pb?: string;
  pl?: string;
  pr?: string;
  px?: string;
  py?: string;
  m?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  mx?: string;
  my?: string;
  borderRadius?: string;
  userBorderRadius?: string; 
  botBorderRadius?: string;
  botBorder?: string;
  userBorder?: string;
  sender?: string;
}

const Message: React.FC<MessageProps> = ({
  userColor,
  userBackground,
  botColor,
  botBackground,
  userFontSize = '1rem',
  botFontSize = '1rem',
  p, pt, pb, pl, pr, px, py,
  m, mt, mb, ml, mr, mx, my,
  borderRadius = '8px',       
  userBorderRadius, 
  botBorderRadius, 
  botBorder = '1px solid',
  userBorder = '1px solid',
  sender,
}) => {
  const { messages, isLoading } = useChatbotContext();

  const padding = {
    padding: p,
    paddingTop: pt || py,
    paddingBottom: pb || py,
    paddingLeft: pl || px,
    paddingRight: pr || px,
  };

  const margin = {
    margin: m,
    marginTop: mt || my,
    marginBottom: mb || my,
    marginLeft: ml || mx,
    marginRight: mr || mx,
  };

  return (
    <div>
      {messages.map((msg, index) => {
        const isUser = msg.sender === 'user' || msg.sender === 'You';
        const messageStyle = {
          backgroundColor: isUser ? userBackground || '#e0f7fa' : botBackground || 'rgba(160, 160, 160, 0.1)',
          color: isUser ? userColor || 'inherit' : botColor || 'inherit',
          fontSize: isUser ? userFontSize : botFontSize,
          borderRadius: isUser ? userBorderRadius || borderRadius : botBorderRadius || borderRadius, // Overrides if provided
          border: `${isUser ? userBorder : botBorder}`,
          ...padding,
          ...margin,
        };

        const displaySender = isUser ? (sender === 'Bot' ? 'You' : sender || 'You') : sender || msg.sender;

        return (
          <div
            key={index}
            className={styles.messageContainer}
            style={{ justifyContent: isUser ? 'flex-end' : 'flex-start' }}
          >
            <div
              style={messageStyle}
              className={isUser ? styles.userMessage : styles.botMessage}
            >
              <Text style={{ fontWeight: 'bold' }}>{displaySender}</Text>
              <div style={{ marginTop: '0.22vh' }}>
                {msg.loading && isLoading && <Loader />}
              </div>
              <MarkdownAi content={msg.message || ''} isStreaming={true} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
