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
  // ... (previous users)
];

// ALL ORIGINAL MOCKS + NEW ADMIN MOCKS

// MOCK_ASSESSMENTS
export interface MockAssessment {
  id: string;
  title: string;
  subject: string;
  type: 'Quiz' | 'Mock Exam' | 'Assignment';
  dueDate: string;
  status: 'Pending' | 'Completed' | 'Missed';
  score?: number;
}

export const MOCK_ASSESSMENTS: MockAssessment[] = [
  {
    id: 'Q1',
    title: 'Unit 1: Quantum Basics',
    subject: 'Science',
    type: 'Quiz',
    dueDate: '2026-04-10',
    status: 'Pending'
  },
  {
    id: 'E1',
    title: 'Pre-Board Mock Exam',
    subject: 'Mathematics',
    type: 'Mock Exam',
    dueDate: '2026-04-15',
    status: 'Pending'
  },
  {
    id: 'A1',
    title: 'Essay: The Indian Renaissance',
    subject: 'Social Science',
    type: 'Assignment',
    dueDate: '2026-04-05',
    status: 'Completed',
    score: 88
  }
];

// MOCK_TEACHER_REPORTS
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

// MOCK_CLASS_ACTIVITIES
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
    title: "Newton's Laws Experiment",
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
  }
];

// MOCK_ATTENDANCE
export interface MockAttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'Present' | 'Absent' | 'Late';
  remarks?: string;
}

export const MOCK_ATTENDANCE: MockAttendanceRecord[] = [
  { id: 'ATT1', date: '2026-04-03', subject: 'Physics', status: 'Present' },
  { id: 'ATT2', date: '2026-04-03', subject: 'Mathematics', status: 'Late', remarks: '5 min late' },
  { id: 'ATT3', date: '2026-04-02', subject: 'English', status: 'Present' }
];

// MOCK_PTM_SCHEDULE
export interface MockPTM {
  id: string;
  teacher: string;
  subject: string;
  date: string;
  time: string;
  slots: number;
  status: 'Available' | 'Applied' | 'Confirmed';
}

export const MOCK_PTM_SCHEDULE: MockPTM[] = [
  {
    id: 'PTM1',
    teacher: 'Dr. V. Mehta',
    subject: 'Physics',
    date: '2026-04-20',
    time: '10:00 AM',
    slots: 5,
    status: 'Available'
  }
];

// MOCK_STUDENT_REPORTS
export interface MockStudentReport {
  id: string;
  title: string;
  type: 'Monthly Progress' | 'Subject Analysis';
  period: string;
  generatedAt: string;
  subjects: string[];
  size: string;
}

export const MOCK_STUDENT_REPORTS: MockStudentReport[] = [
  {
    id: 'SR1',
    title: 'Arjun Sharma - March Progress',
    type: 'Monthly Progress',
    period: 'March 2026',
    generatedAt: '2026-04-01',
    subjects: ['Physics', 'Math'],
    size: '2.1 MB'
  }
];

// MOCK_BADGES
export interface MockBadge {
  id: string;
  name: string;
  rarity: 'Bronze' | 'Silver' | 'Gold';
}

export const MOCK_BADGES: MockBadge[] = [
  { id: 'B1', name: 'Early Bird', rarity: 'Bronze' },
  { id: 'B2', name: 'Physics Pro', rarity: 'Silver' }
];

// Admin mocks (new)
export interface MockTeacher {
  id: string;
  name: string;
  status: string;
}

export const MOCK_TEACHERS: MockTeacher[] = [
  { id: 'T1', name: 'Dr. Mehta', status: 'active' }
];

export interface MockStudent {
  id: string;
  name: string;
  status: string;
}

export const MOCK_STUDENTS: MockStudent[] = [
  { id: 'S1', name: 'Arjun', status: 'active' }
];

export const MOCK_REVENUE: any[] = [
  { period: 'Mar', amount: 486000 }
];

export const MOCK_NOTIFICATIONS: any[] = [
  { title: 'Reminder', target: 'All' }
];

export const MOCK_SYSTEM_ANNOUNCEMENTS: any[] = [
  { title: 'Update', target: 'all' }
];

