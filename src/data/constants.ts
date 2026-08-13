import type { VectorOption, HackTrack, ResidencyScheduleDay, FAQItem, PassData } from '../types';

export const VECTOR_OPTIONS: VectorOption[] = [
  {
    id: 'eng',
    label: 'Core Engineer / Systems Developer',
    code: 'ENGINEERING',
    defaultClass: 'PROTOCOL CYBER-ARCHITECT',
    clearance: 'TIER 01 - OMEGA',
    icon: 'code'
  },
  {
    id: 'des',
    label: 'UI/UX Architect / Product Designer',
    code: 'INTERFACE_DESIGN',
    defaultClass: 'NEON CREATIVE ARCHITECT',
    clearance: 'TIER 02 - ALPHA',
    icon: 'palette'
  },
  {
    id: 'fnd',
    label: 'Protocol Founder / Ecosystem Lead',
    code: 'GOVERNANCE',
    defaultClass: 'STRATEGIC PROTOCOL FOUNDER',
    clearance: 'TIER 03 - VIP',
    icon: 'rocket_launch'
  },
  {
    id: 'sec',
    label: 'Security Auditor / Cryptographer',
    code: 'SECURITY_AUDIT',
    defaultClass: 'ZERO-KNOWLEDGE OPERATOR',
    clearance: 'TIER 01 - OMEGA',
    icon: 'shield'
  },
  {
    id: 'ai',
    label: 'AI & Autonomous Agent Researcher',
    code: 'INTELLIGENCE',
    defaultClass: 'SYNTHETIC INTEL RESIDENT',
    clearance: 'CORE OPERATOR',
    icon: 'memory'
  },
  {
    id: 'sys',
    label: 'Rust & High-Performance Infra',
    code: 'INFRASTRUCTURE',
    defaultClass: 'LOW-LEVEL KERNEL ENGINE',
    clearance: 'TIER 01 - OMEGA',
    icon: 'terminal'
  }
];

export const POPULAR_TECH_STACKS = [
  'React', 'TypeScript', 'Solana', 'Rust', 'Python', 'PyTorch', 
  'Solidity', 'WebAssembly', 'Go', 'Next.js', 'TailwindCSS', 
  'GraphQL', 'Node.js', 'Docker', 'ZK-Proofs', 'LLM Agents'
];

export const DEFAULT_PASS: PassData = {
  name: '',
  vector: 'eng',
  builderClass: '',
  clearance: 'TIER 01 - OMEGA',
  serialNumber: '',
  photoUrl: null,
  photoFilter: 'cyber',
  zoom: 1,
  techStack: [],
  xHandle: '',
  githubHandle: '',
  issueTimestamp: '',
  hologramActive: true,
  securityHash: '',
};

export const HACK_TRACKS: HackTrack[] = [
  {
    id: 'track-1',
    title: 'Autonomous AI Agents & On-Chain Intel',
    bounty: '$25,000 USD',
    description: 'Build self-sovereign AI agents capable of executing complex web, crypto, and data workflows with verifiable telemetry.',
    techKeywords: ['PyTorch', 'LLM', 'WASM', 'TypeScript'],
    icon: 'smart_toy'
  },
  {
    id: 'track-2',
    title: 'Zero-Knowledge & Privacy Protocols',
    bounty: '$20,000 USD',
    description: 'Construct ultra-fast non-interactive ZK proof systems for biometric credentials, private state, and identity verification.',
    techKeywords: ['Noir', 'Circom', 'Rust', 'ZK-Rollups'],
    icon: 'lock'
  },
  {
    id: 'track-3',
    title: 'High-Throughput Decentralized Infra',
    bounty: '$20,000 USD',
    description: 'Optimize high-performance network nodes, custom consensus layers, and low-latency state synchronization mechanisms.',
    techKeywords: ['Rust', 'C++', 'Go', 'eBPF'],
    icon: 'dns'
  },
  {
    id: 'track-4',
    title: 'Cyber-Minimalist UX & Web3 Interfaces',
    bounty: '$15,000 USD',
    description: 'Deliver stunning, high-frequency user interfaces with tactile audio feedback, offline-first PWAs, and zero-latency states.',
    techKeywords: ['Vite', 'React', 'Tailwind', 'Canvas'],
    icon: 'layers'
  }
];

export const RESIDENCY_SCHEDULE: ResidencyScheduleDay[] = [
  {
    date: '28 OCT 2026',
    dayTitle: 'DAY 01 // ARRIVAL & IDENTITY INITIALIZATION',
    events: [
      { time: '10:00 - 12:00', title: 'Check-In & Biometric Credential Issuance', location: 'Beachfront Dome 01', type: 'KEYNOTE' },
      { time: '14:00 - 16:00', title: 'Keynote: High-Stakes Engineering Under the Sun', location: 'Main Amphitheater', type: 'KEYNOTE' },
      { time: '17:00 - 20:00', title: 'Sunset Hacker Session & Team Matchmaking', location: 'Anjuna Bay Deck', type: 'SUNSET_SESSION' }
    ]
  },
  {
    date: '29 OCT 2026',
    dayTitle: 'DAY 02 // NON-STOP SPRINT & ZERO-SLEEP PROTOCOL',
    events: [
      { time: '09:00 - 13:00', title: 'Track Workshops: ZK Proofs & AI Telemetry', location: 'Cyber Lab Alpha', type: 'HACK' },
      { time: '14:00 - 22:00', title: '48-Hour Open Build Sprint', location: 'Hacker House Villa Main', type: 'HACK' }
    ]
  },
  {
    date: '30 OCT 2026',
    dayTitle: 'DAY 03 // ARCHITECTURE REVIEWS & WAR ROOMS',
    events: [
      { time: '11:00 - 14:00', title: 'Security Audit & Code Sanity Checks', location: 'Auditor Lounge', type: 'HACK' },
      { time: '18:00 - 21:00', title: 'Night Coding under Neon Palms', location: 'Poolside Cyber Deck', type: 'SUNSET_SESSION' }
    ]
  },
  {
    date: '31 OCT 2026',
    dayTitle: 'DAY 04 // DEMO DAY & RESIDENCY FINALE',
    events: [
      { time: '14:00 - 18:00', title: 'Grand Demo Day & Jury Pitching', location: 'Grand Pavilion', type: 'DEMO_DAY' },
      { time: '20:00 - LATE', title: 'Goa After-Party & Residency Awards', location: 'Secret Beach Cove', type: 'SUNSET_SESSION' }
    ]
  }
];

export const INTEL_FAQS: FAQItem[] = [
  {
    category: 'PASS',
    question: 'How is the Builder Pass generated and stored?',
    answer: 'Your pass is generated 100% client-side inside your browser using HTML5 Canvas rendering. Your uploaded photo and personal data never touch a remote server.'
  },
  {
    category: 'PASS',
    question: 'How do I present my pass at the Goa Residency venue?',
    answer: 'You can download the high-res PNG or install this application as a Progressive Web App (PWA) to display your pass offline at gate check-in.'
  },
  {
    category: 'RESIDENCY',
    question: 'Who is eligible for the Hacker House Goa Builder Pass?',
    answer: 'Elite developers, UI/UX architects, protocol founders, security auditors, and AI researchers building high-impact tech.'
  },
  {
    category: 'VENUE',
    question: 'What is provided at the Goa Residency venue?',
    answer: 'High-speed gigabit Wi-Fi, 24/7 power backup, ergonomic hacker pods, gourmet Goan cuisine, fresh coconut water, and beachside coding decks.'
  }
];
