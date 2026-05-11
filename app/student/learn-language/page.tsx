'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Headphones, 
  BookOpen, 
  PenTool, 
  Globe, 
  BarChart2, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Play,
  Square,
  Volume2,
  ChevronRight,
  Trophy,
  Target,
  ArrowRight
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

// Types
type Mode = 'speaking' | 'listening' | 'reading' | 'writing';
type Level = 'beginner' | 'intermediate' | 'advanced';

interface Feedback {
  score: number;
  pronunciation?: number;
  fluency?: number;
  grammar?: number;
  confidence?: number;
  suggestions: string[];
}

export default function LearnLanguagePage() {
  const [activeMode, setActiveMode] = useState<Mode>('speaking');
  const [level, setLevel] = useState<Level>('beginner');
  const [language, setLanguage] = useState('English');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [progress, setProgress] = useState({
    speaking: 45,
    listening: 60,
    reading: 30,
    writing: 20
  });

  const modes = [
    { id: 'speaking', label: 'Speaking', icon: <Mic className="w-5 h-5" />, color: 'bg-rose-500' },
    { id: 'listening', label: 'Listening', icon: <Headphones className="w-5 h-5" />, color: 'bg-blue-500' },
    { id: 'reading', label: 'Reading', icon: <BookOpen className="w-5 h-5" />, color: 'bg-emerald-500' },
    { id: 'writing', label: 'Writing', icon: <PenTool className="w-5 h-5" />, color: 'bg-amber-500' },
  ];

  return (
    <DashboardLayout 
      title="Learn Language" 
      subtitle="AI-Powered Communication Mastery"
    >
      <div className="max-w-8xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-slate-900">Language Lab</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Session Active</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="sa">Sanskrit</option>
              <option value="bn">Bengali</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="kn">Kannada</option>
              <option value="ml">Malayalam</option>
              <option value="mr">Marathi</option>
              <option value="gu">Gujarati</option>
              <option value="pa">Punjabi</option>

          </select>

          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
            {(['beginner', 'intermediate', 'advanced'] as Level[]).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                  level === l 
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-100' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Learning Modes</h3>
            <div className="space-y-3">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id as Mode)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                    activeMode === mode.id 
                    ? 'bg-slate-900 text-white shadow-xl translate-x-2' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${activeMode === mode.id ? mode.color : 'bg-white text-slate-400'}`}>
                    {mode.icon}
                  </div>
                  <span className="font-bold">{mode.label}</span>
                  {activeMode === mode.id && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Progress</h3>
              <BarChart2 className="w-4 h-4 text-blue-500" />
            </div>
            <div className="space-y-4">
              {Object.entries(progress).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="capitalize text-slate-600">{key}</span>
                    <span className="text-slate-900">{value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        key === 'speaking' ? 'bg-rose-500' : 
                        key === 'listening' ? 'bg-blue-500' : 
                        key === 'reading' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl">
            <Zap className="w-8 h-8 mb-4 text-yellow-400" />
            <h4 className="font-black text-lg mb-2">Daily Challenge</h4>
            <p className="text-blue-100 text-sm mb-4">Complete a 5-minute speaking session to earn 50 XP!</p>
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-2.5 rounded-xl transition-all">
              Start Now
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden min-h-[600px] flex flex-col">
            {activeMode === 'speaking' && <SpeakingModule level={level} language={language} />}
            {activeMode === 'listening' && <ListeningModule level={level} language={language} />}
            {activeMode === 'reading' && <ReadingModule level={level} language={language} />}
            {activeMode === 'writing' && <WritingModule level={level} language={language} />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Sub-components for each mode

function SpeakingModule({ level, language }: { level: Level, language: string }) {
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState<Feedback | null>(null);
  const [transcript, setTranscript] = useState('');
  
  const prompts = {
    beginner: "Introduce yourself and talk about your favorite hobby.",
    intermediate: "Describe a memorable trip you took and what you learned from it.",
    advanced: "Discuss the impact of technology on modern education and its future implications."
  };

  const handleStart = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'English' ? 'en-US' : language === 'Spanish' ? 'es-ES' : 'fr-FR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      
      // Simulate AI evaluation of the actual transcript
      setTimeout(() => {
        setResult({
          score: Math.floor(Math.random() * 20) + 75,
          pronunciation: 82,
          fluency: 88,
          grammar: 90,
          confidence: 95,
          suggestions: [
            `You said: "${text}"`,
            "Try to emphasize the 'th' sound more in words like 'technology'.",
            "Maintain a more consistent pace throughout the sentence.",
            "Good use of vocabulary, but try using more complex sentence structures."
          ]
        });
      }, 1000);
    };

    recognition.start();
  };

  return (
    <div className="p-10 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
          <Mic className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Speaking Practice</h2>
          <p className="text-slate-400 font-medium text-sm">Pronunciation & Fluency Evaluation</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Topic Prompt</p>
        <p className="text-xl font-bold text-slate-800 leading-relaxed italic">
          "{prompts[level]}"
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {!result ? (
          <>
            <div className={`relative ${isRecording ? 'animate-pulse' : ''}`}>
              <div className={`absolute -inset-4 bg-rose-500/20 rounded-full blur-xl transition-all duration-500 ${isRecording ? 'opacity-100 scale-125' : 'opacity-0 scale-50'}`} />
              <button 
                onClick={handleStart}
                disabled={isRecording}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isRecording ? 'bg-rose-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-400 hover:border-rose-500 hover:text-rose-500'
                }`}
              >
                {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
              </button>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900 mb-1">
                {isRecording ? 'Listening...' : 'Click to start speaking'}
              </h3>
              <p className="text-slate-400 text-sm">The system will analyze your speech in real-time</p>
            </div>
          </>
        ) : (
          <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Pronunciation', val: result.pronunciation, icon: <Volume2 className="w-4 h-4" />, color: 'text-rose-500' },
                { label: 'Fluency', val: result.fluency, icon: <Zap className="w-4 h-4" />, color: 'text-blue-500' },
                { label: 'Grammar', val: result.grammar, icon: <PenTool className="w-4 h-4" />, color: 'text-emerald-500' },
                { label: 'Confidence', val: result.confidence, icon: <Target className="w-4 h-4" />, color: 'text-amber-500' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className={`flex items-center gap-2 mb-2 font-black text-[10px] uppercase tracking-wider ${stat.color}`}>
                    {stat.icon} {stat.label}
                  </div>
                  <div className="text-2xl font-black text-slate-900">{stat.val}%</div>
                </div>
              ))}
            </div>

            <div className="bg-white border-2 border-blue-50 rounded-3xl p-6">
              <h4 className="flex items-center gap-2 font-black text-slate-900 mb-4">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                Improvement Suggestions
              </h4>
              <ul className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => setResult(null)}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              Try Again <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ListeningModule({ level, language }: { level: Level, language: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  
  const content = {
    beginner: { text: "Hello, how are you today?", q: "What is the speaker asking?" },
    intermediate: { text: "I'd like to book a table for two at seven o'clock.", q: "What time is the reservation for?" },
    advanced: { text: "The paradigm shift in economic policy has led to unprecedented market volatility.", q: "What is causing the market volatility?" }
  };

  const handlePlay = () => {
    const utterance = new SpeechSynthesisUtterance(content[level].text);
    utterance.lang = language === 'English' ? 'en-US' : 'es-ES';
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-10 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
          <Headphones className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Listening Practice</h2>
          <p className="text-slate-400 font-medium text-sm">Audio Comprehension & Repeat</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-slate-50 w-full max-w-2xl rounded-[32px] p-8 border border-slate-100 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 mb-6 cursor-pointer hover:scale-105 transition-all" onClick={handlePlay}>
            {isPlaying ? <Square className="w-8 h-8 text-white fill-current" /> : <Play className="w-8 h-8 text-white fill-current ml-1" />}
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-2">Listen to the segment</h3>
          <p className="text-slate-500 mb-8 max-w-sm">Pay close attention to pronunciation and context before answering.</p>

          <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mb-8">
            <div className={`h-full bg-blue-600 transition-all duration-[3000ms] ease-linear ${isPlaying ? 'w-full' : 'w-0'}`} />
          </div>

          <div className="w-full text-left space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Comprehension Question</p>
              <p className="text-slate-800 font-bold">{content[level].q}</p>
            </div>

            <div className="space-y-3">
              <input 
                type="text" 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type what you heard or the answer..." 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={() => setShowAnswer(true)}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all"
              >
                Submit Answer
              </button>
            </div>

            {showAnswer && (
              <div className="animate-in zoom-in-95 duration-300 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <p className="text-xs font-black text-emerald-600 uppercase mb-1">Correct Answer</p>
                <p className="text-emerald-900 font-bold">"{content[level].text}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadingModule({ level, language }: { level: Level, language: string }) {
  const [selectedWord, setSelectedWord] = useState<{word: string, meaning: string} | null>(null);

  const passages = {
    beginner: "The sun is shining today. It is a beautiful day for a walk in the park. I love nature.",
    intermediate: "Despite the heavy rain, the marathon continued. Athletes from across the globe competed for the prestigious title, showcasing remarkable resilience.",
    advanced: "The socio-economic ramifications of the industrial revolution were profound, fundamentally altering the fabric of human civilization and giving rise to modern urbanization."
  };

  const words = {
    "prestigious": "Having high status; inspiring respect and admiration.",
    "resilience": "The capacity to recover quickly from difficulties; toughness.",
    "ramifications": "A consequence of an action or event, especially when complex or unwelcome.",
    "profound": "Very great or intense; having or showing great knowledge or insight."
  };

  const renderText = (text: string) => {
    return text.split(' ').map((word, i) => {
      const cleanWord = word.replace(/[,.]/g, '').toLowerCase();
      const hasMeaning = words[cleanWord as keyof typeof words];
      return (
        <span 
          key={i} 
          onClick={() => hasMeaning && setSelectedWord({word: cleanWord, meaning: hasMeaning})}
          className={`inline-block mr-1 cursor-pointer transition-all ${hasMeaning ? 'text-blue-600 border-b-2 border-blue-200 hover:bg-blue-50' : 'text-slate-700'}`}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div className="p-10 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Reading Practice</h2>
          <p className="text-slate-400 font-medium text-sm">Interactive Comprehension</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 flex-1">
        <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Short Passage</p>
          <div className="text-xl font-medium leading-loose text-slate-800">
            {renderText(passages[level])}
          </div>
          <p className="mt-8 text-xs text-slate-400 font-bold italic">* Click on highlighted words for meanings</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border-2 border-emerald-50 rounded-3xl p-6 min-h-[200px]">
            <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              Word Insights
            </h4>
            {selectedWord ? (
              <div className="animate-in fade-in slide-in-from-right-4">
                <p className="text-2xl font-black text-emerald-600 capitalize mb-2">{selectedWord.word}</p>
                <p className="text-slate-600 leading-relaxed">{selectedWord.meaning}</p>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">Select a word from the text to see its definition and usage.</p>
            )}
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6">
            <h4 className="font-black text-slate-900 mb-4">Quiz Question</h4>
            <p className="text-slate-600 mb-6">Based on the text, what is the main theme?</p>
            <div className="space-y-2">
              {['Adventure', 'Nature', 'Hardship', 'Discovery'].map(opt => (
                <button key={opt} className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-sm font-bold text-slate-700">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WritingModule({ level, language }: { level: Level, language: string }) {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const prompts = {
    beginner: "Write 3 sentences about your daily routine.",
    intermediate: "Write a short paragraph explaining why you are learning this language.",
    advanced: "Analyze the pros and cons of remote work in a 200-word essay."
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setFeedback({
        score: 78,
        errors: [
          { type: 'Grammar', text: 'Spelling error in "paragaph"', fix: 'paragraph' },
          { type: 'Style', text: 'Consider using more descriptive adjectives.', fix: 'Improvement' }
        ],
        stats: { words: text.split(' ').filter(x => x).length, readability: 'Good' }
      });
    }, 2000);
  };

  return (
    <div className="p-10 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
          <PenTool className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Writing Practice</h2>
          <p className="text-slate-400 font-medium text-sm">AI Grammar & Vocabulary Check</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-6 mb-6 border border-slate-100">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Assignment</p>
        <p className="text-lg font-bold text-slate-800">{prompts[level]}</p>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="relative flex-1 min-h-[300px]">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full bg-white border border-slate-200 rounded-[32px] p-8 text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all resize-none"
            placeholder="Start writing here..."
          />
          <div className="absolute bottom-6 right-8 flex items-center gap-4">
            <span className="text-xs font-bold text-slate-400">{text.length} characters</span>
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !text}
              className="bg-amber-500 text-white font-black px-6 py-2.5 rounded-xl shadow-lg shadow-amber-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isAnalyzing ? 'Analyzing...' : 'Submit & Analyze'}
            </button>
          </div>
        </div>

        {feedback && (
          <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="md:col-span-2 bg-white border-2 border-amber-50 rounded-3xl p-6">
              <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Corrections & Suggestions
              </h4>
              <div className="space-y-4">
                {feedback.errors.map((err: any, i: number) => (
                  <div key={i} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="bg-amber-100 text-amber-600 text-[10px] font-black px-2 py-1 rounded-lg h-fit uppercase">{err.type}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{err.text}</p>
                      <p className="text-xs text-slate-400 mt-1">Suggestion: <span className="text-emerald-600">{err.fix}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col justify-center items-center text-center">
              <Trophy className="w-10 h-10 text-yellow-400 mb-4" />
              <p className="text-xs font-black uppercase tracking-widest opacity-60">Writing Score</p>
              <div className="text-5xl font-black my-2">{feedback.score}</div>
              <p className="text-sm font-bold text-blue-300">Keep it up!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
