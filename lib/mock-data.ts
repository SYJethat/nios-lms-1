import {
  Users,
  BookOpen,
  GraduationCap,
  Shield,
  User,
  Beaker,
  Calculator,
  Globe,
  Monitor,
  Leaf,
  Clock,
  CheckCircle,
  AlertCircle,
  Video,
  FileText,
  TrendingUp,
  Award,
  Zap,
  Cpu,
  DollarSign,
  Bell,
  Megaphone,
  Activity,
  ShieldCheck
} from 'lucide-react';

export type UserRole = 'learner' | 'teacher' | 'admin' | 'parent' | 'guest';

export interface MockUser {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  email: string;
  motherLang?: string | null;
  targetLang?: string | null;
  details: {
    class?: string;
    enrollmentNo?: string;
    subjects?: string[];
    department?: string;
    designation?: string;
    studentName?: string;
    studentId?: string;
  };
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'L10023',
    name: 'Arjun Sharma',
    role: 'learner',
    email: 'student@nios.edu.in',
    details: {
      class: 'Class 10',
      enrollmentNo: 'ENR-2025-001',
      subjects: ['Physics', 'Math', 'English']
    }
  },
  {
    id: 'T5001',
    name: 'Dr. Priya Mehta',
    role: 'teacher',
    email: 'teacher@nios.edu.in',
    details: {
      subjects: ['Physics', 'Math'],
      department: 'Science',
      designation: 'Senior Lecturer'
    }
  },
  {
    id: 'A9001',
    name: 'NIOS Principal',
    role: 'admin',
    email: 'principal@nios.edu.in',
    details: {
      designation: 'Chief Administrator'
    }
  },
  {
    id: 'P7001',
    name: 'Rajesh Kumar (Parent)',
    role: 'parent',
    email: 'parent@nios.edu.in',
    details: {
      studentName: 'Priya Patel',
      studentId: 'STU-001'
    }
  },
  {
    id: 'G1001',
    name: 'Guest User',
    role: 'guest',
    email: 'guest@portal.com',
    details: {}
  }
];
// Enhanced MOCK_TEACHERS for admin management
export interface MockTeacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: 'pending_approval' | 'active' | 'suspended' | 'removed';
  joined: string;
  classes: number;
  students: number;
  contentUploads: number;
  lastActivity: string;
}

export interface MockStudent {
  id: string;
  name: string;
  email: string;
  class: string;
  status: 'active' | 'suspended' | 'pending';
  enrollmentDate: string;
  parentId?: string;
  courses: number;
  attendance: number;
  lastActivity: string;
}

export interface MockRevenue {
  id: string;
  period: string;
  amount: number;
  source: 'Fees' | 'Certifications' | 'Premium';
  growth: number;
}

export interface MockNotification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'approval' | 'deadline';
  target: string;
  scheduled: string;
  sent: boolean;
}

export interface MockAnnouncement {
  id: string;
  title: string;
  message: string;
  target: 'all' | 'teachers' | 'students' | 'admins';
  created: string;
  views: number;
}
export const MOCK_TEACHERS: MockTeacher[] = [
  { id: 'TCH-101', name: 'Dr. Anjali Patel', email: 'anjali.patel@faculty.nios', subject: 'Mathematics', status: 'active', joined: 'Sep 2025', classes: 12, students: 245, contentUploads: 48, lastActivity: '2026-04-03' },
  { id: 'TCH-102', name: 'Dr. Srinivasan', email: 'srinivasan@faculty.nios', subject: 'Mathematics', status: 'pending_approval', joined: 'Yesterday', classes: 0, students: 0, contentUploads: 0, lastActivity: '2026-04-03' },
  { id: 'TCH-103', name: 'Anita Desai', email: 'anita.desai@faculty.nios', subject: 'Physics', status: 'active', joined: 'Oct 2025', classes: 8, students: 156, contentUploads: 32, lastActivity: '2026-04-02' },
  { id: 'TCH-104', name: 'Vishal Bhardwaj', email: 'vishal.bhardwaj@faculty.nios', subject: 'History', status: 'suspended', joined: 'Jan 2026', classes: 5, students: 89, contentUploads: 12, lastActivity: '2026-03-28' },
  { id: 'TCH-105', name: 'Kavita Iyer', email: 'kavita.iyer@faculty.nios', subject: 'English', status: 'active', joined: 'Nov 2025', classes: 15, students: 201, contentUploads: 56, lastActivity: '2026-04-03' },
];

export const MOCK_STUDENTS: MockStudent[] = [
  { id: 'STU-001', name: 'Priya Patel', email: 'priya.patel@student.nios', class: 'Class 10', status: 'active', enrollmentDate: 'Aug 2025', parentId: 'P7002', courses: 5, attendance: 95, lastActivity: '2026-04-03' },
  { id: 'STU-002', name: 'Rahul Singh', email: 'rahul.singh@student.nios', class: 'Class 12', status: 'suspended', enrollmentDate: 'Sep 2025', parentId: 'P7003', courses: 3, attendance: 72, lastActivity: '2026-03-25' },
  { id: 'STU-003', name: 'Ananya Rao', email: 'ananya.rao@student.nios', class: 'Class 10', status: 'active', enrollmentDate: 'Oct 2025', parentId: null, courses: 4, attendance: 98, lastActivity: '2026-04-03' },
];

export const MOCK_REVENUE: MockRevenue[] = [
  { id: 'REV-001', period: 'Mar 2026', amount: 4860000, source: 'Fees', growth: 12 },
  { id: 'REV-002', period: 'Feb 2026', amount: 4320000, source: 'Fees', growth: 8 },
  { id: 'REV-003', period: 'Jan 2026', amount: 3980000, source: 'Fees', growth: 15 },
];

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  { id: 'NOT-001', title: 'Class Reminder', message: 'Physics class tomorrow 10AM', type: 'reminder', target: 'All Class 12', scheduled: '2026-04-04', sent: false },
  { id: 'NOT-002', title: 'Course Approval Needed', message: 'Review Advanced Trig module', type: 'approval', target: 'Dr. Srinivasan', scheduled: '2026-04-03', sent: true },
  { id: 'NOT-003', title: 'TMA Deadline', message: 'Submit by tomorrow 11:59PM', type: 'deadline', target: 'All Learners', scheduled: '2026-04-10', sent: false },
];

export const MOCK_SYSTEM_ANNOUNCEMENTS: MockAnnouncement[] = [
  { id: 'ANN-001', title: 'Platform Maintenance', message: 'Scheduled downtime on Apr 5, 2-4AM', target: 'all', created: '2026-04-03', views: 1247 },
  { id: 'ANN-002', title: 'New Policy Update', message: 'Updated attendance requirements effective Apr 10', target: 'teachers', created: '2026-04-02', views: 89 },
  { id: 'ANN-003', title: 'Global Reminder', message: 'PTM slots opening soon - book now', target: 'students', created: '2026-04-01', views: 2034 },
];
// Existing mock data (unchanged)...
export interface ModuleType {
  id: string;
  type: 'reading' | 'listening' | 'writing' | 'speaking';
  title: string;
  completed: boolean;
  progress: number;
  contentPreview: string;
}

export interface MockCourse {
  id: string;
  title: string;
  subject: string;
  enrolled?: boolean;
  tags?: string[];
  icon?: any;
  description?: string;
  objectives?: string[];
  modules: (ModuleType | number)[];
  currentStage: 'content' | 'assessment' | 'report' | 'certificate' | 'preview';
  overallProgress: number;
  rating?: number;
  videoUrl?: string;
  transcript?: string;
  summary?: string;
  level?: string;
  teacher?: string;
  status?: 'published' | 'pending_review' | 'archived';
  lessons?: number;
  duration?: string;
  source?: string;
  target?: string;
  image?: string;
}

export const MOCK_COURSES: MockCourse[] = [
  {
    id: '1',
    title: 'Hindi Language Learning',
    subject: 'Hindi',
    enrolled: true,
    tags: ['Reading', 'Writing', 'Speaking'],
    icon: BookOpen,
    description: 'Learn Hindi grammar, vocabulary, pronunciation, and daily conversation skills.',
    objectives: [
      'Learn Hindi grammar basics',
      'Improve daily vocabulary',
      'Practice spoken Hindi'
    ],
    modules: [
      {
        id: 'h1',
        type: 'reading',
        title: 'Hindi Alphabet & Grammar Basics',
        completed: true,
        progress: 100,
        contentPreview: 'Learn स्वर, व्यंजन, sentence structure, and grammar rules.'
      }
    ],
    currentStage: 'content',
    overallProgress: 80,
    rating: 4.8,
    level: 'Secondary',
    teacher: 'Dr. Anjali Patel',
    status: 'published',
    lessons: 12,
    duration: '6 hours'
  },

  {
    id: '2',
    title: 'English Language Learning',
    subject: 'English',
    enrolled: true,
    tags: ['Reading', 'Writing', 'Listening'],
    icon: BookOpen,
    description: 'Improve English speaking, grammar, comprehension, and writing.',
    objectives: [
      'Understand grammar rules',
      'Build vocabulary',
      'Improve communication skills'
    ],
    modules: [
      {
        id: 'e1',
        type: 'reading',
        title: 'Basic Grammar & Vocabulary',
        completed: true,
        progress: 100,
        contentPreview: 'Learn tenses, sentence formation, and daily vocabulary.'
      }
    ],
    currentStage: 'content',
    overallProgress: 70,
    rating: 4.7,
    level: 'Senior Secondary',
    teacher: 'Anita Desai',
    status: 'pending_review',
    lessons: 8,
    duration: '4 hours'
  },

  {
    id: '3',
    title: 'Bengali Language Learning',
    subject: 'Bengali',
    enrolled: false,
    tags: ['Reading', 'Writing'],
    icon: BookOpen,
    description: 'Learn Bengali script, grammar, and conversation skills.',
    objectives: [
      'Learn Bengali letters',
      'Understand grammar',
      'Practice simple conversations'
    ],
    modules: [
      {
        id: 'b1',
        type: 'reading',
        title: 'Bengali Script Basics',
        completed: false,
        progress: 0,
        contentPreview: 'Introduction to Bengali letters and pronunciation.'
      }
    ],
    currentStage: 'content',
    overallProgress: 0,
    rating: 4.6,
    level: 'Vocational',
    teacher: 'Kavita Iyer',
    status: 'published',
    lessons: 15,
    duration: '7.5 hours'
  },
  {
    id: 'mlp-001',
    title: 'English to Hindi: Conversational Mastery',
    subject: 'English-Hindi',
    enrolled: true,
    tags: ['Conversational', 'Multilingual', 'AI-Powered'],
    icon: Globe,
    description: 'Master English to Hindi translation and daily conversational skills using AI-automated content.',
    objectives: [
      'Bridge the language gap between English and Hindi',
      'Learn context-aware translations',
      'Practice with real-world scenarios'
    ],
    modules: [
      { id: 'ml1', type: 'listening', title: 'Basic Greetings & Introductions', completed: false, progress: 0, contentPreview: 'Learn how to introduce yourself in Hindi using English prompts.' }
    ],
    currentStage: 'content',
    overallProgress: 15,
    rating: 4.9,
    level: 'Beginner',
    teacher: 'AI Multilingual Engine',
    status: 'published',
    lessons: 20,
    duration: '10 hours'
  },
  {
    id: 'mlp-002',
    title: 'Hindi to Tamil: Essential Communication',
    subject: 'Hindi-Tamil',
    enrolled: true,
    tags: ['Regional', 'Communication', 'AI-Powered'],
    icon: Globe,
    description: 'Specialized course for Hindi speakers to master essential Tamil communication.',
    objectives: [
      'Understand Tamil phonetic structures',
      'Learn basic Tamil grammar through Hindi',
      'Navigate daily interactions in Tamil Nadu'
    ],
    modules: [
      { id: 'ht1', type: 'reading', title: 'Introduction to Tamil Script', completed: true, progress: 100, contentPreview: 'Learn to recognize and read basic Tamil characters.' }
    ],
    currentStage: 'content',
    overallProgress: 45,
    rating: 4.8,
    level: 'Beginner',
    teacher: 'AI Multilingual Engine',
    status: 'published',
    lessons: 18,
    duration: '9 hours'
  },
  {
    id: 'mlp-003',
    title: 'Bengali to Marathi: Professional Exchange',
    subject: 'Bengali-Marathi',
    enrolled: false,
    tags: ['Professional', 'Exchange', 'AI-Powered'],
    icon: Globe,
    description: 'A comprehensive guide for Bengali speakers to excel in Marathi-speaking professional environments.',
    objectives: [
      'Business terminology in Marathi',
      'Comparative grammar: Bengali vs Marathi',
      'Cultural nuances in professional communication'
    ],
    modules: [
      { id: 'bm1', type: 'reading', title: 'Marathi Business Etiquette', completed: false, progress: 0, contentPreview: 'Mastering formal address and professional greetings.' }
    ],
    currentStage: 'content',
    overallProgress: 0,
    rating: 4.7,
    level: 'Intermediate',
    teacher: 'AI Multilingual Engine',
    status: 'published',
    lessons: 24,
    duration: '12 hours'
  },
  {
    id: 'mlp-004',
    title: 'Telugu to Kannada: Neighboring Tongues',
    subject: 'Telugu-Kannada',
    enrolled: true,
    tags: ['Regional', 'Dialect', 'AI-Powered'],
    icon: Globe,
    description: 'Leveraging the similarities between Telugu and Kannada to accelerate learning.',
    objectives: [
      'Identifying common Sanskrit roots',
      'Grammar shortcuts for Telugu speakers',
      'Regional dialect variations'
    ],
    modules: [
      { id: 'tk1', type: 'speaking', title: 'Daily Market Conversations', completed: false, progress: 20, contentPreview: 'Practical phrases for everyday shopping and navigation.' }
    ],
    currentStage: 'content',
    overallProgress: 10,
    rating: 4.9,
    level: 'Beginner',
    teacher: 'AI Multilingual Engine',
    status: 'published',
    lessons: 15,
    duration: '8 hours'
  },
  {
    id: 'mlp-005',
    title: 'English to Odia: Heritage & Foundation',
    subject: 'English-Odia',
    enrolled: false,
    tags: ['Heritage', 'Foundation', 'AI-Powered'],
    icon: Globe,
    description: 'Connect with your roots through this comprehensive English to Odia foundational course.',
    objectives: [
      'Mastering Odia script through English',
      'Basic sentence construction',
      'Classical Odia literature overview'
    ],
    modules: [
      { id: 'eo1', type: 'reading', title: 'Odia Alphabet Mastery', completed: false, progress: 0, contentPreview: 'Visual guides to writing and reading Odia characters.' }
    ],
    currentStage: 'content',
    overallProgress: 0,
    rating: 4.6,
    level: 'Beginner',
    teacher: 'AI Multilingual Engine',
    status: 'published',
    lessons: 30,
    duration: '15 hours'
  },
  {
    id: 'mlp-006',
    title: 'Punjabi to Hindi: Harmonic Bridge',
    subject: 'Punjabi-Hindi',
    enrolled: true,
    tags: ['Linguistic', 'Bridge', 'AI-Powered'],
    icon: Globe,
    description: 'A transition course for Punjabi speakers to master standard Hindi for academic and official use.',
    objectives: [
      'Standardizing vocabulary differences',
      'Advanced Devanagari script for Punjabi speakers',
      'Official letter writing in Hindi'
    ],
    modules: [
      { id: 'ph1', type: 'writing', title: 'Formal Hindi Correspondence', completed: false, progress: 60, contentPreview: 'Drafting applications and official letters in Hindi.' }
    ],
    currentStage: 'content',
    overallProgress: 55,
    rating: 4.8,
    level: 'Advanced',
    teacher: 'AI Multilingual Engine',
    status: 'published',
    lessons: 12,
    duration: '6 hours'
  }
];

export interface MockAssessment {
  id: string;
  title: string;
  subject: string;
  type: 'Quiz' | 'Mock Exam' | 'Assignment';
  dueDate: string;
  status: 'Pending' | 'Completed' | 'Missed' | 'Grading Active';
  score?: number;
  submissions?: number;
  totalStudents?: number;
  avgScore?: number | string;
  questions?: {
    id: string;
    text: string;
    type: 'mcq' | 'subjective' | 'matching';
    options?: string[];
    referenceLink?: string;
  }[];
}

export const MOCK_ASSESSMENTS: MockAssessment[] = [
  {
    id: 'Q1',
    title: 'Unit 1: Quantum Basics',
    subject: 'Science',
    type: 'Quiz',
    dueDate: '2026-04-10',
    status: 'Pending',
    questions: [
      {
        id: 'q1',
        text: "What is the smallest unit of energy, as proposed by Max Planck?",
        type: 'mcq',
        options: ["Atom", "Quanta", "Electron", "Neutron"],
        referenceLink: "/courses/1?tab=Resources#SLM-Unit1"
      },
      {
        id: 'q2',
        text: "Explain the Heisenberg Uncertainty Principle in your own words.",
        type: 'subjective',
        referenceLink: "/courses/1?tab=Overview"
      }
    ]
  },
  {
    id: 'E1',
    title: 'Pre-Board Mock Exam',
    subject: 'Mathematics',
    type: 'Mock Exam',
    dueDate: '2026-04-15',
    status: 'Pending',
    questions: [
      {
        id: 'math1',
        text: "Solve for x: 2x + 5 = 17",
        type: 'mcq',
        options: ["x = 6", "x = 11", "x = -6", "x = 1"],
        referenceLink: "/courses/2#algebra"
      },
      {
        id: 'math2',
        text: "What is the area of a circle with radius 7? (Use π=22/7)",
        type: 'subjective',
        referenceLink: "/courses/2#geometry"
      }
    ]
  },
  {
    id: 'A1',
    title: 'Essay: The Indian Renaissance',
    subject: 'Social Science',
    type: 'Assignment',
    dueDate: '2026-04-05',
    status: 'Completed',
    score: 88,
    questions: [
      {
        id: 'essay1',
        text: "Discuss the role of Raja Ram Mohan Roy in social reforms.",
        type: 'subjective',
        referenceLink: "/courses/history#reforms"
      }
    ]
  }
];
export interface MockAchievement {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  date: string;
}
export const MOCK_ACHIEVEMENTS: MockAchievement[] = [
  { id: 'AC1', title: 'Consistently Early', subtitle: 'Turned in 5 assignments before deadline', icon: Zap, date: '2026-03-28' },
  { id: 'AC2', title: 'Science Whiz', subtitle: 'Scored 100% in Biology Unit Quiz', icon: Award, date: '2026-03-15' }
];
export interface MockEvent {
  id: string;
  title: string;
  type: 'Class' | 'Exam' | 'Submission';
  time: string;
  endTime?: string;
  platform?: string;
  isLive?: boolean;
}
export interface MockEvent {
  id: string;
  title: string;
  type: 'Class' | 'Exam' | 'Submission';
  time: string;
  endTime?: string;
  platform?: string;
  isLive?: boolean;
  date?: string; // Added for schedule
}
export const MOCK_EVENTS: MockEvent[] = [
  { id: 'EV1', title: 'LIVE Physics: Motion', type: 'Class', time: '10:00 AM', endTime: '11:30 AM', platform: 'Zoom', isLive: true, date: '2026-04-15' },
  { id: 'EV2', title: 'Math Problem Solving', type: 'Class', time: '02:00 PM', endTime: '03:00 PM', platform: 'Google Meet', date: '2026-04-16' },
  { id: 'EV3', title: 'English Essay Submission', type: 'Submission', time: 'By 11:59 PM', date: '2026-04-17' },
  { id: 'EV4', title: 'Chemistry Exam', type: 'Exam', time: '09:00 AM', platform: 'Exam Center', date: '2026-04-20' },
  { id: 'EV5', title: 'TMA Submission', type: 'Submission', time: '23:59 PM', date: '2026-04-25' }
];
export interface BookPageDetail {
  pageNumber: number;
  chapterTitle: string;
  heading: string;
  content: string;
  subcontent?: string;
  diagramTitle?: string;
  diagramUrl?: string;
  keyPoints?: string[];
  formulaOrExample?: string;
  selfCheck?: string[];
}

export interface MockBook {
  id: string;
  title: string;
  titleHindi?: string;
  subjectCode?: string;
  author: string;
  cover: string;
  pages: string[];
  category: string;
  level?: string;
  rating?: number;
  pagesCount?: number;
  language?: string;
  description?: string;
  chapters?: { title: string; page: number }[];
  pageDetails?: BookPageDetail[];
}
export interface MockExam {
  id: string;
  title: string;
  subject: string;
  type: 'Midterm' | 'Final' | 'Unit Test';
  duration: string;
  students: number;
  proctoring: boolean;
  status: 'Draft' | 'Published' | 'Completed';
  createdAt: string;
}
export const MOCK_EXAMS: MockExam[] = [
  {
    id: 'E1',
    title: 'Physics Midterm: Mechanics',
    subject: 'Science',
    type: 'Midterm',
    duration: '90 min',
    students: 42,
    proctoring: true,
    status: 'Published',
    createdAt: '2026-03-20'
  },
  {
    id: 'E2',
    title: 'Mathematics Final Exam',
    subject: 'Mathematics',
    type: 'Final',
    duration: '3 hrs',
    students: 38,
    proctoring: true,
    status: 'Completed',
    createdAt: '2026-03-15'
  },
  {
    id: 'E3',
    title: 'English Unit Test 2',
    subject: 'English',
    type: 'Unit Test',
    duration: '60 min',
    students: 24,
    proctoring: false,
    status: 'Draft',
    createdAt: '2026-04-01'
  },
  {
    id: 'E4',
    title: 'Chemistry Practical Exam',
    subject: 'Science',
    type: 'Midterm',
    duration: '2 hrs',
    students: 35,
    proctoring: true,
    status: 'Published',
    createdAt: '2026-03-25'
  }
];
export interface MockQuestion {
  id: string;
  text: string;
  type: 'mcq' | 'subjective' | 'truefalse';
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options?: string[];
  answer?: string | number | boolean;
}
export const MOCK_QUESTIONS: MockQuestion[] = [
  {
    id: 'q1',
    text: "Newton\\'s first law is also known as?",
    type: 'mcq',
    subject: 'Physics',
    difficulty: 'Easy',
    options: ['Law of Inertia', 'Law of Acceleration', 'Law of Action Reaction', 'Law of Gravitation'],
    answer: 0
  },
  {
    id: 'q2',
    text: 'Define friction and give two real-life examples.',
    type: 'subjective',
    subject: 'Physics',
    difficulty: 'Medium'
  },
  {
    id: 'q3',
    text: 'Solve: 2x + 5 = 17',
    type: 'mcq',
    subject: 'Mathematics',
    difficulty: 'Easy',
    options: ['x=6', 'x=11', 'x=-6', 'x=1'],
    answer: 1
  },
  {
    id: 'q4',
    text: 'True or False: The derivative of sin(x) is cos(x)',
    type: 'truefalse',
    subject: 'Mathematics',
    difficulty: 'Medium',
    answer: true
  }
];
export interface MockClassAnnouncement {
  id: string;
  title: string;
  message: string;
  target: 'All Students' | 'Class 12' | 'Class 10' | 'Science Stream' | 'Humanities Stream' | 'Vocational';
  createdAt: string;
  readCount: number;
}

export const MOCK_ANNOUNCEMENTS: MockClassAnnouncement[] = [
  {
    id: 'A1',
    title: 'Physics Midterm Rescheduled',
    message: 'Exam now on April 15th. Focus on chapters 1-4. Practice papers uploaded.',
    target: 'All Students',
    createdAt: '2026-04-02',
    readCount: 128
  },
  {
    id: 'A2',
    title: 'Math Assignment Due Tomorrow',
    message: 'TMA submission extended to 11:59 PM. Use AI tutor for quadratic equations.',
    target: 'Class 10',
    createdAt: '2026-04-01',
    readCount: 89
  }
];
export interface MockTeacherReport {
  id: string;
  title: string;
  type: 'Class Analytics' | 'Student Performance' | 'Exam Results';
  period: string;
  generatedAt: string;
  size: string;
}
export const MOCK_TEACHER_REPORTS: MockTeacherReport[] = [
  {
    id: 'TR1',
    title: 'Class 12 Science - March Performance',
    type: 'Class Analytics',
    period: 'Mar 2026',
    generatedAt: '2026-04-01',
    size: '1.2 MB'
  },
  {
    id: 'TR2',
    title: 'Physics Quiz Results - Unit 1',
    type: 'Exam Results',
    period: 'Week 12',
    generatedAt: '2026-03-28',
    size: '0.8 MB'
  }
];
export interface MockParentAlert {
  id: string;
  title: string;
  message: string;
  type: 'Urgent' | 'Important' | 'Info';
  date: string;
  read: boolean;
}
export const MOCK_PARENT_ALERTS: MockParentAlert[] = [
  {
    id: 'AL1',
    title: 'Physics Midterm Rescheduled',
    message: 'Exam moved to April 15th. Extra practice materials added to library.',
    type: 'Urgent',
    date: '2026-04-02',
    read: false
  },
  {
    id: 'AL2',
    title: 'Math TMA Due Tomorrow',
    message: 'Submit by 11:59 PM. Review quadratic equations with AI Tutor.',
    type: 'Important',
    date: '2026-04-01',
    read: true
  },
  {
    id: 'AL3',
    title: 'Parent-Teacher Meeting Slots Open',
    message: 'Book your slot for April 20th discussion with Dr. Mehta.',
    type: 'Important',
    date: '2026-04-03',
    read: false
  }
];
export interface MockClassActivity {
  id: string;
  title: string;
  subject: string;
  type: 'Homework' | 'Project' | 'Quiz';
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  teacher: string;
}
export const MOCK_CLASS_ACTIVITIES: MockClassActivity[] = [
  {
    id: 'ACT1',
    title: 'Newton\'s Laws Experiment',
    subject: 'Physics',
    type: 'Project',
    dueDate: '2026-04-12',
    status: 'Pending',
    teacher: 'Dr. V. Mehta'
  },
  {
    id: 'ACT2',
    title: 'Quadratic Equations Worksheet',
    subject: 'Mathematics',
    type: 'Homework',
    dueDate: '2026-04-10',
    status: 'Submitted',
    teacher: 'Ms. S. Verma'
  },
  {
    id: 'ACT3',
    title: 'Poetry Analysis Essay',
    subject: 'English',
    type: 'Homework',
    dueDate: '2026-04-08',
    status: 'Graded',
    teacher: 'Mr. R. Iyer'
  }
];
export interface MockAttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'Present' | 'Absent' | 'Late';
  remarks?: string;
}
export const MOCK_ATTENDANCE: MockAttendanceRecord[] = [
  { id: 'ATT1', date: '2026-04-03', subject: 'Physics', status: 'Present' },
  { id: 'ATT2', date: '2026-04-03', subject: 'Mathematics', status: 'Late', remarks: '5 min late - traffic' },
  { id: 'ATT3', date: '2026-04-02', subject: 'English', status: 'Present' },
  { id: 'ATT4', date: '2026-04-01', subject: 'Science', status: 'Absent', remarks: 'Medical' }
];
export interface MockPTM {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  time: string;
  slots: number;
  status: 'Available' | 'Applied' | 'Confirmed' | 'Completed';
}

export const MOCK_PTM_SCHEDULE: MockPTM[] = [
  {
    id: 'PTM1',
    teacher: 'Dr. V. Mehta',
    subject: 'Physics',
    date: '2026-04-20',
    time: '10:00 AM - 11:00 AM',
    slots: 5,
    status: 'Available'
  },
  {
    id: 'PTM2',
    teacher: 'Ms. S. Verma',
    subject: 'Mathematics',
    date: '2026-04-20',
    time: '02:00 PM - 03:00 PM',
    slots: 3,
    status: 'Available'
  },
  {
    id: 'PTM3',
    teacher: 'Mr. R. Iyer',
    subject: 'English',
    date: '2026-04-21',
    time: '11:00 AM - 12:00 PM',
    slots: 2,
    status: 'Available'
  }
];
export interface MockStudentReport {
  id: string;
  title: string;
  type: 'Monthly Progress' | 'Subject Analysis' | 'Exam Summary';
  period: string;
  generatedAt: string;
  subjects: string[];
  overallGrade: string;
  size: string;
}

export const MOCK_STUDENT_REPORTS: MockStudentReport[] = [
  {
    id: 'SR1',
    title: 'Arjun Sharma - March Monthly Progress',
    type: 'Monthly Progress',
    period: 'March 2026',
    generatedAt: '2026-04-01',
    subjects: ['Physics', 'Math', 'English'],
    overallGrade: 'A',
    size: '2.1 MB'
  },
  {
    id: 'SR2',
    title: 'Physics Unit 1 Performance Report',
    type: 'Subject Analysis',
    period: 'Week 12',
    generatedAt: '2026-03-29',
    subjects: ['Physics'],
    overallGrade: 'A+',
    size: '1.4 MB'
  },
  {
    id: 'SR3',
    title: 'Quarterly Exam Summary',
    type: 'Exam Summary',
    period: 'Q1 2026',
    generatedAt: '2026-04-02',
    subjects: ['All'],
    overallGrade: 'A',
    size: '3.2 MB'
  }
];
export interface MockBadge {
  id: string;
  name: string;
  icon: any;
  rarity: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  description: string;
  earnedAt: string;
}

export const MOCK_BADGES: MockBadge[] = [
  {
    id: 'B1',
    name: 'Early Bird',
    icon: Clock,
    rarity: 'Bronze',
    description: 'Complete 5 assignments before deadline',
    earnedAt: '2026-03-28'
  },
  {
    id: 'B2',
    name: 'Physics Pro',
    icon: Beaker,
    rarity: 'Silver',
    description: 'Perfect score in Physics unit test',
    earnedAt: '2026-03-20'
  },
  {
    id: 'B3',
    name: 'Streak Master',
    icon: TrendingUp,
    rarity: 'Gold',
    description: '7-day consecutive login streak',
    earnedAt: '2026-04-02'
  },
  {
    id: 'B4',
    name: 'Challenge Champion',
    icon: Award,
    rarity: 'Platinum',
    description: 'Top 3 in monthly leaderboard',
    earnedAt: '2026-03-15'
  },
  {
    id: 'B5',
    name: 'Completionist',
    icon: CheckCircle,
    rarity: 'Diamond',
    description: '100% course completion',
    earnedAt: '2026-04-01'
  }
];
export interface MockLeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  points: number;
  level: number;
  change: 'up' | 'down' | 'same';
}
export const MOCK_LEADERBOARD: MockLeaderboardEntry[] = [
  { rank: 1, userId: 'L10023', name: 'Arjun Sharma', points: 2450, level: 12, change: 'up' },
  { rank: 2, userId: 'L10045', name: 'Priya Patel', points: 2380, level: 11, change: 'same' },
  { rank: 3, userId: 'L10067', name: 'Rahul Singh', points: 2310, level: 11, change: 'down' },
  { rank: 4, userId: 'L10089', name: 'Ananya Rao', points: 2195, level: 10, change: 'up' },
  { rank: 5, userId: 'L10112', name: 'Vikram Joshi', points: 2080, level: 10, change: 'same' },
];
export interface MockChallenge {
  id: string;
  title: string;
  description: string;
  points: number;
  participants: number;
  deadline: string;
  status: 'Active' | 'Completed' | 'Expired';
}
export const MOCK_CHALLENGES: MockChallenge[] = [
  {
    id: 'C1',
    title: 'Physics Speed Solver',
    description: 'Solve 20 physics problems under 30 mins',
    points: 500,
    participants: 127,
    deadline: '2026-04-15',
    status: 'Active'
  },
  {
    id: 'C2',
    title: 'Math Marathon',
    description: 'Complete 50 algebra questions this week',
    points: 750,
    participants: 89,
    deadline: '2026-04-10',
    status: 'Active'
  },
  {
    id: 'C3',
    title: 'Essay Excellence',
    description: 'Submit perfect English essay (95+ score)',
    points: 1000,
    participants: 45,
    deadline: '2026-04-08',
    status: 'Completed'
  }
];
export interface MockStreak {
  subject: string;
  days: number;
  lastActive: string;
  bonusPoints: number;
}
export const MOCK_STREAKS: MockStreak[] = [
  { subject: 'Physics', days: 14, lastActive: '2026-04-03', bonusPoints: 280 },
  { subject: 'Mathematics', days: 7, lastActive: '2026-04-03', bonusPoints: 70 },
  { subject: 'English', days: 21, lastActive: '2026-04-03', bonusPoints: 420 }
];
export interface MockMission {
  id: string;
  title: string;
  type: 'Daily' | 'Weekly' | 'Monthly';
  points: number;
  progress: number;
  completed: boolean;
}
export const MOCK_MISSIONS: MockMission[] = [
  {
    id: 'M1',
    title: 'Daily Quiz Master',
    type: 'Daily',
    points: 50,
    progress: 100,
    completed: true
  },
  {
    id: 'M2',
    title: 'Weekly 10 Lessons',
    type: 'Weekly',
    points: 300,
    progress: 60,
    completed: false
  },
  {
    id: 'M3',
    title: 'Monthly Top Performer',
    type: 'Monthly',
    points: 1000,
    progress: 45,
    completed: false
  }
];
export interface MockCourseReport {
  courseId: string;
  grade: string;
  score: number;
  feedback: string[];
  completionDate: string;
  nextRecommendation: string;
}

export const MOCK_COURSE_REPORTS: MockCourseReport[] = [
  {
    courseId: '1',
    grade: 'A',
    score: 88,
    feedback: [
      "Excellent grasp of Newton's laws (95%)",
      'Good application in problems (85%)',
      'Improve TMA formatting for full marks'
    ],
    completionDate: '2026-04-10',
    nextRecommendation: 'Proceed to Physics Unit 2: Work & Energy'
  },
  {
    courseId: '2',
    grade: 'B+',
    score: 76,
    feedback: [
      'Strong algebra basics',
      'Practice more quadratic problems',
      'Great progress on word problems'
    ],
    completionDate: '2026-04-05',
    nextRecommendation: 'Review quadratic formula derivations'
  }
];

export const MOCK_BOOKS: MockBook[] = [
  // ── SECONDARY (माध्यमिक) ──
  {
    id: 'sec-eng-202',
    title: 'Secondary English (Code 202): How the Squirrel Got His Stripes',
    titleHindi: 'माध्यमिक अंग्रेजी: गिलहरी को धारियां कैसे मिलीं',
    subjectCode: 'ENG-202',
    author: 'National Institute of Open Schooling Academic Board',
    cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
    category: 'Secondary',
    level: 'Class X (Secondary)',
    rating: 4.98,
    pagesCount: 168,
    language: 'English / 22 Regional Languages',
    description: 'Official NIOS Lesson 2 moral tale exploring devotion, selflessness, and grammar fundamentals with synchronized multi-lingual glossaries.',
    chapters: [
      { title: '1. Introduction to Ramayana Tale', page: 1 },
      { title: '2. The Squirrel\'s Humble Contribution', page: 2 },
      { title: '3. Lord Rama\'s Divine Blessing', page: 3 },
      { title: '4. Vocabulary & Idioms in Context', page: 4 },
      { title: '5. Grammar Analysis & Syntax Rules', page: 5 },
      { title: '6. Self-Assessment & Review Questions', page: 6 }
    ],
    pages: ['/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png'],
    pageDetails: [
      {
        pageNumber: 1,
        chapterTitle: 'Unit 2: Moral Literature & Ethics',
        heading: 'Lesson 2: How the Squirrel Got His Stripes',
        content: 'When Lord Rama was preparing to cross the ocean to rescue Mother Sita, the Vanara sena labored tirelessly, hauling titanic boulders from the cliffs. Amid this monumental exertion, a tiny squirrel scurried back and forth, carrying tiny pebbles in its small mouth and rolling in sand to shake dust into the gaps between the rocks.',
        subcontent: 'The monkeys laughed at its puny efforts, but Lord Rama rebuked them: "Look at the love and pure devotion with which this tiny creature serves. In the eyes of dharma, the sincere pebble carries as much weight as a mountain."',
        keyPoints: [
          'No contribution made with earnest dedication is ever insignificant.',
          'Love and devotion surpass mere brute strength in the service of righteousness.',
          'Dharma evaluates the sincerity of the heart, not the magnitude of physical capacity.'
        ],
        selfCheck: [
          'Why were the monkeys mocking the tiny squirrel at the seashore?',
          'What lesson did Lord Rama teach the Vanara army regarding selfless effort?'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Unit 2: Moral Literature & Ethics',
        heading: 'Section 2.2: The Mark of Divine Blessing',
        content: 'Touched by the squirrel\'s unyielding perseverance, Lord Rama gently picked up the small creature in his palm. He stroked its back with three fingers, blessing it for eternity. As the legend recounts, three sacred white stripes appeared where Rama’s fingertips caressed the squirrel’s back.',
        subcontent: 'To this day, Indian striped palm squirrels carry these three distinct lines—a living testimony to the moral truth that even the humblest hand can leave an eternal imprint on the world.',
        formulaOrExample: 'Moral Axiom: Effort × Purity of Intent = Transcendent Merit',
        keyPoints: [
          'The three stripes represent truth, dedication, and humble service.',
          'Recognizing and honoring the work of small contributors builds equitable communities.',
          'Nature and folklore reflect timeless ethical principles taught across Indian heritage.'
        ],
        selfCheck: [
          'What do the three stripes on the palm squirrel symbolize in Indian literature?',
          'How does this story inspire student volunteerism in local communities?'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Unit 2: Language Lab & Word Study',
        heading: 'Section 2.3: Contextual Vocabulary & Phrasal Verbs',
        content: 'Examine how classical idioms are integrated into standard Indian English writing. Pay close attention to word formations, prefixes, and emotive descriptors used in narrative prose.',
        keyPoints: [
          'Monumental (adj.): Of great importance, extent, or size.',
          'Scarry / Scurry (v.): Move hurriedly with short, quick steps.',
          'Immortality (n.): The condition of living forever or enduring endlessly in memory.',
          'Selfless (adj.): Concerned more with the needs and wishes of others than with one\'s own.'
        ],
        formulaOrExample: 'Collocation Example: "To leave an indelible mark on society through quiet perseverance."',
        selfCheck: [
          'Construct two sentences using the adjectives "monumental" and "selfless".',
          'Identify three antonyms for the word "mockery".'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Unit 2: Grammar & Composition',
        heading: 'Section 2.4: Past Continuous Tense & Active Voice',
        content: 'When narrating past actions that were ongoing simultaneously, we employ the Past Continuous tense (Subject + was/were + verb-ing). Notice how the sentence contrasts two concurrent actions in the story.',
        formulaOrExample: 'Pattern: While the monkeys [were carrying] heavy boulders, the squirrel [was rolling] in the fine sand.',
        keyPoints: [
          'Past continuous denotes an action that was occurring at a specific moment in the past.',
          'When combined with simple past, it describes an ongoing action interrupted by another.',
          'Use active voice to produce energetic and compelling narrative prose.'
        ],
        selfCheck: [
          'Convert: "The pebble was carried by the squirrel" into Active Voice.',
          'Fill in the blank: "While Rama _______ (speak), the Vanaras listened in silence."'
        ]
      },
      {
        pageNumber: 5,
        chapterTitle: 'Unit 2: Multilingual Synonyms Table',
        heading: 'Section 2.5: Multilingual Concept Glossary (22 Languages)',
        content: 'As envisioned by NEP 2020, key ethical concepts from this lesson are translated across Indian languages to foster cross-linguistic mastery.',
        keyPoints: [
          'Dedication: हिन्दी (समर्पण) · বাংলা (উৎসর্গ) · தமிழ் (அர்ப்பணிப்பு) · తెలుగు (అంకితభావం)',
          'Righteousness: हिन्दी (धर्म / सदाचार) · ಕನ್ನಡ (ಧರ್ಮ) · മലയാളം (ധർമ്മം) · ਪੰਜਾਬੀ (ਧਰਮ)',
          'Perseverance: हिन्दी (दृढ़ता) · मराठी (चिकाटी) · ગુજરાતી (અડગતા) · ଓଡ଼ିଆ (ଅଧ୍ୟବସାୟ)'
        ],
        formulaOrExample: 'Linguistic Tip: Cognate root words in Sanskrit link Northern, Western, and Eastern Indian vernaculars.',
        selfCheck: [
          'State the native term for "Selfless Service" in your mother tongue.',
          'How does learning bilingual glossaries enrich vocabulary retention?'
        ]
      },
      {
        pageNumber: 6,
        chapterTitle: 'Unit 2: Terminal Evaluation',
        heading: 'Section 2.6: Sample Questions & Assignment TMA',
        content: 'Answer the following terminal questions in your NIOS Learner Notebook for Tutor Marked Assignment (TMA) submission.',
        keyPoints: [
          'Q1 (4 Marks): Describe the scene at the seashore when Lord Rama addressed the Vanaras.',
          'Q2 (3 Marks): Explain the symbolic meaning of the three stripes on the squirrel’s back.',
          'Q3 (5 Marks): Write a 100-word paragraph on a real-life instance where a small effort made a huge difference.'
        ],
        selfCheck: [
          'Submit your assignment via the NIOS Student Portal TMA tab before the deadline.',
          'Review the Rubric: Content (40%), Grammar (30%), Originality (30%).'
        ]
      }
    ]
  },
  {
    id: 'sec-sci-212',
    title: 'Secondary Science & Technology (Code 212): Matter & Motion',
    titleHindi: 'माध्यमिक विज्ञान एवं प्रौद्योगिकी: पदार्थ एवं गति',
    subjectCode: 'SCI-212',
    author: 'Dr. K. S. Sharma & NIOS Science Faculty',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    category: 'Secondary',
    level: 'Class X (Secondary)',
    rating: 4.95,
    pagesCount: 210,
    language: 'Hindi & English Bilingual',
    description: 'Fundamental principles of physical sciences: particulate nature of matter, Newton’s laws of motion, gravitation, and energy transformation.',
    chapters: [
      { title: '1. Particulate Nature of Matter', page: 1 },
      { title: '2. States of Matter & Phase Changes', page: 2 },
      { title: '3. Kinematics: Distance vs Displacement', page: 3 },
      { title: '4. Newton\'s Three Laws of Motion', page: 4 },
      { title: '5. Work, Energy & Power Equations', page: 5 },
      { title: '6. Laboratory Experiments & Practice', page: 6 }
    ],
    pages: ['/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png'],
    pageDetails: [
      {
        pageNumber: 1,
        chapterTitle: 'Module 1: Matter in Our Surroundings',
        heading: '1.1 The Kinetic Theory of Matter',
        content: 'Everything in the universe is made up of material which scientists call matter. Matter occupies space and has mass. Ancient Indian philosophers classified matter into five basic elements—the Panch Tatva: Vayu (air), Prithvi (earth), Agni (fire), Akash (sky) and Jal (water).',
        subcontent: 'Modern scientific classification categorizes matter based on physical state (Solid, Liquid, Gas, Plasma, BEC) and chemical composition (Elements, Compounds, Mixtures).',
        formulaOrExample: 'Density Formula: ρ = m / V (SI Unit: kg/m³)',
        keyPoints: [
          'Particles of matter have spaces between them (intermolecular space).',
          'Particles of matter are in continuous random motion (Brownian motion).',
          'Particles of matter attract each other with intermolecular force.'
        ],
        selfCheck: [
          'What happens to the kinetic energy of particles when temperature increases?',
          'Give two daily life examples proving the diffusion of gases in liquids.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Module 1: Matter in Our Surroundings',
        heading: '1.2 Latent Heat & Phase Transitions',
        content: 'When a solid changes into a liquid, temperature remains constant until all the solid has melted, even though heat continues to be supplied. This heat energy is absorbed without showing any rise in temperature and is called Latent Heat of Fusion.',
        formulaOrExample: 'Heat required during phase transition: Q = m × L (where L is latent heat in J/kg)',
        keyPoints: [
          'Latent Heat of Fusion of ice at 0°C is 3.34 × 10⁵ J/kg.',
          'Latent Heat of Vaporization of water at 100°C is 2.26 × 10⁶ J/kg.',
          'Steam causes more severe burns than boiling water due to higher latent heat.'
        ],
        selfCheck: [
          'Why does water placed in an earthen pot (matka) become cool during hot summer days?',
          'Define sublimation with an example of ammonium chloride.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Module 2: Mechanics & Motion',
        heading: '2.1 Kinematics: Distance vs Displacement',
        content: 'Distance is the actual length of the path traveled by a body irrespective of direction (Scalar quantity). Displacement is the shortest straight-line distance from the initial position to the final position along with direction (Vector quantity).',
        formulaOrExample: 'Equations of Motion (Uniform Acceleration):\n1) v = u + at\n2) s = ut + ½at²\n3) v² = u² + 2as',
        keyPoints: [
          'Displacement can be zero even when distance traveled is non-zero (e.g. circular track).',
          'Acceleration is the rate of change of velocity: a = (v - u) / t.',
          'Slope of distance-time graph represents speed; slope of velocity-time graph represents acceleration.'
        ],
        selfCheck: [
          'An athlete completes one round of a circular track of radius 70m in 40s. Calculate displacement after 2 minutes 20 seconds.',
          'Derive the second equation of motion s = ut + ½at² graphically.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Module 2: Mechanics & Motion',
        heading: '2.2 Newton\'s Laws of Motion',
        content: 'Sir Isaac Newton formulated the three fundamental laws governing classical mechanics.',
        keyPoints: [
          'First Law (Law of Inertia): An object remains in a state of rest or uniform motion unless acted upon by an external unbalanced force.',
          'Second Law: Rate of change of momentum is proportional to applied force: F = dp/dt = ma.',
          'Third Law: To every action there is always an equal and opposite reaction (acting on different bodies).'
        ],
        formulaOrExample: 'Force = mass × acceleration (1 Newton = 1 kg·m/s²)',
        selfCheck: [
          'Why do passengers fall backward when a stationary bus suddenly starts moving?',
          'Calculate force needed to produce an acceleration of 3 m/s² in an object of mass 5 kg.'
        ]
      },
      {
        pageNumber: 5,
        chapterTitle: 'Module 2: Work & Energy',
        heading: '2.3 Conservation of Mechanical Energy',
        content: 'Work is done when a force produces displacement along the direction of the force: W = F·s·cos(θ). Energy is the capacity to perform work. In an isolated system, the total mechanical energy (Kinetic + Potential) remains conserved.',
        formulaOrExample: 'Kinetic Energy: KE = ½mv² | Gravitational Potential Energy: PE = mgh',
        keyPoints: [
          'Work done by a perpendicular force is zero (e.g. gravitational force on Earth orbiting Sun).',
          'Law of Conservation of Energy: Energy can neither be created nor destroyed; it merely transforms.',
          'Power is the rate of doing work: P = W / t (1 Watt = 1 Joule/second).'
        ],
        selfCheck: [
          'A stone of mass 2 kg falls freely from a height of 20 m. Find its kinetic energy just before hitting the ground (take g = 9.8 m/s²).',
          'What is the commercial unit of electric energy (kWh)? Convert 1 kWh into Joules.'
        ]
      },
      {
        pageNumber: 6,
        chapterTitle: 'Module 2: Lab Review',
        heading: '2.4 Practical Experiments & Viva Voce',
        content: 'Guidelines for conducting the experiment: Determining the boiling point of water and melting point of ice using laboratory thermometers.',
        keyPoints: [
          'Ensure thermometer bulb does not touch the bottom or sides of the glass beaker.',
          'Record readings at eye level to eliminate parallax error.',
          'Stir the mixture gently to achieve uniform thermal equilibrium.'
        ],
        selfCheck: [
          'State two precautions while measuring the melting point of ice in the lab.',
          'Explain why impurities elevate the boiling point of pure liquids.'
        ]
      }
    ]
  },
  {
    id: 'sec-mat-211',
    title: 'Secondary Mathematics (Code 211): Number Systems & Geometry',
    titleHindi: 'माध्यमिक गणित: संख्या पद्धति एवं ज्यामिति',
    subjectCode: 'MAT-211',
    author: 'Prof. Arvind Raman & Mathematics Dept',
    cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    category: 'Secondary',
    level: 'Class X (Secondary)',
    rating: 4.96,
    pagesCount: 240,
    language: 'Hindi & English Bilingual',
    description: 'Comprehensive curriculum covering Euclid’s division lemma, quadratic equations, arithmetic progressions, trigonometry, and coordinate geometry.',
    chapters: [
      { title: '1. Real Numbers & Euclid\'s Lemma', page: 1 },
      { title: '2. Polynomials & Quadratic Equations', page: 2 },
      { title: '3. Arithmetic Progressions (AP)', page: 3 },
      { title: '4. Trigonometric Ratios & Identities', page: 4 },
      { title: '5. Coordinate Geometry Formulas', page: 5 },
      { title: '6. Board Model Question Paper', page: 6 }
    ],
    pages: ['/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png'],
    pageDetails: [
      {
        pageNumber: 1,
        chapterTitle: 'Unit 1: Number Systems',
        heading: '1.1 Real Numbers & Euclid\'s Division Lemma',
        content: 'Given positive integers a and b, there exist unique integers q and r satisfying: a = bq + r, where 0 ≤ r < b. This lemma is the cornerstone for finding the Highest Common Factor (HCF) of large integers and establishing irrationality proofs.',
        formulaOrExample: 'Theorem: For any two positive integers a and b: HCF(a, b) × LCM(a, b) = a × b',
        keyPoints: [
          'Fundamental Theorem of Arithmetic: Every composite number can be expressed uniquely as a product of prime powers.',
          'Numbers like √2, √3, √5 are proven irrational by contradiction using divisibility.',
          'A rational number p/q has a terminating decimal expansion if the prime factorization of q is of the form 2ⁿ · 5ᵐ.'
        ],
        selfCheck: [
          'Use Euclid’s division algorithm to find the HCF of 135 and 225.',
          'Prove that 3 + 2√5 is an irrational number.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Unit 2: Algebra',
        heading: '2.1 Quadratic Equations & Discriminant Method',
        content: 'A quadratic equation in variable x is an equation of the form ax² + bx + c = 0, where a ≠ 0. The roots of the equation can be determined using factorization, completing the square, or Sridharacharya’s quadratic formula.',
        formulaOrExample: 'Quadratic Formula: x = [-b ± √(b² - 4ac)] / (2a)\nDiscriminant: D = b² - 4ac',
        keyPoints: [
          'If D > 0: Two distinct real roots exist.',
          'If D = 0: Two equal real roots exist (x = -b / 2a).',
          'If D < 0: No real roots exist (complex conjugate roots).'
        ],
        selfCheck: [
          'Find the nature of the roots of 2x² - 4x + 3 = 0.',
          'Solve for x: x + 1/x = 3 (x ≠ 0).'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Unit 3: Sequences',
        heading: '3.1 Arithmetic Progressions (AP)',
        content: 'An arithmetic progression is a sequence of numbers in which each term after the first is obtained by adding a fixed constant (common difference d) to the preceding term.',
        formulaOrExample: 'n-th Term: aₙ = a + (n - 1)d\nSum of First n Terms: Sₙ = n/2 [2a + (n - 1)d] = n/2 [a + l]',
        keyPoints: [
          'If three numbers a, b, c are in AP, then 2b = a + c (b is the arithmetic mean).',
          'Common difference d can be positive, negative, or zero.',
          'Useful term selection: For 3 terms: (a - d), a, (a + d); For 4 terms: (a - 3d), (a - d), (a + d), (a + 3d).'
        ],
        selfCheck: [
          'Find the 20th term of the AP: 2, 7, 12, ...',
          'How many terms of the AP 24, 21, 18, ... must be taken so that their sum is 78?'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Unit 4: Trigonometry',
        heading: '4.1 Trigonometric Ratios & Fundamental Identities',
        content: 'In a right-angled triangle ABC right-angled at B: sin(A) = Opposite / Hypotenuse, cos(A) = Adjacent / Hypotenuse, and tan(A) = Opposite / Adjacent.',
        formulaOrExample: 'Core Identities:\n1) sin²θ + cos²θ = 1\n2) 1 + tan²θ = sec²θ\n3) 1 + cot²θ = cosec²θ',
        keyPoints: [
          'Standard angles table values: 0°, 30°, 45°, 60°, 90° must be committed to memory.',
          'Complementary angles: sin(90° - θ) = cos θ | tan(90° - θ) = cot θ.',
          'Heights and distances: Angle of elevation is measured looking upward; angle of depression looking downward.'
        ],
        selfCheck: [
          'Prove that: (sin θ / (1 + cos θ)) + ((1 + cos θ) / sin θ) = 2 cosec θ.',
          'A tower stands vertically on the ground. From a point on the ground 15m away from the foot, the angle of elevation of the top is 60°. Find the height of the tower.'
        ]
      },
      {
        pageNumber: 5,
        chapterTitle: 'Unit 5: Coordinate Geometry',
        heading: '5.1 Distance Formula & Section Formula',
        content: 'Analytical geometry bridges algebra and geometry by representing points as ordered pairs (x, y) on a Cartesian plane.',
        formulaOrExample: 'Distance Formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]\nSection Formula: P(x, y) = [(m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂)]',
        keyPoints: [
          'Midpoint coordinates: M = [(x₁ + x₂)/2, (y₁ + y₂)/2].',
          'Centroid of triangle: G = [(x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3].',
          'Three points A, B, C are collinear if Area of triangle ABC = 0.'
        ],
        selfCheck: [
          'Find a relation between x and y such that the point (x, y) is equidistant from (3, 6) and (-3, 4).',
          'Find the coordinates of the points of trisection of the line segment joining (2, -2) and (-7, 4).'
        ]
      },
      {
        pageNumber: 6,
        chapterTitle: 'Unit 6: Board Practice',
        heading: '6.1 Final Examination Model Paper & Marking Scheme',
        content: 'Practice questions prepared according to the latest NIOS secondary examination blueprint.',
        keyPoints: [
          'Section A: 10 Objective Questions (1 mark each).',
          'Section B: 6 Short Answer Questions (2 marks each).',
          'Section C: 8 Analytical Application Problems (4 marks each).',
          'Section D: 4 Long Multi-step Theorems & Constructions (6 marks each).'
        ],
        selfCheck: [
          'Complete all questions within the 3-hour limit without consulting answer keys.',
          'Check steps carefully: each formula derivation carries 1 mark.'
        ]
      }
    ]
  },

  // ── SENIOR SECONDARY (उच्चतर माध्यमिक) ──
  {
    id: 'sr-phy-312',
    title: 'Senior Secondary Physics (Code 312): Electromagnetism & Modern Physics',
    titleHindi: 'उच्चतर माध्यमिक भौतिक विज्ञान: वैद्युतचुंबकत्व एवं आधुनिक भौतिकी',
    subjectCode: 'PHY-312',
    author: 'Dr. Meenakshi Sundaram & Physics Board',
    cover: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80',
    category: 'Senior Secondary',
    level: 'Class XII (Senior Secondary)',
    rating: 4.97,
    pagesCount: 320,
    language: 'Hindi & English Bilingual',
    description: 'Advanced study material on electrostatics, Gauss theorem, electric dipoles, magnetic effect of current, electromagnetic induction, semiconductors, and nuclear physics.',
    chapters: [
      { title: '1. Electrostatics & Coulomb\'s Law', page: 1 },
      { title: '2. Gauss\'s Law & Applications', page: 2 },
      { title: '3. Electric Potential & Capacitors', page: 3 },
      { title: '4. Magnetic Effects of Electric Current', page: 4 },
      { title: '5. Electromagnetic Induction & AC', page: 5 },
      { title: '6. Semiconductor Devices & Logic Gates', page: 6 }
    ],
    pages: ['/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png'],
    pageDetails: [
      {
        pageNumber: 1,
        chapterTitle: 'Unit 1: Electrostatics',
        heading: '1.1 Coulomb\'s Law & Principle of Superposition',
        content: 'The electrostatic force between two stationary point charges q₁ and q₂ is directly proportional to the product of their charges and inversely proportional to the square of the distance r separating them.',
        formulaOrExample: 'Vector Form: F⃗₁₂ = [1 / (4πε₀)] · [(q₁ q₂) / r²] · r̂₁₂\nPermittivity of Free Space: ε₀ = 8.854 × 10⁻¹² C²/(N·m²)',
        keyPoints: [
          'Electrostatic force obeys Newton\'s third law and acts along the line joining the centers.',
          'In a dielectric medium of constant K, the force decreases by a factor of K: F_med = F_vac / K.',
          'Quantization of charge: Q = ±ne (where e = 1.6 × 10⁻¹⁹ C).'
        ],
        selfCheck: [
          'Two point charges of +2µC and +6µC repel each other with force of 12 N. What will be the force if a charge of -4µC is added to each?',
          'State the principle of superposition of electrostatic forces.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Unit 1: Electrostatics',
        heading: '1.2 Electric Flux & Gauss\'s Theorem',
        content: 'Electric flux Φ_E through a surface is the total number of electric field lines passing normally through that surface: Φ_E = ∮ E⃗ · dA⃗. Gauss\'s theorem states that the total flux through any closed Gaussian surface equals 1/ε₀ times the net charge enclosed.',
        formulaOrExample: 'Gauss Law: ∮ E⃗ · dA⃗ = q_enclosed / ε₀',
        keyPoints: [
          'Field due to infinitely long straight charged wire: E = λ / (2πε₀r).',
          'Field due to uniformly charged infinite plane sheet: E = σ / (2ε₀).',
          'Field inside a uniformly charged conducting spherical shell is zero: E_inside = 0.'
        ],
        selfCheck: [
          'Derive Coulomb’s law using Gauss’s theorem.',
          'A point charge of 2.0 µC is at the center of a cubic Gaussian surface 9.0 cm on edge. What is the net electric flux through the surface?'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Unit 2: Capacitance',
        heading: '2.1 Capacitors & Dielectrics in Parallel/Series',
        content: 'A capacitor is an arrangement of two conductors separated by an insulating medium, designed to store electrical charge and energy. Capacitance C = Q / V (SI Unit: Farad).',
        formulaOrExample: 'Parallel Plate: C = (K ε₀ A) / d\nEnergy Stored: U = ½CV² = ½QV = Q² / (2C)',
        keyPoints: [
          'In series combination: 1/C_eq = 1/C₁ + 1/C₂ + ... (charge Q is identical on all capacitors).',
          'In parallel combination: C_eq = C₁ + C₂ + ... (voltage V is identical across all capacitors).',
          'Introducing a dielectric slab of thickness t with constant K increases capacitance significantly.'
        ],
        selfCheck: [
          'Three capacitors each of capacitance 9 pF are connected in series. Find the total capacitance of the combination.',
          'Derive the expression for the energy density of an electric field in a parallel plate capacitor.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Unit 3: Magnetism',
        heading: '3.1 Biot-Savart Law & Ampere\'s Circuital Law',
        content: 'The magnetic field dB⃗ produced by a current element I dl⃗ at a point situated at vector distance r⃗ is given by Biot-Savart Law.',
        formulaOrExample: 'dB = (µ₀ / 4π) · (I dl sin θ) / r² | µ₀ = 4π × 10⁻⁷ T·m/A',
        keyPoints: [
          'Field at center of circular coil: B = (µ₀ N I) / (2R).',
          'Ampere\'s Circuital Law: ∮ B⃗ · dl⃗ = µ₀ I_enclosed.',
          'Field inside an ideal solenoid: B = µ₀ n I (where n is turns per unit length).'
        ],
        selfCheck: [
          'State Fleming’s Left Hand Rule and write the expression for Lorentz magnetic force.',
          'An electron is moving with a velocity of 5 × 10⁶ m/s perpendicular to a magnetic field of 0.2 T. Calculate the magnetic force acting on it.'
        ]
      },
      {
        pageNumber: 5,
        chapterTitle: 'Unit 4: AC Circuits',
        heading: '4.1 Electromagnetic Induction & LCR Resonance',
        content: 'Faraday’s law states that induced EMF equals negative rate of change of magnetic flux: ε = -dΦ_B/dt (Lenz\'s law provides the minus sign signifying opposition). In a series LCR alternating current circuit, resonance occurs when inductive reactance equals capacitive reactance.',
        formulaOrExample: 'Resonant Frequency: f₀ = 1 / [2π √(LC)]\nImpedance: Z = √[R² + (X_L - X_C)²]',
        keyPoints: [
          'At resonance, impedance is minimum (Z = R) and current amplitude is maximum.',
          'Power factor of an AC circuit: cos(ϕ) = R / Z.',
          'Transformers operate only on alternating current; step-up increases voltage and decreases current.'
        ],
        selfCheck: [
          'State Lenz’s law and explain how it follows the law of conservation of energy.',
          'In a series LCR circuit with R = 20 Ω, L = 1.5 H, and C = 35 µF, find the resonant frequency.'
        ]
      },
      {
        pageNumber: 6,
        chapterTitle: 'Unit 5: Electronics',
        heading: '5.1 Semiconductor Diodes & Solar Cells',
        content: 'Intrinsic semiconductors (pure Si/Ge) are doped with trivalent (P-type) or pentavalent (N-type) impurities. When joined, a P-N junction forms with a narrow depletion region and built-in potential barrier.',
        keyPoints: [
          'Forward bias reduces the barrier width and permits exponential current flow.',
          'Reverse bias widens the barrier; only tiny microampere leakage current flows.',
          'Optoelectronic devices: Photodiode (reverse bias), LED (forward bias), Solar cell (zero external bias).'
        ],
        selfCheck: [
          'Draw the circuit diagram of a full-wave bridge rectifier with input and output waveforms.',
          'Explain the working principle of a solar cell and draw its I-V characteristics curve.'
        ]
      }
    ]
  },
  {
    id: 'sr-bio-314',
    title: 'Senior Secondary Biology (Code 314): Cell Genetics & Ecosystem Diversity',
    titleHindi: 'उच्चतर माध्यमिक जीव विज्ञान: कोशिका आनुवंशिकी एवं पारिस्थितिकी',
    subjectCode: 'BIO-314',
    author: 'Dr. Ramesh Chandra Sharma & NIOS Faculty',
    cover: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80',
    category: 'Senior Secondary',
    level: 'Class XII (Senior Secondary)',
    rating: 4.94,
    pagesCount: 340,
    language: 'Hindi & English Bilingual',
    description: 'Structure of biomolecules, DNA replication, Mendelian genetics, human reproduction, biotechnology principles, and biodiversity conservation.',
    chapters: [
      { title: '1. Cell: The Structural Unit of Life', page: 1 },
      { title: '2. DNA Replication & Molecular Genetics', page: 2 },
      { title: '3. Mendel\'s Laws of Inheritance', page: 3 },
      { title: '4. Plant & Animal Reproduction', page: 4 },
      { title: '5. Ecosystem Energy Flow & Food Webs', page: 5 },
      { title: '6. Biodiversity Hotspots & Wildlife Act', page: 6 }
    ],
    pages: ['/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png'],
    pageDetails: [
      {
        pageNumber: 1,
        chapterTitle: 'Module 1: Cellular Biology',
        heading: '1.1 Cell Membrane & Organelle Function',
        content: 'Singer and Nicolson proposed the Fluid Mosaic Model of plasma membrane (1972). Phospholipids form a viscous bilayer with embedded integral and peripheral proteins allowing selective permeability.',
        keyPoints: [
          'Mitochondria: Powerhouse of the cell, site of Krebs cycle and ATP generation via oxidative phosphorylation.',
          'Endoplasmic Reticulum: RER contains ribosomes for protein synthesis; SER synthesizes lipids and steroids.',
          'Chloroplast: Double-membraned organelle containing thylakoids where photolysis of water and Calvin cycle occur.'
        ],
        selfCheck: [
          'Differentiate between active transport and facilitated diffusion across the plasma membrane.',
          'Draw a labeled diagram of the ultrastructure of a eukaryotic plant cell.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Module 2: Molecular Genetics',
        heading: '2.1 Watson-Crick DNA Model & Central Dogma',
        content: 'DNA is a right-handed double helix of antiparallel polynucleotide chains linked by hydrogen bonds between complementary nitrogenous bases (Adenine pairs with Thymine via 2 H-bonds; Guanine pairs with Cytosine via 3 H-bonds).',
        formulaOrExample: 'Central Dogma: DNA ──(Transcription)──> mRNA ──(Translation)──> Protein',
        keyPoints: [
          'Semiconservative replication proven by Meselson and Stahl using ¹⁵N isotope in E. coli.',
          'DNA Polymerase synthesizes new strand only in the 5\' to 3\' direction.',
          'Leading strand is continuous; lagging strand is synthesized discontinuously as Okazaki fragments.'
        ],
        selfCheck: [
          'If a double-stranded DNA contains 20% Cytosine, calculate the percentage of Adenine according to Chargaff’s rule.',
          'Explain the role of tRNA as an adapter molecule in protein synthesis.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Module 2: Molecular Genetics',
        heading: '3.1 Mendelian Inheritance & Dihybrid Crosses',
        content: 'Gregor Johann Mendel performed hybridization experiments on garden pea (Pisum sativum) over seven years, establishing the fundamental principles of inheritance.',
        keyPoints: [
          'Law of Segregation: Alleles separate during gametogenesis so that each gamete carries only one allele for each gene.',
          'Law of Independent Assortment: Segregation of one pair of traits is independent of any other pair during dihybrid cross (F₂ ratio: 9:3:3:1).',
          'Incomplete Dominance (e.g. Mirabilis jalapa): Heterozygote displays intermediate pink phenotype (1:2:1 phenotypic & genotypic ratio).'
        ],
        selfCheck: [
          'Work out a test cross between a heterozygous tall pea plant (Tt) and a homozygous dwarf plant (tt).',
          'Why did Mendel choose Pisum sativum for his genetic experiments?'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Module 3: Ecology',
        heading: '4.1 Trophic Cascades & 10% Energy Law',
        content: 'In ecosystems, autotrophs capture solar energy and synthesize organic matter. Lindeman\'s 10% Law dictates that only about 10% of the energy stored as biomass in one trophic level is passed to the next level.',
        formulaOrExample: '10% Law: Plants (10,000 J) ──> Herbivores (1,000 J) ──> Carnivores (100 J) ──> Apex Predator (10 J)',
        keyPoints: [
          'Energy flow through an ecosystem is always unidirectional and non-cyclic.',
          'Pyramid of energy is always upright; it can never be inverted.',
          'Biomagnification: Non-biodegradable toxins (like DDT) increase in concentration at higher trophic levels.'
        ],
        selfCheck: [
          'Explain why food chains in natural ecosystems rarely exceed 4 or 5 trophic levels.',
          'Distinguish between primary and secondary ecological succession.'
        ]
      },
      {
        pageNumber: 5,
        chapterTitle: 'Module 4: Biodiversity',
        heading: '5.1 In-Situ vs Ex-Situ Conservation',
        content: 'India hosts 4 global biodiversity hotspots: Western Ghats, Eastern Himalayas, Indo-Burma, and Sundaland. Under the Wildlife Protection Act (1972), threatened species receive strict legal safeguards.',
        keyPoints: [
          'In-situ Conservation: Protecting species in their natural habitat (106 National Parks, 567 Wildlife Sanctuaries, 18 Biosphere Reserves).',
          'Ex-situ Conservation: Preserving endangered species outside natural habitats (Zoological parks, Botanical gardens, Cryopreservation gene banks).',
          'Red Data Book maintained by IUCN categorizes species into Extinct, Critically Endangered, Vulnerable, etc.'
        ],
        selfCheck: [
          'What is the difference between a National Park and a Wildlife Sanctuary?',
          'Name three endemic animal species found exclusively in the Western Ghats of India.'
        ]
      },
      {
        pageNumber: 6,
        chapterTitle: 'Module 4: Review',
        heading: '6.1 Practical Herbarium Preparation & Field Study',
        content: 'Techniques for collecting, pressing, drying, mounting, and labeling plant specimens onto official standard Herbarium sheets (29 × 41.5 cm).',
        keyPoints: [
          'Record location, habitat, vernacular name, botanical name, and family on the lower-right label.',
          'Use mercuric chloride (0.1%) or insect repellents to preserve sheets against fungal pests.'
        ],
        selfCheck: [
          'Submit a portfolio of 5 herbarium sheets of local medicinal flora for practical examination.',
          'State two ethical considerations during biological fieldwork.'
        ]
      }
    ]
  },

  // ── VOCATIONAL (व्यावसायिक पाठ्यक्रम) ──
  {
    id: 'voc-cs-608',
    title: 'Computer Science & Python Programming (Code 608)',
    titleHindi: 'कम्प्यूटर विज्ञान एवं पायथन प्रोग्रामिंग',
    subjectCode: 'VOC-608',
    author: 'Dept of Vocational Studies, NIOS',
    cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    category: 'Vocational',
    level: 'Vocational Skill Certificate',
    rating: 4.99,
    pagesCount: 195,
    language: 'English with Hindi Code Explanations',
    description: 'Hands-on programming textbook covering Python syntax, data types, control structures, functions, OOP concepts, file handling, and introductory AI algorithms.',
    chapters: [
      { title: '1. Computer Architecture & Operating Systems', page: 1 },
      { title: '2. Python Variables, Types & Control Flow', page: 2 },
      { title: '3. Data Structures: Lists, Tuples & Dictionaries', page: 3 },
      { title: '4. Functions & Modular Programming', page: 4 },
      { title: '5. Object-Oriented Programming (OOP)', page: 5 },
      { title: '6. Introduction to AI & Neural Networks', page: 6 }
    ],
    pages: ['/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png'],
    pageDetails: [
      {
        pageNumber: 1,
        chapterTitle: 'Unit 1: Fundamentals of Computing',
        heading: '1.1 Von Neumann Architecture & Memory Hierarchy',
        content: 'The Von Neumann computer model consists of three basic hardware subsystems: Central Processing Unit (ALU + Control Unit + Registers), Memory (RAM/ROM), and Input/Output interfaces connected by system buses.',
        keyPoints: [
          'ALU performs arithmetic and bitwise logical calculations.',
          'Registers provide the highest-speed, lowest-capacity storage inside the processor core.',
          'Cache memory (L1, L2, L3) bridges the speed gap between high-frequency CPU and DDR RAM.'
        ],
        selfCheck: [
          'Draw the block diagram of a digital computer indicating data and control buses.',
          'Explain why RAM is volatile memory while SSD/NVMe is non-volatile secondary storage.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Unit 2: Python Basics',
        heading: '2.1 Variables, Data Types & Conditional Logic',
        content: 'Python is an interpreted, high-level, dynamically typed programming language created by Guido van Rossum. Code blocks are delineated by indentation rather than curly braces.',
        formulaOrExample: '```python\n# Age verification algorithm\nage = int(input("Enter student age: "))\nif age >= 18:\n    print("Eligible for National Voting")\nelif age >= 14:\n    print("Eligible for NIOS Secondary Admission")\nelse:\n    print("Eligible for Open Basic Education (OBE)")\n```',
        keyPoints: [
          'Primitive data types: int, float, bool, str.',
          'Logical operators: and, or, not.',
          'Python memory management employs automatic garbage collection via reference counting.'
        ],
        selfCheck: [
          'Write a Python program to check whether a given integer is a Prime number.',
          'What is the difference between the \'==\' operator and the \'is\' operator in Python?'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Unit 3: Data Collections',
        heading: '3.1 Lists, Tuples, Dictionaries & Sets',
        content: 'Python provides rich built-in collections designed for high-performance data manipulation.',
        keyPoints: [
          'Lists are ordered, mutable sequences defined with square brackets [].',
          'Tuples are ordered, immutable sequences defined with parentheses ().',
          'Dictionaries store key-value pairs with O(1) hash table lookup defined with curly braces {}.',
          'Sets store unique, unordered elements and support union, intersection, and difference operations.'
        ],
        formulaOrExample: '```python\n# Dictionary comprehension\nsquares = {x: x**2 for x in range(1, 6)}\n# Result: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n```',
        selfCheck: [
          'Write a code snippet to remove duplicate values from a Python list using set().',
          'Explain how dictionary keys must be hashable immutable objects.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Unit 4: Functions & Modules',
        heading: '4.1 Function Scopes, Recursion & Lambda',
        content: 'Functions allow reusable, modular, and maintainable software architecture. Variables inside functions follow the LEGB scope rule (Local, Enclosing, Global, Built-in).',
        formulaOrExample: '```python\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5)) # Output: 120\n```',
        keyPoints: [
          '*args allows passing arbitrary positional arguments as a tuple.',
          '**kwargs allows passing arbitrary keyword arguments as a dictionary.',
          'Lambda functions are anonymous single-expression functions: lambda x: x * 2.'
        ],
        selfCheck: [
          'Write a recursive Python function to compute the n-th Fibonacci number.',
          'Explain the use of the \'global\' keyword inside a Python function.'
        ]
      },
      {
        pageNumber: 5,
        chapterTitle: 'Unit 5: Object-Oriented Python',
        heading: '5.1 Classes, Encapsulation & Inheritance',
        content: 'Object-Oriented Programming (OOP) models software around data entities called objects. A class serves as the blueprint; an object is an instantiated realization of that class.',
        formulaOrExample: '```python\nclass Student:\n    def __init__(self, name, enrollment_no):\n        self.name = name\n        self.enrollment_no = enrollment_no\n    \n    def get_details(self):\n        return f"Student {self.name} (NIOS: {self.enrollment_no})"\n\ns1 = Student("Aarav", "NIOS2026-99")\nprint(s1.get_details())\n```',
        keyPoints: [
          'Encapsulation bundles data attributes and methods into a unified class unit.',
          'Inheritance allows a subclass to inherit methods and properties from a superclass: class Scholar(Student).',
          'Polymorphism allows different classes to implement identical method signatures with bespoke logic.'
        ],
        selfCheck: [
          'Create a Python class BankAccount with methods deposit() and withdraw().',
          'What is the purpose of the __str__() dunder method in Python?'
        ]
      },
      {
        pageNumber: 6,
        chapterTitle: 'Unit 6: Practical Projects',
        heading: '6.1 Final Capstone Project: Student Portal Database CLI',
        content: 'Students must build a complete command-line interface (CLI) program storing learner enrollment data into JSON or SQLite database.',
        keyPoints: [
          'Implement CRUD operations: Create, Read, Update, Delete records.',
          'Enforce input validation with try...except exception handling blocks.',
          'Include unit tests verifying that all edge cases execute without crashes.'
        ],
        selfCheck: [
          'Submit your GitHub or zip repository on the NIOS Vocational Assessment Dashboard.',
          'Prepare for the external examiner viva voce on Python algorithmic efficiency.'
        ]
      }
    ]
  },

  // ── LANGUAGE SLM (भाषा अध्ययन सामग्री) ──
  {
    id: 'lang-hin-201',
    title: 'हिन्दी साहित्य एवं व्यावहारिक व्याकरण (Code 201)',
    titleHindi: 'माध्यमिक हिन्दी: साहित्य, भाषा एवं सम्प्रेषण कौशल',
    subjectCode: 'HIN-201',
    author: 'डॉ. विद्यानिवास मिश्र एवं राष्ट्रिय मुक्त विद्यालयी शिक्षा संस्थान',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    category: 'Language SLM',
    level: 'Class X (Secondary)',
    rating: 4.96,
    pagesCount: 180,
    language: 'हिन्दी (Hindi)',
    description: 'कबीर, सूरदास, तुलसीदास के दोहे, गद्य विधाएं, संधि, समास, मुहावरे, अपठित बोध एवं कार्यालयी पत्र लेखन की आधिकारिक पाठ्यपुस्तक।',
    chapters: [
      { title: '1. भक्ति कालीन काव्य: कबीर के दोहे', page: 1 },
      { title: '2. सूरदास के वात्सल्य पद', page: 2 },
      { title: '3. आधुनिक गद्य: गिल्लू (महादेवी वर्मा)', page: 3 },
      { title: '4. व्याकरण: सन्धि एवं समास विचार', page: 4 },
      { title: '5. शब्द शक्ति, मुहावरे एवं लोकोक्तियाँ', page: 5 },
      { title: '6. व्यावहारिक पत्र लेखन एवं निबंध', page: 6 }
    ],
    pages: ['/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png', '/book.jpg', '/NIOS.png'],
    pageDetails: [
      {
        pageNumber: 1,
        chapterTitle: 'इकाई 1: काव्य खण्ड (भक्तिकाल)',
        heading: '1.1 कबीर की साखियाँ: नीति, आचरण एवं मानवीय मूल्य',
        content: 'सन्त कबीरदास ज्ञानाश्रयी निर्गुण भक्ति धारा के शीर्ष कवि हैं। उनकी साखियों में सामाजिक आडम्बरों का खण्डन, गुरु की महिमा, और सात्विक जीवन का उपदेश मिलता है।\n\n"पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय।\nढाई आखर प्रेम का, पढ़े सो पंडित होय॥"\n\n"जाति न पूछो साधु की, पूछ लीजिए ज्ञान।\nमोल करो तरवार का, पड़ा रहन दो म्यान॥"',
        keyPoints: [
          'सधुक्कड़ी भाषा (पंचमेल खिचड़ी) का प्रयोग जनमानस तक सन्देश पहुँचाने के लिए किया गया।',
          'बाहरी दिखावे से अधिक अन्तःकरण की शुद्धि और प्रेम को श्रेष्ठ माना गया।',
          'ज्ञान और सद्व्यवहार ही मनुष्य की सच्ची पहचान है।'
        ],
        selfCheck: [
          'कबीर के अनुसार सच्चा ज्ञानी (पंडित) कौन है?',
          '"मोल करो तरवार का, पड़ा रहन दो म्यान" दोहे का भावार्थ अपने शब्दों में लिखिए।'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'इकाई 1: काव्य खण्ड (वात्सल्य रस)',
        heading: '1.2 सूरदास के पद: बाल लीला एवं मातृस्नेह',
        content: 'भक्तिकाल के सगुण काव्य में सूरदास का वात्सल्य वर्णन विश्व साहित्य में अद्वितीय है। यशोदा और बालक कृष्ण के मनोभावों का सजीव चित्रण देखिए:\n\n"मैया मोरी मैं नहिं माखन खायो।\nभोर भयो गैयन के पाछे, मधुबन मोहि पठायो॥\nचार पहर बंसीबट भटकों, साँझ परे घर आयो।\nमैं बालक बहियन को छोटो, छीको किस बिधि पायो॥"',
        keyPoints: [
          'ब्रजभाषा का मधुर और संगीतमय लालित्य।',
          'बाल स्वभाव के मनोविज्ञान, हठ और चंचलता का स्वाभाविक अंकन।',
          'वात्सल्य रस का आलम्बन बालक कृष्ण और आश्रय माता यशोदा हैं।'
        ],
        selfCheck: [
          'बालक कृष्ण अपनी सफाई में माता यशोदा से क्या-क्या तर्क देते हैं?',
          'सूरदास के पदों में किस रस की प्रधानता है?'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'इकाई 2: गद्य खण्ड (रेखाचित्र)',
        heading: '2.1 गिल्लू - महादेवी वर्मा',
        content: 'प्रकृति और मूक पशु-पक्षियों के प्रति संवेदनशील प्रेम का अप्रतिम उदाहरण है महादेवी वर्मा का संस्मरण "गिल्लू"। कौवों के प्रहार से आहत नन्हीं गिलहरी के बच्चे को लेखिका ने स्नेह से नया जीवन दिया।',
        keyPoints: [
          'जीव-जन्तुओं के प्रति करुणा और सह-अस्तित्व का भारतीय दर्शन।',
          'गिल्लू का लेखिका की थाली से एक-एक चावल का दाना खाना और खिड़की पर झूलना।',
          'सोनजुही की पीली कली में गिल्लू की स्मृति का अमर हो जाना।'
        ],
        selfCheck: [
          'महादेवी वर्मा ने घायल गिलहरी के बच्चे की तीमारदारी किस प्रकार की?',
          'गिल्लू के जीवन का अंतिम समय कैसा था? वर्णन कीजिए।'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'इकाई 3: व्यावहारिक व्याकरण',
        heading: '3.1 सन्धि एवं समास: नियम तथा उदाहरण',
        content: 'दो वर्णों के परस्पर मेल से जो विकार उत्पन्न होता है, उसे सन्धि कहते हैं (स्वर सन्धि, व्यंजन सन्धि, विसर्ग सन्धि)। दो या दो से अधिक शब्दों के मेल से संक्षिप्त नया शब्द बनाने की प्रक्रिया समास कहलाती है।',
        formulaOrExample: 'स्वर सन्धि: विद्या + आलय = विद्यालय (दीर्घ सन्धि)\nसमास: राजा का पुत्र = राजपुत्र (तत्पुरुष समास)',
        keyPoints: [
          'दीर्घ, गुण, वृद्धि, यण और अयादि - स्वर सन्धि के पाँच प्रमुख भेद।',
          'समास के छह मुख्य भेद: अव्ययीभाव, तत्पुरुष, कर्मधारय, द्विगु, द्वन्द्व और बहुव्रीहि।',
          'द्वन्द्व समास में दोनों पद प्रधान होते हैं (माता-पिता = माता और पिता)।'
        ],
        selfCheck: [
          'सन्धि विच्छेद कीजिए: 1) सूर्यास्त, 2) देवेन्द्र, 3) स्वागत।',
          'समास विग्रह कर नाम लिखिए: 1) गजानन, 2) चौराहा, 3) यथाशक्ति।'
        ]
      },
      {
        pageNumber: 5,
        chapterTitle: 'इकाई 3: व्यावहारिक व्याकरण',
        heading: '3.2 मुहावरे एवं लोकोक्तियाँ',
        content: 'भाषा को प्रभावशाली, सजीव और रोचक बनाने के लिए मुहावरों और लोकोक्तियों का प्रयोग किया जाता है। मुहावरा एक वाक्यांश होता है जो अपने सामान्य अर्थ को छोड़कर विशेष लाक्षणिक अर्थ प्रकट करता है।',
        keyPoints: [
          'अंगूठा दिखाना: समय पर साफ मना कर देना।',
          'ईंट का जवाब पत्थर से देना: जबरदस्त मुकाबला करना।',
          'दाल में काला होना: कुछ संदेहजनक या गड़बड़ होना।',
          'लोकोक्ति: अधजल गगरी छलकत जाए (अल्पज्ञानी व्यक्ति अधिक प्रदर्शन करता है)।'
        ],
        selfCheck: [
          'निम्नलिखित मुहावरों का वाक्य में सार्थक प्रयोग कीजिए: 1) आँखों का तारा, 2) नौ दो ग्यारह होना।',
          'लोकोक्ति "नाच न जाने आँगन टेढ़ा" का अर्थ स्पष्ट कीजिए।'
        ]
      },
      {
        pageNumber: 6,
        chapterTitle: 'इकाई 4: सम्प्रेषण कौशल',
        heading: '4.1 कार्यालयी पत्र एवं निबंध लेखन प्रारूप',
        content: 'सरकारी एवं अर्ध-सरकारी संस्थानों में सम्प्रेषण हेतु औपचारिक पत्रों का उपयोग किया जाता है।',
        keyPoints: [
          'पत्र का ढाँचा: प्रेषक का पता, दिनांक, प्रति/सेवा में, विषय (संक्षिप्त व स्पष्ट), महोदय/महोदया, मुख्य विषय-वस्तु, धन्यवाद, भवदीय/हस्ताक्षर।',
          'निबंध के चरण: प्रस्तावना, विषय का क्रमिक विस्तार, गुण-दोष विश्लेषण, समाधान, उपसंहार।'
        ],
        selfCheck: [
          'क्षेत्रीय निदेशक, एनआईओएस को परीक्षा केंद्र परिवर्तन हेतु एक औपचारिक प्रार्थना-पत्र लिखिए।',
          '"डिजिटल भारत एवं मुक्त शिक्षा" विषय पर 200 शब्दों का सारगर्भित निबंध तैयार कीजिए।'
        ]
      }
    ]
  }
];


