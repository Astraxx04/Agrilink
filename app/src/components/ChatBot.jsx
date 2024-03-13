import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const YOUR_CHATGPT_API_KEY = '';

  const handleSend = async (newMessages = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));

      const messageText = userMessage.text.toLowerCase();
      const keywords = ['soil', 'crop', 'agriculture'];

      if (!keywords.some(keyword => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "Sorry, I don't have any knowledge about this",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'AgriBot',
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        return;
      }

      const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
      const response = await axios.post(
        apiUrl,
        {
          prompt: `get the type of crop that can be grown on ${messageText}`,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
          },
        }
      );

      const crops = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: crops,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AgriBot',
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
    } catch (error) {
        console.log(error.response || error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat messages={messages} onSend={newMessages => handleSend(newMessages)} user={{ _id: 1 }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ChatBot;