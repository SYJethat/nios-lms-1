'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

export interface LanguageOption {
  code: string;
  name: string;
  native: string;
  flag: string;
}

export const POPULAR_LANGUAGES: LanguageOption[] = [
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'bn', name: 'Bangla', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'bh', name: 'Bhojpuri', native: 'भोजपुरी', flag: '🇮🇳' },
  { code: 'brx', name: 'Bodo', native: "बर'/बड़ो", flag: '🇮🇳' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ks', name: 'Kashmiri', native: 'کٲشُر', flag: '🇮🇳' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी', flag: '🇮🇳' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'mni', name: 'Manipuri', native: 'মণিপুরী', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', flag: '🇮🇳' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇮🇳' },
];

interface LanguageSelectorDropdownProps {
  selectedCode: string;
  onSelect: (code: string) => void;
  className?: string;
  width?: string;
}

export default function LanguageSelectorDropdown({
  selectedCode,
  onSelect,
  className = '',
  width = 'w-full sm:w-80'
}: LanguageSelectorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedLang =
    POPULAR_LANGUAGES.find((l) => l.code === selectedCode) ||
    POPULAR_LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredLanguages = POPULAR_LANGUAGES.filter((lang) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.native.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button matching Image 1 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${width} flex items-center justify-between px-4 py-3 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:border-slate-300 transition-all text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg shrink-0 leading-none">{selectedLang.flag}</span>
          <span className="font-bold text-slate-800 text-sm truncate">
            {selectedLang.name}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp size={18} className="text-slate-400 shrink-0 ml-2" />
        ) : (
          <ChevronDown size={18} className="text-slate-400 shrink-0 ml-2" />
        )}
      </button>

      {/* Dropdown Menu matching Image 1 */}
      {isOpen && (
        <div
          className={`absolute left-0 top-full mt-2 ${width} bg-white rounded-2xl border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Search Input with bright orange border matching Image 1 */}
          <div className="relative mb-2">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search languages..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-orange-500 focus:border-orange-600 focus:ring-2 focus:ring-orange-500/20 outline-none placeholder:text-slate-400 text-slate-800 font-medium transition-all"
            />
          </div>

          {/* Scrollable list with subtle dividers matching Image 1 */}
          <div className="max-h-64 overflow-y-auto space-y-0.5 divide-y divide-slate-100 pr-1 select-none">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = selectedCode === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onSelect(lang.code);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                      isSelected
                        ? 'bg-orange-50/70 text-orange-600'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base shrink-0 leading-none">
                        {lang.flag}
                      </span>
                      <span
                        className={`text-sm font-bold truncate ${
                          isSelected ? 'text-orange-600' : 'text-slate-800'
                        }`}
                      >
                        {lang.name}
                      </span>
                      <span
                        className={`text-xs truncate ${
                          isSelected ? 'text-orange-400' : 'text-slate-400'
                        } font-normal`}
                      >
                        ({lang.native})
                      </span>
                    </div>

                    {isSelected && (
                      <Check
                        size={16}
                        className="text-orange-500 shrink-0 ml-2 stroke-[2.5]"
                      />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-slate-400 font-medium">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

