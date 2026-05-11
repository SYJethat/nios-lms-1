'use client';

import { useMemo, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  BookOpen,
  Layers,
  Plus,
  Trash2,
  Upload,
  Save,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

type LessonType = 'video' | 'pdf' | 'quiz' | 'flipbook' | 'live';

type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  durationMins: number;
  mediaUrl?: string; // video/pdfs links
};

type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

type CourseDraft = {
  title: string;
  subject: string;
  description: string;
  level: string;
  language: string;
  learningObjectives: string[];
  modules: Module[];
};

const uid = () => Math.random().toString(16).slice(2) + '-' + Date.now().toString(16);

const DEFAULT_DRAFT: CourseDraft = {
  title: '',
  subject: '',
  description: '',
  level: 'Beginner',
  language: 'English',
  learningObjectives: [''],
  modules: [
    {
      id: uid(),
      title: 'Module 1',
      description: '',
      lessons: [
        {
          id: uid(),
          title: 'Lesson 1',
          type: 'video',
          durationMins: 15,
          mediaUrl: '',
        },
      ],
    },
  ],
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function CourseCreatePage() {
  const [draft, setDraft] = useState<CourseDraft>(DEFAULT_DRAFT);
  const [activeModuleId, setActiveModuleId] = useState<string>(draft.modules[0]?.id ?? '');
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const activeModule = useMemo(() => {
    return draft.modules.find((m) => m.id === activeModuleId) ?? draft.modules[0];
  }, [draft.modules, activeModuleId]);

  const courseProgress = useMemo(() => {
    const objectiveFilled = draft.learningObjectives.filter((o) => o.trim().length > 0).length;
    const objectiveTotal = Math.max(1, draft.learningObjectives.length);

    const moduleTotal = Math.max(1, draft.modules.length);
    const modulesWithLessons = draft.modules.filter((m) => m.lessons.length > 0).length;

    const lessonTotal = draft.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const lessonsValid = draft.modules.reduce((acc, m) => {
      const valid = m.lessons.filter((l) => l.title.trim().length > 0 && l.durationMins > 0).length;
      return acc + valid;
    }, 0);

    const score =
      (objectiveFilled / objectiveTotal) * 30 +
      (modulesWithLessons / moduleTotal) * 30 +
      (lessonTotal > 0 ? lessonsValid / lessonTotal : 0) * 40;

    return clamp(Math.round(score), 0, 100);
  }, [draft]);

  const validation = useMemo(() => {
    const errors: string[] = [];

    if (!draft.title.trim()) errors.push('Course title is required');
    if (!draft.subject.trim()) errors.push('Subject is required');
    if (!draft.description.trim()) errors.push('Course description is required');

    const objectives = draft.learningObjectives.map((o) => o.trim()).filter(Boolean);
    if (objectives.length === 0) errors.push('Add at least one learning objective');

    if (draft.modules.length === 0) errors.push('Add at least one module');

    const hasInvalidModule = draft.modules.some((m) => !m.title.trim());
    if (hasInvalidModule) errors.push('All modules must have a title');

    const hasInvalidLesson = draft.modules.some((m) =>
      m.lessons.some((l) => !l.title.trim() || l.durationMins <= 0)
    );
    if (hasInvalidLesson) errors.push('All lessons must have a title and a valid duration');

    return {
      ok: errors.length === 0,
      errors,
      objectivesCount: objectives.length,
    };
  }, [draft]);

  const setField = <K extends keyof CourseDraft>(key: K, value: CourseDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSavedMessage(null);
  };

  const updateObjective = (idx: number, value: string) => {
    setDraft((d) => {
      const next = [...d.learningObjectives];
      next[idx] = value;
      return { ...d, learningObjectives: next };
    });
    setSavedMessage(null);
  };

  const addObjective = () => {
    setDraft((d) => ({ ...d, learningObjectives: [...d.learningObjectives, ''] }));
    setSavedMessage(null);
  };

  const removeObjective = (idx: number) => {
    setDraft((d) => {
      const next = d.learningObjectives.filter((_, i) => i !== idx);
      return { ...d, learningObjectives: next.length ? next : [''] };
    });
    setSavedMessage(null);
  };

  const addModule = () => {
    const newModule: Module = {
      id: uid(),
      title: `Module ${draft.modules.length + 1}`,
      description: '',
      lessons: [
        {
          id: uid(),
          title: 'Lesson 1',
          type: 'video',
          durationMins: 15,
          mediaUrl: '',
        },
      ],
    };

    setDraft((d) => ({ ...d, modules: [...d.modules, newModule] }));
    setActiveModuleId(newModule.id);
    setSavedMessage(null);
  };

  const removeModule = (moduleId: string) => {
    setDraft((d) => {
      const next = d.modules.filter((m) => m.id !== moduleId);
      const safeNext = next.length ? next : [DEFAULT_DRAFT.modules[0]];
      return { ...d, modules: safeNext };
    });
    setActiveModuleId((prev) => {
      const remaining = draft.modules.filter((m) => m.id !== moduleId);
      return remaining[0]?.id ?? prev;
    });
    setSavedMessage(null);
  };

  const updateModule = (moduleId: string, patch: Partial<Module>) => {
    setDraft((d) => ({
      ...d,
      modules: d.modules.map((m) => (m.id === moduleId ? { ...m, ...patch } : m)),
    }));
    setSavedMessage(null);
  };

  const addLesson = (moduleId: string) => {
    setDraft((d) => {
      const modules = d.modules.map((m) => {
        if (m.id !== moduleId) return m;
        const nextLesson: Lesson = {
          id: uid(),
          title: `Lesson ${m.lessons.length + 1}`,
          type: 'video',
          durationMins: 15,
          mediaUrl: '',
        };
        return { ...m, lessons: [...m.lessons, nextLesson] };
      });
      return { ...d, modules };
    });
    setSavedMessage(null);
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setDraft((d) => {
      const modules = d.modules.map((m) => {
        if (m.id !== moduleId) return m;
        const next = m.lessons.filter((l) => l.id !== lessonId);
        return { ...m, lessons: next.length ? next : m.lessons };
      });
      return { ...d, modules };
    });
    setSavedMessage(null);
  };

  const updateLesson = (moduleId: string, lessonId: string, patch: Partial<Lesson>) => {
    setDraft((d) => {
      const modules = d.modules.map((m) => {
        if (m.id !== moduleId) return m;
        return {
          ...m,
          lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...patch } : l)),
        };
      });
      return { ...d, modules };
    });
    setSavedMessage(null);
  };

  const handleSave = async () => {
    if (!validation.ok) return;

    setSaving(true);
    setSavedMessage(null);

    // Local-only demo save
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);

    const payload = {
      ...draft,
      createdAt: new Date().toISOString(),
    };

    console.log('Course draft saved (local):', payload);


    setSavedMessage('Draft saved locally. (No backend wired yet.)');
  };

  return (
    <DashboardLayout
      title="Create Course"
      subtitle={`Progress ${courseProgress}% · Build modules and lessons`}
    >
      <div className="max-w-7xl mx-auto space-y-6 pb-20">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Course Setup</h1>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Create a new course by filling course details, learning objectives, and building modules with lessons.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Objectives</div>
              <div className="text-sm font-black text-slate-900">{validation.objectivesCount}</div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving || !validation.ok}
              className={`px-6 py-3 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all shadow-sm flex items-center gap-2
                ${saving || !validation.ok ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-900 text-white hover:bg-blue-800'}`}
            >
              <Save size={16} /> {saving ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
        </div>

        {/* Validation banner */}
        {!validation.ok && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
            <AlertCircle size={18} className="text-red-500 shrink-0" />
            <div>
              <div className="text-xs font-black text-red-700 uppercase tracking-widest">Fix required</div>
              <ul className="text-sm text-red-700/90 mt-2 list-disc pl-5">
                {validation.errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {savedMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
            <Sparkles size={18} className="text-emerald-500 shrink-0" />
            <div className="text-sm text-emerald-900 font-semibold">{savedMessage}</div>
          </div>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* Left: course and modules */}
          <div className="space-y-6">
            {/* Course details */}
            <section className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-blue-900" />
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Course Details</h2>
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 1/3</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <label className="space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</div>
                  <input
                    value={draft.title}
                    onChange={(e) => setField('title', e.target.value)}
                    placeholder="e.g., Introduction to Vrikshayurveda"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700"
                  />
                </label>

                <label className="space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</div>
                  <input
                    value={draft.subject}
                    onChange={(e) => setField('subject', e.target.value)}
                    placeholder="e.g., Vrikshayurveda"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700"
                  />
                </label>

                <label className="space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level</div>
                  <input
                    value={draft.level}
                    onChange={(e) => setField('level', e.target.value)}
                    placeholder="Beginner / Intermediate / Advanced"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700"
                  />
                </label>

                <label className="space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Language</div>
                  <input
                    value={draft.language}
                    onChange={(e) => setField('language', e.target.value)}
                    placeholder="English"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700"
                  />
                </label>
              </div>

              <div className="mt-4">
                <label className="space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</div>
                  <textarea
                    value={draft.description}
                    onChange={(e) => setField('description', e.target.value)}
                    placeholder="Short course description"
                    className="w-full min-h-[120px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700 resize-y"
                  />
                </label>
              </div>
            </section>

            {/* Objectives */}
            <section className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-blue-900" />
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Learning Objectives</h2>
                </div>
                <button
                  onClick={addObjective}
                  className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-700 text-[12px] font-black uppercase tracking-widest flex items-center gap-2"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              <div className="space-y-3 mt-5">
                {draft.learningObjectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-blue-900/10 text-blue-900 flex items-center justify-center shrink-0 font-black text-xs">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        value={obj}
                        onChange={(e) => updateObjective(idx, e.target.value)}
                        placeholder={`Objective ${idx + 1}`}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700"
                      />
                    </div>
                    <button
                      onClick={() => removeObjective(idx)}
                      disabled={draft.learningObjectives.length <= 1}
                      className={`p-2 rounded-xl border transition-all ${
                        draft.learningObjectives.length <= 1
                          ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50'
                          : 'border-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600'
                      }`}
                      aria-label="Remove objective"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Modules */}
            <section className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Layers size={18} className="text-blue-900" />
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Modules & Lessons</h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={addModule}
                    className="px-4 py-2 rounded-xl bg-blue-900 text-white hover:bg-blue-800 text-[12px] font-black uppercase tracking-widest flex items-center gap-2"
                  >
                    <Plus size={16} /> Add Module
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5">
                {/* Module list */}
                <div className="space-y-3">
                  {draft.modules.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveModuleId(m.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        m.id === activeModuleId
                          ? 'bg-blue-50 border-blue-100'
                          : 'bg-slate-50 border-slate-100 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[12px] font-black text-slate-900 truncate">{m.title || 'Untitled Module'}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                            {m.lessons.length} lessons
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {m.id === activeModuleId && (
                            <div className="w-2 h-2 rounded-full bg-blue-900" aria-hidden />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Active module editor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Module</div>
                      <div className="text-lg font-black text-slate-900 mt-1">{activeModule?.title}</div>
                    </div>

                    <button
                      onClick={() => removeModule(activeModuleId)}
                      disabled={draft.modules.length <= 1}
                      className={`p-3 rounded-xl border transition-all ${
                        draft.modules.length <= 1
                          ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50'
                          : 'border-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600'
                      }`}
                      aria-label="Remove module"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <label className="space-y-2">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Module Title</div>
                      <input
                        value={activeModule?.title ?? ''}
                        onChange={(e) => updateModule(activeModuleId, { title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700"
                      />
                    </label>

                    <label className="space-y-2">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Module Description</div>
                      <textarea
                        value={activeModule?.description ?? ''}
                        onChange={(e) => updateModule(activeModuleId, { description: e.target.value })}
                        className="w-full min-h-[80px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700 resize-y"
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-black text-slate-900">Lessons</div>
                    <button
                      onClick={() => addLesson(activeModuleId)}
                      className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-700 text-[12px] font-black uppercase tracking-widest flex items-center gap-2"
                    >
                      <Plus size={16} /> Add Lesson
                    </button>
                  </div>

                  <div className="space-y-3">
                    {activeModule?.lessons.map((l, idx) => (
                      <div key={l.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-[11px] text-slate-700">
                              {idx + 1}
                            </div>
                            <div className="min-w-0">
                              <div className="text-[12px] font-black text-slate-900">Lesson</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{l.type}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => removeLesson(activeModuleId, l.id)}
                            disabled={activeModule?.lessons.length ? activeModule.lessons.length <= 1 : true}
                            className={`p-2 rounded-xl border transition-all ${
                              (activeModule?.lessons.length ?? 0) <= 1
                                ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-white'
                                : 'border-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600'
                            }`}
                            aria-label="Remove lesson"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                          <label className="space-y-2">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lesson Title</div>
                            <input
                              value={l.title}
                              onChange={(e) => updateLesson(activeModuleId, l.id, { title: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700"
                            />
                          </label>

                          <label className="space-y-2">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration (mins)</div>
                            <input
                              type="number"
                              value={l.durationMins}
                              min={1}
                              onChange={(e) => updateLesson(activeModuleId, l.id, { durationMins: clamp(parseInt(e.target.value || '0', 10), 1, 999) })}
                              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700"
                            />
                          </label>

                          <label className="space-y-2">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</div>
                            <select
                              value={l.type}
                              onChange={(e) => updateLesson(activeModuleId, l.id, { type: e.target.value as LessonType })}
                              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700"
                            >
                              <option value="video">video</option>
                              <option value="pdf">pdf</option>
                              <option value="quiz">quiz</option>
                              <option value="flipbook">flipbook</option>
                              <option value="live">live</option>
                            </select>
                          </label>

                          <label className="space-y-2">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Media URL (optional)</div>
                            <div className="flex items-center gap-2">
                              <Upload size={16} className="text-slate-400 shrink-0" />
                              <input
                                value={l.mediaUrl ?? ''}
                                onChange={(e) => updateLesson(activeModuleId, l.id, { mediaUrl: e.target.value })}
                                placeholder={l.type === 'video' ? '/path/to/video.mp4 or YouTube embed URL' : 'file/path or link'}
                                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-900/5 text-sm font-medium text-slate-700"
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: summary */}
          <aside className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-sm font-black text-slate-900 uppercase tracking-widest">Draft Summary</div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-500">Course</div>
                  <div className="font-black text-slate-900 text-right truncate max-w-[180px]">{draft.title || '—'}</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-500">Subject</div>
                  <div className="font-black text-slate-900 text-right truncate max-w-[180px]">{draft.subject || '—'}</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-500">Modules</div>
                  <div className="font-black text-slate-900">{draft.modules.length}</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-500">Total Lessons</div>
                  <div className="font-black text-slate-900">
                    {draft.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion</div>
                  <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-900 rounded-full" style={{ width: `${courseProgress}%` }} />
                  </div>
                  <div className="text-right text-[12px] font-black text-slate-900 mt-2">{courseProgress}%</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="text-sm font-black text-blue-900 uppercase tracking-widest">Next</div>
              <p className="text-sm text-blue-900/80 mt-3 leading-relaxed">
                After saving, you can connect this draft to your backend to persist courses and generate an ID for
                `/courses/[id]` to use.
              </p>
              <div className="mt-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">
                Backend not wired in this UI.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

