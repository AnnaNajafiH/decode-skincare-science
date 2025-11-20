// Core data types for the Science Content Ecosystem

export interface SocialPost {
  id: string;
  text: string;
  author: string;
  platform: "instagram" | "tiktok" | "twitter" | "reddit";
  timestamp: string;
  likes: number;
  comments: number;
  hashtags: string[];
}

export interface Trend {
  id: string;
  name: string;
  description: string;
  score: number;
  velocity: "rising" | "hot" | "stable";
  detectedAt: string;
  relatedPosts: SocialPost[];
  keywords: string[];
  category: string;
}

export interface RDDocument {
  id: string;
  title: string;
  summary: string;
  keyFindings: string[];
  ingredients: string[];
  studyType: string;
  efficacy: string;
  citations: string[];
}

export interface GeneratedContent {
  id: string;
  trendId: string;
  type: "instagram-carousel" | "reel" | "story" | "video-script";
  status: "pending" | "approved" | "rejected" | "published";
  confidence: number;
  generatedAt: string;
  slides?: ContentSlide[];
  caption?: string;
  hashtags?: string[];
  visualSuggestions?: string[];
  script?: string;
  rdReferences: string[];
  reviewerNotes?: string;
  editedBy?: string;
  approvedAt?: string;
}

export interface ContentSlide {
  number: number;
  text: string;
  visualHint: string;
}

export interface InternalBrief {
  id: string;
  title: string;
  rdDocumentId: string;
  headline: string;
  keyProofPoints: Array<{
    point: string;
    evidence: string;
    citation: string;
  }>;
  creativeHooks: string[];
  sampleCaptions: string[];
  trainingSnippets: string[];
  targetAudience: string;
  generatedAt: string;
}

export interface TrustScore {
  overall: number;
  factualAccuracy: number;
  sourceReliability: number;
  claimStrength: "verified" | "likely" | "uncertain" | "unverified";
  flags: string[];
}
