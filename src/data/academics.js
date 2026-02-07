/**
 * Academic Hierarchy Data
 * Colleges → Programs → Years → Semesters → Subjects
 */

// Colleges
export const colleges = [
  {
    id: "col_001",
    name: "College of Engineering",
    shortName: "COE",
    description: "Leading engineering education with cutting-edge research facilities",
    icon: "⚙️",
    programCount: 5,
    studentCount: 2450,
    createdAt: "2020-01-01T00:00:00Z"
  },
  {
    id: "col_002",
    name: "College of Science",
    shortName: "COS",
    description: "Advancing scientific knowledge through rigorous academic programs",
    icon: "🔬",
    programCount: 4,
    studentCount: 1820,
    createdAt: "2020-01-01T00:00:00Z"
  },
  {
    id: "col_003",
    name: "College of Business",
    shortName: "COB",
    description: "Preparing future business leaders with practical and theoretical knowledge",
    icon: "📊",
    programCount: 3,
    studentCount: 2100,
    createdAt: "2020-01-01T00:00:00Z"
  },
  {
    id: "col_004",
    name: "College of Arts & Humanities",
    shortName: "CAH",
    description: "Fostering creativity and critical thinking in liberal arts education",
    icon: "🎨",
    programCount: 4,
    studentCount: 1560,
    createdAt: "2020-01-01T00:00:00Z"
  }
];

// Programs
export const programs = [
  // Engineering Programs
  {
    id: "prog_001",
    collegeId: "col_001",
    name: "Computer Science & Engineering",
    shortName: "CSE",
    duration: 4,
    description: "Comprehensive program covering software development, algorithms, and systems",
    totalCredits: 160
  },
  {
    id: "prog_002",
    collegeId: "col_001",
    name: "Electrical Engineering",
    shortName: "EE",
    duration: 4,
    description: "Study of electrical systems, electronics, and power engineering",
    totalCredits: 156
  },
  {
    id: "prog_003",
    collegeId: "col_001",
    name: "Mechanical Engineering",
    shortName: "ME",
    duration: 4,
    description: "Design, analysis, and manufacturing of mechanical systems",
    totalCredits: 158
  },
  // Science Programs
  {
    id: "prog_004",
    collegeId: "col_002",
    name: "Physics",
    shortName: "PHY",
    duration: 4,
    description: "Fundamental and applied physics with research opportunities",
    totalCredits: 140
  },
  {
    id: "prog_005",
    collegeId: "col_002",
    name: "Mathematics",
    shortName: "MATH",
    duration: 4,
    description: "Pure and applied mathematics for analytical problem solving",
    totalCredits: 138
  },
  // Business Programs
  {
    id: "prog_006",
    collegeId: "col_003",
    name: "Business Administration",
    shortName: "BBA",
    duration: 4,
    description: "Comprehensive business education with specialization tracks",
    totalCredits: 144
  },
  {
    id: "prog_007",
    collegeId: "col_003",
    name: "Economics",
    shortName: "ECON",
    duration: 4,
    description: "Study of economic systems, markets, and policy",
    totalCredits: 140
  },
  // Arts Programs
  {
    id: "prog_008",
    collegeId: "col_004",
    name: "English Literature",
    shortName: "ENG",
    duration: 4,
    description: "Critical study of literature and creative writing",
    totalCredits: 136
  }
];

// Years
export const years = [
  { id: "year_001", name: "First Year", shortName: "1st Year", order: 1 },
  { id: "year_002", name: "Second Year", shortName: "2nd Year", order: 2 },
  { id: "year_003", name: "Third Year", shortName: "3rd Year", order: 3 },
  { id: "year_004", name: "Fourth Year", shortName: "4th Year", order: 4 }
];

// Semesters
export const semesters = [
  { id: "sem_001", yearId: "year_001", name: "Semester 1", shortName: "Sem 1", order: 1 },
  { id: "sem_002", yearId: "year_001", name: "Semester 2", shortName: "Sem 2", order: 2 },
  { id: "sem_003", yearId: "year_002", name: "Semester 3", shortName: "Sem 3", order: 3 },
  { id: "sem_004", yearId: "year_002", name: "Semester 4", shortName: "Sem 4", order: 4 },
  { id: "sem_005", yearId: "year_003", name: "Semester 5", shortName: "Sem 5", order: 5 },
  { id: "sem_006", yearId: "year_003", name: "Semester 6", shortName: "Sem 6", order: 6 },
  { id: "sem_007", yearId: "year_004", name: "Semester 7", shortName: "Sem 7", order: 7 },
  { id: "sem_008", yearId: "year_004", name: "Semester 8", shortName: "Sem 8", order: 8 }
];

// Subjects
export const subjects = [
  // CSE Subjects
  {
    id: "subj_001",
    programId: "prog_001",
    semesterId: "sem_001",
    name: "Introduction to Programming",
    code: "CSE101",
    credits: 4,
    description: "Fundamentals of programming using Python"
  },
  {
    id: "subj_002",
    programId: "prog_001",
    semesterId: "sem_001",
    name: "Discrete Mathematics",
    code: "CSE102",
    credits: 3,
    description: "Mathematical foundations for computer science"
  },
  {
    id: "subj_003",
    programId: "prog_001",
    semesterId: "sem_002",
    name: "Data Structures",
    code: "CSE201",
    credits: 4,
    description: "Arrays, linked lists, trees, graphs, and algorithms"
  },
  {
    id: "subj_004",
    programId: "prog_001",
    semesterId: "sem_002",
    name: "Object-Oriented Programming",
    code: "CSE202",
    credits: 4,
    description: "OOP concepts using Java"
  },
  {
    id: "subj_005",
    programId: "prog_001",
    semesterId: "sem_003",
    name: "Database Management Systems",
    code: "CSE301",
    credits: 4,
    description: "Relational databases, SQL, and database design"
  },
  {
    id: "subj_006",
    programId: "prog_001",
    semesterId: "sem_003",
    name: "Operating Systems",
    code: "CSE302",
    credits: 4,
    description: "Process management, memory, file systems"
  },
  {
    id: "subj_007",
    programId: "prog_001",
    semesterId: "sem_004",
    name: "Computer Networks",
    code: "CSE401",
    credits: 4,
    description: "Network protocols, architecture, and security"
  },
  {
    id: "subj_008",
    programId: "prog_001",
    semesterId: "sem_005",
    name: "Machine Learning",
    code: "CSE501",
    credits: 4,
    description: "Supervised and unsupervised learning algorithms"
  },
  {
    id: "subj_009",
    programId: "prog_001",
    semesterId: "sem_006",
    name: "Software Engineering",
    code: "CSE601",
    credits: 3,
    description: "Software development lifecycle and methodologies"
  },
  // Physics Subjects
  {
    id: "subj_010",
    programId: "prog_004",
    semesterId: "sem_001",
    name: "Classical Mechanics",
    code: "PHY101",
    credits: 4,
    description: "Newtonian mechanics and analytical dynamics"
  },
  {
    id: "subj_011",
    programId: "prog_004",
    semesterId: "sem_002",
    name: "Electromagnetism",
    code: "PHY201",
    credits: 4,
    description: "Electric and magnetic fields, Maxwell's equations"
  },
  {
    id: "subj_012",
    programId: "prog_004",
    semesterId: "sem_003",
    name: "Quantum Mechanics",
    code: "PHY301",
    credits: 4,
    description: "Wave functions, operators, and quantum systems"
  },
  // Business Subjects
  {
    id: "subj_013",
    programId: "prog_006",
    semesterId: "sem_001",
    name: "Principles of Management",
    code: "BBA101",
    credits: 3,
    description: "Fundamentals of organizational management"
  },
  {
    id: "subj_014",
    programId: "prog_006",
    semesterId: "sem_002",
    name: "Financial Accounting",
    code: "BBA201",
    credits: 4,
    description: "Accounting principles and financial statements"
  },
  {
    id: "subj_015",
    programId: "prog_006",
    semesterId: "sem_003",
    name: "Marketing Management",
    code: "BBA301",
    credits: 3,
    description: "Marketing strategies and consumer behavior"
  }
];

// Helper functions to get related data
export const getCollegeById = (id) => colleges.find(c => c.id === id);
export const getProgramsByCollege = (collegeId) => programs.filter(p => p.collegeId === collegeId);
export const getProgramById = (id) => programs.find(p => p.id === id);
export const getYearById = (id) => years.find(y => y.id === id);
export const getSemesterById = (id) => semesters.find(s => s.id === id);
export const getSemestersByYear = (yearId) => semesters.filter(s => s.yearId === yearId);
export const getSubjectById = (id) => subjects.find(s => s.id === id);
export const getSubjectsByProgram = (programId) => subjects.filter(s => s.programId === programId);
export const getSubjectsBySemester = (semesterId) => subjects.filter(s => s.semesterId === semesterId);
export const getSubjectsByProgramAndSemester = (programId, semesterId) => 
  subjects.filter(s => s.programId === programId && s.semesterId === semesterId);

export default { colleges, programs, years, semesters, subjects };
