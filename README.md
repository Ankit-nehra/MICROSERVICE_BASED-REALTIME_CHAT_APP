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


To overcome these limitations, this project implements a **microservices-based architecture** where each major functionality is isolated into independent services.


The system architecture consists of:

