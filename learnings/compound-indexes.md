# Compound Indexes in MongoDB

## What is an Index?

Think of an index like the index at the back of a textbook. Instead of reading every page to find a topic, you look it up in the index which tells you exactly which page to go to. In databases, indexes help find data much faster.

## What is a Compound Index?

A **compound index** is an index that uses **multiple fields together** to create a unique combination. It's like having a two-part key.

### Real-World Analogy

Imagine a library where:
- Many people can have the same first name (like "John")
- Many books can have the same title (like "The Guide")
- But the combination of "John borrowed The Guide" is unique at any given time

A compound index works the same way - it ensures that a specific **combination** of values is unique.

## How We Used It in This Project

In our `userSubmissionModel.js`, we created this compound index:

```javascript
userSubmissionSchema.index({ username: 1, submission_id: 1 }, { unique: true });
```

### Breaking It Down

- **`{ username: 1, submission_id: 1 }`**: These are the two fields we're combining
- **`{ unique: true }`**: This makes the **combination** unique

### What This Means

**Allowed ✅:**
- User "alice" can have submission "sub123"
- User "alice" can have submission "sub456" 
- User "alice" can have submission "sub789"
- User "bob" can have submission "sub123"

Each user can have **many submissions**, and that's totally fine!

**Prevented ❌:**
- User "alice" cannot have submission "sub123" **twice**

This would be duplicate data - why would we save the same submission for the same user multiple times?

## Why Use This?

1. **Prevents Duplicate Data**: Stops us from accidentally saving the same submission for a user twice
2. **Faster Queries**: When searching for a specific user's submission, MongoDB can find it instantly
3. **Data Integrity**: Keeps our database clean and consistent

## Visual Example

```
UserSubmissions Table:
╔══════════╦═══════════════╗
║ username ║ submission_id ║
╠══════════╬═══════════════╣
║ alice    ║ sub123        ║ ✅ Valid
║ alice    ║ sub456        ║ ✅ Valid (different submission_id)
║ bob      ║ sub123        ║ ✅ Valid (different username)
║ alice    ║ sub123        ║ ❌ REJECTED! (exact duplicate)
╚══════════╩═══════════════╝
```

## Key Takeaway

A compound unique index on `(username, submission_id)` doesn't limit how many submissions a user can have. It only ensures that each **specific submission** is only recorded **once** for each **specific user**.
