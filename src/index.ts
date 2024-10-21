export { default as Chatbot } from './components/Chatbot';
export { default as ChatbotWindow } from './components/ChatbotWindow';
export { default as Message } from './components/Message';
export { default as ChatInput } from './components/Input';
export { default as Loader } from './components/Loader';
export { default as MarkdownAi } from './components/Markdown';
import SparkEngineApi from './components/SparkEngineApi';
export default SparkEngineApi;
export { SparkEngineProvider, useSparkEngine } from './context/SparkEngineContext';

if (typeof window !== 'undefined') {
    import('@mantine/core/styles.css')
      .then(() => console.log('Mantine global styles loaded'))
      .catch((error) => console.error('Error loading Mantine global styles:', error));
  }