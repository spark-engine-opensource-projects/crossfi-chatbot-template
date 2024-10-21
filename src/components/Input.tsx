"use client";
import React, { useState, KeyboardEvent } from 'react';
import { Textarea, ActionIcon, Group } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import styles from '../styles/input.module.css';
import { useChatbotContext } from './useChatbotContext';

interface ChatInputProps {
  inputBackground?: string;
  inputTextColor?: string;
  inputBorderColor?: string;
  inputFontSize?: string;
  p?: string;
  pt?: string;
  pb?: string;
  pl?: string;
  pr?: string;
  px?: string;
  py?: string;
  buttonColor?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputBackground = '#fff',
  inputTextColor = '#000',
  inputBorderColor = '#ccc',
  inputFontSize = '1rem',
  p, pt, pb, pl, pr, px, py,
  buttonColor = 'dark',
}) => {
  const { handleSendMessage } = useChatbotContext();
  const [inputValue, setInputValue] = useState('');

  const handleSendClick = () => {
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        setInputValue((prev) => prev + '\n');
      } else {
        event.preventDefault();
        handleSendClick();
      }
    }
  };

  const padding = {
    padding: p,
    paddingTop: pt || py,
    paddingBottom: pb || py,
    paddingLeft: pl || px,
    paddingRight: pr || px,
  };

  return (
    <Group className={styles.chatInput}>
      <Textarea
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className={styles.input}
        autosize
        minRows={1}
        style={{
          backgroundColor: inputBackground,
          color: '#0cc2fe',
          border: '1px solid #0cc2fe',
          borderRadius:'10px',
          fontSize: inputFontSize,
          ...padding,
        }}
        styles={{
          wrapper: {
            border: '1px solid #0cc2fe',
            borderRadius:'10px'
          },
          input: {
            border: '1px solid #0cc2fe',
            borderRadius:'10px'
          }
        }}
      />
      <ActionIcon variant="subtle" color={buttonColor} onClick={handleSendClick}>
        <IconSend />
      </ActionIcon>
    </Group>
  );
};

export default ChatInput;
