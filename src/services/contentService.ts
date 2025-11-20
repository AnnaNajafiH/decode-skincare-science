import {
  Trend,
  GeneratedContent,
  InternalBrief,
  RDDocument,
  TrustScore,
} from "../types";
import {
  mockTrends,
  mockGeneratedContent,
  mockInternalBriefs,
  mockRDDocuments,
  delay,
} from "../data/mockData";

// Mock API Service simulating backend calls

class ContentEcosystemService {
  // Trend Detection
  async getTrends(): Promise<Trend[]> {
    await delay(800);
    return mockTrends;
  }

  async getTrendById(id: string): Promise<Trend | null> {
    await delay(300);
    return mockTrends.find((t) => t.id === id) || null;
  }

  // Content Generation
  async generateContent(
    trendId: string,
    type: string
  ): Promise<GeneratedContent> {
    await delay(2000); // Simulate LLM generation time

    const trend = mockTrends.find((t) => t.id === trendId);
    const trendName = trend?.name || "Skincare";

    // Generate content based on specific trend
    const contentTemplates: Record<string, any> = {
      t1: {
        // Glass Skin
        slides: [
          {
            number: 1,
            text: "Glass skin isn't magic—it's science ✨",
            visualHint: "Split-screen: glowing skin vs. microscopic view",
          },
          {
            number: 2,
            text: "Hyaluronic acid holds 1000x its weight in water 💧",
            visualHint: "Animated molecule with water droplets",
          },
          {
            number: 3,
            text: "Our study: 89% hydration boost in 12 weeks 📊",
            visualHint: "Clean bar chart showing results",
          },
          {
            number: 4,
            text: "TEWL reduced by 34% = moisture stays locked in 🔒",
            visualHint: "Before/after skin barrier illustration",
          },
          {
            number: 5,
            text: "Want that glow? Science has your back 🔬",
            visualHint: "Product shot with layering steps",
          },
        ],
        caption:
          "The real tea on glass skin ☕✨ It's not just hype—hyaluronic acid is backed by clinical trials. Swipe to see the science breakdown 🔬💙",
        hashtags: [
          "GlassSkin",
          "SkincareScience",
          "HyaluronicAcid",
          "BeiersdorfResearch",
          "Skincare",
        ],
      },
      t2: {
        // Niacinamide
        slides: [
          {
            number: 1,
            text: "Why is niacinamide everywhere? Let's talk science 🧪",
            visualHint: "Bold typography on gradient background",
          },
          {
            number: 2,
            text: "Reduces sebum production by 52% in 8 weeks 📉",
            visualHint: "Simple infographic with percentage",
          },
          {
            number: 3,
            text: "Pore diameter: 18% smaller (yes, really!) 🔬",
            visualHint: "Close-up skin texture comparison",
          },
          {
            number: 4,
            text: "Texture improvement? Clinical studies say YES ✅",
            visualHint: "Smooth skin texture visual",
          },
        ],
        caption:
          "Niacinamide isn't a trend—it's proven science 💯 Our research shows real results: less oil, smaller-looking pores, smoother texture. That's the power of Vitamin B3 🔬✨",
        hashtags: [
          "Niacinamide",
          "PoreCare",
          "SkincareScience",
          "SkinTexture",
          "Beiersdorf",
        ],
      },
      t3: {
        // Slugging
        slides: [
          {
            number: 1,
            text: "Slugging: weird name, solid science 🐌",
            visualHint: "Playful snail emoji on soft background",
          },
          {
            number: 2,
            text: "Occlusives block 98% of water loss 💧",
            visualHint: "Water droplet barrier visualization",
          },
          {
            number: 3,
            text: "Skin barrier heals 65% faster with occlusion 🛡️",
            visualHint: "Time-lapse healing graphic",
          },
          {
            number: 4,
            text: "Pro tip: Layer OVER your moisturizer 📝",
            visualHint: "Step-by-step product layering",
          },
        ],
        caption:
          "Slugging sounds weird but the science is SOLID 🐌🔬 Our studies prove occlusives lock in moisture and speed up barrier repair. Here's how it works 👇",
        hashtags: [
          "Slugging",
          "SkinBarrier",
          "Skincare101",
          "SkincareScience",
          "Beiersdorf",
        ],
      },
      t4: {
        // Retinol Alternatives
        slides: [
          {
            number: 1,
            text: "Retinol alternatives that actually work 🌿",
            visualHint: "Natural ingredients on clean background",
          },
          {
            number: 2,
            text: "Bakuchiol: 22% fine line reduction vs. 24% retinol 📊",
            visualHint: "Side-by-side comparison chart",
          },
          {
            number: 3,
            text: "The difference? 6% irritation vs. 43% with retinol 😌",
            visualHint: "Calm skin vs. irritated skin visual",
          },
          {
            number: 4,
            text: "Same anti-aging power, zero irritation ✨",
            visualHint: "Before/after aging signs",
          },
        ],
        caption:
          "Looking for gentle anti-aging? Science says bakuchiol delivers 💚 Our clinical trials show comparable results to retinol—with WAY less irritation. Your skin will thank you 🔬✨",
        hashtags: [
          "Bakuchiol",
          "RetinolAlternative",
          "GentleSkincare",
          "AntiAging",
          "Beiersdorf",
        ],
      },
    };

    const template =
      contentTemplates[trendId] || contentTemplates.t1;

    const newContent: GeneratedContent = {
      id: `gc${Date.now()}`,
      trendId,
      type: type as any,
      status: "pending",
      confidence: 0.82 + Math.random() * 0.15,
      generatedAt: new Date().toISOString(),
      slides: type === "instagram-carousel" ? template.slides : undefined,
      caption: template.caption,
      hashtags: template.hashtags,
      script:
        type === "video-script"
          ? `Hook (0-3s): "${template.slides[0].text}"\n\nBody (4-12s): "${template.slides[1].text} ${template.slides[2].text}"\n\nCTA (13-15s): "Trust the science. Try it yourself."`
          : undefined,
      visualSuggestions: [
        "Use gradient backgrounds (purple-to-blue) for science credibility",
        "Include animated elements to catch attention",
        "Keep text large and readable on mobile",
      ],
      rdReferences: ["rd1", "rd2"],
    };

    return newContent;
  }

  async getGeneratedContent(): Promise<GeneratedContent[]> {
    await delay(500);
    return mockGeneratedContent;
  }

  async approveContent(
    contentId: string,
    notes?: string
  ): Promise<GeneratedContent> {
    await delay(600);
    const content = mockGeneratedContent.find((c) => c.id === contentId);
    if (!content) throw new Error("Content not found");

    return {
      ...content,
      status: "approved",
      reviewerNotes: notes,
      editedBy: "current.user@beiersdorf.com",
      approvedAt: new Date().toISOString(),
    };
  }

  async rejectContent(contentId: string, reason: string): Promise<void> {
    await delay(400);
    console.log(`Content ${contentId} rejected: ${reason}`);
  }

  async editContent(
    contentId: string,
    updates: Partial<GeneratedContent>
  ): Promise<GeneratedContent> {
    await delay(700);
    const content = mockGeneratedContent.find((c) => c.id === contentId);
    if (!content) throw new Error("Content not found");

    return { ...content, ...updates };
  }

  // Trust & Fact Checking
  async getTrustScore(_contentId: string): Promise<TrustScore> {
    await delay(1200);

    return {
      overall: 0.85 + Math.random() * 0.1,
      factualAccuracy: 0.88 + Math.random() * 0.1,
      sourceReliability: 0.92,
      claimStrength: Math.random() > 0.2 ? "verified" : "likely",
      flags: Math.random() > 0.7 ? ["Citation needed for claim 2"] : [],
    };
  }

  // R&D Documents
  async getRDDocuments(): Promise<RDDocument[]> {
    await delay(600);
    return mockRDDocuments;
  }

  async getRDDocumentById(id: string): Promise<RDDocument | null> {
    await delay(300);
    return mockRDDocuments.find((doc) => doc.id === id) || null;
  }

  // Internal Brief Generation
  async generateInternalBrief(
    rdDocumentId: string,
    audience: string
  ): Promise<InternalBrief> {
    await delay(2500);

    const rdDoc = mockRDDocuments.find((doc) => doc.id === rdDocumentId);
    if (!rdDoc) throw new Error("R&D document not found");

    const newBrief: InternalBrief = {
      id: `ib${Date.now()}`,
      title: `Campaign Brief: ${rdDoc.title}`,
      rdDocumentId,
      headline: `Leveraging ${rdDoc.ingredients[0]} Research for Market Impact`,
      keyProofPoints: rdDoc.keyFindings.slice(0, 3).map((finding) => ({
        point: finding,
        evidence: `Clinical data from ${rdDoc.studyType}`,
        citation: rdDoc.citations[0] || "Internal Research",
      })),
      creativeHooks: [
        `The science behind ${rdDoc.ingredients[0]}`,
        "From research to results",
        "Clinical proof meets consumer benefit",
      ],
      sampleCaptions: [
        `Science-backed ${rdDoc.ingredients[0]} innovation`,
        `Research proves: ${rdDoc.keyFindings[0]}`,
        "Where clinical meets cosmetic",
      ],
      trainingSnippets: rdDoc.keyFindings.slice(0, 2),
      targetAudience: audience,
      generatedAt: new Date().toISOString(),
    };

    return newBrief;
  }

  async getInternalBriefs(): Promise<InternalBrief[]> {
    await delay(500);
    return mockInternalBriefs;
  }
}

export const contentService = new ContentEcosystemService();
