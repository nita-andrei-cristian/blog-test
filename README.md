# Blog Platform with Personalized Recommendations

A full-stack demo project built with React, Vite, and Express, representing a blog platform that provides personalized blog post recommendations based on user behavior, while respecting user consent and data privacy.

## 1. Overview

This project showcases a simple but complete blog application where users can:
- browse blog posts
- log in securely
- receive personalized post recommendations
- write and read comments

When a user is authenticated, the platform can track interaction data only with the user’s explicit consent and use it to improve content relevance.

## 2. Core Features

- Secure user authentication with encrypted credentials
- Session-based login system
- Consent-based user behavior tracking
- Personalized post recommendations based on user tags and interactions
- Commenting system for blog posts

## 3. Recommendation Logic

The recommendation system is based on:
1. User-selected or inferred tags
2. Interaction history such as viewed or commented posts
3. Post metadata including tags and categories

Based on these signals, the platform recommends relevant content tailored to each user.

## 4. User Authentication and Privacy

- User credentials are encrypted and never stored in plain text
- User behavior tracking is enabled only after explicit consent
- Tracking data is used exclusively for content recommendation
- No tracking is performed for unauthenticated users

## 5. Technology Stack

- Frontend: React, Vite
- Backend: Express, Node.js
- Authentication: Encrypted credentials and session-based auth
- Database: Lightweight storage for users, posts, and comments

## 6. Functionality Scope

This project is intended as a demo and focuses on:
- recommendation logic
- authentication flow
- basic blog interactions

It is not intended to be a full production-ready blogging platform.

## 7. Key Takeaway

The project demonstrates how personalized content recommendations can be implemented in a simple blog application while maintaining user privacy and explicit consent.
