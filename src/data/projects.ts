// Typed Projects Dataset
// All 9 verified projects engineered by Priyanraj J

export interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  outcome: string; // One-line outcome/impact
  category: 'All' | 'Web' | 'AI / ML' | 'Systems' | 'Embedded / Hardware';
  description: string;
  technologies: string[];
  metrics: string[];
  role: string;
  status: 'Production' | 'Prototype' | 'Research';
  githubUrl?: string;
  demoUrl?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'canopy',
    tag: 'AGRISENSE//01',
    title: 'Canopy — Global Satellite & IoT Vegetation Health Monitor',
    outcome: 'Live environmental intelligence combining satellite NDVI multispectral imagery with ground IoT sensors.',
    category: 'AI / ML',
    description: 'Enterprise environmental platform merging AGRISENSE embedded hardware telemetry with global satellite multispectral imagery to provide continuous, real-time vegetation health analytics, drought forecasting, and precision agricultural indices.',
    technologies: ['Python', 'Computer Vision', 'Satellite Telemetry', 'Multispectral NDVI', 'Vercel'],
    metrics: ['Live Satellite Data Feed', 'Production Vercel Deployment', 'Hardware Integration'],
    role: 'Lead Architect & Systems Engineer',
    status: 'Production',
    githubUrl: 'https://github.com/priyanrajj-hub/smart-plant-health-monitoring-using-solar-images',
    demoUrl: 'https://smart-plant-health-monitoring-using-solar-images-82n-7gkgfmu7i.vercel.app',
  },
  {
    id: 'os-capstone',
    tag: 'CAPSTONE//02',
    title: 'AI-DAX Lite — AI-Driven OS Process Scheduling Simulator',
    outcome: 'Replaces static OS schedulers with LinUCB Multi-Armed Bandits to eliminate CPU starvation dynamically.',
    category: 'Systems',
    description: 'Next-generation Operating System Process Scheduling Engine powered by LinUCB Contextual Multi-Armed Bandit algorithms. Dynamically predicts workload bursts, optimizes CPU execution queues, and visualizes live latency benchmarks.',
    technologies: ['C / C++', 'LinUCB Bandit Algorithm', 'POSIX Process Simulation', 'Dynamic Telemetry'],
    metrics: ['Reinforcement Learning CPU Allocation', 'Dynamic Quantum Tuning', 'Real-time Telemetry'],
    role: 'Operating Systems Researcher',
    status: 'Research',
    githubUrl: 'https://github.com/priyanrajj-hub/operatingsystemsprojectcapstone',
  },
  {
    id: 'ble-attendance',
    tag: 'SYSTEMS//03',
    title: 'Attendance BLE Platform (Proximity Micro-Broadcaster)',
    outcome: 'Sub-second tamper-proof presence verification via hardware-anchored BLE 5.0 signal handshakes.',
    category: 'Embedded / Hardware',
    description: 'Hardware-anchored proximity validation architecture establishing low-latency Bluetooth Low Energy (BLE) handshakes between student broadcaster nodes and faculty scanning hubs for tamper-proof automated classroom attendance.',
    technologies: ['Embedded C', 'BLE 5.0 Core', 'Android / ESP32', 'RSSI Distance Filtering'],
    metrics: ['Sub-second Handshake Timing', 'Foreground Session Integrity', 'Zero Beacon Spoofing'],
    role: 'Embedded Firmware Developer',
    status: 'Prototype',
    githubUrl: 'https://github.com/priyanrajj-hub/attendance-ble-platform',
  },
  {
    id: 'friend-recommendation',
    tag: 'DATA_STRUCTURES//04',
    title: 'Graph-Theoretic Friend Recommendation System',
    outcome: 'Sub-quadratic social graph clustering utilizing Adamic-Adar and Jaccard similarity indices.',
    category: 'Systems',
    description: 'Research Expo Project No. 23 engineering scalable graph traversal algorithms (BFS, Adamic-Adar, Jaccard Similarity, Common Neighbors) for large-scale relational social graph clustering and link prediction.',
    technologies: ['C++', 'Graph Algorithms', 'Adamic-Adar Index', 'Similarity Matrices'],
    metrics: ['Sub-quadratic Graph Clustering', 'B.Tech DS Expo Project', 'Comprehensive Formal Paper'],
    role: 'Lead Graph Algorithmist',
    status: 'Production',
    githubUrl: 'https://github.com/priyanrajj-hub/DATASTRUCCTURE-RESEARCHEXPO-PROBNO-23',
  },
  {
    id: 'pharma-evergreen',
    tag: 'SYS_C//05',
    title: 'Pharmaceutical Evergreening Detection & Management Engine',
    outcome: 'Strict ANSI C patent manipulation detector with serialized binary I/O and dynamic Levenshtein fuzzy matching.',
    category: 'Systems',
    description: 'High-performance patent registry and anti-evergreening engine written in structural C. Features fuzzy drug name matching using dynamic programming Levenshtein distance, serialized binary I/O, and struct-based relational lookup tables.',
    technologies: ['C (Strict ANSI)', 'Levenshtein Metric', 'Binary File I/O', 'Struct Data Records'],
    metrics: ['Sub-millisecond Fuzzy Search', '100% Binary Serialized DB', 'B.Tech Project Expo Finalist'],
    role: 'Core Systems C Programmer',
    status: 'Production',
    githubUrl: 'https://github.com/priyanrajj-hub/PORTFOLIO',
  },
  {
    id: 'patrol-robot',
    tag: 'ROBOTICS//06',
    title: 'Smart Autonomous Patrol Robot Architecture',
    outcome: 'Hardware safe-state robotics with ultrasonic obstacle detection and real-time gas telemetry data logging.',
    category: 'Embedded / Hardware',
    description: 'Autonomous tracking robotics platform engineered with hardware safe-states. Integrates real-time ultrasonic sensor arrays for obstacle avoidance, hazardous gas/smoke intelligence parsing, step-down buck converters, and an on-board MicroSD card module for stable telemetry data logging.',
    technologies: ['Embedded C', 'Arduino / ESP32', 'Ultrasonic Array', 'Gas Telemetry', 'MicroSD Logging'],
    metrics: ['20ms Hardware Polling Loop', 'Gas Hazard Auto-Trigger', 'Relay Fail-Safe Protection'],
    role: 'Hardware Robotics Engineer',
    status: 'Prototype',
    githubUrl: 'https://github.com/priyanrajj-hub/ardiuno-and-canopy2',
  },
  {
    id: 'student-mgmt',
    tag: 'DATA_CLI//07',
    title: 'Student Data Management Engine (CLI)',
    outcome: 'Zero-dependency Python CLI handling automated attendance matrices, ranking arrays, and rollback backups.',
    category: 'Systems',
    description: 'Full-featured Python CLI data platform handling automated attendance tracking, multi-tier ranking arrays, CSV export and rollback backups, and curriculum validation matrices.',
    technologies: ['Python 3', 'CLI Architecture', 'CSV Streaming', 'Data Integrity Checks'],
    metrics: ['Zero Third-party Dependencies', 'Automated Daily Backups', 'Real-time Rank Computation'],
    role: 'Software Systems Developer',
    status: 'Production',
    githubUrl: 'https://github.com/priyanrajj-hub/student-management-system-python',
  },
  {
    id: 'chatbot',
    tag: 'AI_INTEL//08',
    title: 'CodeAlpha Intent-Normalized AI Chatbot',
    outcome: 'Sub-5ms conversational rule engine with NLP lemmatization pipeline engineered during CodeAlpha internship.',
    category: 'AI / ML',
    description: 'Rule-based computational conversational agent built for the CodeAlpha Internship. Features clean intent matching pipelines, input lemmatization, and environment-driven response configuration.',
    technologies: ['Python', 'NLP Preprocessing', 'Rule-Based Intent Classifier', 'Clean Architecture'],
    metrics: ['Sub-5ms Execution Time', 'Environment-Driven Config', 'CodeAlpha Verified'],
    role: 'Python Developer Intern',
    status: 'Production',
    githubUrl: 'https://github.com/priyanrajj-hub/CodeAlpha_BasicChatbot-',
  },
  {
    id: 'maom-adm',
    tag: 'OPTIMIZATION//09',
    title: 'Mahābhārata: Adaptive Digital Mastery (ADM) Platform',
    outcome: 'Algorithmic decision suite combining statistical heuristics with automated GitHub Actions CI/CD pipelines.',
    category: 'Web',
    description: 'Mathematical optimization modeling suite applying statistical heuristics, automated GitHub Actions CI pipelines, and algorithmic decision matrices to high-constraint scenario solvers.',
    technologies: ['Python', 'Mathematical Modeling', 'Automated CI/CD', 'Data Mining Heuristics'],
    metrics: ['Automated GitHub CI Pipeline', 'High-Constraint Solver'],
    role: 'Computational Optimization Engineer',
    status: 'Production',
    githubUrl: 'https://github.com/priyanrajj-hub/MAOM-PROJECT-2-ADM',
  },
];
