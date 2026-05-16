# Stage 3 – Query Optimization and Indexing Strategy

## Overview

This stage focuses on improving database query performance for the notification system. As the number of students and notifications increases, inefficient queries can create slower response times and unnecessary database load.

The goal of this analysis is to identify performance bottlenecks, optimize queries, and recommend indexing strategies for faster notification retrieval.

---

# Initial Query

```sql
SELECT *
FROM notifications
WHERE student_id = 1042
AND is_read = false
ORDER BY created_at ASC;
```

---

# Problems With the Initial Query

The above query may work correctly for smaller datasets, but performance issues can appear once the notifications table grows significantly.

Several factors increase execution cost:

- `SELECT *` retrieves unnecessary columns
- sorting large datasets becomes expensive
- missing row limits increases memory usage
- unread notification queries occur frequently
- lack of proper indexing may cause full table scans

---

# Why Full Table Scans Are Expensive

Without indexes, the database may scan every row in the notifications table to locate matching records.

As the table size increases to millions of rows, query execution time also increases significantly.

This problem becomes more noticeable during high-traffic events such as:

- placement announcements
- examination results
- campus-wide notifications

---

# Optimized Query

```sql
SELECT id, title, message, created_at
FROM notifications
WHERE student_id = 1042
AND is_read = false
ORDER BY created_at DESC
LIMIT 50;
```

---

# Improvements in the Optimized Query

The optimized query improves performance in several ways:

- retrieves only required columns
- reduces transferred data size
- limits returned rows
- displays latest notifications first
- works efficiently with indexes

Using `LIMIT` also reduces unnecessary memory usage when the student has a large notification history.

---

# Recommended Composite Index

```sql
CREATE INDEX idx_notifications_student_read_created
ON notifications(student_id, is_read, created_at DESC);
```

---

# Why This Index Is Effective

This composite index matches the filtering and sorting pattern used in the query.

The database can quickly:

1. locate notifications for a specific student
2. filter unread notifications
3. return results in timestamp order

Without this index, sorting and filtering operations become more expensive as data grows.

---

# Additional Category Index

```sql
CREATE INDEX idx_notification_type
ON notifications(notification_type);
```

---

# Purpose of the Category Index

This index helps improve category-based queries such as:

- placement notification retrieval
- analytics queries
- event-based filtering
- reporting operations

---

# Why Indexing Every Column Is Not Recommended

Adding indexes to every column creates additional overhead.

Too many indexes increase:

- storage consumption
- insert execution time
- update cost
- index maintenance operations

Every new notification insertion also updates all related indexes.

Indexes should therefore be created only for frequently queried fields.

---

# Example Placement Notification Query

```sql
SELECT DISTINCT student_id
FROM notifications
WHERE notification_type = 'Placement'
AND created_at >= NOW() - INTERVAL '7 days';
```

---

# Use Case of This Query

This query helps identify students who recently received placement-related notifications.

Possible use cases include:

- analytics
- placement engagement reports
- notification tracking dashboards

---

# Pagination Strategy

Returning the complete notification history in a single request is inefficient.

Pagination reduces:

- response payload size
- memory usage
- query execution time

Example:

```http
GET /notifications?page=1&limit=20
```

---

# Caching Frequently Accessed Data

Unread notifications are likely to be requested repeatedly.

Caching frequently accessed notification data using Redis can reduce database load and improve response time.

Benefits include:

- lower database traffic
- faster API responses
- better scalability during peak traffic

---

# Read Replica Strategy

During placement drives or result announcements, thousands of students may access notifications simultaneously.

Read replicas can distribute read traffic across multiple database instances instead of relying on a single primary database.

This improves concurrent read performance.

---

# Archiving Older Notifications

Older notifications that are rarely accessed can be moved into archive tables.

Advantages:

- smaller active datasets
- faster queries
- reduced index size

This keeps the primary notifications table more efficient.

---

# Query Optimization Tradeoffs

| Optimization | Benefit | Tradeoff |
|---|---|---|
| Composite Index | Faster unread notification retrieval | Slightly slower inserts |
| Pagination | Lower memory usage | Multiple API calls |
| Redis Cache | Faster repeated reads | Additional infrastructure |
| Read Replicas | Better read scalability | Replication complexity |
| Archiving | Smaller active dataset | Additional maintenance |

---

# Performance Considerations

The most common notification operations expected in the system are:

- unread notification retrieval
- latest notification sorting
- category filtering
- notification history loading

The database structure and indexing strategy should prioritize these operations for better scalability.

---

# Future Improvements

Possible future enhancements include:

- table partitioning
- asynchronous notification processing
- background cleanup jobs
- automatic notification expiry
- distributed caching systems

---

# Conclusion

Efficient query design and indexing strategies are critical for maintaining fast notification retrieval as the system grows.

Using selective column retrieval, composite indexes, pagination, caching, and read replicas helps reduce database load while improving scalability and response time for students accessing notifications.