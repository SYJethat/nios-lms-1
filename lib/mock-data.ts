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
  type: 'reading' | 'listening' | 'writing';
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
export interface MockBook {
  id: string;
  title: string;
  author: string;
  cover: string;
  pages: string[];
  category: 'Textbook' | 'Schedule' | 'Guide';
  description?: string;
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
  {
    id: 'B1',
    title: 'Secondary Physics: Unit 1',
    author: 'NIOS Faculty',
    cover: '/book.jpg',
    category: 'Textbook',
    pages: [
      '/NIOS.png',
      '/book.jpg',
      '/NIOS.png',
      '/NIOS.png',
    ]
  },
  {
    id: 'S1',
    title: 'Live Class Schedule: April 2026',
    author: 'Academic Dept',
    cover: '/book.jpg',
    category: 'Schedule',
    pages: [
      '/NIOS.png',
      '/NIOS.png',
      '/NIOS.png',
    ]
  }
];

