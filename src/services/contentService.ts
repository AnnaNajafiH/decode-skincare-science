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

    const newContent: GeneratedContent = {
      id: `gc${Date.now()}`,
      trendId,
      type: type as any,
      status: "pending",
      confidence: 0.75 + Math.random() * 0.2,
      generatedAt: new Date().toISOString(),
      slides:
        type === "instagram-carousel"
          ? [
              {
                number: 1,
                text: "Generated slide 1...",
                visualHint: "Visual suggestion 1",
              },
              {
                number: 2,
                text: "Generated slide 2...",
                visualHint: "Visual suggestion 2",
              },
              {
                number: 3,
                text: "Generated slide 3...",
                visualHint: "Visual suggestion 3",
              },
            ]
          : undefined,
      caption: "AI-generated caption based on trend analysis...",
      hashtags: ["GeneratedTag1", "GeneratedTag2", "Science"],
      visualSuggestions: ["Suggestion 1", "Suggestion 2"],
      rdReferences: ["rd1"],
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
