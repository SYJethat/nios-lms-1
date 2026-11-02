'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  MessageCircle,
  Users,
  ThumbsUp,
  Share2,
  Image as ImageIcon,
  Send,
  Award,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  Clock,
  BookOpen,
  Pin,
  MessageSquare,
  Flame,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS } from '@/lib/mock-data';

interface Post {
  id: string;
  author: string;
  role: 'Learner' | 'Faculty' | 'Admin';
  avatarBg: string;
  time: string;
  tag: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  liked?: boolean;
  pinned?: boolean;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: 'Dr. Anjali Patel',
    role: 'Faculty',
    avatarBg: 'bg-blue-900 text-white',
    time: '2 hours ago',
    tag: 'Academic Guidance',
    title: 'Tips for Secondary Examination Preparation & SLM Revision',
    content: 'Dear learners, please ensure you complete all self-assessment questions at the end of each SLM unit. Focus on understanding concepts rather than rote learning. Our AI Tutor is also available 24/7 for doubt clearance.',
    likes: 42,
    commentsCount: 9,
    pinned: true
  },
  {
    id: 'post-2',
    author: 'Arjun Sharma',
    role: 'Learner',
    avatarBg: 'bg-amber-500 text-slate-950',
    time: '4 hours ago',
    tag: 'Peer Discussion',
    title: 'Practicing 22-Language Bilingual Vocabulary for Hindi-Tamil bridge',
    content: 'Has anyone tried the new 484 bilateral language pathways? Practicing pronunciation with the AI voice drill has really helped my spoken Tamil confidence!',
    likes: 28,
    commentsCount: 14
  },
  {
    id: 'post-3',
    author: 'NIOS Academic Directorate',
    role: 'Admin',
    avatarBg: 'bg-emerald-700 text-white',
    time: '1 day ago',
    tag: 'Announcement',
    title: 'Submission of Tutor Marked Assignments (TMA) for Session 2026',
    content: 'All enrolled learners can now upload their TMAs directly from their Student Portal. Ensure files are in PDF format under 5MB with clear roll number labeling.',
    likes: 85,
    commentsCount: 23,
    pinned: true
  },
  {
    id: 'post-4',
    author: 'Priya Patel',
    role: 'Learner',
    avatarBg: 'bg-purple-600 text-white',
    time: '1 day ago',
    tag: 'Science & Math',
    title: 'Clarification on Force & Laws of Motion Numerical Problem 4',
    content: 'Can someone explain the friction subtraction step in problem 4? I got 3.5 m/s² while the textbook shows 4 m/s². Let us discuss the free-body diagram assumptions.',
    likes: 19,
    commentsCount: 7
  }
];

const COMMUNITIES = [
  { id: 'c1', name: 'Science & Mathematics', members: '14.2k', topic: 'Physics, Chemistry, Math' },
  { id: 'c2', name: 'Languages & Multilingual Hub', members: '21.5k', topic: '22 Scheduled Indian Languages' },
  { id: 'c3', name: 'Humanities & Social Studies', members: '9.8k', topic: 'History, Economics, Geography' },
  { id: 'c4', name: 'Vocational & IT Skills', members: '11.3k', topic: 'Coding, Accounting, Digital Skills' }
];

export default function DiscussionHubPage() {
  const { user } = useAuth();
  const activeUser = user || MOCK_USERS[0];

  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('Peer Discussion');
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const created: Post = {
      id: `post-${Date.now()}`,
      author: activeUser.name,
      role: 'Learner',
      avatarBg: 'bg-blue-900 text-white',
      time: 'Just now',
      tag: newTag,
      title: newTitle || 'Discussion Thread',
      content: newContent,
      likes: 1,
      commentsCount: 0,
      liked: true
    };

    setPosts([created, ...posts]);
    setNewTitle('');
    setNewContent('');
  };

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const liked = !p.liked;
          return {
            ...p,
            liked,
            likes: liked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const filteredPosts = posts.filter((p) => {
    const matchesTag = selectedTag === 'All' || p.tag === selectedTag;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q);
    return matchesTag && matchesSearch;
  });

  return (
    <DashboardLayout
      title="Collaboration & Academic Discussion Forum"
      subtitle={`${activeUser.name} · Peer Learning Community · National Institute of Open Schooling`}
    >
      <div className="space-y-8 animate-fade-in pb-20">

        {/* Hero Spotlight (Light Theme) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-amber-50/50 border border-blue-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-wider border border-blue-200 flex items-center gap-1.5 w-fit">
              <Sparkles size={12} className="text-amber-600" /> NIOS NATIONAL PEER NETWORK
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Academic Exchange &amp; Collaborative Learning
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Ask questions, discuss Self Learning Materials (SLMs), form regional study circles, and receive direct insights from verified NIOS educators and academic counsellors.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-center pr-4 border-r border-slate-100">
              <div className="text-xl font-black text-blue-900">54k+</div>
              <div className="text-[9px] uppercase font-bold text-slate-400">Learners</div>
            </div>
            <div className="text-center pr-4 border-r border-slate-100">
              <div className="text-xl font-black text-emerald-700">1.2k+</div>
              <div className="text-[9px] uppercase font-bold text-slate-400">Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-amber-700">98%</div>
              <div className="text-[9px] uppercase font-bold text-slate-400">Solved</div>
            </div>
          </div>
        </div>

        {/* Main Grid: Post Feed + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Left Column: Feed & New Post */}
          <div className="space-y-6">

            {/* Create Post Card (Light Theme) */}
            <form onSubmit={handleCreatePost} className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-blue-900" /> Start an Academic Thread
                </span>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                >
                  <option value="Peer Discussion">Peer Discussion</option>
                  <option value="Science & Math">Science &amp; Math</option>
                  <option value="Languages">Languages &amp; Multilingual</option>
                  <option value="Academic Guidance">Academic Guidance</option>
                  <option value="TMA & Exams">TMA &amp; Exams</option>
                </select>
              </div>

              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Topic title or question summary..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Describe your question, topic, or study insight in detail..."
                className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 placeholder:text-slate-400 font-medium resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400 font-medium">
                  Posting as <strong>{activeUser.name}</strong>
                </span>
                <button
                  type="submit"
                  disabled={!newContent.trim()}
                  className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
                >
                  <span>Post Thread</span>
                  <Send size={13} />
                </button>
              </div>
            </form>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                {['All', 'Academic Guidance', 'Peer Discussion', 'Science & Math', 'Announcement'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedTag === tag ? 'bg-white text-blue-900 shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search discussions..."
                  className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-8 pr-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
                />
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${post.avatarBg}`}
                      >
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{post.author}</span>
                          <span className="px-2 py-0.2 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600">
                            {post.role}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                          <Clock size={11} />
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {post.pinned && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-1 border border-amber-200">
                          <Pin size={10} /> Pinned
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-900 text-[10px] font-bold border border-blue-100">
                        {post.tag}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <h3 className="text-sm font-bold text-slate-900 hover:text-blue-900 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{post.content}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        post.liked
                          ? 'bg-blue-100 text-blue-900 font-black'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      <ThumbsUp size={13} fill={post.liked ? 'currentColor' : 'none'} />
                      <span>{post.likes} Likes</span>
                    </button>

                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium transition-all cursor-pointer">
                      <MessageCircle size={13} />
                      <span>{post.commentsCount} Comments</span>
                    </button>

                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium transition-all cursor-pointer">
                      <Share2 size={13} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Communities & Study Circles (Light Theme) */}
          <aside className="space-y-6">

            {/* Communities */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Users size={14} className="text-blue-900" /> Subject Circles
                </span>
                <span className="text-[10px] text-blue-900 font-bold uppercase">All NIOS</span>
              </div>

              <div className="space-y-3">
                {COMMUNITIES.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/70 transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {c.name}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-500">{c.members}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">{c.topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-200/80 shadow-xs space-y-3 text-xs text-slate-700">
              <div className="font-black text-blue-950 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <CheckCircle size={13} className="text-emerald-700" /> Academic Forum Code of Conduct
              </div>
              <p className="leading-relaxed font-medium">
                Maintain respectful communication, keep threads focused on open schooling subjects, and avoid sharing personal contact details.
              </p>
            </div>

          </aside>

        </div>

      </div>
    </DashboardLayout>
  );
}