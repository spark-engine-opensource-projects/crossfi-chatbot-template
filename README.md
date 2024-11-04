Here’s the revised README with the updated sections:

---

![GitHub Banner](./github-banner.png)

# CrossFi Chatbot Template

A blockchain-powered AI chatbot template built for the **CrossFi Chain** ecosystem. This template enables users to access **Spark Engine’s** multi-agent systems and cognitive AI by connecting their web3 wallets, paying with **XFI**, and interacting via a Groq-hosted AI model. Designed specifically for CrossFi applications, this chatbot offers a decentralized, secure, and AI-driven experience on the CrossFi Chain.

[![GitHub](https://img.shields.io/badge/GitHub-Open%20Source-blue?logo=github)](https://github.com/spark-engine-ai)
[![Discord](https://img.shields.io/badge/Join%20Our%20Community-Discord-blue?logo=discord)](https://discord.gg/VAQA5c32jM)

![Chatbot Preview 1](./github-img-1.jpg)
![Chatbot Preview 2](./github-img-2.jpg)

## What is CrossFi?

**CrossFi** is an innovative blockchain ecosystem built on its own Layer 1 (L1) blockchain, bridging traditional financial solutions with the security, transparency, and decentralization of blockchain technology. With CrossFi, users can access a broad range of decentralized finance (DeFi) tools, crypto banking services, and multi-chain functionality—all within a single, user-friendly app. The ecosystem empowers individuals and businesses to use crypto as easily as traditional financial assets, supporting seamless, fast, and secure transactions.

### CrossFi’s Goals and Significance

CrossFi’s mission is to redefine financial interactions by creating a decentralized financial infrastructure that brings together crypto and traditional financial services. Key goals include:

- **Decentralized Financial Access**: Empowering users to engage in financial activities—such as payments, lending, and borrowing—without intermediaries or centralized oversight.
- **Cross-Chain Interoperability**: Providing multi-chain capabilities to enhance DeFi applications, enabling users to access assets and liquidity across various blockchains.
- **Non-Custodial Banking**: Prioritizing user control by offering non-custodial crypto banking and payment solutions, allowing users full ownership of their assets.
- **Real-World Asset Integration**: Through xAssets, users can mint and trade synthetic tokens representing commodities, stocks, and other assets, expanding financial opportunities within the crypto world.
- **Web3 Payment Gateway**: Enabling fast, secure crypto payments through a non-custodial gateway, linking wallets like Metamask for direct crypto-to-fiat transactions.

CrossFi’s significance lies in its pioneering decentralized financial ecosystem, using blockchain technology to bring transparency, security, and accessibility to financial services.

## What is Spark Engine?

**Spark Engine** is a cutting-edge cognitive AI and multi-agent system platform. It provides powerful AI capabilities, enabling users to build intelligent systems that interact dynamically and handle complex tasks. Using Spark Engine, developers can create robust chatbots, autonomous agents, and AI-driven applications that respond intelligently to user input and manage multi-step conversations seamlessly.

Spark Engine’s unique value lies in its multi-agent architecture, which allows for coordination between different AI components to complete complex tasks. It also integrates smoothly with **Groq** for natural language processing, supporting diverse applications from customer service chatbots to sophisticated data-driven AI solutions. In the CrossFi Chatbot Template, Spark Engine powers the chatbot’s cognitive abilities, delivering interactive, goal-oriented AI experiences through blockchain-driven access.

## Overview

The **CrossFi Chatbot Template** is a web3-integrated AI chatbot framework using **Next.js** and **React**, specifically tailored for the CrossFi Chain. This template allows users to interact with the **Spark Engine** API without an API key and instead using CrossFi's native token ($XFI), where users can pay in **XFI** for access to advanced AI systems. The chatbot uses **Groq** for natural language processing, enabling it to collect and process user information, then connect to Spark Engine through a secure cookie-based method. This enables a fully decentralized and crypto-driven user experience.

For more detailed documentation on using the CrossFi Chatbot Template, visit [SparkEngine Documentation](https://docs.sparkengine.ai).

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

- **Web3 Payment Integration**: Users can connect their web3 wallet and pay with XFI to unlock AI capabilities powered by Spark Engine.
- **Dynamic Conversations**: Configure chatbot tasks to collect user data, manage conversations, and interact with CrossFi’s L1 blockchain.
- **Modular, Customizable Components**: Flexible UI components allow you to quickly build a customized, interactive chat interface that reflects your brand.

## Prerequisites

Before setting up the CrossFi Chatbot Template, make sure you have:

- **Metamask, CrossX or compatible Web3 Wallet** that works with CrossFi Chain
- A CrossFi account and **XFI** tokens for testing transactions

## Installation

### Cloning the Repository

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/spark-engine-opensource-projects/crossfi-chatbot-template
   cd crossfi-chatbot-template
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file at the root of your project with the following variables:

   ```bash
   GROQ_API_KEY=your-groq-api-key
   ```

## Usage

### Running the Application

1. **Start the Development Server:**

   ```bash
   npm run dev
   ```

2. Open `http://localhost:3000` in your browser to interact with the chatbot interface, customized for CrossFi.

## Components

This template provides the following customizable components:

- **`Chatbot`**: Core interface with wallet integration and XFI payment options.
- **`ChatbotWindow`**: Secure, user-friendly container for chat messages.
- **`ChatInput`**: Input field with transaction prompts.
- **`Message`**: Displays user and bot messages.
- **`SparkEngineProvider`**: Manages state and API communication.
- **`SparkEngineApi`**: Allows direct API interaction with Spark Engine.

For details on modifying the SDK, refer to the [SparkEngine documentation](https://docs.sparkengine.ai).

## Example Chatbot Code

```jsx
import React from 'react';
import { Chatbot, ChatbotWindow, ChatInput, Message, SparkEngineProvider } from 'crossfi-chatbot';

const HomePage: React.FC = () => {
  return (
    <SparkEngineProvider theme="dark">
      <Chatbot
        projectId="362bc660-dd60-4b89-9ab7-79560cdece73"
        chatApiRoute="/api/chatbot"
        sparkEngineApiRoute="/api/web3completion"
        callSparkEngineWhen="Collect game design document request"
        width="90%"
        height="90vh"
        position="center"
        offsetY="5vh"
        conversationHistoryLength={10}
        responseIndices={[0]}
        initialBackgroundColor="#222"
        title="CrossFi Chatbot"
        description="Use advanced AI systems with Spark Engine and $XFI"
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
  );
};

export default HomePage;
```

## Deployment Workflow

### Deploying

 to Vercel

1. **Push to GitHub**: Connect the project to a repository.
2. **Connect to Vercel**: Link the repository on Vercel and add the required environment variables.
3. **Deploy**: Follow Vercel’s deployment steps to make the app live.

## Error Handling

The chatbot retries failed API calls up to three times, ensuring a smooth experience for users even in cases of minor connectivity issues.

## Customization

You can customize the chatbot by adjusting styles and adding functionality:

- **New Features**: Add custom components or extend existing ones like `ChatInput` or `Message`.
- **UI Adjustments**: Modify styles in the components for a branded interface.
- **Task Customization**: Set different objectives for the chatbot by configuring `callSparkEngineWhen`.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- **[Next.js](https://nextjs.org)** for the development framework
- **[Spark Engine](https://sparkengine.ai)** for AI and multi-agent system support
- **[CrossFi Blockchain](https://crossfi.org)** for pioneering decentralized financial infrastructure

This project was created by Ammar, Jordan & Jonny from our internal dev team.

---

For more advanced customization, visit the [official SparkEngine documentation](https://docs.sparkengine.ai).
