declare module 'sparkengine' {
  import React from 'react';

  // Interfaces for API interactions
  interface CompletionRequest {
    prompt: string;
    project_id: string;
  }

  interface CompletionResponse {
    data: any;
  }

  // Class for Spark Engine API
  class SparkEngineApi {
    constructor(apiKey: string, baseUrl?: string);
    createCompletion(request: CompletionRequest): Promise<CompletionResponse>;
  }

  // React component for the SparkEngineProvider
  interface SparkEngineProviderProps {
    children: React.ReactNode;
    theme?: 'light' | 'dark';
  }

  export const SparkEngineProvider: React.FC<SparkEngineProviderProps>;

  // Props for the Chatbot component
  interface ChatbotProps {
    chatApiRoute: string; // Route for the external chatbot API like OpenAI, Groq, etc.
    sparkEngineApiRoute: string; // Route for the Spark Engine API
    projectId: string; // Project ID for Spark Engine interaction
    callSparkEngineWhen: string; // Condition for triggering Spark Engine (e.g., "collect favorite food, color, and workplace skills")
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

  export const Chatbot: React.FC<ChatbotProps>;

  // Props for the ChatInput component with shorthand padding props
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

  export const ChatInput: React.FC<ChatInputProps>;

  // Props for the Message component with shorthand padding and margin props
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
    sender?: string; // Optional prop to customize sender display name
  }

  export const Message: React.FC<MessageProps>;

  // Props for the ChatbotWindow component with shorthand padding and margin props
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
    messages?: any[]; // Messages array passed from Chatbot
    title?: string;   // Title prop
    logo?: string;    // Logo prop
    description?: string; // Description prop
  }

  export const ChatbotWindow: React.FC<ChatbotWindowProps>;

  // Exporting SparkEngineApi class as default
  export default SparkEngineApi;
}
