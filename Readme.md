# DocSeek – Full Stack Doctor Consultation Platform

DocSeek is a full-stack web application that enables patients to discover doctors, book consultations, and manage appointments, while allowing doctors to manage availability and handle consultation requests.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (ElephantSQL)
- **Authentication:** Token-based authentication
- **Deployment:** Heroku (Backend), Netlify (Frontend)

---

## Features

### Authentication & User Management
- Separate signup and login flows for doctors and patients
- Token-based authentication
- Onboarding workflows to collect doctor availability and profile data
- Password reset functionality

### Doctor Discovery
- Fetch all doctors or individual doctor profiles
- Structured storage of doctor metadata including specialization and availability
- Relational querying for efficient data retrieval

### Consultation Booking System
- Patients can book consultations based on doctor availability
- Doctors can accept or cancel consultation requests
- View upcoming and past consultations
- Patients can leave reviews and ratings after completed consultations

### Scheduling & Availability
- APIs to manage doctor availability by date and time
- Calendar-based consultation tracking
- Validation logic to prevent double booking

---

## Backend Architecture

### API Design
Implemented RESTful endpoints for:

- Authentication (signup, login, password reset)
- Doctor and patient profile management
- Consultation creation, updates, and retrieval
- Availability management

### Database Design
Relational schemas designed for:

- Users (Doctors & Patients)
- Doctor Profiles & Availability
- Consultations
- Reviews & Ratings

Focused on normalized structure and clean entity relationships.

---

## Engineering Highlights

- Built backend APIs and database schema from scratch
- Implemented full consultation lifecycle workflows
- Designed secure authentication and authorization logic
- Debugged and resolved third-party dependency conflicts
- Deployed production-ready backend and frontend

---

## Deployment

- **Backend:** Node.js + Express deployed on Heroku
- **Database:** PostgreSQL hosted on ElephantSQL
- **Frontend:** React deployed on Netlify

---

## Summary

DocSeek demonstrates end-to-end full-stack development including API design, relational database modeling, authentication systems, scheduling logic, and production deployment.
