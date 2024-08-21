package com.example.chatapp.model;

public class Message {
    private String user;
    private String content;

    // Default constructor
    public Message() {}

    // Parameterized constructor
    public Message(String user, String content) {
        this.user = user;
        this.content = content;
    }

    // Getters and Setters
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Message{" +
                "user='" + user + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
