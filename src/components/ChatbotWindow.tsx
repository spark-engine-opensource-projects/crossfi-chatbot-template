"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@mantine/core';

interface ChatbotWindowProps {
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  scrollbarSize?: number;
  borderRadius?: string;
  boxShadow?: string;
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
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({
  width = '100%',
  height = '70vh',
  backgroundColor = '#fff',
  scrollbarSize = 4,
  borderRadius = '10px',
  boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)',
  p, pt, pb, pl, pr, px, py,
  m, mt, mb, ml, mr, mx, my,
  style = {},
  children,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const isUserAtBottom = () => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return false;

    const threshold = 50;
    const position = scrollArea.scrollHeight - scrollArea.clientHeight - scrollArea.scrollTop;
    return position <= threshold;
  };

  const handleScroll = () => {
    setAutoScrollEnabled(isUserAtBottom());
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const observer = new MutationObserver(() => {
      if (autoScrollEnabled) {
        setTimeout(() => {
          scrollArea.scrollTo({
            top: scrollArea.scrollHeight,
            behavior: 'smooth',
          });
        }, 200);
      }
    });

    observer.observe(scrollArea, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [autoScrollEnabled]);

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
    <ScrollArea
      style={{
        width,
        height,
        backgroundColor,
        borderRadius,
        boxShadow,
        ...padding,
        ...margin,
        ...style,
      }}
      scrollbarSize={scrollbarSize}
      viewportRef={scrollAreaRef}
      onScrollPositionChange={handleScroll}
    >
      {children}
    </ScrollArea>
  );
};

export default ChatbotWindow;
