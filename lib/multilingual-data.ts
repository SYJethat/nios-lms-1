import { Globe } from 'lucide-react';

export const LANGUAGES_22 = [
  'Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada', 
  'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Urdu', 'Sanskrit', 'Kashmiri', 'Konkani', 
  'Maithili', 'Manipuri', 'Nepali', 'Bodo', 'Santali', 'Dogri'
];

export interface Pathway {
  id: string;
  source: string;
  target: string;
  title: string;
  subject: string;
  teacher: string;
  level: string;
  tags: string[];
}

/**
 * Generates the full 484 language pair matrix (22x22)
 * Includes same-language reinforcement (e.g. Hindi -> Hindi for advanced grammar)
 */
export const generate484Pathways = (): Pathway[] => {
  const pathways: Pathway[] = [];
  
  LANGUAGES_22.forEach((source) => {
    LANGUAGES_22.forEach((target) => {
      pathways.push({
        id: `PATH-${source.toUpperCase()}-${target.toUpperCase()}`,
        source,
        target,
        title: source === target 
          ? `Advanced ${source} Grammar & Literature` 
          : `Learn ${target} via ${source}: Conversational Hub`,
        subject: `${source}-${target}`,
        teacher: 'AI Multilingual Engine',
        level: 'Foundation to Advanced',
        tags: ['Multilingual', 'AI-Generated', 'Context-Aware']
      });
    });
  });
  
  return pathways;
};

export const ALL_484_PATHWAYS = generate484Pathways();
