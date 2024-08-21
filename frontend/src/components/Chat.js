import React, { useState, useEffect, useRef } from 'react';
import { Paper, List, ListItem, TextField, Button, Typography } from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material';  
import chatService from '../chatService';
import '../styles/Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const messageListRef = useRef(null); // To access the message list DOM element
    const user = localStorage.getItem('username') || "anonymous"; // Retrieve username from local storage or fallback to 'anonymous'

    // Log to check if the handleSendMessage function is triggered
    const handleSendMessage = async () => {
        console.log('handleSendMessage triggered with message:', message); // Log the message being sent
        console.log(localStorage);
        if (message.trim() !== '') {
            const messageObject = {
                user: user,
                content: message,
            };

            try {
                console.log('Message object before sending:', messageObject); // Log message object
                await chatService.sendMessage(messageObject); // Send message as an object
                console.log('Message sent successfully'); // Log after message is sent
                setMessage(''); // Clear the input field
                const messages = await chatService.getMessages();
                setMessages(messages);
                console.log('Messages after sending:', messages); // Log the messages after sending
            } catch (error) {
                console.error('Error sending message:', error.message);
            }

            // Scroll to the bottom after sending a message
            if (messageListRef.current) {
                messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
            }
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            console.log('Fetching messages on component mount'); // Log fetch attempt
            try {
                const messages = await chatService.getMessages();
                setMessages(messages);
                console.log('Messages after fetching on mount:', messages); // Log fetched messages
                if (messageListRef.current) {
                    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
                }
            } catch (error) {
                console.error('Error fetching messages:', error.message);
            }
        };

        fetchMessages();
        const intervalId = setInterval(fetchMessages, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="contact-us">
            <Typography variant="h4" align="center" className="chat-title">
                Chat Room <ChatBubbleOutline sx={{ ml: 1 }} />
            </Typography>
            <List className="message-list" ref={messageListRef}>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <Paper elevation={2} className="message-item">
                            <strong>{msg.user}</strong>: {msg.content}
                        </Paper>
                    </ListItem>
                ))}
            </List>
            <div className="input-container">
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-field"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            console.log('Enter key pressed'); // Log when Enter is pressed
                            handleSendMessage();
                        }
                    }}
                />
                <Button 
                    variant="contained" 
                    onClick={handleSendMessage} 
                    className="send-button"
                >
                    Send
                </Button>
            </div>
            <div className="background-animation"></div>
        </div>
    );
};

export default Chat;