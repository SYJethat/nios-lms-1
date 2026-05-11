'use client';

import { useState, useEffect } from 'react';
import {
  Minimize2,
  Maximize2,
  Type,
  Palette,
  Globe,
  FileText,
  Users,
  Volume2,
  ExternalLink,
  X,
  SkipForward
} from 'lucide-react';

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [contrast, setContrast] = useState<'default' | 'high'>('default');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showRTI, setShowRTI] = useState(false);
  const [showStaff, setShowStaff] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedFont = localStorage.getItem('fontSize') as 'sm' | 'base' | 'lg' | null;
    const savedContrast = localStorage.getItem('contrast') as 'default' | 'high' | null;
    const savedLang = localStorage.getItem('language') as 'en' | 'hi' | null;

    if (savedFont) setFontSize(savedFont);
    if (savedContrast) setContrast(savedContrast);
    if (savedLang) setLanguage(savedLang);

    // Apply CSS vars immediately
    document.documentElement.style.setProperty('--font-size', savedFont || 'base');
    document.documentElement.style.setProperty('--contrast-mode', savedContrast || 'default');
    document.documentElement.lang = savedLang || 'en';
  }, []);

  // Sync state → CSS vars + localStorage
  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', fontSize);
    document.documentElement.style.setProperty('--contrast-mode', contrast);
    document.documentElement.lang = language;
    if (language === 'hi') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('contrast', contrast);
    localStorage.setItem('language', language);
  }, [fontSize, contrast, language]);

  const updateFontSize = (size: 'sm' | 'base' | 'lg') => {
    setFontSize(size);
    document.documentElement.className = `font-${size} ${contrast === 'high' ? 'high-contrast' : ''}`;
  };

  const toggleContrast = () => {
    const newContrast = contrast === 'default' ? 'high' : 'default';
    setContrast(newContrast);
    document.body.classList.toggle('high-contrast', newContrast === 'high');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const skipToMain = () => {
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
    main?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>


      {/* Accessibility Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto  flex items-center justify-between">

          {/* Left: Links */}
          <div className="flex items-center gap-4 text-sm  text-slate-700">
            {/* Skip to Main Content - Hidden until focused */}
            <a
              href="#main"
              className=" text-[12px]  text-slate-500 flex gap-1.5 z-50 transition-all"
              onClick={skipToMain}
            >
              <SkipForward size={16} /> Skip to Main Content
            </a>

            <button
              onClick={() => setShowRTI(true)}
              className="hover:underline text-[12px]  flex items-center gap-1.5 text-slate-500  transition-all"
              aria-label="RTI Disclosure"
            >
              <FileText size={16} />
              RTI Disclosure
            </button>
            <button
              onClick={() => setShowStaff(true)}
              className="hover:underline flex items-center gap-1.5 text-[12px]   text-slate-500 transition-all"
              aria-label="Staff Corner"
            >
              <Users size={16} />
              Staff Corner
            </button>
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-1">
            {/* Text Size */}
            <div className="flex bg-slate-100/60 rounded-lg ">
              <button
                onClick={() => updateFontSize('sm')}
                className={`p-2 rounded-md transition-all ${fontSize === 'sm' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600 hover:bg-white'}`}
                aria-label="Decrease text size"
                aria-pressed={fontSize === 'sm' ? 'true' : 'false'}
              >
                <Minimize2 size={14} />
              </button>
              <button
                onClick={() => updateFontSize('base')}
                className={`px-2 font-semibold transition-all ${fontSize === 'base' ? 'bg-white shadow-sm text-slate-900 border border-blue-200' : 'text-slate-600 hover:bg-white'}`}
                aria-label="Normal text size"
                aria-pressed={fontSize === 'base' ? 'true' : 'false'}
              >
                A
              </button>
              <button
                onClick={() => updateFontSize('lg')}
                className={`p-2 rounded-md transition-all ${fontSize === 'lg' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600 hover:bg-white'}`}
                aria-label="Increase text size"
                aria-pressed={fontSize === 'lg' ? 'true' : 'false'}
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {/* Contrast */}
            <div className="w-px h-8 bg-slate-200 mx-2" />

            <button
              onClick={toggleContrast}
              className={`p-2 rounded-lg transition-all ${contrast === 'high' ? 'bg-black text-white shadow-md' : 'bg-slate-100/60 text-slate-700 hover:bg-slate-200 hover:shadow-sm'}`}
              aria-label={contrast === 'high' ? 'Black on White' : 'Yellow on Black'}
              aria-pressed={contrast === 'high' ? 'true' : 'false'}
            >
              <Palette size={14} />
            </button>

            {/* Language */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-slate-100/60 hover:bg-slate-200 text-slate-700 hover:shadow-sm transition-all"
              aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
            >
              <Globe size={14} />
              <span className="sr-only">
                {language === 'en' ? 'EN' : 'HI'}
              </span>
            </button>

            {/* Screen Reader */}
            <button
              className="p-2 rounded-lg bg-emerald-100/60 hover:bg-emerald-200 text-emerald-700 hover:shadow-sm transition-all ml-1"
              aria-label="Screen Reader Access Guide"
              title="Screen Reader Access Guide"
              onClick={() => window.open('https://www.w3.org/WAI/fundamentals/accessibility-intro/', '_blank')}
            >
              <Volume2 size={14} />
            </button>
          </div>

          {/* Right: This page in... */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span>This page in:</span>
            <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-all">
              English
            </button>
            <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-all">
              Hindi
            </button>
          </div>
        </div>
      </div>

      {/* RTI Modal */}
      {showRTI && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowRTI(false)}>
          <div className="bg-white rounded-2xl max-w-2xl max-h-[90vh] overflow-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <FileText size={28} />
                RTI Disclosure
              </h2>
              <button onClick={() => setShowRTI(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 prose prose-slate max-w-none">
              <p><strong>RTI Disclosures under Section 4(1)(b) of RTI Act 2005:</strong></p>
              <ul>
                <li><strong>Organization:</strong> National Institute of Open Schooling (NIOS)</li>
                <li><strong>Functions:</strong> Open schooling, AI-driven adaptive learning, certification</li>
                <li><strong>Powers:</strong> Academic oversight, digital credential issuance, compliance monitoring</li>
                <li><strong>PIO Contact:</strong> pio@nios.ac.in | +91-XXXXXXXXXX</li>
                <li><a href="/rti-full" className="font-semibold hover:text-blue-900 flex items-center gap-1">
                  Full RTI Manual <ExternalLink size={14} />
                </a></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Staff Corner Modal */}
      {showStaff && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowStaff(false)}>
          <div className="bg-white rounded-2xl max-w-2xl max-h-[90vh] overflow-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <Users size={28} />
                Staff Corner
              </h2>
              <button onClick={() => setShowStaff(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 prose prose-slate max-w-none">
              <p><strong>Faculty Portal & Resources:</strong></p>
              <ul>
                <li><a href="/teacher" className="font-semibold hover:text-blue-900">Dashboard Login</a></li>
                <li><strong>Guidelines:</strong> Content creation, exam proctoring, student support</li>
                <li><strong>Training:</strong> AI tools, accessibility standards, LMS features</li>
                <li><strong>Support:</strong> helpdesk@nios.ac.in | Internal Slack #staff-support</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
