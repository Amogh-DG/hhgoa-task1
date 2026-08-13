export type PhotoFilter = 'raw' | 'cyber' | 'matrix' | 'sunset' | 'noir';

export type ClearanceLevel = 'TIER 01 - OMEGA' | 'TIER 02 - ALPHA' | 'TIER 03 - VIP' | 'CORE OPERATOR';

export interface VectorOption {
  id: string;
  label: string;
  code: string;
  defaultClass: string;
  clearance: ClearanceLevel;
  icon: string;
}

export interface PassData {
  name: string;
  vector: string; // vector id
  builderClass: string;
  clearance: ClearanceLevel;
  serialNumber: string;
  photoUrl: string | null;
  photoFilter: PhotoFilter;
  zoom: number; // 1 to 2
  techStack: string[];
  xHandle: string;
  githubHandle: string;
  issueTimestamp: string;
  hologramActive: boolean;
  securityHash: string;
}

export interface HackTrack {
  id: string;
  title: string;
  bounty: string;
  description: string;
  techKeywords: string[];
  icon: string;
}

export interface ResidencyScheduleDay {
  date: string;
  dayTitle: string;
  events: {
    time: string;
    title: string;
    location: string;
    type: 'KEYNOTE' | 'HACK' | 'SUNSET_SESSION' | 'DEMO_DAY';
  }[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'RESIDENCY' | 'PASS' | 'VENUE' | 'LOGISTICS';
}
