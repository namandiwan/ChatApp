# ChatApp

A real-time chat application built with a Spring Boot backend and a React.js frontend. This project demonstrates how to create a full-stack chat application with message persistence and real-time updates.

## UI Design
![Diagram](https://github.com/namandiwan/ChatApp/blob/master/Images/Register.png)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
- [Frontend Setup (React.js)](#frontend-setup-reactjs)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time messaging with Kafka.
- JWT-based authentication.
- H2 database for development and testing.
- Modern UI built with React and Material-UI.
- Scrollable chat history.
- Automatic scrolling to the latest message.
- Lightweight and easy to set up.

## Prerequisites

Before you begin, ensure you have the following tools installed:

- [Java 17+](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- [Node.js 18+](https://nodejs.org/)
- [Maven 3.8+](https://maven.apache.org/install.html)
- [Git](https://git-scm.com/)

## Installation

### Backend Setup (Spring Boot)

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd ChatApp
   ```
2. **Navigate to the Backend Directory:**

   ```bash
   cd chatapp
   ```

3. **Configure H2 Database:**

The application is configured to use the H2 in-memory database for development. You can find the configuration in src/main/resources/application.properties.

```bash
# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:chatappdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
```

The H2 console can be accessed at http://localhost:8080/h2-console after starting the backend.

4. **Build the Backend:**

Use Maven to build the backend:

```bash
mvn clean install
```

5. **Run the Backend:**

```bash
mvn spring-boot:run
```

The backend server will start at http://localhost:8080.

### Frontend Setup (React.js)

1. **Navigate to the Frontend Directory:**

```bash
cd ../frontend
```

2. **Install Frontend Dependencies:**

Use npm to install the required dependencies:

```bash
npm install
```

3. **Start the Frontend Server:**

```bash
npm start
```

The frontend will start at http://localhost:3000.

### Running the Application

After setting up both the backend and frontend, you can run the full application by following these steps:

1. **Start the Backend:**

```bash
cd chatapp
mvn spring-boot:run
```

2. **Start the Frontend:**

```bash
cd ../frontend
npm start
```

3. **Access the Application:**

Open your browser and navigate to http://localhost:3000. You should see the chat application interface. You can register a new user, log in, and start chatting.

### **Project Structure**
The project is divided into two main directories:

- chatapp: The backend of the application, built with Spring Boot.
- frontend: The frontend of the application, built with React.js.

### **Backend (Spring Boot)**

```bash
chatapp/
├── src/
│   ├── main/
│   │   ├── java/com/example/chatapp/
│   │   │   ├── controller/          # REST Controllers
│   │   │   ├── model/               # Entity Models
│   │   │   ├── repository/          # Repositories for data access
│   │   │   ├── security/            # Security configuration (JWT)
│   │   │   ├── service/             # Service layer
│   │   │   └── ChatApplication.java # Main Spring Boot Application
│   │   ├── resources/
│   │   │   ├── application.properties # Application configuration
│   │   │   └── data.sql              # Initial data setup (optional)
│   └── test/                         # Unit and Integration Tests
└── pom.xml                            # Maven configuration
```

### **Frontend (React.js)**

```bash
frontend/
├── public/                            # Public assets and index.html
├── src/
│   ├── components/                    # Reusable React components
│   ├── services/                      # API service calls
│   ├── styles/                        # CSS and styling
│   ├── App.js                         # Main React component
│   ├── index.js                       # Entry point for React
│   └── ...                            # Other configurations and components
└── package.json                       # npm configuration
```

### **Technologies Used**

#### Backend:

- Java 17
- Spring Boot
- Spring Security (JWT)
- H2 Database
- Maven
- Apache Kafka (Optional for real-time updates)

#### Frontend:

- React.js
- Material-UI
- Axios (for API requests)


#### Endpoints:

1. Backend Endpoints

**Authentication:**

POST /api/auth/register - Register a new user.
POST /api/auth/login - Authenticate a user and return a JWT.

**Chat:**

GET /api/chat/messages - Retrieve chat messages.
POST /api/chat/send - Send a new message.

2. Frontend
The frontend interacts with the backend API using Axios to send and receive data.

### Contributing:
1. Fork the repository.
2. Create a new feature branch (git checkout -b feature/my-new-feature).
3. Commit your changes (git commit -am 'Add some feature').
4. Push to the branch (git push origin feature/my-new-feature).
5. Create a new Pull Request.
