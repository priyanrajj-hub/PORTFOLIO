// Categorized Skills with subtle level indicators (no fake percentages)
// Categories: Languages, AI/ML, Embedded & Systems, Web, Tools

export interface SkillItem {
  name: string;
  level: 'Advanced' | 'Proficient' | 'Familiar';
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Languages',
    description: 'Core procedural, object-oriented, and systems programming languages.',
    skills: [
      { name: 'C (Strict ANSI)', level: 'Advanced', highlight: true },
      { name: 'C++', level: 'Proficient', highlight: true },
      { name: 'Python 3', level: 'Advanced', highlight: true },
      { name: 'TypeScript', level: 'Proficient' },
      { name: 'SQL', level: 'Proficient' },
      { name: 'Assembly (x86 Basics)', level: 'Familiar' },
    ],
  },
  {
    title: 'AI / Machine Learning',
    description: 'Contextual reinforcement learning, edge models, and computer vision.',
    skills: [
      { name: 'LinUCB Multi-Armed Bandits', level: 'Advanced', highlight: true },
      { name: 'TinyML & Edge AI', level: 'Proficient', highlight: true },
      { name: 'Multispectral NDVI Analysis', level: 'Advanced', highlight: true },
      { name: 'OpenCV Computer Vision', level: 'Proficient' },
      { name: 'NumPy & Pandas', level: 'Advanced' },
      { name: 'Scikit-Learn', level: 'Proficient' },
      { name: 'Gemini API & LLM Orchestration', level: 'Advanced', highlight: true },
    ],
  },
  {
    title: 'Embedded & Systems',
    description: 'Hardware protocols, firmware development, and kernel process mechanics.',
    skills: [
      { name: 'BLE 5.0 Core Protocol', level: 'Proficient', highlight: true },
      { name: 'POSIX Process Scheduling', level: 'Advanced', highlight: true },
      { name: 'Arduino & ESP32 Firmware', level: 'Proficient' },
      { name: 'CAN Bus & Automotive ECUs', level: 'Familiar' },
      { name: 'Ultrasonic Array Telemetry', level: 'Proficient' },
      { name: 'Binary Serialized File I/O', level: 'Advanced' },
    ],
  },
  {
    title: 'Web Technologies',
    description: 'Modern front-end frameworks, responsive UI architecture, and 3D WebGL.',
    skills: [
      { name: 'React 19', level: 'Advanced', highlight: true },
      { name: 'Three.js / @react-three/fiber', level: 'Proficient', highlight: true },
      { name: 'Tailwind CSS v4', level: 'Advanced', highlight: true },
      { name: 'Vite', level: 'Advanced' },
      { name: 'Next.js', level: 'Proficient' },
      { name: 'Web Speech API', level: 'Proficient' },
    ],
  },
  {
    title: 'Tools & DevOps',
    description: 'Source control, cloud deployment, and automated validation pipelines.',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', highlight: true },
      { name: 'GitHub Actions (CI/CD)', level: 'Proficient', highlight: true },
      { name: 'Linux / Bash Shell', level: 'Proficient' },
      { name: 'Vercel Serverless', level: 'Proficient' },
      { name: 'Oxlint / ESLint', level: 'Proficient' },
    ],
  },
];
