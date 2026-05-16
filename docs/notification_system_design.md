# Stage 1 – Notification System REST API Design

## Overview

The campus notification platform is designed to provide students with real-time updates related to placements, events, and academic results.

The system supports:

- notification retrieval
- unread notification tracking
- notification filtering
- real-time updates
- pagination support

---

# Base URL

```http
/api/v1
```

---

# Authentication

The system assumes that users are already authenticated.

Example request headers:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

---

# Notification Object Structure

```json
{
  "id": "f8c1a220",
  "studentId": "22MIS7066",
  "type": "Placement",
  "title": "Placement Opportunity",
  "message": "Amazon hiring drive starts tomorrow",
  "isRead": false,
  "createdAt": "2026-04-22T17:51:18Z"
}
```

---

# Get All Notifications

## Endpoint

```http
GET /api/v1/notifications
```

---

## Query Parameters

| Parameter | Description |
|---|---|
| page | Current page number |
| limit | Notifications per page |
| type | Filter by notification type |

---

## Example Request

```http
GET /api/v1/notifications?page=1&limit=10&type=Placement
```

---

## Example Response

```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "notifications": [
    {
      "id": "101",
      "type": "Placement",
      "title": "Amazon Hiring",
      "message": "Placement drive tomorrow",
      "isRead": false,
      "createdAt": "2026-04-22T17:51:18Z"
    }
  ]
}
```

---

# Get Unread Notifications

## Endpoint

```http
GET /api/v1/notifications/unread
```

---

## Example Response

```json
{
  "success": true,
  "count": 5,
  "notifications": [
    {
      "id": "102",
      "type": "Result",
      "title": "Semester Results",
      "message": "Results have been published",
      "isRead": false,
      "createdAt": "2026-04-22T18:10:00Z"
    }
  ]
}
```

---

# Mark Notification as Read

## Endpoint

```http
PATCH /api/v1/notifications/:id/read
```

---

## Example Request

```http
PATCH /api/v1/notifications/102/read
```

---

## Example Response

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

# Delete Notification

## Endpoint

```http
DELETE /api/v1/notifications/:id
```

---

## Example Response

```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

---

# Create Notification

## Endpoint

```http
POST /api/v1/notifications
```

---

## Request Body

```json
{
  "studentIds": [
    "22MIS7066",
    "22MIS7011"
  ],
  "type": "Placement",
  "title": "Placement Drive",
  "message": "Microsoft hiring drive starts tomorrow"
}
```

---

## Example Response

```json
{
  "success": true,
  "message": "Notifications created successfully"
}
```

---

# Supported Notification Types

| Type |
|---|
| Placement |
| Result |
| Event |

---

# Real-Time Notification Strategy

The platform uses WebSockets for real-time notification delivery.

When a new notification is created:

1. notification saved in database
2. WebSocket event triggered
3. connected clients receive update instantly

This reduces repeated API polling and improves user experience.

---

# Example WebSocket Event

```json
{
  "event": "notification:new",
  "data": {
    "id": "120",
    "type": "Placement",
    "message": "TCS hiring drive announced"
  }
}
```

---

# Pagination Strategy

Pagination is used to reduce response payload size and improve API performance.

Example:

```http
GET /api/v1/notifications?page=2&limit=20
```

---

# Error Response Structure

```json
{
  "success": false,
  "message": "Unable to fetch notifications"
}
```

---

# Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Scalability Considerations

The notification platform should support:

- high concurrent users
- pagination
- unread notification optimization
- real-time delivery
- caching support

Redis caching and WebSocket communication can improve performance during high notification traffic.

---

# Conclusion

The proposed REST API structure provides a scalable and maintainable notification platform for handling placement, event, and result notifications efficiently.