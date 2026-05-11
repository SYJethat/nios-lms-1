import type { ChatMessage } from './mock-chat-data';

export const mockDiscussionHistory: ChatMessage[] = [
  {
    id: 'd1',
    role: 'user',
    content: 'Just finished Physics Chapter 4! Anyone else struggling with the projectile motion problems?',
    timestamp: '2h ago',
    status: 'read'
  },
  {
    id: 'd2',
    role: 'ai',
    content: "Hi Arjun! Many students find projectile motion tricky. Here's a quick tip: \\n\\n**Range formula:** R = (v² sin2θ)/g\\n**Max height:** H = (v² sin²θ)/(2g)\\n\\nCheck the simulation in the Physics folder. Need solved examples?",
    timestamp: '1h 58m ago',
    type: 'text'
  },
  {
    id: 'd3',
    role: 'user',
    content: 'Thanks! Can you share the PDF with examples?',
    timestamp: '1h 55m ago',
    status: 'read'
  },
  {
    id: 'd4',
    role: 'user',
    content: '@Dr.Vikram Sir, when is TMA-2 due for Math?',
    timestamp: '45m ago',
    status: 'read'
  },
  {
    id: 'd5',
    role: 'ai',
    content: '[📎 examples_projectile.pdf] uploaded. Worked through Question 12? Let me know if you need step-by-step.',
    timestamp: '1h 52m ago',
    type: 'file'
  },
  {
    id: 'd6',
    role: 'user',
    content: 'Great resource! This really helped.',
    timestamp: '30m ago',
    status: 'read'
  }
];

export const discussionQuickSuggestions = [
  'Ask about TMA deadlines',
  'Share study notes',
  'Find study group',
  'Physics doubt Q12',
  'Math problem help'
];

export const groupChats: Record<string, ChatMessage[]> = {
  'Physics Enthusiasts': mockDiscussionHistory.slice(0,3),
  'Algebra Solvers': [
    { id: 'a1', role: 'user', content: 'Quadratic equations cheat sheet anyone?', timestamp: '1h ago', status: 'read' }
  ],
  'Delhi Region Learners': []
};

