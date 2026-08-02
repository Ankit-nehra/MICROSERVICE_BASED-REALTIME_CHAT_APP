🚀 Real-Time Chat Application (Microservices Architecture)

A production-inspired real-time chat application built using a scalable microservices architecture. The system is designed with independent services for authentication, user management, messaging, and real-time communication.

The project demonstrates modern backend engineering practices including:

API Gateway pattern
Microservice architecture
JWT based authentication
Redis session management
MongoDB data storage
Socket.IO real-time communication
Service-to-service communication
Scalable backend structure
Clean separation of responsibilities
📑 Table of Contents
Project Overview
Architecture Overview
System Design
Services Overview
Technology Stack
Features
Authentication Flow
Chat Flow
Realtime Communication
Database Design
Redis Usage
Project Structure
API Gateway
Environment Variables
Installation & Setup
Running the Project
API Documentation
Screenshots
Future Improvements
Author
📌 Project Overview

This project is a full-stack real-time messaging platform where users can:

Register and authenticate securely
Manage their profiles
Search users
Send messages
Receive real-time messages
Track unread messages
Manage read receipts
Receive notifications
Maintain active sessions

The backend is divided into multiple independent services instead of a traditional monolithic architecture.

🏗 Architecture Overview
                    Client Application
                           |
                           |
                    API Gateway
                       Port 5000
                           |
        -------------------------------------
        |              |          |          |
        |              |          |          |
   Auth Service   User Service  Chat   Realtime
     5001            5002       5003      5004
                                   |
                                   |
                              Socket.IO


              MongoDB + Redis Infrastructure


🧩 Services Overview
1. API Gateway

Port:

5000

Responsibilities:

Single entry point for clients
Request routing
Authentication validation
Service proxy handling
Centralized error handling

Folder:

api-gateway
2. Authentication Service

Port:

5001

Responsibilities:

User registration
Login
Logout
Password encryption
JWT generation
Redis session management

Folder:

auth-service
3. User Service

Port:

5002

Responsibilities:

User profile management
Fetch users
Update profile
User information storage

Folder:

user-service
4. Chat Service

Port:

5003

Responsibilities:

Message creation
Conversation history
Read receipts
Unread message counting

Folder:

chat-service
5. Realtime Service

Port:

5004

Responsibilities:

Socket.IO communication
Online user tracking
Typing indicators
Notifications
Real-time message delivery

Folder:

realtime-service
🛠 Technology Stack
Backend
Technology	Purpose
Node.js	Runtime
Express.js	API Framework
MongoDB	Database
Mongoose	ODM
Redis	Session & realtime data
Socket.IO	WebSocket communication
JWT	Authentication
Axios	Service communication
Zod	Request validation
✨ Features
Authentication

✅ User registration
✅ Secure password hashing
✅ JWT authentication
✅ Redis based sessions
✅ Single active device session control
✅ Logout functionality

User Management

✅ Create profile
✅ View own profile
✅ View other users
✅ Update profile information

Messaging

✅ Send messages
✅ Fetch conversations
✅ Message history
✅ Read status
✅ Unread message count

Real-Time Features

✅ Instant messaging
✅ Online user tracking
✅ Typing indicator
✅ Notification system
✅ Read receipts
✅ Active chat tracking

🔐 Authentication Flow
User Login

      |
      |
Auth Service

      |
      |
Validate Credentials

      |
      |
Create Redis Session

      |
      |
Generate JWT

      |
      |
Return Token

      |
      |
Client stores Token



JWT Payload:

{
  "userId": "user_id",
  "sessionId": "session_id"
}

Redis Session:

session:<sessionId>

{
 userId,
 createdAt
}


💬 Chat Flow
User A

 |
 |
Send Message

 |
 |
Chat Service

 |
 |
Save Message MongoDB

 |
 |
Realtime Service

 |
 |
Socket.IO

 |
 |
User B receives message


⚡ Realtime Communication

Socket.IO handles:

Message delivery
Online status
Typing events
Notifications
Read events

Example events:

sendMessage

receiveMessage

typing

stopTyping

chatRead

onlineUsers

newNotification


🗄 Database Design
Auth Database

Collection:

AuthUser

Stores:

email
password
timestamps
User Database

Collection:

User

Stores:

userId
name
email
avatar
description
Chat Database

Collection:

Message

Stores:

senderId
receiverId
message content
message type
read status
timestamps
🔴 Redis Usage

Redis is used for:

Authentication Sessions
session:<sessionId>


Active User Session
user_active_session:<userId>


Notifications
notifications:<userId>


Presence Tracking
presence:user:<userId>


📂 Project Structure
Microservice-Chat-App

│
├── api-gateway
│
├── auth-service
│
├── user-service
│
├── chat-service
│
└── realtime-service



Each service follows:

src

├── controllers
├── services
├── routes
├── middleware
├── models
├── utils
└── config


🌐 API Gateway

All client requests go through:

http://localhost:5000

Example:

Authentication:

/api/auth/*

Users:

/api/users/*

Chat:

/api/chat/*

Realtime:

/api/realtime/*
⚙️ Environment Variables

Each service requires its own .env file.

Example:

PORT=

MONGO_URI=

REDIS_URL=

JWT_SECRET=

JWT_EXPIRES_IN=

AUTH_SERVICE_URL=

USER_SERVICE_URL=

CHAT_SERVICE_URL=

REALTIME_SERVICE_URL=


🚀 Installation & Setup

Clone repository:

git clone <repository-url>

Install dependencies:

npm install

Do this inside every service:

api-gateway

auth-service

user-service

chat-service

realtime-service


▶️ Running The Project

Start services individually:

API Gateway:

npm start

Auth Service:

npm start

User Service:

npm start

Chat Service:

npm start

Realtime Service:

npm start
📸 Screenshots
Application Screenshots
Login Page

Add screenshot here:

/screenshots/login.png
Registration Page

Add screenshot here:

/screenshots/register.png
User Profile

Add screenshot here:

/screenshots/profile.png
Chat Interface

Add screenshot here:

/screenshots/chat.png
Real-Time Messaging

Add screenshot here:

/screenshots/realtime.png
System Architecture Diagram

Add screenshot here:

/screenshots/architecture.png
🔮 Future Improvements

Possible improvements:

Kubernetes deployment
Docker containerization
CI/CD pipeline
Message queue integration
File upload service
Video calling
End-to-end encryption
API rate limiting
Central logging system
Monitoring with Prometheus & Grafana
Horizontal socket scaling
🏆 Engineering Highlights

This project demonstrates:

✅ Microservices architecture
✅ Distributed system concepts
✅ Real-time communication
✅ Authentication security
✅ Redis based session handling
✅ Service separation
✅ Scalable backend design

👨‍💻 Author

Developed as a backend engineering project focusing on:

Node.js architecture
Distributed systems
Real-time applications
Scalable microservices
⭐ Support

If you find this project useful, consider giving it a star ⭐
and sharing feedback for improvements.
