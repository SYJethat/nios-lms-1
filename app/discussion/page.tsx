// 'use client';

// import DashboardLayout from '@/components/DashboardLayout';
// import { useState } from 'react';
// import { 
//   MessageCircle, 
//   Users, 
//   ThumbsUp, 
//   Share2, 
//   Image as ImageIcon, 
//   Video, 
//   PieChart, 
//   Map, 
//   MoreVertical, 
//   BookOpen, 
//   Send, 
//   ChevronDown, 
//   GraduationCap, 
//   Award,
//   Zap,
//   TrendingUp,
//   Sparkles,
//   Search,
//   Filter,
//   ShieldCheck,
//   Bot,
//   FileCode,
//   Layout,
//   Globe
// } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';

// const feeds = [
//   { id: 1, user: 'Arjun Sharma', role: 'Learner', avatar: 'A', text: 'Just finished Chapter 4! The AI Tutor was super helpful for Newton\'s Laws. Highly recommend checking out the practice test.', time: '2h ago', likes: 12, comments: 4, type: 'Achievement', moderated: true },
//   { id: 2, user: 'Dr. Vikram Mehta', role: 'Teacher', avatar: 'V', text: 'Important: I\'ve added a new simulation for Circular Motion. Check it out in the Physics Resource folder!', time: '4h ago', likes: 45, comments: 8, type: 'Announcement', isTeacher: true, moderated: true },
//   { id: 3, user: 'Priya Nair', role: 'Learner', avatar: 'P', text: 'Anyone else struggling with Question 12 on the Algebra quiz? Let\'s discuss in the Maths group.', time: '5h ago', likes: 8, comments: 15, type: 'Help', moderated: true },
//   { id: 4, user: 'NIOS Official', role: 'Admin', avatar: 'N', text: 'National Science Day Virtual Exhibition starts tomorrow. Register now to showcase your projects!', time: '1d ago', likes: 128, comments: 32, type: 'Event', isOfficial: true, moderated: true },
// ];

// const groups = [
//   { id: 1, name: 'Physics Enthusiasts', members: '1.2k', activity: 'High' },
//   { id: 2, name: 'Algebra Solvers', members: '840', activity: 'Active' },
//   { id: 3, name: 'Delhi Region Learners', members: '15k', activity: 'High' },
//   { id: 4, name: 'English Literature Cup', members: '450', activity: 'Medium' },
// ];

// export default function DiscussionHub() {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState('Social Feed');

//   if (!user) return null;

//   return (
//     <DashboardLayout 
//       title="Collaboration Hub" 
//       subtitle="Engage with national faculty, join peer groups, and share your academic journey"
//     >
//       <div className="grid lg:grid-cols-[300px_1fr_340px] gap-8 items-start animate-fade-in pb-20">

//         {/* Left - Groups & Topics */}
//         <div className="space-y-8 flex flex-col items-center">
//           <div className="w-full p-8 rounded-xl  bg-white border border-slate-100 shadow-sm overflow-hidden group">
//               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Active Communities</h3>
//               <div className="space-y-2">
//                 {groups.map((g) => (
//                   <button key={g.id} className="w-full p-4 rounded-xl flex items-center gap-4 hover:bg-blue-50 transition-all text-left group">
//                       <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
//                         <Users size={16} />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="text-sm font-black text-slate-900 truncate tracking-tight">{g.name}</div>
//                         <div className="text-[10px] font-black text-slate-400 uppercase">{g.members} Members</div>
//                       </div>
//                   </button>
//                 ))}
//               </div>
//               <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200">Discover More</button>
//           </div>

//           <div className="w-full p-8 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
//               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Trending Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {['#NEP2020', '#NIOSSuccess', '#FutureLeaders', '#QuantumBasics', '#ArtsRenaissance'].map((t) => (
//                   <span key={t} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:border-blue-900 hover:text-blue-900 transition-all">
//                       {t}
//                   </span>
//                 ))}
//               </div>
//           </div>
//         </div>

//         {/* Center - Feed */}
//         <div className="space-y-8">
//           {/* Post Input */}
//           <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-lg relative overflow-hidden group">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
//               <div className="flex gap-6 mb-6">
//                 <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-red-500 flex items-center justify-center font-black text-white text-lg shrink-0 shadow-lg">
//                     {user.name.charAt(0)}
//                 </div>
//                 <textarea 
//                     className="flex-1 p-0 border-1 border-slate-200 rounded-xl px-4 focus:ring-0 text-slate-600 font-medium placeholder:text-slate-300 resize-none min-h-[60px] bg-transparent pt-4"
//                     placeholder="Share your academic progress or ask a question..."
//                 />
//               </div>
//               <div className="flex items-center justify-between pt-6 border-t border-slate-50">
//                 <div className="flex gap-2">
//                     {[ImageIcon, Video, PieChart].map((Icon, i) => (
//                       <button key={i} className="p-3 bg-slate-50 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all">
//                         <Icon size={18} />
//                       </button>
//                     ))}
//                 </div>
//                 <button className="px-10 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center gap-2">
//                     Push to Feed <Send size={14} />
//                 </button>
//               </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 overflow-x-auto scrollbar-hide">
//               {['Social Feed', 'Q&A Discussions', 'Workspaces', 'Official'].map((t) => (
//                 <button 
//                   key={t}
//                   onClick={() => setActiveTab(t)}
//                   className={`flex-1 min-w-[120px] py-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
//                     activeTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
//                   }`}
//                 >
//                   {t}
//                 </button>
//               ))}
//           </div>

//           {/* Feed List */}
//           <div className="space-y-6">
//               {activeTab === 'Workspaces' ? (
//                 <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
//                   {[
//                       { title: 'Physics Project Draft', owner: 'Team Alpha', type: 'Document', members: 4 },
//                       { title: 'Maths Solution Board', owner: 'Study Circle', type: 'Whiteboard', members: 6 },
//                   ].map((w, i) => (
//                       <div key={i} className="p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 transition-all group">
//                         <div className="flex items-center justify-between mb-6">
//                             <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all">
//                               <FileCode size={20} />
//                             </div>
//                             <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{w.members} active</span>
//                         </div>
//                         <h4 className="font-black text-slate-900 uppercase tracking-tight mb-1">{w.title}</h4>
//                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Owner: {w.owner}</div>
//                         <button className="w-full py-4 bg-slate-50 hover:bg-blue-900 hover:text-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Launch Workspace</button>
//                       </div>
//                   ))}
//                 </div>
//               ) : (
//                 feeds.map((f) => (
//                   <div key={f.id} className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col gap-6 relative overflow-hidden">
//                     <div className="flex items-start justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md ${
//                             f.isTeacher ? 'bg-emerald-500' : f.isOfficial ? 'bg-blue-900' : 'bg-slate-900'
//                           }`}>
//                             {f.avatar}
//                           </div>
//                           <div>
//                               <div className="flex items-center gap-3">
//                                 <h4 className="text-sm font-black text-slate-900">{f.user}</h4>
//                                 {f.moderated && (
//                                   <div className="flex items-center gap-1 text-emerald-500">
//                                       <ShieldCheck size={12} />
//                                       <span className="text-[8px] font-black uppercase tracking-widest">AI Moderated</span>
//                                   </div>
//                                 )}
//                               </div>
//                               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.time} · {f.type}</div>
//                           </div>
//                         </div>
//                         <button className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
//                           <MoreVertical size={16} />
//                         </button>
//                     </div>

//                     <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-2xl px-2">
//                         {f.text}
//                     </p>

//                     <div className="flex items-center gap-8 pt-4 border-t border-slate-50">
//                         <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-900 uppercase tracking-widest transition-all">
//                           <ThumbsUp size={16} /> {f.likes} Likes
//                         </button>
//                         <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-900 uppercase tracking-widest transition-all">
//                           <MessageCircle size={16} /> {f.comments} Comments
//                         </button>
//                         <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-900 uppercase tracking-widest transition-all">
//                           <Share2 size={16} /> Share Activity
//                         </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//           </div>
//         </div>

//         {/* Right - Insights & Blogs */}
//         <div className="space-y-8">
//           {/* Phase 3: AI FAQ Support Chatbot */}
//           <div className="p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden group">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="w-10 h-10 rounded-xl bg-blue-900/20 flex items-center justify-center text-blue-900">
//                   <Bot size={20} />
//                 </div>
//                 <h3 className="font-black uppercase tracking-tight">AI Helpdesk</h3>
//               </div>
//               <div className="space-y-4">
//                 <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-medium leading-relaxed italic text-slate-300">
//                     "I can answer common administrative or curriculum questions instantly. Try me!"
//                 </div>
//                 <button className="w-full py-4 bg-blue-900 hover:bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95">
//                     Launch AI Chatbot
//                 </button>
//               </div>
//           </div>

// {/* Featured Blog CTA */}
// <div className="p-10 rounded-xl  bg-gradient-to-br from-blue-200 to-red-400 text-white relative overflow-hidden group">
//     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
//     <div className="flex items-center gap-3 mb-8">
//       <BookOpen className="text-blue-900" size={24} />
//       <h3 className="font-black uppercase tracking-tight text-slate-900">Academic Blogs</h3>
//     </div>
//     <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
//       <div className="text-[8px] font-black text-blue-900 uppercase tracking-widest mb-2">Editor's Pick</div>
//       <h4 className="text-sm font-black text-white leading-tight mb-4">Bridging the Gap: NEP 2020 & Open Schooling Systems</h4>
//       <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
//           <span>By Dr. Amit Kumar</span>
//           <span>15m Read</span>
//       </div>
//     </div>
//     <button className="w-full mt-6 py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20">Explore Library</button>
// </div>

// {/* Challenges */}
// <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
//     <div className="flex items-center gap-3 mb-8">
//       <Award className="text-blue-900" size={24} />
//       <h3 className="font-black uppercase tracking-tight text-slate-900">Peer Challenges</h3>
//     </div>
//     <div className="space-y-4">
//       {[
//         { title: 'The Physics Race', players: 45, prize: '50 XP', color: 'blue' },
//         { title: 'Maths Duel: Algebra', players: 12, prize: 'Silver Badge', color: 'blue' },
//       ].map((c, i) => (
//         <div key={i} className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group/item">
//             <div className="text-xs font-black text-slate-900 mb-2 truncate group-hover/item:text-blue-900 transition-colors">{c.title}</div>
//             <div className="flex justify-between items-center mb-6">
//               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.players} Global Players</div>
//               <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest underline underline-offset-4">{c.prize}</div>
//             </div>
//             <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-sm flex items-center justify-center gap-2">
//               Enter Challenge <Zap size={14} />
//             </button>
//         </div>
//       ))}
//     </div>
// </div>

// {/* Support Map */}
// <div className="p-10 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm text-center">
//     <Map className="w-10 h-10 mx-auto mb-4 text-blue-500 opacity-50" />
//     <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tight">NIOS Ecosystem Map</h4>
//     <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed mb-8">Guided virtual tour of the digital learning infrastructure.</p>
//     <button className="w-full py-4 bg-white border border-blue-100 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg shadow-blue-500/10">Start Orientation</button>
// </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Users,
  ThumbsUp,
  Share2,
  Image as ImageIcon,
  Video,
  PieChart,
  MoreVertical,
  Send,
  ShieldCheck,
  Bot,
  FileCode,
  Award,
  Zap,
  Map,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface FeedItem {
  id: number;
  user: string;
  role: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  comments: number;
  type: string;
  moderated?: boolean;
  isTeacher?: boolean;
  isOfficial?: boolean;
  image?: string;
}

interface ChatMessage {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
  isOwn?: boolean;
}

const initialFeeds: FeedItem[] = [
  {
    id: 1,
    user: 'Arjun Sharma',
    role: 'Learner',
    avatar: 'A',
    text: 'Just finished Chapter 4! The AI Tutor was super helpful for Newton\'s Laws. Highly recommend checking out the practice test.',
    time: '2h ago',
    likes: 12,
    comments: 4,
    type: 'Achievement',
    moderated: true
  },
  {
    id: 2,
    user: 'Dr. Vikram Mehta',
    role: 'Teacher',
    avatar: 'V',
    text: 'Important: I\'ve added a new simulation for Circular Motion. Check it out in the Physics Resource folder!',
    time: '4h ago',
    likes: 45,
    comments: 8,
    type: 'Announcement',
    isTeacher: true,
    moderated: true
  },
  {
    id: 3,
    user: 'Priya Nair',
    role: 'Learner',
    avatar: 'P',
    text: 'Anyone else struggling with Question 12 on the Algebra quiz? Let\'s discuss in the Maths group.',
    time: '5h ago',
    likes: 8,
    comments: 15,
    type: 'Help',
    moderated: true
  },
  {
    id: 4,
    user: 'NIOS Official',
    role: 'Admin',
    avatar: 'N',
    text: 'National Science Day Virtual Exhibition starts tomorrow. Register now to showcase your projects!',
    time: '1d ago',
    likes: 128,
    comments: 32,
    type: 'Event',
    isOfficial: true,
    moderated: true
  },
];

const initialChatMessages: ChatMessage[] = [
  { id: 1, user: 'Dr. Vikram Mehta', avatar: 'V', text: 'Welcome everyone! Feel free to ask any doubts regarding Physics.', time: '10m ago' },
  { id: 2, user: 'Priya Nair', avatar: 'P', text: 'Sir, can you explain the difference between uniform and non-uniform acceleration?', time: '8m ago' },
];

export default function DiscussionHub() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('Social Feed');
  const [feeds, setFeeds] = useState<FeedItem[]>(initialFeeds);
  const [newPostText, setNewPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  // Live Chat States
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  if (!user) {
    return <div className="p-10 text-center">Please log in to access the Collaboration Hub.</div>;
  }

  // Auto-scroll to bottom of chat
  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [chatMessages]);

  // Simulate real-time incoming messages (for demo)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (Math.random() > 0.7) {
  //       const demoTexts = [
  //         "Anyone preparing for the upcoming NIOS exam?",
  //         "The new simulation is really helpful!",
  //         "Just scored 95% in Physics test! 🎉",
  //         "Can someone share notes on Thermodynamics?",
  //       ];
  //       const randomText = demoTexts[Math.floor(Math.random() * demoTexts.length)];

  //       setChatMessages(prev => [...prev, {
  //         id: Date.now(),
  //         user: ['Rahul Kumar', 'Sneha Patel', 'Aarav Singh', 'Meera Joshi'][Math.floor(Math.random() * 4)],
  //         avatar: 'R',
  //         text: randomText,
  //         time: 'now'
  //       }]);
  //     }
  //   }, 15000);

  //   return () => clearInterval(interval);
  // }, []);

  const handlePost = () => {
    if ((!newPostText.trim() && !selectedImage) || isPosting) return;

    setIsPosting(true);

    const newFeed: FeedItem = {
      id: Date.now(),
      user: user.name || 'You',
      role: 'Learner',
      avatar: (user.name || 'Y').charAt(0).toUpperCase(),
      text: newPostText.trim(),
      time: 'just now',
      likes: 0,
      comments: 0,
      type: 'Post',
      moderated: true,
      image: selectedImage || undefined,
    };

    setTimeout(() => {
      setFeeds([newFeed, ...feeds]);
      setNewPostText('');
      setSelectedImage(null);
      setIsPosting(false);
    }, 600);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setSelectedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now(),
      user: user.name || 'You',
      avatar: (user.name || 'Y').charAt(0).toUpperCase(),
      text: chatInput.trim(),
      time: 'now',
      isOwn: true,
    };

    setChatMessages([...chatMessages, newMsg]);
    setChatInput('');

    // Simulate reply
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        user: 'AI Assistant',
        avatar: '🤖',
        text: "Thanks for your message! I'm here to help with any academic queries.",
        time: 'now'
      }]);
    }, 1000);
  };

  return (
    <DashboardLayout
      title="Collaboration Hub"
      subtitle="Engage with national faculty, join peer groups, and share your academic journey"
    >
      <div className="grid lg:grid-cols-[300px_1fr_340px] gap-8 items-start animate-fade-in pb-20">

        {/* ==================== LEFT SIDEBAR ==================== */}
        <div className="space-y-8">
          <div className="w-full p-8 rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Active Communities</h3>
            <div className="space-y-2">
              {[
                { name: 'Physics Enthusiasts', members: '1.2k', activity: 'High' },
                { name: 'Algebra Solvers', members: '840', activity: 'Active' },
                { name: 'Delhi Region Learners', members: '15k', activity: 'High' },
                { name: 'English Literature Cup', members: '450', activity: 'Medium' },
              ].map((g, i) => (
                <button key={i} className="w-full p-4 rounded-xl flex items-center gap-4 hover:bg-blue-50 transition-all text-left">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black text-slate-900 truncate">{g.name}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase">{g.members} Members</div>
                  </div>
                </button>
              ))}
            </div>
            <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
              Discover More
            </button>
          </div>

          <div className="w-full p-8 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Trending Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['#NEP2020', '#NIOSSuccess', '#FutureLeaders', '#QuantumBasics', '#ArtsRenaissance'].map((t) => (
                <span key={t} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:border-blue-900 hover:text-blue-900 transition-all">
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* Featured Blog CTA */}
          <div className="p-10 rounded-xl  bg-gradient-to-br from-blue-200 to-red-400 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="text-blue-900" size={24} />
              <h3 className="font-black uppercase tracking-tight text-slate-900">Academic Blogs</h3>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <div className="text-[8px] font-black text-blue-900 uppercase tracking-widest mb-2">Editor's Pick</div>
              <h4 className="text-sm font-black text-white leading-tight mb-4">Bridging the Gap: NEP 2020 & Open Schooling Systems</h4>
              <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <span>By Dr. Amit Kumar</span>
                <span>15m Read</span>
              </div>
            </div>
            <Link href="/library">
              <button className="w-full mt-6 py-4 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest
                 hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20">
                Explore Library</button>

            </Link>
          </div>
        </div>

        {/* ==================== CENTER FEED ==================== */}
        <div className="space-y-8">

          {/* Post Creation Box */}
          <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />

            <div className="flex gap-6 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-red-500 flex items-center justify-center font-black text-white text-lg shrink-0 shadow-lg">
                {user.name?.charAt(0) || 'Y'}
              </div>
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="flex-1 p-0 border border-slate-200 rounded-xl px-4 focus:ring-0 text-slate-600 font-medium placeholder:text-slate-300 resize-none min-h-[80px] bg-transparent pt-4"
                placeholder="Share your academic progress or ask a question..."
              />
            </div>

            {selectedImage && (
              <div className="mb-6 relative rounded-xl overflow-hidden border border-slate-100">
                <img src={selectedImage} alt="preview" className="w-full max-h-80 object-cover" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-3 right-3 bg-black/70 text-white p-1.5 rounded-full hover:bg-black"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex gap-2">
                <label className="p-3 bg-slate-50 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all cursor-pointer">
                  <ImageIcon size={18} />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                <button className="p-3 bg-slate-50 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all">
                  <Video size={18} />
                </button>
              </div>
              <button
                onClick={handlePost}
                disabled={isPosting || (!newPostText.trim() && !selectedImage)}
                className="px-10 py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {isPosting ? 'Posting...' : 'Push to Feed'} <Send size={14} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 overflow-x-auto scrollbar-hide">
            {['Social Feed', 'Q&A Discussions', 'Workspaces', 'Official'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 min-w-[120px] py-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Feed List */}
          <div className="space-y-6">
            {feeds.map((f) => (
              <div key={f.id} className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-blue-900/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col gap-6 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md ${f.isTeacher ? 'bg-emerald-500' : f.isOfficial ? 'bg-blue-900' : 'bg-slate-900'
                      }`}>
                      {f.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-black text-slate-900">{f.user}</h4>
                        {f.moderated && (
                          <div className="flex items-center gap-1 text-emerald-500">
                            <ShieldCheck size={12} />
                            <span className="text-[8px] font-black uppercase tracking-widest">AI Moderated</span>
                          </div>
                        )}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.time} · {f.type}</div>
                    </div>
                  </div>
                  <button className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-2xl px-2">
                  {f.text}
                </p>

                {f.image && (
                  <img src={f.image} alt="post" className="rounded-xl w-full mt-2" />
                )}

                <div className="flex items-center gap-8 pt-4 border-t border-slate-50">
                  <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-900 uppercase tracking-widest transition-all">
                    <ThumbsUp size={16} /> {f.likes} Likes
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-900 uppercase tracking-widest transition-all">
                    <MessageCircle size={16} /> {f.comments} Comments
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-900 uppercase tracking-widest transition-all">
                    <Share2 size={16} /> Share Activity
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== RIGHT SIDEBAR ==================== */}
        <div className="space-y-8">

          {/* AI Helpdesk */}
          <div className="p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-900/20 flex items-center justify-center text-blue-900">
                <Bot size={20} />
              </div>
              <h3 className="font-black uppercase tracking-tight">AI Helpdesk</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-medium leading-relaxed italic text-slate-300">
                "I can answer common administrative or curriculum questions instantly. Try me!"
              </div>

              <Link href="/ai-tutor">
                <button className="w-full py-4 bg-blue-900 hover:bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                  Launch AI Chatbot
                </button>
              </Link>
            </div>
          </div>

          {/* Live Chat */}
          <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-lg flex flex-col h-[520px]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                <MessageCircle size={22} />
              </div>
              <div>
                <h3 className="font-black text-slate-900">Live Discussion</h3>
                <p className="text-xs text-emerald-600 font-medium">• 289 students online</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : ''}`}>
                  {!msg.isOwn && (
                    <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center font-black text-sm mr-3 shrink-0">
                      {msg.avatar}
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${msg.isOwn ? 'bg-blue-900 text-white' : 'bg-slate-100'}`}>
                    {!msg.isOwn && <p className="font-black text-xs mb-1 opacity-70">{msg.user}</p>}
                    <p>{msg.text}</p>
                    <p className="text-[10px] text-right opacity-60 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder="Type your message..."
                className="flex-1 px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-900 text-sm"
              />
              <button
                onClick={sendChatMessage}
                className="px-6 bg-blue-900 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center transition-all active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
          </div>



          {/* Challenges */}
          <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-blue-900" size={24} />
              <h3 className="font-black uppercase tracking-tight text-slate-900">Peer Challenges</h3>
            </div>
            <div className="space-y-4">
              {[
                { title: 'The Physics Race', players: 45, prize: '50 XP', color: 'blue' },
                { title: 'Maths Duel: Algebra', players: 12, prize: 'Silver Badge', color: 'blue' },
              ].map((c, i) => (
                <div key={i} className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group/item">
                  <div className="text-xs font-black text-slate-900 mb-2 truncate group-hover/item:text-blue-900 transition-colors">{c.title}</div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.players} Global Players</div>
                    <div className="text-[10px] font-black text-blue-900 uppercase tracking-widest underline underline-offset-4">{c.prize}</div>
                  </div>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-sm flex items-center justify-center gap-2">
                    Enter Challenge <Zap size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Support Map */}
          <div className="p-10 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm text-center">
            <Map className="w-10 h-10 mx-auto mb-4 text-blue-500 opacity-50" />
            <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tight">NIOS Ecosystem Map</h4>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed mb-8">Guided virtual tour of the digital learning infrastructure.</p>
            <button className="w-full py-4 bg-white border border-blue-100 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg shadow-blue-500/10">Start Orientation</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}