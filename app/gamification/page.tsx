'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Zap,
  Trophy,
  Award,
  Sparkles,
  Gamepad2,
  Volume2,
  RotateCcw,
  CheckCircle2,
  Clock,
  Coins,
  Shield,
  Star,
  Check,
  Play,
  ArrowRight,
  Gift,
  HelpCircle,
  BrainCircuit,
  Lock,
  Unlock,
  Radio,
  Shuffle,
  ChevronRight,
  Heart,
  TrendingUp,
  Globe
} from 'lucide-react';
import { User, getStoredUser, addXpToUser } from '@/lib/lmsStore';
import DashboardLayout from '@/components/DashboardLayout';

// ==========================================
// 1. WORD MATCH SPRINT DATA
// ==========================================
interface MatchCard {
  id: string;
  pairId: string;
  text: string;
  subText?: string;
  type: 'hindi' | 'english';
  matched: boolean;
}

const MATCH_PAIRS_POOL = [
  { id: 'p1', hindi: 'नमस्ते', transliteration: 'Namaste', english: 'Hello / Greetings' },
  { id: 'p2', hindi: 'धन्यवाद', transliteration: 'Dhanyavaad', english: 'Thank You' },
  { id: 'p3', hindi: 'मित्र', transliteration: 'Mitra', english: 'Friend / Ally' },
  { id: 'p4', hindi: 'भारत', transliteration: 'Bhaarat', english: 'India' },
  { id: 'p5', hindi: 'सुप्रभात', transliteration: 'Suprabhaat', english: 'Good Morning' },
  { id: 'p6', hindi: 'विद्यार्थी', transliteration: 'Vidyarthi', english: 'Student / Scholar' },
  { id: 'p7', hindi: 'स्वागत', transliteration: 'Swaagat', english: 'Welcome' },
  { id: 'p8', hindi: 'शांति', transliteration: 'Shaanti', english: 'Peace / Harmony' },
];

// ==========================================
// 2. SOV SENTENCE BUILDER PUZZLE DATA
// ==========================================
interface SentencePuzzle {
  id: string;
  englishTarget: string;
  words: { id: string; text: string; transliteration: string }[];
  correctOrder: string[];
  explanation: string;
  grammarNote: string;
}

const SENTENCE_PUZZLES: SentencePuzzle[] = [
  {
    id: 's1',
    englishTarget: 'I am a student.',
    words: [
      { id: 'w1', text: 'मैं', transliteration: 'Main (I)' },
      { id: 'w2', text: 'एक', transliteration: 'ek (a)' },
      { id: 'w3', text: 'विद्यार्थी', transliteration: 'vidyarthi (student)' },
      { id: 'w4', text: 'हूँ', transliteration: 'hoon (am)' },
    ],
    correctOrder: ['w1', 'w2', 'w3', 'w4'],
    explanation: 'Subject (मैं) + Modifier/Noun (एक विद्यार्थी) + Verb (हूँ).',
    grammarNote: 'Hindi strictly adheres to Subject-Object-Verb (SOV) sentence structure.',
  },
  {
    id: 's2',
    englishTarget: 'We respect Indian culture.',
    words: [
      { id: 'w5', text: 'हम', transliteration: 'Hum (We)' },
      { id: 'w6', text: 'भारतीय', transliteration: 'Bhaarateeya (Indian)' },
      { id: 'w7', text: 'संस्कृति का', transliteration: 'Sanskriti ka (Culture)' },
      { id: 'w8', text: 'सम्मान करते हैं', transliteration: 'Sammaan karte hain (Respect)' },
    ],
    correctOrder: ['w5', 'w6', 'w7', 'w8'],
    explanation: 'Subject (हम) + Object (भारतीय संस्कृति) + Verb phrase (सम्मान करते हैं).',
    grammarNote: 'Postpositions (का/की/के) bind noun phrases together before the verb.',
  },
  {
    id: 's3',
    englishTarget: 'Peace is essential for the world.',
    words: [
      { id: 'w9', text: 'विश्व के लिए', transliteration: 'Vishwa ke liye (For world)' },
      { id: 'w10', text: 'शांति', transliteration: 'Shaanti (Peace)' },
      { id: 'w11', text: 'आवश्यक', transliteration: 'Aavashyak (Essential)' },
      { id: 'w12', text: 'है', transliteration: 'hai (is)' },
    ],
    correctOrder: ['w10', 'w9', 'w11', 'w12'],
    explanation: 'Subject (शांति) + Indirect Clause (विश्व के लिए) + Predicate (आवश्यक) + Verb (है).',
    grammarNote: 'Adjectives like "आवश्यक" precede the copular verb "है".',
  },
];

// ==========================================
// 3. SOUND DRILL QUESTIONS
// ==========================================
const SOUND_DRILLS = [
  {
    id: 'sd1',
    promptAudioText: 'क (Ka) - Velar unaspirated stop',
    soundLabel: 'Sound: /kə/',
    options: ['क', 'ख', 'ग', 'घ'],
    correct: 'क',
    tip: 'Vocal cords do not vibrate, no puff of air (unaspirated).',
  },
  {
    id: 'sd2',
    promptAudioText: 'ट (Ta) - Retroflex stop',
    soundLabel: 'Sound: /ʈə/',
    options: ['त', 'ट', 'थ', 'ठ'],
    correct: 'ट',
    tip: 'Curl the tip of your tongue against the hard palate (roof of mouth).',
  },
  {
    id: 'sd3',
    promptAudioText: 'नमस्ते (Namaste)',
    soundLabel: 'Sound: /nə.məs.teː/',
    options: ['नमस्ते', 'नमस्कार', 'धन्यवाद', 'शुभकामनाएं'],
    correct: 'नमस्ते',
    tip: 'Standard deferential greeting across all Indian cultural registers.',
  },
];

// ==========================================
// 4. QUEST ROADMAP NODES
// ==========================================
const ROADMAP_NODES = [
  { id: 'n1', title: 'Devanagari Script & Vowels', level: 'A1.1', stars: 3, unlocked: true, current: false, xp: 120 },
  { id: 'n2', title: 'Essential Greetings & Introductions', level: 'A1.2', stars: 3, unlocked: true, current: false, xp: 150 },
  { id: 'n3', title: 'Numbers, Time & Daily Routine', level: 'A1.3', stars: 2, unlocked: true, current: true, xp: 180 },
  { id: 'n4', title: 'SOV Sentence Construction & Verbs', level: 'A2.1', stars: 0, unlocked: false, current: false, xp: 220 },
  { id: 'n5', title: 'Bilateral Diplomatic Etiquette & Soft Power', level: 'B1.1', stars: 0, unlocked: false, current: false, xp: 300 },
  { id: 'n6', title: 'Official Communiqué & Policy Translation', level: 'B2.1', stars: 0, unlocked: false, current: false, xp: 450 },
];

export default function StudentGamificationPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeGameTab, setActiveGameTab] = useState<'MATCH' | 'SENTENCE' | 'SOUND' | 'ROADMAP' | 'STORE'>('MATCH');

  // Gamification User Stats
  const [userXp, setUserXp] = useState(2840);
  const [userCoins, setUserCoins] = useState(640);
  const [streakDays, setStreakDays] = useState(14);
  const [streakFreezeCount, setStreakFreezeCount] = useState(2);
  const [doubleXpActive, setDoubleXpActive] = useState(false);

  // Mystery Chest state
  const [chestOpened, setChestOpened] = useState(false);
  const [chestReward, setChestReward] = useState<string | null>(null);

  // 1. MATCH GAME STATE
  const [matchCards, setMatchCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [matchScore, setMatchScore] = useState(0);
  const [matchCombo, setMatchCombo] = useState(1);
  const [matchTimer, setMatchTimer] = useState(60);
  const [matchGameActive, setMatchGameActive] = useState(false);
  const [matchGameOver, setMatchGameOver] = useState(false);

  // 2. SENTENCE BUILDER STATE
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [assembledWords, setAssembledWords] = useState<{ id: string; text: string; transliteration: string }[]>([]);
  const [sentenceStatus, setSentenceStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // 3. SOUND DRILL STATE
  const [soundIndex, setSoundIndex] = useState(0);
  const [selectedSoundOption, setSelectedSoundOption] = useState<string | null>(null);
  const [soundResult, setSoundResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  useEffect(() => {
    const cur = getStoredUser();
    setUser(cur);
    setUserXp(cur.xp || 2840);
    setUserCoins(cur.coins || 640);
    setStreakDays(cur.streak || 14);
  }, []);

  const triggerCelebration = () => {
    if (typeof window !== 'undefined' && (window as any).confetti) {
      try {
        (window as any).confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ==========================================
  // WORD MATCH GAME LOGIC
  // ==========================================
  const startMatchGame = () => {
    // Pick 6 pairs
    const pool = [...MATCH_PAIRS_POOL].sort(() => Math.random() - 0.5).slice(0, 6);
    const cards: MatchCard[] = [];

    pool.forEach((p) => {
      cards.push({
        id: `h_${p.id}`,
        pairId: p.id,
        text: p.hindi,
        subText: p.transliteration,
        type: 'hindi',
        matched: false,
      });
      cards.push({
        id: `e_${p.id}`,
        pairId: p.id,
        text: p.english,
        type: 'english',
        matched: false,
      });
    });

    setMatchCards(cards.sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setMatchScore(0);
    setMatchCombo(1);
    setMatchTimer(60);
    setMatchGameActive(true);
    setMatchGameOver(false);
  };

  useEffect(() => {
    let interval: any = null;
    if (matchGameActive && matchTimer > 0) {
      interval = setInterval(() => {
        setMatchTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setMatchGameActive(false);
            setMatchGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [matchGameActive, matchTimer]);

  const handleCardClick = (card: MatchCard) => {
    if (!matchGameActive || card.matched) return;
    if (selectedCards.length === 1 && selectedCards[0].id === card.id) return;

    if (card.type === 'hindi') {
      speakText(card.text);
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (first.pairId === second.pairId && first.type !== second.type) {
        // MATCH!
        setTimeout(() => {
          setMatchCards((prev) =>
            prev.map((c) => (c.pairId === first.pairId ? { ...c, matched: true } : c))
          );
          setSelectedCards([]);
          const earned = 20 * matchCombo;
          setMatchScore((prev) => prev + earned);
          setMatchCombo((prev) => Math.min(prev + 1, 5));
          addXpToUser(earned);
          setUserXp((prev) => prev + earned);

          // Check if all matched
          setMatchCards((current) => {
            const allDone = current.every((c) => c.pairId === first.pairId || c.matched);
            if (allDone) {
              setMatchGameActive(false);
              setMatchGameOver(true);
              triggerCelebration();
            }
            return current;
          });
        }, 300);
      } else {
        // MISMATCH
        setTimeout(() => {
          setSelectedCards([]);
          setMatchCombo(1);
        }, 700);
      }
    }
  };

  // ==========================================
  // SENTENCE BUILDER LOGIC
  // ==========================================
  const currentSentence = SENTENCE_PUZZLES[sentenceIndex];

  const handleAddWordToSentence = (word: { id: string; text: string; transliteration: string }) => {
    if (sentenceStatus === 'correct') return;
    setSentenceStatus('idle');
    speakText(word.text);
    setAssembledWords((prev) => [...prev, word]);
  };

  const handleRemoveWordFromSentence = (index: number) => {
    if (sentenceStatus === 'correct') return;
    setSentenceStatus('idle');
    setAssembledWords((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCheckSentence = () => {
    const assembledIds = assembledWords.map((w) => w.id);
    const isCorrect =
      assembledIds.length === currentSentence.correctOrder.length &&
      assembledIds.every((id, idx) => id === currentSentence.correctOrder[idx]);

    if (isCorrect) {
      setSentenceStatus('correct');
      const earnedXp = doubleXpActive ? 60 : 30;
      addXpToUser(earnedXp);
      setUserXp((prev) => prev + earnedXp);
      triggerCelebration();
      speakText(assembledWords.map((w) => w.text).join(' '));
    } else {
      setSentenceStatus('wrong');
    }
  };

  const handleNextSentence = () => {
    setAssembledWords([]);
    setSentenceStatus('idle');
    setSentenceIndex((prev) => (prev + 1) % SENTENCE_PUZZLES.length);
  };

  // ==========================================
  // SOUND DRILL LOGIC
  // ==========================================
  const currentSound = SOUND_DRILLS[soundIndex];

  const handleSelectSoundOption = (opt: string) => {
    setSelectedSoundOption(opt);
    if (opt === currentSound.correct) {
      setSoundResult('correct');
      addXpToUser(25);
      setUserXp((prev) => prev + 25);
      triggerCelebration();
      speakText(opt);
    } else {
      setSoundResult('wrong');
      speakText(opt);
    }
  };

  const handleNextSound = () => {
    setSelectedSoundOption(null);
    setSoundResult('idle');
    setSoundIndex((prev) => (prev + 1) % SOUND_DRILLS.length);
  };

  // ==========================================
  // MYSTERY CHEST LOGIC
  // ==========================================
  const handleOpenChest = () => {
    if (chestOpened) return;
    setChestOpened(true);
    const rewards = ['🎁 +100 XP Bonus', '🪙 +50 Gold Coins', '🛡️ +1 Streak Freeze Shield'];
    const chosen = rewards[Math.floor(Math.random() * rewards.length)];
    setChestReward(chosen);
    addXpToUser(100);
    setUserXp((prev) => prev + 100);
    setUserCoins((prev) => prev + 50);
    triggerCelebration();
  };

  // ==========================================
  // STORE POWER-UP PURCHASE
  // ==========================================
  const handleBuyItem = (name: string, cost: number) => {
    if (userCoins < cost) {
      alert(`Insufficient coins! You need ${cost} coins.`);
      return;
    }
    setUserCoins((prev) => prev - cost);
    if (name === 'Streak Freeze') {
      setStreakFreezeCount((prev) => prev + 1);
    } else if (name === '2x XP Booster') {
      setDoubleXpActive(true);
    }
    triggerCelebration();
    alert(`🎉 Successfully activated ${name}!`);
  };

  return (
    <DashboardLayout
      title="Gamified Language Arena"
      subtitle="Interactive language games, vocabulary speed sprints, SOV puzzles & sound drills"
    >
      <div className="space-y-6 max-w-8xl mx-auto pb-16 animate-in fade-in duration-200 text-left">
        {/* 1. HERO SOVEREIGN GAMIFICATION BANNER (LIGHT THEME) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-amber-50/50 text-slate-900 border border-blue-200/80 shadow-xs relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-blue-200 shadow-2xs">
                  <Gamepad2 className="w-3.5 h-3.5 text-blue-700" /> NIOS GAMIFIED KNOWLEDGE ARENA
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase border border-amber-200 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-600" /> {streakDays}-Day Fire Streak
                </span>
                {doubleXpActive && (
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase animate-bounce shadow-2xs">
                    ⚡ 2X XP BOOSTER ACTIVE
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Learn Bhashas &amp; Subjects by Playing
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Master Hindi and 22 Indian scheduled languages through speed vocabulary sprints, sentence construction puzzles, acoustic pronunciation drills, and unlock NIOS knowledge badges.
              </p>
            </div>

            {/* Gamified Stat Badges (Light Theme) */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 pr-3 border-r border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-black flex items-center justify-center text-sm shadow-2xs border border-amber-200">
                  ⚡
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                    Total XP
                  </span>
                  <span className="text-base font-black text-slate-900">{userXp} XP</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pr-3 border-r border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-2xs">
                  🪙
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                    Coins
                  </span>
                  <span className="text-base font-black text-slate-900">{userCoins}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm shadow-2xs border border-emerald-200">
                  🛡️
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                    Shields
                  </span>
                  <span className="text-base font-black text-slate-900">{streakFreezeCount} Freezes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Game Mode Navigation Tabs (Light Theme) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none relative z-10 border-t border-slate-200 pt-4">
            {[
              { id: 'MATCH', label: '⚡ Word Match Sprint', icon: Zap },
              { id: 'SENTENCE', label: '🧩 SOV Sentence Builder', icon: BrainCircuit },
              { id: 'SOUND', label: '🎙️ Phonetic Sound Drill', icon: Volume2 },
              { id: 'ROADMAP', label: '🗺️ CEFR Quest Tree', icon: Globe },
              { id: 'STORE', label: '🛒 Power-Ups & Vault', icon: Gift },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveGameTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${activeGameTab === tab.id
                    ? 'bg-blue-900 text-white shadow-xs font-black'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. TAB 1: WORD MATCH SPRINT GAME */}
        {activeGameTab === 'MATCH' && (
          <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase">
                    Vocabulary Speed Duel
                  </span>
                  <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#FF9933]" /> Combo {matchCombo}x
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1B2A4A] mt-1">
                  Rapid Word Match Sprint
                </h2>
                <p className="text-xs text-[#555555]">
                  Match Hindi script terms with their English meanings before the timer runs out.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F8FAFC] border border-[#DCE2E6]">
                  <Clock className="w-4 h-4 text-[#0B3D91]" />
                  <span className="text-sm font-black text-[#1B2A4A]">{matchTimer}s</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-black text-amber-900">{matchScore} Pts</span>
                </div>
                {!matchGameActive && (
                  <button
                    onClick={startMatchGame}
                    className="px-5 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <Play className="w-4 h-4 text-[#FF9933]" /> {matchGameOver ? 'Play Again' : 'Start Match'}
                  </button>
                )}
              </div>
            </div>

            {!matchGameActive && !matchGameOver && (
              <div className="p-12 text-center bg-[#F8FAFC] rounded-2xl border-2 border-dashed border-[#DCE2E6] space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-[#0B3D91] flex items-center justify-center mx-auto shadow-inner">
                  <Zap className="w-8 h-8 text-[#FF9933]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-[#1B2A4A]">Ready for the Word Sprint?</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Test your Devanagari reading speed and vocabulary recall. Earn up to +120 XP in 60 seconds!
                  </p>
                </div>
                <button
                  onClick={startMatchGame}
                  className="px-8 py-3 rounded-xl bg-[#FF9933] hover:bg-[#E68A00] text-[#051C45] font-black text-sm uppercase tracking-wider shadow-md transition inline-flex items-center gap-2"
                >
                  <Play className="w-4 h-4 text-[#051C45]" /> Launch Word Sprint →
                </button>
              </div>
            )}

            {matchGameActive && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                {matchCards.map((card) => {
                  const isSelected = selectedCards.some((c) => c.id === card.id);
                  let cardStyle =
                    'bg-white border-[#DCE2E6] text-[#1B2A4A] hover:border-[#0B3D91] hover:shadow-md';

                  if (card.matched) {
                    cardStyle =
                      'bg-emerald-50 border-emerald-300 text-emerald-900 opacity-60 pointer-events-none scale-98';
                  } else if (isSelected) {
                    cardStyle =
                      'bg-indigo-50 border-indigo-500 text-indigo-950 font-black scale-102 shadow-md ring-2 ring-indigo-300';
                  }

                  return (
                    <button
                      key={card.id}
                      disabled={card.matched}
                      onClick={() => handleCardClick(card)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-150 flex flex-col items-center justify-center text-center min-h-[95px] relative ${cardStyle}`}
                    >
                      <span className="text-sm sm:text-base font-black block">{card.text}</span>
                      {card.subText && (
                        <span className="text-[11px] font-bold text-[#0B3D91] mt-0.5">
                          {card.subText}
                        </span>
                      )}
                      {card.matched && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute top-2 right-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {matchGameOver && (
              <div className="p-8 text-center bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl border border-indigo-200 space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Trophy className="w-8 h-8 text-amber-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#1B2A4A]">Sprint Finished!</h3>
                  <p className="text-xs text-slate-600">
                    You earned <strong className="text-amber-600 font-bold">{matchScore} Points</strong> (+{matchScore} XP) and strengthened your vocabulary mastery!
                  </p>
                </div>
                <button
                  onClick={startMatchGame}
                  className="px-6 py-2.5 rounded-xl bg-[#0B3D91] text-white font-extrabold text-xs shadow-md transition inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-[#FF9933]" /> Play Another Round
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. TAB 2: SOV SENTENCE BUILDER PUZZLE */}
        {activeGameTab === 'SENTENCE' && (
          <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-extrabold text-[10px] uppercase">
                  Grammar & Syntax Puzzle
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#1B2A4A] mt-1">
                  SOV Sentence Constructor
                </h2>
                <p className="text-xs text-[#555555]">
                  Click or tap words in order to form the target English sentence in proper Hindi Subject-Object-Verb sequence.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Puzzle {sentenceIndex + 1} of {SENTENCE_PUZZLES.length}
                </span>
              </div>
            </div>

            {/* Target English Sentence Card */}
            <div className="p-5 rounded-2xl bg-[#0B3D91]/5 border border-[#0B3D91]/20 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Translate into Hindi:
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#0B3D91]">
                  &quot;{currentSentence.englishTarget}&quot;
                </h3>
              </div>
              <button
                onClick={() => speakText(currentSentence.words.map((w) => w.text).join(' '))}
                title="Listen to words"
                className="p-3 rounded-xl bg-white border border-[#DCE2E6] hover:bg-[#EEF3F8] text-[#0B3D91] transition shadow-2xs shrink-0"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Sentence Assembly Strip */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#1B2A4A] flex items-center justify-between">
                <span>Your Assembled Sentence (Click to remove word):</span>
                {assembledWords.length > 0 && (
                  <button
                    onClick={() => setAssembledWords([])}
                    className="text-[11px] font-bold text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </span>

              <div className="min-h-[70px] p-4 rounded-2xl bg-[#F8FAFC] border-2 border-dashed border-[#DCE2E6] flex flex-wrap items-center gap-2.5">
                {assembledWords.length === 0 && (
                  <span className="text-xs text-slate-400 font-medium italic">
                    Click available words below to construct the sentence in SOV order...
                  </span>
                )}
                {assembledWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveWordFromSentence(idx)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#0B3D91] text-[#0B3D91] font-black text-sm shadow-xs flex items-center gap-1.5 hover:bg-red-50 hover:border-red-400 hover:text-red-700 transition group"
                  >
                    <span>{word.text}</span>
                    <span className="text-[10px] font-semibold text-slate-400 group-hover:text-red-500">
                      ({word.transliteration})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Word Bank */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                Available Word Bank:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {currentSentence.words.map((word) => {
                  const isUsed = assembledWords.some((w) => w.id === word.id);
                  return (
                    <button
                      key={word.id}
                      disabled={isUsed}
                      onClick={() => handleAddWordToSentence(word)}
                      className={`px-4 py-2.5 rounded-xl border-2 font-black text-sm transition flex flex-col items-center ${isUsed
                          ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-40 cursor-not-allowed'
                          : 'bg-white border-[#DCE2E6] text-[#1B2A4A] hover:border-[#0B3D91] hover:bg-[#EEF3F8] shadow-xs'
                        }`}
                    >
                      <span>{word.text}</span>
                      <span className="text-[10px] font-medium text-slate-500">{word.transliteration}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback & Actions */}
            <div className="pt-4 border-t border-[#DCE2E6] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                {sentenceStatus === 'correct' && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-black">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Correct! +30 XP Awarded</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 font-medium">
                      {currentSentence.explanation} • {currentSentence.grammarNote}
                    </p>
                  </div>
                )}
                {sentenceStatus === 'wrong' && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-bold animate-in fade-in">
                    ❌ Incorrect word order! Remember Hindi puts the verb (क्रिया) at the very end.
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {sentenceStatus !== 'correct' ? (
                  <button
                    onClick={handleCheckSentence}
                    disabled={assembledWords.length === 0}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition"
                  >
                    Verify Sentence (SOV Check)
                  </button>
                ) : (
                  <button
                    onClick={handleNextSentence}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <span>Next Puzzle</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. TAB 3: PHONETIC SOUND DRILL */}
        {activeGameTab === 'SOUND' && (
          <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-[10px] uppercase">
                  Acoustic Ear Training
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#1B2A4A] mt-1">
                  Phonetic Pronunciation Drill
                </h2>
                <p className="text-xs text-[#555555]">
                  Listen to the native phonetic sound and select the corresponding Devanagari character or word.
                </p>
              </div>

              <span className="text-xs font-bold text-slate-400">
                Drill {soundIndex + 1} of {SOUND_DRILLS.length}
              </span>
            </div>

            {/* Sound Audio Trigger Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0B3D91] to-[#051C45] text-white text-center space-y-3">
              <button
                onClick={() => speakText(currentSound.correct)}
                className="w-20 h-20 rounded-full bg-[#FF9933] hover:bg-[#E68A00] text-[#051C45] flex items-center justify-center mx-auto shadow-xl transition transform hover:scale-105"
              >
                <Volume2 className="w-9 h-9" />
              </button>
              <div>
                <span className="text-xs font-extrabold text-blue-200 block uppercase tracking-wider">
                  Click to Listen
                </span>
                <h4 className="text-lg font-black text-amber-300">{currentSound.soundLabel}</h4>
              </div>
            </div>

            {/* Sound Options Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {currentSound.options.map((opt) => {
                const isSelected = selectedSoundOption === opt;
                const isCorrect = opt === currentSound.correct;
                let style =
                  'bg-white border-[#DCE2E6] text-[#1B2A4A] hover:border-[#0B3D91] hover:bg-[#EEF3F8]';

                if (selectedSoundOption) {
                  if (isCorrect) style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                  else if (isSelected) style = 'bg-red-100 border-red-500 text-red-950 font-black';
                }

                return (
                  <button
                    key={opt}
                    disabled={!!selectedSoundOption}
                    onClick={() => handleSelectSoundOption(opt)}
                    className={`p-6 rounded-2xl border-2 text-2xl font-black transition text-center shadow-xs ${style}`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Sound Feedback */}
            {selectedSoundOption && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 animate-in fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-black text-[#1B2A4A] block">
                    {soundResult === 'correct' ? '🎉 Brilliant Acoustic Recall! (+25 XP)' : '💡 Tip for this phoneme:'}
                  </span>
                  <p className="text-xs text-slate-600 font-medium">{currentSound.tip}</p>
                </div>

                <button
                  onClick={handleNextSound}
                  className="px-5 py-2.5 rounded-xl bg-[#0B3D91] text-white font-extrabold text-xs shadow-md transition shrink-0"
                >
                  Next Sound Drill →
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. TAB 4: CEFR QUEST ROADMAP */}
        {activeGameTab === 'ROADMAP' && (
          <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-extrabold text-[10px] uppercase">
                  CEFR Learning Pathway
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#1B2A4A] mt-1">
                  Sovereign Language Quest Map
                </h2>
                <p className="text-xs text-[#555555]">
                  Progress through levels from A1 beginner basics to B2 diplomatic communiqués.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Level A1.3 Active
                </span>
              </div>
            </div>

            {/* Visual Roadmap Nodes */}
            <div className="relative py-8 px-4 max-w-2xl mx-auto space-y-6">
              <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-slate-200 -translate-x-1/2 -z-0" />

              {ROADMAP_NODES.map((node, idx) => (
                <div
                  key={node.id}
                  className={`relative z-10 flex items-center gap-4 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'
                    }`}
                >
                  {/* Node Card */}
                  <div
                    className={`w-1/2 p-4 rounded-2xl border transition shadow-xs ${node.current
                        ? 'bg-[#0B3D91] text-white border-[#082C6C] shadow-lg ring-4 ring-[#FF9933]/30 scale-102'
                        : node.unlocked
                          ? 'bg-white border-[#DCE2E6] text-[#1B2A4A]'
                          : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      }`}
                  >
                    <div
                      className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${node.current ? 'text-amber-300' : 'text-[#0B3D91]'
                        }`}
                    >
                      <span>{node.level}</span>
                      <span>•</span>
                      <span>+{node.xp} XP</span>
                    </div>
                    <h4 className="text-sm font-black mt-1 leading-snug">{node.title}</h4>

                    {/* Stars */}
                    <div className={`flex items-center gap-1 mt-2 ${idx % 2 !== 0 ? 'justify-end' : ''}`}>
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= node.stars
                              ? 'text-amber-400 fill-amber-400'
                              : node.current
                                ? 'text-blue-300'
                                : 'text-slate-300'
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Center Node Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-md border-2 ${node.current
                        ? 'bg-[#FF9933] border-white text-[#051C45] animate-bounce'
                        : node.unlocked
                          ? 'bg-emerald-600 border-white text-white'
                          : 'bg-slate-200 border-slate-300 text-slate-500'
                      }`}
                  >
                    {node.unlocked ? <Check className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                  </div>

                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. TAB 5: POWER-UPS & REWARDS VAULT */}
        {activeGameTab === 'STORE' && (
          <div className="space-y-6">
            {/* Mystery Chest Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 border border-amber-400 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-left">
                <span className="px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                  Daily Sovereign Mystery Chest
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                  Unlock Today&apos;s Loot Box!
                </h2>
                <p className="text-xs text-slate-900 font-bold max-w-md">
                  Open once every 24 hours to win free XP, coins, or streak protection shields.
                </p>
              </div>

              <div className="shrink-0 text-center">
                {!chestOpened ? (
                  <button
                    onClick={handleOpenChest}
                    className="px-8 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-sm uppercase tracking-wider shadow-xl transition flex items-center gap-2 transform hover:scale-105"
                  >
                    <Gift className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span>Open Mystery Chest</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-white text-slate-950 shadow-md font-black text-sm animate-in zoom-in-95">
                    🎉 {chestReward}
                  </div>
                )}
              </div>
            </div>

            {/* Coin Power-Ups Store */}
            <div className="bg-white rounded-3xl border border-[#DCE2E6] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                <div>
                  <h3 className="text-lg font-black text-[#1B2A4A]">Power-Ups Vault</h3>
                  <p className="text-xs text-[#555555]">
                    Use your earned coins to boost learning performance and protect streaks.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-black text-xs">
                  <Coins className="w-4 h-4 text-amber-600" />
                  <span>Your Balance: {userCoins} Coins</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    name: 'Streak Freeze',
                    icon: Shield,
                    desc: 'Protects your streak for 1 day if you miss practice.',
                    cost: 200,
                    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  },
                  {
                    name: '2x XP Booster',
                    icon: Zap,
                    desc: 'Doubles all XP earned in drills and puzzles for 1 hour.',
                    cost: 150,
                    accent: 'bg-amber-50 text-amber-700 border-amber-200',
                  },
                  {
                    name: 'AI Hint Pass',
                    icon: BrainCircuit,
                    desc: 'Provides 10 free AI grammar hints in SOV builder.',
                    cost: 100,
                    accent: 'bg-blue-50 text-blue-700 border-blue-200',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-[#DCE2E6] bg-[#F8FAFC] flex flex-col justify-between space-y-4 hover:border-[#0B3D91] transition"
                  >
                    <div className="space-y-2">
                      <div className={`w-10 h-10 rounded-xl ${item.accent} flex items-center justify-center border font-bold`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-black text-sm text-[#1B2A4A]">{item.name}</h4>
                      <p className="text-xs text-[#555555] leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <span className="text-xs font-black text-amber-700 flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5" /> {item.cost} Coins
                      </span>
                      <button
                        onClick={() => handleBuyItem(item.name, item.cost)}
                        className="px-4 py-1.5 rounded-xl bg-[#0B3D91] hover:bg-[#082C6C] text-white font-extrabold text-xs shadow-xs transition"
                      >
                        Purchase
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
