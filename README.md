# 💬 Scalable Real-Time Chat Application  
## Microservices-Based Communication Platform Using MERN Stack, Socket.IO, WebRTC, Redis & Upstash


<p align="center">
  <img src="./screenshots/banner.png" alt="Real Time Chat Application Banner" width="900"/>
</p>


<p align="center">
A production-ready real-time communication platform built with a scalable microservices architecture, enabling instant messaging, online presence, typing indicators, message status tracking, notifications, and real-time audio/video communication.
</p>


<p align="center">

![Frontend](https://img.shields.io/badge/Frontend-React.js-blue)
![State Management](https://img.shields.io/badge/State-Zustand-orange)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![API](https://img.shields.io/badge/API-Express.js-black)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Realtime](https://img.shields.io/badge/Realtime-Socket.IO-black)
![Communication](https://img.shields.io/badge/Calling-WebRTC-purple)
![Cache](https://img.shields.io/badge/Cache-Redis-red)
![Cloud Redis](https://img.shields.io/badge/Redis-Upstash-yellow)
![Architecture](https://img.shields.io/badge/Architecture-Microservices-orange)
![Containerization](https://img.shields.io/badge/Deployment-Docker-blue)

</p>


---

# 📑 Table of Contents


- [Abstract](#-abstract)
- [Introduction](#-introduction)
- [Project Vision](#-project-vision)
- [Core Features](#-core-features)
- [System Architecture](#-system-architecture)
- [Microservices Architecture](#-microservices-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Application Workflow](#-application-workflow)
- [Real-Time Communication](#-real-time-communication)
- [Audio & Video Calling](#-audio--video-calling)
- [Installation](#-installation)
- [Environment Configuration](#-environment-configuration)
- [Docker Deployment](#-docker-deployment)
- [API Documentation](#-api-documentation)
- [Socket Events](#-socket-events)
- [Database Design](#-database-design)
- [Performance & Scalability](#-performance--scalability)
- [Security Implementation](#-security-implementation)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Conclusion](#-conclusion)
- [Author](#-author)


---


# 📖 Abstract


Modern communication systems require highly scalable, low-latency, and reliable architectures capable of handling thousands of simultaneous users.

This project presents the design and implementation of a:

> **Scalable Microservices-Based Real-Time Chat Application using MERN Stack, Socket.IO, WebRTC, Redis and Upstash**


The application provides a complete real-time communication ecosystem where users can securely communicate through private messaging, maintain online presence, receive instant notifications, and perform real-time audio/video calls.


Unlike traditional monolithic chat applications, this system follows a distributed microservices architecture where different responsibilities are separated into independent backend services.


The platform includes:


- 🔐 Secure authentication system
- 💬 Private one-to-one messaging
- 🟢 Real-time online/offline presence
- ✍️ Typing indicators
- ✅ Message delivery and read status tracking
- 🔔 Real-time notifications
- 🔎 User search functionality
- 👤 User profile management
- 📞 Audio calling using WebRTC
- 🎥 Video calling using WebRTC
- ⚡ Real-time communication using Socket.IO
- 🚀 Distributed architecture using Redis and Upstash


The project focuses on building a scalable communication platform similar to modern applications such as WhatsApp, Discord, and Slack while maintaining modularity, performance, and future scalability.


---


# 🚀 Introduction


Real-time communication has become a fundamental requirement for modern applications.


Applications such as messaging platforms, collaboration tools, and social networks require:


- Instant message delivery
- Reliable connection management
- High concurrency support
- Low communication latency
- Real-time user interaction


Traditional monolithic architectures often become difficult to maintain as application complexity increases.


Common challenges include:


- Tight coupling between modules
- Difficult independent scaling
- Deployment complexity
- Poor fault isolation
- Performance bottlenecks

Frontend Application
|
|
API Gateway
|

| | | |
Auth User Chat Realtime
Service Service Service Service

    |
    |

MongoDB + Redis



Each service focuses on a specific responsibility, allowing:


- Independent development
- Easier maintenance
- Better scalability
- Improved fault tolerance
- Flexible deployment


---


# 🎯 Project Vision


The main vision of this project is to design and develop a production-level real-time communication platform that demonstrates:


## 1. Scalable Backend Architecture


Building an application using independent microservices instead of a single backend server.


Benefits:


- Service isolation
- Independent scaling
- Better maintainability
- Easier debugging


---


## 2. Real-Time Communication Engine


Implementing a low-latency communication layer using:



Socket.IO
+
WebSocket Communication
+
Redis Synchronization



The system enables:


- Instant message delivery
- Presence tracking
- Typing events
- Notifications
- Real-time updates


---


## 3. Modern Frontend Architecture


The frontend follows a scalable React architecture using:


- React.js
- Zustand state management
- Socket.IO Client
- Component-based design


The application provides a smooth user experience with:


- Instant UI updates
- Optimistic interactions
- Real-time state synchronization


---


## 4. Real-Time Voice & Video Communication


The platform supports peer-to-peer communication using:



WebRTC
+
Socket.IO Signaling



Users can establish:


- Audio calls
- Video calls
- Peer connections
- Media streaming


---


# ✨ Core Features


## 🔐 Authentication System


A secure authentication module providing:


### User Registration


Users can create new accounts with:


- Name
- Email
- Password
- Profile information


---


### Secure Login


Authentication flow:



User Credentials

    |

    ▼

Authentication Service

    |

    ▼

JWT Token Generation

    |

    ▼

Authenticated Session



Security implementation:


- JWT authentication
- Password hashing
- Protected routes
- Token validation


---


# 💬 Private Real-Time Messaging


The core functionality of the application.


Users can:


- Send private messages
- Receive messages instantly
- View previous conversations
- Continue previous chats


Communication:



Sender

|

|

Socket.IO Event

|

|

Realtime Service

|

|

Receiver



---


# 🟢 Online Presence System


The application tracks user availability in real-time.


Supported states:



🟢 Online

⚫ Offline

⌨️ Typing



The realtime service manages:


- Active socket connections
- User status
- Connection lifecycle


---


# ✍️ Typing Indicator


Users receive real-time typing feedback.


Example:



User A is typing...



Implementation:



Typing Event

  |

  ▼

Socket.IO

  |

  ▼

Receiver UI Update



---


# ✅ Message Status Tracking


The system supports message state management:



Sent

|

Delivered

|

Read



This improves user experience similar to modern messaging platforms.


---


# 🔔 Notification System


Real-time notification support for:


- New messages
- Incoming calls
- User activities


Example:



New Message Received

      |

      ▼

Realtime Service

      |

      ▼

Notification Event

      |

      ▼

User Interface Update



---


# 🔎 User Search System


Users can discover other users using search functionality.


Features:


- Search by username
- Search by profile information
- Instant result updates


---


# 👤 User Profile Management


Each user has a customizable profile system.


Features:


- View profile details
- Update personal information
- Profile dialog interface
- User information display


---


# 📞 Audio Calling


The application supports real-time audio communication.


Technology:



WebRTC
+
Socket.IO Signaling



Features:


- Peer-to-peer audio streaming
- Call initiation
- Call acceptance
- Call termination


---


# 🎥 Video Calling


Video communication is implemented using WebRTC.


Features:


- Camera streaming
- Real-time video transmission
- Peer connection management
- Call controls


Architecture:



User A

|

|

WebRTC Peer Connection

|

|

User B


To overcome these limitations, this project implements a **microservices-based architecture** where each major functionality is isolated into independent services.


The system architecture consists of:


---

# 🏗 System Architecture


The application follows a **distributed microservices architecture** where frontend communication is managed through an API Gateway and backend responsibilities are divided into independent services.


<p align="center">
  <img src="./screenshots/system-architecture.png" width="950" alt="System Architecture"/>
</p>


## High-Level Architecture

                     USER


                      |

                      |

             React Frontend

      (React + Zustand + Socket.IO Client)

                      |

                      |

                API Gateway

                   :5000

                      |

    -----------------------------------

    |              |          |        |

    ▼              ▼          ▼        ▼


  Auth          User       Chat    Realtime

Service       Service    Service   Service


 :5001         :5002      :5003     :5004


    |              |          |        |

    -----------------------------------

                      |

                      ▼


             MongoDB Database


                      +

                      |


                Redis / Upstash


---


# 🔥 Architecture Overview


The complete system is divided into two major layers:


## Frontend Layer


Responsible for:


- User interface rendering
- Application state management
- API communication
- Real-time event handling
- WebRTC call interface


Technology stack:



React.js

Zustand

Socket.IO Client

WebRTC

Axios

Tailwind CSS



---


## Backend Layer


The backend follows a microservices architecture.


Each service handles a dedicated business responsibility.


Backend components:



backend

│

├── api-gateway

│

├── services

│ │

│ ├── auth-service

│ │

│ ├── user-service

│ │

│ ├── chat-service

│ │

│ └── realtime-service

│

└── docker-compose.yml



---


# 🧩 Microservices Architecture


The system contains four independent backend services:


API Gateway Service
Authentication Service
User Service
Chat Service
Real-Time Communication Service


Each service can be independently:


- Developed
- Tested
- Deployed
- Scaled


---


# 🚪 API Gateway Service


## Overview


The API Gateway acts as the single entry point between frontend and backend services.


Instead of allowing frontend to directly communicate with multiple services, all requests are routed through the gateway.


Architecture:



Frontend

|

|

API Gateway

|

| | |

Auth User Chat

Service Service Service



---


## Responsibilities


The API Gateway manages:


- Client request routing
- Service communication
- API abstraction
- Centralized backend access


Advantages:


- Improved security
- Reduced frontend complexity
- Better service isolation
- Easier scaling


Technologies:



Node.js

Express.js

Axios



---


# 🔐 Authentication Service


## Overview


The Authentication Service manages user identity, security, and authorization.


Location:



backend/services/auth-service



---


## Responsibilities


The service handles:


### User Registration


Flow:



User Data

|

▼

Auth Service

|

▼

Password Encryption

|

▼

MongoDB Storage



---


### User Login


Flow:



Email + Password

    |

    ▼

Authentication Validation

    |

    ▼

JWT Token Generation

    |

    ▼

Authenticated User



---


## Security Implementation


Implemented security mechanisms:


| Feature | Technology |
|---|---|
| Authentication | JWT |
| Password Security | bcrypt |
| Session Validation | Middleware |
| Protected Routes | Token Verification |


---


# 👤 User Service


## Overview


The User Service manages user-related operations and profile management.


Location:



backend/services/user-service



---


## Responsibilities


The service handles:


- User information
- Profile management
- User search
- User discovery
- Profile updates


---


## Supported Features


### Profile Management


Users can:


- View profile
- Update profile information
- Display profile dialog
- Manage user details


---


### User Search


Search functionality allows:

Search Query

  |

  ▼

User Service

  |

  ▼

Matching Users



---


# 💬 Chat Service


## Overview


The Chat Service manages all message-related operations.


Location:



backend/services/chat-service



---


## Responsibilities


The service handles:


- Message storage
- Conversation history
- Private chat management
- Message retrieval


---


## Message Flow



Sender

|

|

sendMessage Event

|

|

Realtime Service

|

|

Chat Service

|

|

MongoDB

|

|

Receiver



---


## Message Lifecycle



Message Created

    |

    ▼

Stored in Database

    |

    ▼

Realtime Delivery

    |

    ▼

Read Status Updated



---


# ⚡ Real-Time Service


## Overview


The Real-Time Service is responsible for all live communication features.


Location:



backend/services/realtime-service



---


## Responsibilities


The service manages:


- Socket.IO connections
- Online user tracking
- Typing indicators
- Message delivery
- Notifications
- Call signaling


---


# 🔌 Socket.IO Communication Architecture


<p align="center">
  <img src="./screenshots/socket-flow.png" width="850"/>
</p>


Real-time communication flow:



---


# 📡 Real-Time Events


The application uses Socket.IO events for instant communication.


## User Connection


Event:

join



Purpose:


- Register active user
- Maintain socket mapping
- Update online status


---


## Send Message


Event:



sendMessage



Flow:



Sender

|

|

sendMessage

|

|

Realtime Service

|

|

Receiver



---


## Receive Message


Event:



receiveMessage



Purpose:


- Deliver message instantly
- Update chat interface


---


## Typing Indicator


Events:



typing

stopTyping



Purpose:


- Show real-time typing status


---


## Message Status Events


Events:



messageDelivered

messageRead



Purpose:


- Track message lifecycle


---


# 📞 WebRTC Calling Architecture


The application implements peer-to-peer audio and video communication using WebRTC.


Socket.IO is used only for signaling.


Architecture:


          User A


            |

            |

    Socket.IO Signaling


            |

            |

      WebRTC Handshake


            |

            |

    Peer To Peer Connection


            |

            |

          User B


---


# WebRTC Call Flow


## 1. Call Initiation



User A clicks Call

    |

    ▼

Create WebRTC Offer

    |

    ▼

Send Signal Through Socket.IO



---


## 2. Call Acceptance



User B receives request

    |

    ▼

Creates Answer

    |

    ▼

Returns WebRTC Response



---


## 3. Media Connection


After successful handshake:



Camera Stream

    +

Microphone Stream

    |

    ▼

Peer Connection

    |

    ▼

Real-Time Communication



---


# 🔴 Redis & Upstash Integration


Redis provides high-speed in-memory data operations.


The project uses Redis/Upstash for:


- Real-time state management
- Socket synchronization
- Fast data access
- Distributed communication support


Architecture:


          Clients


             |

             |

      Multiple Servers


             |

             |

          Redis


             |

             |

   Shared Real-Time State


---


## Benefits of Redis Integration


### Scalability


Multiple realtime servers can share:


- User presence
- Socket information
- Events


---


### Performance


Redis provides:


- Low latency operations
- Fast data retrieval
- Efficient caching


---


### Distributed Architecture


Future scaling:



Server 1

Server 2

Server 3

  |

  |

Redis Pub/Sub



allows all instances to communicate efficiently.


---

---

# 🛠 Technology Stack


The project is developed using modern full-stack technologies with a focus on scalability, maintainability, and real-time performance.


---

# 🎨 Frontend Technologies


| Technology | Purpose |
|------------|---------|
| React.js | Building interactive user interfaces |
| Zustand | Lightweight global state management |
| Tailwind CSS | Modern responsive UI styling |
| Socket.IO Client | Real-time communication |
| WebRTC | Audio and video communication |
| Axios | API communication |
| React Router | Client-side routing |
| React Hooks | Component state and lifecycle management |


---


# ⚙️ Backend Technologies


| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime environment |
| Express.js | REST API development |
| Socket.IO | Real-time event communication |
| MongoDB | Primary database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication mechanism |
| bcrypt | Password encryption |
| Axios | Service-to-service communication |


---


# 🚀 Architecture Technologies


| Technology | Purpose |
|------------|---------|
| Microservices Architecture | Independent backend services |
| API Gateway Pattern | Centralized request routing |
| Redis | Real-time data synchronization |
| Upstash Redis | Cloud-based Redis infrastructure |
| WebRTC | Peer-to-peer communication |
| Docker | Containerization |
| Docker Compose | Multi-service orchestration |


---


# 🖥 Frontend Architecture


The frontend follows a scalable React-based architecture.


The application is divided into:

frontend

│

├── components

│

├── pages

│

├── hooks

│

├── store

│

├── services

│

├── socket

│

├── utils

│

└── App.jsx



---


# 🧠 State Management Using Zustand


The application uses Zustand for efficient global state management.


Unlike traditional state management solutions, Zustand provides:


- Minimal boilerplate
- High performance
- Simple store structure
- Easy React integration


---


## Zustand Store Responsibilities


The global store manages:


### Authentication State

currentUser

authentication status

JWT information



---


### Chat State



selected conversation

messages

active chat user

chat history



---


### Real-Time State



online users

typing users

socket connection

notifications



---


### Calling State



incoming call

outgoing call

call status

media streams



---


## Zustand Data Flow


          User Action


              |

              |

         React Component


              |

              |

        Zustand Store


              |

              |

   Global Application State


              |

              |

      UI Re-render Update


---


# 📡 Socket.IO Client Architecture


The frontend maintains a persistent connection with the realtime service.


Communication flow:



React Application

    |

    |

Socket.IO Client

    |

    |

Realtime Service

    |

    |

Socket Events

    |

    |

UI Updates



---


# 📞 WebRTC Frontend Flow


The frontend handles:


- Camera access
- Microphone access
- Peer connection creation
- Media stream handling


Flow:



User Clicks Call

    |

    ▼

Request Media Permission

    |

    ▼

Create RTCPeerConnection

    |

    ▼

Exchange SDP Through Socket

    |

    ▼

Establish Peer Connection

    |

    ▼

Audio / Video Stream



---


# 📂 Complete Project Structure


The project follows a clean microservices folder organization.



chat-app

│

├── frontend

│

│ ├── src

│ │

│ ├── components

│ │

│ ├── pages

│ │

│ ├── store

│ │

│ ├── hooks

│ │

│ ├── socket

│ │

│ ├── services

│ │

│ └── App.jsx

│

├── backend

│ ├── api-gateway

│ │

│ ├── routes

│ │

│ ├── middleware

│ │

│ └── server.js

│

├── services

│ │

│ ├── auth-service

│ │

│ ├── controllers

│ ├── models

│ ├── routes

│ ├── services

│ └── server.js

│

│ ├── user-service

│ │

│ ├── controllers

│ ├── models

│ ├── routes

│ └── server.js

│

│ ├── chat-service

│ │

│ ├── controllers

│ ├── models

│ ├── routes

│ └── server.js

│

│ └── realtime-service

│ │

│ ├── sockets

│ ├── events

│ ├── utils

│ └── server.js

│

├── docker-compose.yml

└── README.md



---


# 🔄 Complete Application Workflow


The complete user journey:


              User Opens Application


                       |

                       |


              Authentication Check


                       |

                       |


          ---------------------------

          |                         |

          ▼                         ▼


      Login                     Register


          |                         |


          ---------------------------


                       |

                       |


                Dashboard


                       |

                       |


            Fetch Available Users


                       |

                       |


            Select Conversation


                       |

                       |


          Real-Time Chat Connection


                       |

                       |


    -------------------------------------


    |                |                  |

Messages Typing Status Notifications

    |                |                  |


    -------------------------------------


                       |


              Audio / Video Call


                       |


                   WebRTC


---


# 🗄 Database Design


The application uses MongoDB as the primary database.


Database:



MongoDB



Collections:



users

messages

conversations



---


# 👤 User Collection


Collection:



users



Schema:


```javascript
{
    _id: ObjectId,

    name: String,

    email: String,

    password: String,

    profileImage: String,

    bio: String,

    createdAt: Date,

    updatedAt: Date
}

💬 Message Collection

Collection:

messages


Schema:

{
    _id: ObjectId,

    senderId: ObjectId,

    receiverId: ObjectId,

    message: String,

    messageType: String,

    status: String,

    createdAt: Date

}


Message status example:

sent

delivered

read

👫 Conversation Collection

Collection:

conversations


Schema:

{
    _id: ObjectId,

    participants: [

        userId1,

        userId2

    ],

    lastMessage: ObjectId,

    updatedAt: Date

}

🔐 Authentication Data Flow
Frontend


   |

   |

Login Request


   |

   |

API Gateway


   |

   |

Auth Service


   |

   |

Validate User


   |

   |

Generate JWT


   |

   |

Return Token


🐳 Docker Architecture

The backend services are containerized using Docker.

Docker Compose manages:

API Gateway

Auth Service

User Service

Chat Service

Realtime Service

Redis

MongoDB


Architecture:

                Docker Compose


                      |

        --------------------------------


        |        |        |        |


      Auth     User     Chat   Realtime


        |        |        |        |


        --------------------------------


                      |


              MongoDB + Redis


📦 Docker Benefits

Using Docker provides:

Environment consistency
Easy deployment
Service isolation
Faster development setup
Cloud deployment readiness

---

---

# ⚙️ Installation & Setup


Follow the steps below to run the project locally.


---

# 📌 Prerequisites


Before starting, make sure the following tools are installed:


| Tool | Version |
|------|---------|
| Node.js | v18+ |
| npm | v9+ |
| MongoDB | Latest |
| Redis | Latest |
| Docker | Latest |
| Docker Compose | Latest |


---


# 📥 Clone Repository


```bash
git clone <repository-url>

cd chat-app
📁 Project Setup

The project contains two main parts:

chat-app

│

├── frontend

│

└── backend

🎨 Frontend Setup

Navigate to frontend:

cd frontend

Install dependencies:

npm install

Create environment file:

.env

Example:

VITE_API_URL=http://localhost:5000

VITE_SOCKET_URL=http://localhost:5004


Run frontend:

npm run dev

Frontend will start:

http://localhost:5173

⚙️ Backend Setup

Navigate:

cd backend

The backend contains multiple independent services.

backend

│

├── api-gateway

├── services

│       |

│       ├── auth-service

│       ├── user-service

│       ├── chat-service

│       └── realtime-service


Each service requires dependency installation.

🚪 API Gateway Setup

Navigate:

cd api-gateway

npm install


Run:

npm start


Service:

PORT : 5000

🔐 Auth Service Setup

Navigate:

cd services/auth-service

npm install


Run:

npm start


Service:

PORT : 5001

👤 User Service Setup

Navigate:

cd services/user-service

npm install


Run:

npm start


Service:

PORT : 5002

💬 Chat Service Setup

Navigate:

cd services/chat-service

npm install


Run:

npm start


Service:

PORT : 5003

⚡ Realtime Service Setup

Navigate:

cd services/realtime-service

npm install


Run:

npm start


Service:

PORT : 5004

🔑 Environment Configuration

Every backend service contains its own environment configuration.

Auth Service .env
PORT=5001


MONGO_URI=mongodb_connection_string


JWT_SECRET=your_secret_key


REDIS_URL=your_upstash_redis_url

User Service .env
PORT=5002


MONGO_URI=mongodb_connection_string

Chat Service .env
PORT=5003


MONGO_URI=mongodb_connection_string

Realtime Service .env
PORT=5004


REDIS_URL=your_upstash_redis_url


CLIENT_URL=http://localhost:5173

🌐 Complete Service Communication
                 React Frontend


                      |


                      |


              API Gateway :5000


                      |


 ------------------------------------------------


 |              |             |                 |


Auth          User          Chat          Realtime


:5001         :5002         :5003          :5004



                      |


                      |


              MongoDB + Redis


🐳 Docker Deployment

The project supports containerized deployment using Docker Compose.

Run all services:

docker compose up --build


Stop containers:

docker compose down


View running containers:

docker ps

Docker Compose Architecture
docker-compose.yml


        |

        |

-------------------------------------


|          |          |              |


Gateway   Auth       User        Chat


5000      5001       5002        5003



                 |


                 |


             Realtime


              5004



                 |


          MongoDB + Redis

🔌 API Documentation

The frontend communicates with backend services through API Gateway.

Base URL:

http://localhost:5000

🔐 Authentication APIs
Register User

Endpoint:

POST /api/auth/register


Request:

{
    "name":"John Doe",

    "email":"john@gmail.com",

    "password":"password123"

}


Response:

{
    "success":true,

    "token":"jwt_token",

    "user":{}

}

Login User

Endpoint:

POST /api/auth/login


Request:

{
    "email":"john@gmail.com",

    "password":"password123"

}

👤 User APIs
Get Users
GET /api/users


Returns:

User list
Profile information
Online availability
Search Users
GET /api/users/search?query=name

Update Profile
PUT /api/users/profile


Updates:

Name
Profile image
Bio
Personal details
💬 Chat APIs
Send Message
POST /api/chat/send


Request:

{
 "receiverId":"user_id",

 "message":"Hello"

}

Get Conversation
GET /api/chat/:userId


Returns:

Previous messages
Message status
Conversation history
📡 Socket.IO Documentation

The realtime service handles all socket communication.

Connection:

Client

 |

 |

Socket.IO Client

 |

 |

Realtime Service

🔗 Connection Event

Event:

connection


Triggered when user connects.

🟢 Join Event

Event:

join


Purpose:

Register user socket
Maintain online status

Example:

socket.emit(
"join",
{
 userId
}
)

💬 Send Message Event

Event:

sendMessage


Flow:

Sender

 |

 |

sendMessage


 |

 |

Realtime Service


 |

 |

Receiver


📥 Receive Message Event

Event:

receiveMessage


Purpose:

Instant message delivery
Update chat UI
✍️ Typing Events

Start typing:

typing


Stop typing:

stopTyping


Purpose:

Display:

User is typing...

✅ Message Status Events

Events:

messageDelivered

messageRead


Message lifecycle:

Sent

 ↓

Delivered

 ↓

Read

🔔 Notification Events

Event:

newNotification


Used for:

New messages
Incoming calls
User activity
📞 WebRTC Signaling Events

Events:

callUser

incomingCall

answerCall

rejectCall

endCall


Purpose:

Exchange:

SDP offer
SDP answer
ICE candidates
🧪 Testing Checklist

Before deployment verify:

✅ Authentication flow

✅ Private messaging

✅ Online/offline status

✅ Typing indicator

✅ Read receipts

✅ Notifications

✅ User search

✅ Profile update

✅ Audio call

✅ Video call

✅ Docker deployment

