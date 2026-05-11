'use client';
import { useState, useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { Video, Image as ImageIcon, Sparkles } from 'lucide-react';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: '/video.mp4',
    poster:
      'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
    background:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
    title: 'National Open Schooling System ',
    date: 'Learning Management System',
    scrollToExpand: 'Explore National Platform',
    about: {
      overview:
        'Deploy high-performance GPU clusters and sovereign data foundations fully compliant with NEP 2020 guidelines. Our infrastructure handles millions of learners with zero downtime, ensuring a secure and autonomous digital future for India.',
      conclusion:
        'The national foundation for intelligence — built to empower 1.4 billion people with personalized AI.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1280&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop',
    title: 'The Learning Factory',
    date: 'Adaptive AI Excellence',
    scrollToExpand: 'Discover Adaptive Learning',
    about: {
      overview:
        "From adaptive proctoring to real-time evaluation, we've built a world-class AI learning ecosystem. Map student progress through deep knowledge graphs and outcome-based objectives at an unprecedented scale.",
      conclusion:
        'Democratizing world-class intelligence through sovereign technology and intelligent networking.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];
  return (
    <div className='max-w-4xl  mx-auto'>
      <div className='flex items-center gap-3 mb-6'>
        <Sparkles className='w-8 h-8 text-orange-500 animate-[pulse_3s_infinite]' />
        <h2 className='text-4xl font-black tracking-tighter text-white uppercase'>
          {mediaType === 'video' ? 'National Infrastructure' : 'AI Learning Factory'}
        </h2>
      </div>
      <p className='text-xl mb-10 text-white/80 leading-relaxed font-medium'>
        {currentMedia.about.overview}
      </p>
      <div className='p-10 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-3xl shadow-[0_0_50px_rgba(249,115,22,0.05)]'>
        <p className='text-2xl text-orange-400 leading-tight font-black tracking-tighter italic'>
          "{currentMedia.about.conclusion}"
        </p>
      </div>
    </div>
  );
};

export default function Hero() {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className='min-h-screen bg-white transition-colors duration-1000'>
      <div className='fixed top-32 right-8 z-50 flex gap-4 p-3 bg-black/40 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
       
      </div>

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        {/* <MediaContent mediaType={mediaType}  /> */}
      </ScrollExpandMedia>
    </div>
  );
}
