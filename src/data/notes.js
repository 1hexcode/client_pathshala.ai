/**
 * Mock Notes Data
 * Academic notes uploaded by users
 */

export const notes = [
  {
    id: "note_001",
    userId: "usr_001",
    collegeId: "col_001",
    programId: "prog_001",
    yearId: "year_001",
    semesterId: "sem_001",
    subjectId: "subj_001",
    title: "Python Basics - Variables and Data Types",
    description: "Comprehensive notes covering Python fundamentals including variables, data types, and basic operations",
    fileName: "python_basics.pdf",
    fileType: "pdf",
    fileSize: 2457600, // bytes
    pageCount: 24,
    status: "ready",
    downloads: 156,
    views: 423,
    rating: 4.5,
    ratingCount: 32,
    tags: ["python", "programming", "basics", "variables"],
    uploadedAt: "2024-09-15T10:30:00Z",
    processedAt: "2024-09-15T10:32:00Z"
  },
  {
    id: "note_002",
    userId: "usr_001",
    collegeId: "col_001",
    programId: "prog_001",
    yearId: "year_001",
    semesterId: "sem_001",
    subjectId: "subj_001",
    title: "Control Flow - Loops and Conditionals",
    description: "Detailed explanation of if-else statements, for loops, while loops with examples",
    fileName: "control_flow.pdf",
    fileType: "pdf",
    fileSize: 1843200,
    pageCount: 18,
    status: "ready",
    downloads: 134,
    views: 389,
    rating: 4.3,
    ratingCount: 28,
    tags: ["python", "loops", "conditionals", "control-flow"],
    uploadedAt: "2024-09-20T14:15:00Z",
    processedAt: "2024-09-20T14:17:00Z"
  },
  {
    id: "note_003",
    userId: "usr_002",
    collegeId: "col_001",
    programId: "prog_001",
    yearId: "year_001",
    semesterId: "sem_001",
    subjectId: "subj_002",
    title: "Set Theory and Logic",
    description: "Notes on sets, relations, functions, and propositional logic",
    fileName: "discrete_math_ch1.pdf",
    fileType: "pdf",
    fileSize: 3145728,
    pageCount: 32,
    status: "ready",
    downloads: 89,
    views: 267,
    rating: 4.7,
    ratingCount: 19,
    tags: ["discrete-math", "sets", "logic", "relations"],
    uploadedAt: "2024-10-01T09:00:00Z",
    processedAt: "2024-10-01T09:03:00Z"
  },
  {
    id: "note_004",
    userId: "usr_001",
    collegeId: "col_001",
    programId: "prog_001",
    yearId: "year_001",
    semesterId: "sem_002",
    subjectId: "subj_003",
    title: "Arrays and Linked Lists",
    description: "Implementation and analysis of arrays and linked list data structures",
    fileName: "ds_arrays_lists.pdf",
    fileType: "pdf",
    fileSize: 2867200,
    pageCount: 28,
    status: "ready",
    downloads: 201,
    views: 512,
    rating: 4.6,
    ratingCount: 45,
    tags: ["data-structures", "arrays", "linked-list", "algorithms"],
    uploadedAt: "2024-11-05T11:20:00Z",
    processedAt: "2024-11-05T11:22:00Z"
  },
  {
    id: "note_005",
    userId: "usr_004",
    collegeId: "col_001",
    programId: "prog_001",
    yearId: "year_001",
    semesterId: "sem_002",
    subjectId: "subj_003",
    title: "Trees and Binary Search Trees",
    description: "Complete guide to tree data structures including BST operations",
    fileName: "trees_bst.pdf",
    fileType: "pdf",
    fileSize: 4194304,
    pageCount: 42,
    status: "ready",
    downloads: 178,
    views: 445,
    rating: 4.8,
    ratingCount: 38,
    tags: ["data-structures", "trees", "bst", "algorithms"],
    uploadedAt: "2024-11-12T15:45:00Z",
    processedAt: "2024-11-12T15:48:00Z"
  },
  {
    id: "note_006",
    userId: "usr_002",
    collegeId: "col_001",
    programId: "prog_001",
    yearId: "year_002",
    semesterId: "sem_003",
    subjectId: "subj_005",
    title: "SQL Fundamentals",
    description: "Introduction to SQL queries, joins, and database operations",
    fileName: "sql_fundamentals.pdf",
    fileType: "pdf",
    fileSize: 2621440,
    pageCount: 26,
    status: "ready",
    downloads: 245,
    views: 634,
    rating: 4.4,
    ratingCount: 52,
    tags: ["database", "sql", "queries", "joins"],
    uploadedAt: "2024-08-20T10:00:00Z",
    processedAt: "2024-08-20T10:02:00Z"
  },
  {
    id: "note_007",
    userId: "usr_001",
    collegeId: "col_001",
    programId: "prog_001",
    yearId: "year_002",
    semesterId: "sem_003",
    subjectId: "subj_006",
    title: "Process Scheduling Algorithms",
    description: "FCFS, SJF, Round Robin, and Priority scheduling with examples",
    fileName: "os_scheduling.pdf",
    fileType: "pdf",
    fileSize: 2097152,
    pageCount: 20,
    status: "ready",
    downloads: 167,
    views: 398,
    rating: 4.2,
    ratingCount: 29,
    tags: ["operating-systems", "scheduling", "processes", "algorithms"],
    uploadedAt: "2024-09-08T13:30:00Z",
    processedAt: "2024-09-08T13:32:00Z"
  },
  {
    id: "note_008",
    userId: "usr_004",
    collegeId: "col_001",
    programId: "prog_001",
    yearId: "year_003",
    semesterId: "sem_005",
    subjectId: "subj_008",
    title: "Linear Regression Deep Dive",
    description: "Mathematical foundations and implementation of linear regression",
    fileName: "ml_linear_regression.pdf",
    fileType: "pdf",
    fileSize: 3670016,
    pageCount: 36,
    status: "ready",
    downloads: 312,
    views: 756,
    rating: 4.9,
    ratingCount: 67,
    tags: ["machine-learning", "regression", "statistics", "python"],
    uploadedAt: "2024-10-15T09:45:00Z",
    processedAt: "2024-10-15T09:48:00Z"
  },
  {
    id: "note_009",
    userId: "usr_005",
    collegeId: "col_002",
    programId: "prog_004",
    yearId: "year_001",
    semesterId: "sem_001",
    subjectId: "subj_010",
    title: "Newton's Laws and Applications",
    description: "Comprehensive notes on Newton's three laws with problem solving",
    fileName: "classical_mechanics_newton.pdf",
    fileType: "pdf",
    fileSize: 2359296,
    pageCount: 22,
    status: "ready",
    downloads: 98,
    views: 245,
    rating: 4.5,
    ratingCount: 21,
    tags: ["physics", "mechanics", "newton", "forces"],
    uploadedAt: "2024-09-25T11:00:00Z",
    processedAt: "2024-09-25T11:02:00Z"
  },
  {
    id: "note_010",
    userId: "usr_002",
    collegeId: "col_003",
    programId: "prog_006",
    yearId: "year_001",
    semesterId: "sem_001",
    subjectId: "subj_013",
    title: "Management Functions Overview",
    description: "Planning, organizing, leading, and controlling explained",
    fileName: "management_functions.pdf",
    fileType: "pdf",
    fileSize: 1572864,
    pageCount: 15,
    status: "ready",
    downloads: 76,
    views: 189,
    rating: 4.1,
    ratingCount: 15,
    tags: ["management", "business", "planning", "leadership"],
    uploadedAt: "2024-10-02T14:20:00Z",
    processedAt: "2024-10-02T14:21:00Z"
  },
  // Processing notes (simulated upload in progress)
  {
    id: "note_011",
    userId: "usr_001",
    collegeId: "col_001",
    programId: "prog_001",
    yearId: "year_003",
    semesterId: "sem_006",
    subjectId: "subj_009",
    title: "Agile Development Methodology",
    description: "Scrum framework and agile principles for software development",
    fileName: "agile_scrum.pdf",
    fileType: "pdf",
    fileSize: 1835008,
    pageCount: null,
    status: "processing",
    downloads: 0,
    views: 0,
    rating: 0,
    ratingCount: 0,
    tags: ["software-engineering", "agile", "scrum"],
    uploadedAt: "2025-01-04T08:00:00Z",
    processedAt: null
  },
  {
    id: "note_012",
    userId: "usr_001",
    collegeId: "col_001",
    programId: "prog_001",
    yearId: "year_001",
    semesterId: "sem_002",
    subjectId: "subj_004",
    title: "OOP Design Patterns - Handwritten Notes",
    description: "Hand-drawn diagrams explaining singleton, factory, and observer patterns",
    fileName: "oop_patterns_handwritten.jpg",
    fileType: "image",
    fileSize: 4718592,
    pageCount: 1,
    status: "ready",
    downloads: 87,
    views: 234,
    rating: 4.0,
    ratingCount: 18,
    tags: ["oop", "design-patterns", "java", "handwritten"],
    uploadedAt: "2024-12-01T16:30:00Z",
    processedAt: "2024-12-01T16:31:00Z"
  }
];

// Helper functions
export const getNoteById = (id) => notes.find(n => n.id === id);
export const getNotesByUser = (userId) => notes.filter(n => n.userId === userId);
export const getNotesBySubject = (subjectId) => notes.filter(n => n.subjectId === subjectId);
export const getNotesByCollege = (collegeId) => notes.filter(n => n.collegeId === collegeId);
export const getNotesByProgram = (programId) => notes.filter(n => n.programId === programId);
export const getNotesBySemester = (semesterId) => notes.filter(n => n.semesterId === semesterId);
export const getReadyNotes = () => notes.filter(n => n.status === "ready");
export const getProcessingNotes = () => notes.filter(n => n.status === "processing");

// Search notes by title, description, or tags
export const searchNotes = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return notes.filter(note => 
    note.status === "ready" && (
      note.title.toLowerCase().includes(lowercaseQuery) ||
      note.description.toLowerCase().includes(lowercaseQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  );
};

// Format file size for display
export const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
};

export default notes;
