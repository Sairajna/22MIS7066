# Campus Notification Platform

## Overview

This project is a scalable campus notification platform designed to manage and deliver notifications related to:

- placements
- academic results
- campus events

The project includes:

- REST API design documentation
- database design and optimization analysis
- scalability and distributed processing strategies
- notification prioritization logic
- responsive frontend implementation using React and Material UI

---

# Technologies Used

## Backend

- Node.js
- Express.js
- Axios

## Frontend

- React.js
- Material UI
- React Router DOM

---

# Project Structure

```txt
project/
│
├── docs/
│   ├── notification_system_design.md
│   ├── stage2_database_design.md
│   ├── stage3_query_optimization.md
│   ├── stage4_scalability_strategy.md
│   └── stage5_bulk_notification_design.md
│
├── frontend/
│   ├── demo/
│   ├── screenshots/
│   ├── src/
│   └── package.json
│
├── screenshots/
│
├── priorityNotifications.js
├── server.js
├── package.json
└── README.md
```

---

# Features

## Stage 1

- REST API design
- notification schema
- pagination strategy
- WebSocket-based real-time updates

## Stage 2

- database schema design
- entity relationship analysis
- normalization strategy

## Stage 3

- query optimization
- indexing strategy
- performance analysis

## Stage 4

- scalability planning
- Redis caching
- WebSocket updates
- read replica strategy

## Stage 5

- asynchronous queue-based notification delivery
- distributed worker processing
- retry mechanisms

## Stage 6

- notification prioritization logic
- sorting based on:
  - Placement
  - Result
  - Event
- top notification retrieval

## Stage 7

- responsive React frontend
- Material UI implementation
- pagination
- filtering
- viewed/unviewed notifications
- mobile responsive design

---

# Notification Priority Logic

Notifications are prioritized using the following order:

1. Placement
2. Result
3. Event

If notifications share the same type, the latest notification is displayed first.

---

# Frontend Pages

| Route | Description |
|---|---|
| / | All notifications |
| /priority | Priority notifications |
| /filter | Filter notifications |

---

# Setup Instructions

## Backend Setup

Install dependencies:

```bash
npm install
```

Run notification prioritization logic:

```bash
node priorityNotifications.js
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm start
```

Application runs on:

```txt
http://localhost:3000
```

---

# Screenshots and Demo

The repository includes:

- terminal execution screenshots
- frontend screenshots
- responsive mobile view screenshots
- demo screen recording

---

# Scalability Considerations

The system design includes:

- pagination
- caching support
- read replicas
- asynchronous processing
- retry handling
- queue-based notification delivery

These strategies help improve performance during high notification traffic.

---

# Conclusion

This project demonstrates the design and implementation of a scalable campus notification platform with backend architecture planning, notification prioritization logic, and responsive frontend development.