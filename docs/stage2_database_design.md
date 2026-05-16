# Stage 2 – Database Design and Scaling Considerations

## Introduction

The notification platform needs a database structure that can handle continuous notification creation while still supporting fast reads for students checking updates. The design below focuses on simple relational modeling, efficient unread-notification retrieval, and future scalability.

---

# Database Choice

## Selected Database

PostgreSQL

---

# Reason for Choosing PostgreSQL

PostgreSQL is a good fit for this system because notification records are structured and highly query-oriented. The application frequently performs operations such as:

* fetching unread notifications
* sorting notifications by latest time
* filtering by category
* retrieving notifications for a specific student

A relational database works well here because the data model is predictable and relationships between students and notifications are clearly defined.

PostgreSQL also provides:

* strong indexing support
* transactional reliability
* good query optimization
* support for scaling using replicas and partitioning

---

# Main Entities

The system contains two primary entities:

1. Students
2. Notifications

Relationship:

One student can receive many notifications.

---

# Student Table

```sql
CREATE TABLE students (

    id INT PRIMARY KEY,

    full_name VARCHAR(120) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL

);
```

---

# Notification Table

```sql
CREATE TABLE notifications (

    notification_id UUID PRIMARY KEY,

    student_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,

    message TEXT NOT NULL,

    category VARCHAR(50) NOT NULL,

    priority_level VARCHAR(20) NOT NULL,

    read_status BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT notification_student_fk
    FOREIGN KEY (student_id)
    REFERENCES students(id)

);
```

---

# Explanation of Schema Design

Each notification stores:

* notification title
* detailed message
* category
* priority level
* read/unread state
* creation timestamp

UUID values are used for notification IDs because they avoid collisions and are safer if the system is expanded across multiple services in the future.

The read status column helps the system quickly separate viewed notifications from pending notifications.

---

# Notification Categories

The platform currently supports:

* Placement
* Event
* Results
* General Announcements

---

# Priority Levels

Priority levels are included to support future ranking and filtering logic.

Available levels:

* High
* Medium
* Low

---

# Indexing Strategy

Indexes are important because some operations will happen very frequently once the application grows.

Common operations include:

* retrieving unread notifications
* sorting by recent activity
* filtering notifications by category
* loading notifications for a specific student

---

# Composite Index for Notification Retrieval

```sql
CREATE INDEX idx_student_read_timestamp
ON notifications(student_id, read_status, created_at DESC);
```

---

# Purpose of This Index

This index improves the performance of queries that retrieve unread notifications ordered by latest timestamp.

Example:

```sql
SELECT notification_id, title, message, created_at
FROM notifications
WHERE student_id = 1042
AND read_status = false
ORDER BY created_at DESC;
```

Without indexing, the database may scan large portions of the table whenever a student opens the notification page.

---

# Category Index

```sql
CREATE INDEX idx_category
ON notifications(category);
```

---

# Why This Index Helps

This index improves category-based filtering such as:

* viewing only placement notifications
* generating reports
* analytics queries

---

# Why Not Index Every Column?

Adding indexes everywhere is not efficient.

More indexes increase:

* storage consumption
* insert cost
* update overhead

Every new notification would require all indexes to be updated, which slows down write operations.

Indexes should therefore be created only for frequently queried fields.

---

# Scalability Challenges

## 1. Rapid Table Growth

Notification systems grow quickly because every event may create records for many students.

As the dataset becomes larger:

* queries become slower
* indexes grow in size
* sorting operations become more expensive

---

# 2. Heavy Read Traffic

Students are expected to check notifications frequently, especially during placement or result announcements.

Large numbers of simultaneous reads can increase database pressure.

---

# 3. Costly Sorting Operations

Sorting notifications by timestamp becomes expensive if indexes are not aligned with query patterns.

---

# 4. Unread Notification Queries

Unread-notification retrieval will likely become the most repeated operation in the system.

Poor indexing could lead to full table scans under high traffic.

---

# Optimization Approaches

## Pagination

The API should avoid returning the entire notification history in a single response.

Example:

```http
GET /notifications?page=1&limit=20
```

Pagination reduces:

* response size
* memory usage
* database load

---

# Redis Caching

Unread notifications that are repeatedly requested can be cached temporarily using Redis.

Advantages:

* lower database traffic
* faster response time
* better performance during peak usage

Tradeoff:

* additional infrastructure management

---

# Archiving Older Notifications

Notifications older than a certain duration can be moved into archive tables.

This keeps the active table smaller and improves query efficiency.

---

# Read Replicas

Read replicas can distribute notification-fetch requests across multiple database instances.

This reduces pressure on the primary database during high-traffic events.

---

# Query Optimization Example

## Less Efficient Query

```sql
SELECT *
FROM notifications
WHERE student_id = 1042
AND read_status = false
ORDER BY created_at ASC;
```

---

# Problems in the Above Query

* retrieves unnecessary columns
* ascending order is less useful for latest notifications
* no row limit
* becomes expensive for large datasets

---

# Improved Query

```sql
SELECT notification_id, title, message, created_at
FROM notifications
WHERE student_id = 1042
AND read_status = false
ORDER BY created_at DESC
LIMIT 50;
```

---

# Why the Improved Query Performs Better

The optimized version:

* fetches only required columns
* reduces transferred data
* limits rows returned
* works efficiently with indexes

---

# Design Tradeoffs

| Design Choice     | Benefit                       | Limitation                          |
| ----------------- | ----------------------------- | ----------------------------------- |
| PostgreSQL        | Reliable relational querying  | Scaling writes can become difficult |
| UUID IDs          | Safer distributed identifiers | Larger indexes                      |
| Composite Indexes | Faster unread queries         | Slightly slower inserts             |
| Redis Cache       | Reduced database reads        | Extra infrastructure                |
| Pagination        | Lower query load              | Requires multiple requests          |

---

# Possible Future Enhancements

The system can later be extended with:

* table partitioning
* asynchronous processing queues
* Kafka or RabbitMQ integration
* push notification services
* notification expiry policies

---

# Conclusion

The proposed design aims to balance simplicity, maintainability, and performance. PostgreSQL combined with targeted indexing, pagination, and caching provides a stable foundation for handling notification delive
