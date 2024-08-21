package com.example.chatapp.service;

import com.example.chatapp.model.Message;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class ChatService {

    private static final String TOPIC = "chat-messages";

    private final KafkaTemplate<String, String> kafkaTemplate;

    // In-memory list to store messages
    private final List<Message> messageStore = new CopyOnWriteArrayList<>();

    public ChatService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(Message message) {
        kafkaTemplate.send(TOPIC, message.getUser() + ": " + message.getContent());
        messageStore.add(message);
    }

    public List<Message> getMessages() {
        return new ArrayList<>(messageStore);
    }

    @KafkaListener(topics = TOPIC, groupId = "chat-group")
    public void listen(String message) {
        String[] parts = message.split(": ", 2);
        if (parts.length == 2) {
            Message receivedMessage = new Message(parts[0], parts[1]);
            messageStore.add(receivedMessage);
        }
    }
}
