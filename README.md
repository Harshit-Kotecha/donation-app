# Donation App

## Overview
This Donation App allows users to donate various items to those in need. Users can browse, post, and manage donations. Whether it's clothing, books, food, or other goods, this platform provides a simple way to contribute and connect with others who may benefit.

## Features
- **User Registration & Authentication**: Secure sign-up and login.
- **Browse Donations**: View items donated by others.
- **Post a Donation**: Donate any item by filling out a form.
- **Search & Filter**: Easily find items based on category or location.
- **Manage Donations**: Users can edit or remove their posted donations.
- **Responsive UI**: Optimized for desktop and mobile.

## Tech Stack

### Frontend
- **React** (with TypeScript): Handles the user interface and client-side interactions.
- **Axios**: For API calls to communicate with the backend.

### Backend
- **Java & Spring Boot**: Backend logic and RESTful API services.
- **PostgreSQL**: Relational database to store user and donation data.

## Installation

### Prerequisites
- Node.js (for frontend)
- Java (for backend)

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/donation-app.git
    cd donation-app
    ```

2. **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    npm start
    ```

3. **Backend Setup**:
      ```bash
      cd backend
      ./mvnw spring-boot:run
      ```

## API Endpoints

### Donation Endpoints:
- `GET /api/donations`: Fetch all donations.
- `POST /api/donations`: Create a new donation.
- `PUT /api/donations/{id}`: Update a donation.
- `DELETE /api/donations/{id}`: Delete a donation.

## Contributions
Feel free to reach out to me if you have any suggestions.

---

Let me know if you need any more details or adjustments!
