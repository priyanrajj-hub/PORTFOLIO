// Verified Certificates and Technical Licenses
// All items have honest status: 'Verified' only if verifiable, otherwise 'Completed'

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  verifyUrl?: string;
  skills: string[];
  status: 'Verified' | 'Completed';
  category: 'Cloud / AI' | 'Database' | 'Systems' | 'Certification';
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-google-genai',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud Skills Boost',
    year: '2026',
    credentialId: '24926260',
    verifyUrl: 'https://www.cloudskillsboost.google',
    skills: ['Generative AI', 'Large Language Models (LLMs)', 'Google Cloud', 'Deep Learning'],
    status: 'Verified',
    category: 'Cloud / AI',
  },
  {
    id: 'cert-oracle',
    title: 'Databases for Developers: Foundations',
    issuer: 'Oracle',
    year: '2026',
    verifyUrl: 'https://devgym.oracle.com',
    skills: ['Oracle SQL', 'Relational Schema', 'Query Optimization', 'Data Integrity'],
    status: 'Completed',
    category: 'Database',
  },
  {
    id: 'cert-automotive',
    title: 'Basics of Automotive Electronics',
    issuer: 'Udemy',
    year: '2026',
    verifyUrl: 'https://www.udemy.com',
    skills: ['Automotive Electronics', 'CAN Bus Communication', 'ECU & Sensor Interfacing'],
    status: 'Completed',
    category: 'Systems',
  },
  {
    id: 'cert-be10x',
    title: 'AI Tools & Productivity Workshop',
    issuer: 'Be10x',
    year: '2026',
    credentialId: '0270772f-3809-4400-b29b-1e1c61cd09971350694',
    skills: ['Generative AI Productivity', 'Prompt Engineering', 'AI Automation'],
    status: 'Verified',
    category: 'Cloud / AI',
  },
  {
    id: 'cert-infosys-springboard',
    title: 'Infosys Springboard: C Programming & Computational Thinking',
    issuer: 'Infosys Springboard',
    year: '2026',
    verifyUrl: 'https://infyspringboard.onwingspan.com',
    skills: ['C (Programming Language)', 'Computational Problem Solving', 'Algorithmic Optimization'],
    status: 'Completed',
    category: 'Systems',
  },
  {
    id: 'cert-nptel-os',
    title: 'Introduction to Operating Systems',
    issuer: 'NPTEL (IIT Kharagpur)',
    year: '2026',
    verifyUrl: 'https://nptel.ac.in',
    skills: ['Process Scheduling', 'Virtual Memory', 'Deadlock Avoidance', 'Kernel Architecture'],
    status: 'Completed',
    category: 'Systems',
  },
  {
    id: 'cert-nptel-py',
    title: 'The Joy of Computing Using Python',
    issuer: 'NPTEL (IIT Ropar)',
    year: '2026',
    verifyUrl: 'https://nptel.ac.in',
    skills: ['Python 3 Core', 'Algorithmic Problem Solving', 'Computational Logic'],
    status: 'Completed',
    category: 'Certification',
  },
  {
    id: 'cert-nptel-eng',
    title: 'English Language for Competitive Examinations',
    issuer: 'NPTEL',
    year: '2026',
    verifyUrl: 'https://nptel.ac.in',
    skills: ['Technical Documentation', 'Verbal Reasoning', 'Professional Writing'],
    status: 'Completed',
    category: 'Certification',
  },
  {
    id: 'cert-ieee-membership',
    title: 'IEEE Member & Circuits and Systems Society (CAS)',
    issuer: 'IEEE Global',
    year: '2026',
    verifyUrl: 'https://www.ieee.org',
    skills: ['IEEE Standards', 'CAS Society', 'Signal Processing', 'Systems Architecture'],
    status: 'Verified',
    category: 'Systems',
  },
];
