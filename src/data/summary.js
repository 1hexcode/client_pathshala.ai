/**
 * Mock Chat Messages Data
 * Simulated AI assistant conversations
 */

// Chat conversations
export const conversations = [
  {
    id: "conv_001",
    userId: "usr_001",
    title: "Python Functions Explained",
    subject: "Introduction to Programming",
    subjectId: "subj_001",
    createdAt: "2025-01-02T10:30:00Z",
    updatedAt: "2025-01-02T10:45:00Z"
  },
  {
    id: "conv_002",
    userId: "usr_001",
    title: "Understanding Big O Notation",
    subject: "Data Structures",
    subjectId: "subj_003",
    createdAt: "2025-01-01T14:20:00Z",
    updatedAt: "2025-01-01T14:35:00Z"
  },
  {
    id: "conv_003",
    userId: "usr_001",
    title: "SQL JOIN Operations",
    subject: "Database Management Systems",
    subjectId: "subj_005",
    createdAt: "2024-12-28T09:15:00Z",
    updatedAt: "2024-12-28T09:40:00Z"
  },
  {
    id: "conv_004",
    userId: "usr_001",
    title: "Machine Learning Basics",
    subject: "Machine Learning",
    subjectId: "subj_008",
    createdAt: "2024-12-25T16:00:00Z",
    updatedAt: "2024-12-25T16:30:00Z"
  }
];

// Chat messages
export const messages = [
  // Conversation 1: Python Functions
  {
    id: "msg_001",
    conversationId: "conv_001",
    role: "user",
    content: "Can you explain how functions work in Python? I'm confused about parameters and return values.",
    timestamp: "2025-01-02T10:30:00Z"
  },
  {
    id: "msg_002",
    conversationId: "conv_001",
    role: "assistant",
    content: `Great question! Let me break down Python functions for you.

**What is a Function?**
A function is a reusable block of code that performs a specific task. Think of it like a recipe - you define it once and can use it many times.

**Basic Syntax:**
\`\`\`python
def function_name(parameters):
    # code block
    return value
\`\`\`

**Parameters vs Arguments:**
- **Parameters** are variables in the function definition
- **Arguments** are values you pass when calling the function

**Example:**
\`\`\`python
def greet(name):  # 'name' is a parameter
    return f"Hello, {name}!"

message = greet("Alice")  # "Alice" is an argument
print(message)  # Output: Hello, Alice!
\`\`\`

**Return Values:**
The \`return\` statement sends a value back to the caller. If you don't include a return statement, the function returns \`None\` by default.

Would you like me to explain more about default parameters or multiple return values?`,
    timestamp: "2025-01-02T10:31:00Z",
    referencedNotes: ["note_001"]
  },
  {
    id: "msg_003",
    conversationId: "conv_001",
    role: "user",
    content: "Yes, please explain default parameters!",
    timestamp: "2025-01-02T10:33:00Z"
  },
  {
    id: "msg_004",
    conversationId: "conv_001",
    role: "assistant",
    content: `**Default Parameters**

Default parameters allow you to specify a fallback value if no argument is provided.

\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Using default
print(greet("Alice"))  # Output: Hello, Alice!

# Overriding default
print(greet("Bob", "Hi"))  # Output: Hi, Bob!
\`\`\`

**Important Rules:**
1. Default parameters must come after non-default parameters
2. Default values are evaluated once when the function is defined

**Common Mistake to Avoid:**
\`\`\`python
# DON'T do this - mutable default argument
def append_item(item, items=[]):
    items.append(item)
    return items

# DO this instead
def append_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
\`\`\`

This is covered in detail in your uploaded notes on Python Basics!`,
    timestamp: "2025-01-02T10:35:00Z",
    referencedNotes: ["note_001"]
  },

  // Conversation 2: Big O Notation
  {
    id: "msg_005",
    conversationId: "conv_002",
    role: "user",
    content: "What is Big O notation and why is it important?",
    timestamp: "2025-01-01T14:20:00Z"
  },
  {
    id: "msg_006",
    conversationId: "conv_002",
    role: "assistant",
    content: `**Big O Notation Explained**

Big O notation describes the upper bound of an algorithm's time or space complexity as input size grows.

**Why It Matters:**
- Helps compare algorithm efficiency
- Predicts performance at scale
- Essential for technical interviews

**Common Complexities (fastest to slowest):**

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Array access by index |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Simple loop |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Nested loops |
| O(2ⁿ) | Exponential | Recursive Fibonacci |

**Example Analysis:**
\`\`\`python
# O(n) - Linear
def find_max(arr):
    max_val = arr[0]
    for num in arr:  # loops n times
        if num > max_val:
            max_val = num
    return max_val

# O(n²) - Quadratic
def bubble_sort(arr):
    for i in range(len(arr)):      # n times
        for j in range(len(arr)):  # n times each
            # ...
\`\`\`

Your notes on "Arrays and Linked Lists" have more detailed complexity analysis!`,
    timestamp: "2025-01-01T14:22:00Z",
    referencedNotes: ["note_004"]
  },

  // Conversation 3: SQL JOINs
  {
    id: "msg_007",
    conversationId: "conv_003",
    role: "user",
    content: "Can you explain the different types of JOINs in SQL?",
    timestamp: "2024-12-28T09:15:00Z"
  },
  {
    id: "msg_008",
    conversationId: "conv_003",
    role: "assistant",
    content: `**SQL JOIN Types**

JOINs combine rows from two or more tables based on related columns.

**1. INNER JOIN**
Returns only matching rows from both tables.
\`\`\`sql
SELECT * FROM students
INNER JOIN courses ON students.id = courses.student_id;
\`\`\`

**2. LEFT (OUTER) JOIN**
Returns all rows from left table + matching rows from right table.
\`\`\`sql
SELECT * FROM students
LEFT JOIN courses ON students.id = courses.student_id;
\`\`\`

**3. RIGHT (OUTER) JOIN**
Returns all rows from right table + matching rows from left table.

**4. FULL (OUTER) JOIN**
Returns all rows when there's a match in either table.

**Visual Representation:**
- INNER: ∩ (intersection)
- LEFT: Left circle fully + intersection
- RIGHT: Right circle fully + intersection
- FULL: Both circles completely

**Pro Tip:** Always use explicit JOIN syntax instead of comma-separated tables in WHERE clause for better readability!

Check your "SQL Fundamentals" notes for more examples and practice problems.`,
    timestamp: "2024-12-28T09:18:00Z",
    referencedNotes: ["note_006"]
  },

  // Conversation 4: Machine Learning
  {
    id: "msg_009",
    conversationId: "conv_004",
    role: "user",
    content: "What's the difference between supervised and unsupervised learning?",
    timestamp: "2024-12-25T16:00:00Z"
  },
  {
    id: "msg_010",
    conversationId: "conv_004",
    role: "assistant",
    content: `**Supervised vs Unsupervised Learning**

**Supervised Learning:**
- Uses labeled training data
- Algorithm learns mapping from inputs → outputs
- Goal: Make predictions on new data

*Examples:*
- Classification (spam detection, image recognition)
- Regression (price prediction, weather forecasting)

\`\`\`
Training Data: [features] → [label]
[email_text] → [spam/not_spam]
[house_size, bedrooms] → [price]
\`\`\`

**Unsupervised Learning:**
- Uses unlabeled data
- Algorithm finds hidden patterns/structures
- Goal: Discover insights from data

*Examples:*
- Clustering (customer segmentation)
- Dimensionality reduction (PCA)
- Anomaly detection

\`\`\`
Training Data: [features] → ???
Algorithm discovers: groups, patterns, outliers
\`\`\`

**Quick Comparison:**

| Aspect | Supervised | Unsupervised |
|--------|-----------|--------------|
| Data | Labeled | Unlabeled |
| Goal | Predict | Discover |
| Feedback | Yes | No |
| Complexity | Lower | Higher |

Your "Linear Regression Deep Dive" notes cover supervised learning in detail!`,
    timestamp: "2024-12-25T16:03:00Z",
    referencedNotes: ["note_008"]
  }
];

// Mock AI responses for the summary
export const mockResponses = [
  {
    triggers: ["hello", "hi", "hey"],
    response: "Hello! I'm your Academic AI Assistant. I can help you understand concepts from your uploaded notes, explain topics, and answer questions about your coursework. What would you like to learn about today?"
  },
  {
    triggers: ["help", "what can you do"],
    response: "I can help you with:\n\n• **Explaining concepts** from your course materials\n• **Answering questions** about your subjects\n• **Providing examples** and practice problems\n• **Summarizing** your uploaded notes\n• **Connecting ideas** across different topics\n\nJust ask me anything related to your academic studies!"
  },
  {
    triggers: ["thanks", "thank you"],
    response: "You're welcome! Feel free to ask if you have more questions. I'm here to help with your studies anytime."
  }
];

// Get messages for a conversation
export const getMessagesByConversation = (conversationId) => 
  messages.filter(m => m.conversationId === conversationId);

// Get conversations for a user
export const getConversationsByUser = (userId) => 
  conversations.filter(c => c.userId === userId);

// Get recent conversations
export const getRecentConversations = (userId, limit = 5) => 
  conversations
    .filter(c => c.userId === userId)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit);

// Generate a mock AI response
export const generateMockResponse = (userMessage) => {
  const lowercaseMsg = userMessage.toLowerCase();
  
  // Check for trigger responses
  for (const mock of mockResponses) {
    if (mock.triggers.some(trigger => lowercaseMsg.includes(trigger))) {
      return mock.response;
    }
  }
  
  // Default academic response
  return `That's a great question about "${userMessage.slice(0, 50)}..."

Based on your course materials, here's what I can tell you:

This topic relates to fundamental concepts in your studies. Let me break it down:

1. **Key Concept**: Understanding the core principles is essential
2. **Application**: This knowledge applies to real-world scenarios
3. **Practice**: Working through examples helps solidify understanding

Would you like me to elaborate on any specific aspect or provide some practice problems?`;
};

export default { conversations, messages, mockResponses };
