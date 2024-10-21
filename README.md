# Spark Engine SDK

 Library for calling out to Spark Engine Multi-Agent System and Cognitive AI projects as well as building extremely fast chatbots powered by Spark Engine & Groq models

[![GitHub](https://img.shields.io/badge/GitHub-Open%20Source-blue?logo=github)](https://github.com/spark-engine-ai)
[![Discord](https://img.shields.io/badge/Join%20Our%20Community-Discord-blue?logo=discord)](https://discord.gg/VAQA5c32jM)

![GitHub Banner](./github-banner.png)

## Overview

The **Spark Engine SDK** is a versatile tool built with **Next.js** and **React**, enabling developers to create AI-powered chatbots and multi-agent systems using the **Spark Engine API**. This SDK allows for dynamic conversation management, responsive UI components, and seamless backend integration, making it ideal for building sophisticated chat interfaces and interactive AI experiences. It supports deployment to platforms like Vercel, making it highly scalable and efficient. 

This SDK & NPM library uses Groq for the chat interactions, calling Spark Engine when certain information is collected or a task is carried out within the conversation.

For more comprehensive documentation, visit [SparkEngine Documentation](https://docs.sparkengine.ai).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Example Chatbot Code](#example-chatbot-code)
- [API Usage](#api-usage)
- [Deployment Workflow](#deployment-workflow)
- [Error Handling](#error-handling)
- [Customization](#customization)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Dynamic Conversations**: Easily define custom chatbot tasks, collect user data, and manage conversations dynamically.
- **API Integration**: Connect seamlessly to the **Spark Engine API** for generating responses, completing tasks, and managing multi-agent interactions.
- **Flexible Components**: Includes customizable components for building interactive chat interfaces quickly and efficiently.

## Prerequisites

Before using the Spark Engine SDK, ensure you have the following:

- **Node.js** (v14.x or higher)
- **Next.js** (v12.x or higher)
- An account with [Spark Engine](https://sparkengine.ai) to obtain your Spark API key.
- A **Vercel account** (or other hosting platform) for deploying serverless API functions.

## Installation

### Option 1: Cloning the Repository

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/spark-engine-opensource-projects/sparkengine-sdk
   cd sparkengine-sdk
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file at the root of your project and add the following:

   ```bash
   GROQ_API_KEY=your-groq-api-key
   SPARK_ENGINE_API_KEY=your-spark-api-key
   ```

### Option 2: Install via NPM

You can also install the SDK directly from npm:

```bash
npm install sparkengine
# or
yarn add sparkengine
```

For more details on usage and configuration, visit the [official SparkEngine documentation](https://docs.sparkengine.ai).

## Usage

### Running the Application

1. **Start the Development Server:**

   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000` to view the application. The chatbot will interact with users based on the configurations you set.

3. **Example Page**: Visit `/example-page` to see a sample chatbot implementation using the SDK. You can define tasks like collecting user information and setting up multi-step goals for the bot to accomplish.

## Components

The SDK provides the following components:

- **`Chatbot`**: The main chatbot interface.
- **`ChatbotWindow`**: A container for displaying chat messages.
- **`ChatInput`**: An input field for user messages.
- **`Message`**: Displays individual messages from the user and the bot.
- **`SparkEngineProvider`**: Context provider for managing state and API communication.
- **`SparkEngineApi`**: API component to interact directly with the Spark Engine backend.

These components are designed to be modular and customizable, allowing you to build and tailor chat interfaces according to your application’s needs.

## Example Chatbot Code

Here's an example implementation using the SDK:

```jsx
import React from 'react';
import { Chatbot, ChatbotWindow, ChatInput, Message, SparkEngineProvider } from 'sparkengine';

const HomePage: React.FC = () => {
  return (
    <SparkEngineProvider>
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
        initialBackgroundColor="#fcfcfc"
        title="Blue Themed Chatbot"
        description="Talk to our blue-themed chatbot!"
        logo="https://sparkengine.ai/logo.png"
      >
        <ChatbotWindow
          backgroundColor="#fcfcfc"
          scrollbarSize={6}
          borderRadius="10px"
          boxShadow="0 2px 10px rgba(0,0,0,0.1)"
          px="20px"
        >
          <Message
            userColor="#007bff"
            botColor="#333"
            userBackground="#e6f2ff"
            botBackground="#ffffff"
            userFontSize="1rem"
            botFontSize="1rem"
            px="16px"
            py="8px"
            userBorderRadius="20px 20px 0 20px"
            botBorderRadius="20px 20px 20px 0"
            userBorder="2px solid #007bff"
            botBorder="1px solid #ccc"
            m="10px 0"
            my="15px"
            mx="10px"
          />
        </ChatbotWindow>
        <ChatInput />
      </Chatbot>
    </SparkEngineProvider>
  );
};

export default HomePage;
```

### Direct API Interaction Example Using `SparkEngineApi`

You can also directly use `SparkEngineApi` to handle API interactions:

```js
import SparkEngineApi from 'sparkengine';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt, projectId } = req.body;
    const sparkEngine = new SparkEngineApi(process.env.SPARK_ENGINE_API_KEY || '');

    const response = await sparkEngine.createCompletion({
      prompt,
      project_id: projectId,
    });

    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching the API response:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
```

## Deployment Workflow

### Deploying to Vercel

To deploy the application using Vercel, follow these steps:

1. **Push the Project to GitHub**:

   Ensure the project is linked to a repository on GitHub, GitLab, or Bitbucket.

2. **Connect to Vercel**:

   Sign in to Vercel, connect the repository, and set up environment variables in Vercel settings.

   ```bash
   GROQ_API_KEY=your-groq-api-key
   SPARK_ENGINE_API_KEY=your-spark-api-key
   ```

3. **Deploy**:

   Follow Vercel’s deployment steps. The application will be live, and all serverless API routes will be functional.

## Error Handling

The SDK includes error handling for API interactions. If an API call fails, the application will attempt to retry and provide descriptive error messages to users.

### Retry Logic

The application retries failed API calls up to three times before displaying an error notification to the user.

## Customization

You can customize the chatbot and the UI components as needed:

- **Add New Features**: Extend the chatbot capabilities by modifying components like `ChatInput` or `Message`.
- **UI Adjustments**: Change styles and layout in the `components/` folder for a custom user interface.
- **Task Modifications**: Update `callSparkEngineWhen` to define different tasks and objectives for the chatbot.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](./LICENSE) file for more details.

## Acknowledgments

- **[Next.js](https://nextjs.org/)** for providing the development framework.
- **[Spark Engine](https://sparkengine.ai)** for their chatbot and multi-agent API support.
- **[Spark Engine Docs](https://docs.sparkengine.ai)** for additional SDK and API support on this library.
- **[Spark Engine Github](https://github.com/spark-engine-ai)** for additional Spark Engine open-source tooling.
- **[Spark Engine Github (Projects)](https://github.com/spark-engine-opensource-projects)** for MIT open-source project examples made by the Spark Engine team and our community.
- **[Vercel](https://vercel.com)** for easy and scalable deployments.

---

For more details and advanced usage, visit the [official SparkEngine documentation](https://docs.sparkengine.ai).