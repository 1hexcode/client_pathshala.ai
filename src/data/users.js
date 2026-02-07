/**
 * Mock Users Data
 * Static user data for the academic platform
 */

export const users = [
  {
    id: "usr_001",
    email: "john.smith@university.edu",
    password: "password123", // In real app, this would be hashed
    name: "John Smith",
    avatar: null,
    role: "student",
    college: "col_001",
    program: "prog_001",
    year: "year_003",
    semester: "sem_006",
    createdAt: "2024-01-15T10:30:00Z",
    lastLogin: "2025-01-02T14:22:00Z"
  },
  {
    id: "usr_002",
    email: "sarah.johnson@university.edu",
    password: "password123",
    name: "Sarah Johnson",
    avatar: null,
    role: "student",
    college: "col_001",
    program: "prog_002",
    year: "year_002",
    semester: "sem_004",
    createdAt: "2024-02-20T09:15:00Z",
    lastLogin: "2025-01-03T11:45:00Z"
  },
  {
    id: "usr_003",
    email: "admin@university.edu",
    password: "admin123",
    name: "Admin User",
    avatar: null,
    role: "admin",
    college: null,
    program: null,
    year: null,
    semester: null,
    createdAt: "2023-06-01T08:00:00Z",
    lastLogin: "2025-01-04T08:00:00Z"
  },
  {
    id: "usr_004",
    email: "michael.chen@university.edu",
    password: "password123",
    name: "Michael Chen",
    avatar: null,
    role: "student",
    college: "col_002",
    program: "prog_003",
    year: "year_004",
    semester: "sem_008",
    createdAt: "2023-09-10T11:20:00Z",
    lastLogin: "2025-01-01T16:30:00Z"
  },
  {
    id: "usr_005",
    email: "emma.wilson@university.edu",
    password: "password123",
    name: "Emma Wilson",
    avatar: null,
    role: "student",
    college: "col_001",
    program: "prog_001",
    year: "year_001",
    semester: "sem_002",
    createdAt: "2024-08-25T13:45:00Z",
    lastLogin: "2025-01-03T09:15:00Z"
  }
];

// Current logged in user (simulated session)
export const currentUser = users[0];

export default users;
