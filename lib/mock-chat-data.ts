export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  avatar?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'quiz' | 'video' | 'file';
}

export const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    role: 'ai',
    content: "Hello! I'm your NIOS AI Course Recommendation Assistant. What subjects are you studying? I can suggest personalized courses and study materials.",
    timestamp: '10:32 AM',
    avatar: '/ai-avatar.png',
    status: 'read'
  },
  {
    id: '2',
    role: 'user',
    content: 'I need help with Physics class 12 and some Math',
    timestamp: '10:33 AM',
    status: 'read'
  },
  {
    id: '3',
    role: 'ai',
    content: "Perfect! For Physics Class 12, I recommend:\n\n**Top Courses:**\n• Mechanics & Electrodynamics (8 weeks, 95% pass rate)\n• Modern Physics & Relativity (6 weeks)\n• Practical Physics Lab Simulations\n\n**Study Plan:**\nWeek 1-2: Newtonian Mechanics\nWeek 3-4: Thermodynamics\n\nGenerate a detailed 8-week study schedule?",
    timestamp: '10:34 AM',
    status: 'read',
    type: 'text'
  },
  {
    id: '4',
    role: 'user',
    content: 'Yes please, also suggest books',
    timestamp: '10:35 AM',
    status: 'read'
  },
  {
    id: '5',
    role: 'ai',
    content: "📚 **8-Week Physics Study Plan**\n\n**Books Recommended:**\n1. NCERT Physics Vol 1 & 2\n2. HC Verma Concepts of Physics\n3. NIOS SLM Physics (free PDF)\n\n**Week 1:** Units & Measurements + Motion\n*Daily: 2 hrs theory + 10 problems*\n\n**Week 2:** Laws of Motion + Work Energy\n*Quiz: 20 MCQs every Friday*\n\n[Generate PDF Schedule] [Start Quiz]",
    timestamp: '10:36 AM',
    type: 'text'
  },
  {
    id: '6',
    role: 'user',
    content: 'Can you generate a practice quiz for TMA?',
    timestamp: '10:37 AM',
    status: 'read'
  },
  {
    id: '7',
    role: 'ai',
    content: "✅ **TMA Practice Quiz Generated** (Physics - Motion)\n\n**Q1.** Newton's first law is also known as?\nA) Law of Inertia ✓\nB) Law of Acceleration\nC) Law of Action-Reaction\n\n**Q2.** Define friction and give two real-life examples.\n*Ans: Force opposing motion. Ex: Car brakes, walking*\n\n**Score: 8.5/10** Excellent! Review friction formulas for TMA submission.\n\n📄 [Download Full Quiz PDF] [Review Answers]",
    timestamp: '10:38 AM',
    type: 'quiz',
    status: 'read'
  }
];

export const quickSuggestions = [
  'Recommend Physics courses',
  'Math study plan class 12',
  'Best books for Chemistry',
  'TMA help Business Studies',
  'Generate practice quiz'
];

export const courseRecommendations = [
  {
    id: 'phys001',
    title: 'Advanced Mechanics & Electrodynamics',
    level: 'Class 12',
    duration: '8 weeks',
    rating: 4.9,
    image: '/book.jpg'
  },
  {
    id: 'math002',
    title: 'Calculus & Vectors',
    level: 'Class 12',
    duration: '10 weeks',
    rating: 4.8,
    image: '/book.jpg'
  }
];

