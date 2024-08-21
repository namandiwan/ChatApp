const API_URL = 'http://localhost:8080/api/chat';

const sendMessage = async (messageObject) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token

    if (!token) {
        console.error('No token found. Please log in.');
        throw new Error('No token found');
    }

    console.log('Sending Message:', messageObject); // Log the message object being sent
    console.log('JWT Token:', token);  // Log the token

    const response = await fetch(`${API_URL}/send`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include JWT token
        },
        body: JSON.stringify(messageObject), // Ensure you send the message as an object
    });

    console.log('Response status after sending message:', response.status); // Log the status of the response

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Failed to send message:', errorMessage);
        if (response.status === 403) {
            console.error('403 Forbidden: This usually means there is an issue with the authentication or authorization.');
        }
        throw new Error('Failed to send message');
    }

    // Check if the response body is empty
    const responseBody = await response.text();
    console.log('Response body after sending message:', responseBody); // Log the response body

    if (responseBody) {
        return JSON.parse(responseBody);
    } else {
        return {}; // Return an empty object if the response is empty
    }
};

// Function to listen to Kafka messages in real-time
const listenToKafkaMessages = (onMessageReceived) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token

    if (!token) {
        console.error('No token found. Please log in.');
        throw new Error('No token found');
    }

    console.log('Listening to Kafka messages with token:', token); // Log token

    const eventSource = new EventSource(`${API_URL}/kafka/subscribe`, {
        headers: {
            'Authorization': `Bearer ${token}` // Include JWT token
        }
    });

    eventSource.onmessage = (event) => {
        try {
            const newMessage = JSON.parse(event.data);
            console.log('New Kafka message received:', newMessage); // Log the new message
            onMessageReceived(newMessage);
        } catch (error) {
            console.error('Failed to parse Kafka message:', error);
        }
    };

    eventSource.onerror = (error) => {
        console.error('Error in Kafka event source:', error);
    };

    return {
        unsubscribe: () => eventSource.close(),
    };
};

// Function to retrieve messages
const getMessages = async () => {
    const token = localStorage.getItem('token'); // Retrieve JWT token

    if (!token) {
        console.error('No token found. Please log in.');
        throw new Error('No token found');
    }

    console.log('Fetching messages with token:', token); // Log token

    const response = await fetch(`${API_URL}/messages`, {
        headers: {
            'Authorization': `Bearer ${token}` // Include JWT token
        }
    });

    console.log('Response status after fetching messages:', response.status); // Log the status of the response

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Failed to fetch messages:', errorMessage);
        throw new Error('Failed to fetch messages');
    }

    const messages = await response.json();
    console.log('Fetched messages:', messages); // Log the fetched messages

    return messages;
};

// Assign the object to a variable before exporting
const chatService = { sendMessage, getMessages, listenToKafkaMessages };

export default chatService;