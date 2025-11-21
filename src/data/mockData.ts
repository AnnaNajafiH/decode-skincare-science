import {
  SocialPost,
  Trend,
  RDDocument,
  GeneratedContent,
  InternalBrief,
} from "../types";

// Mock Social Posts
export const mockSocialPosts: SocialPost[] = [
  {
    id: "sp1",
    text: "Glass skin routine with hyaluronic acid is EVERYTHING! My skin has never been more hydrated 💧✨ #GlassSkin #HyaluronicAcid",
    author: "@skincarebyjess",
    platform: "instagram",
    timestamp: "2025-11-19T14:30:00Z",
    likes: 12400,
    comments: 342,
    hashtags: ["GlassSkin", "HyaluronicAcid", "Skincare"],
  },
  {
    id: "sp2",
    text: "Did you know niacinamide can help with pore appearance? Been using it for 3 weeks and wow 😍",
    author: "@glowupqueen",
    platform: "tiktok",
    timestamp: "2025-11-19T16:45:00Z",
    likes: 45600,
    comments: 892,
    hashtags: ["Niacinamide", "Skincare", "PoreCare"],
  },
  {
    id: "sp3",
    text: "Slug life 🐌 Putting Vaseline over my moisturizer at night changed my skin barrier game",
    author: "u/skincarelover23",
    platform: "reddit",
    timestamp: "2025-11-19T20:15:00Z",
    likes: 3200,
    comments: 156,
    hashtags: ["Slugging", "SkinBarrier"],
  },
  {
    id: "sp4",
    text: "Retinol alternatives that actually work? I need something gentle but effective for anti-aging",
    author: "@beautyminimalist",
    platform: "twitter",
    timestamp: "2025-11-20T08:00:00Z",
    likes: 890,
    comments: 67,
    hashtags: ["Retinol", "AntiAging", "Skincare"],
  },
];

// Mock Trends
export const mockTrends: Trend[] = [
  {
    id: "t1",
    name: "Glass Skin Hydration",
    description:
      "Gen Z obsession with dewy, translucent skin achieved through hyaluronic acid and layering techniques",
    score: 94,
    velocity: "hot",
    detectedAt: "2025-11-20T09:00:00Z",
    relatedPosts: [mockSocialPosts[0]],
    keywords: [
      "glass skin",
      "hyaluronic acid",
      "hydration",
      "dewy",
      "translucent",
    ],
    category: "Hydration",
  },
  {
    id: "t2",
    name: "Niacinamide Pore Minimizing",
    description:
      "Rising interest in niacinamide for pore appearance and skin texture improvement",
    score: 87,
    velocity: "rising",
    detectedAt: "2025-11-20T10:30:00Z",
    relatedPosts: [mockSocialPosts[1]],
    keywords: ["niacinamide", "pores", "texture", "vitamin b3"],
    category: "Treatment",
  },
  {
    id: "t3",
    name: "Slugging for Barrier",
    description:
      "Occlusive skincare method using petroleum jelly to lock in moisture and repair skin barrier",
    score: 78,
    velocity: "stable",
    detectedAt: "2025-11-19T22:00:00Z",
    relatedPosts: [mockSocialPosts[2]],
    keywords: ["slugging", "skin barrier", "occlusive", "moisture"],
    category: "Barrier Repair",
  },
  {
    id: "t4",
    name: "Gentle Retinol Alternatives",
    description:
      "Search for effective anti-aging ingredients with less irritation than traditional retinol",
    score: 82,
    velocity: "rising",
    detectedAt: "2025-11-20T09:15:00Z",
    relatedPosts: [mockSocialPosts[3]],
    keywords: ["retinol alternatives", "bakuchiol", "anti-aging", "gentle"],
    category: "Anti-Aging",
  },
];

// Mock R&D Documents
export const mockRDDocuments: RDDocument[] = [
  {
    id: "rd1",
    title: "Clinical Efficacy of Hyaluronic Acid in Dermal Hydration",
    summary:
      "12-week double-blind study demonstrating 89% improvement in skin hydration with topical hyaluronic acid application",
    keyFindings: [
      "Transepidermal water loss (TEWL) reduced by 34% after 4 weeks",
      "Skin capacitance measurements increased by 89% at week 12",
      "Consumer-perceived hydration improved in 94% of subjects",
      "No adverse reactions reported in 150-subject cohort",
    ],
    ingredients: ["Hyaluronic Acid", "Sodium Hyaluronate", "Glycerin"],
    studyType: "Clinical Trial",
    efficacy: "High",
    citations: [
      "J. Dermatol. Sci. 2024;45(2):123-134",
      "Int. J. Cosmet. Sci. 2024;46(3):289-301",
    ],
  },
  {
    id: "rd2",
    title: "Niacinamide Effects on Sebum Production and Pore Appearance",
    summary:
      "8-week study on 5% niacinamide showing significant reduction in sebum excretion and visual pore size",
    keyFindings: [
      "Sebum excretion rate decreased by 52% in treatment group",
      "Pore diameter reduced by 18% on average (optical profilometry)",
      "Skin texture smoothness improved by clinical grading",
      "Well-tolerated with no irritation in sensitive skin subset",
    ],
    ingredients: ["Niacinamide", "Vitamin B3"],
    studyType: "Controlled Study",
    efficacy: "High",
    citations: [
      "Br. J. Dermatol. 2024;190(4):567-578",
      "Skin Res. Technol. 2024;30(2):45-56",
    ],
  },
  {
    id: "rd3",
    title: "Occlusive Agents and Transepidermal Water Loss Prevention",
    summary:
      "Comparative study of occlusive ingredients demonstrating barrier repair mechanisms and moisture retention",
    keyFindings: [
      "Petrolatum-based occlusives reduced TEWL by 98% within 6 hours",
      "Barrier function restoration accelerated by 65% vs. control",
      "Lipid bilayer organization improved via confocal microscopy",
      "Optimal application timing: over humectants for synergistic effect",
    ],
    ingredients: ["Petrolatum", "Dimethicone", "Lanolin"],
    studyType: "Mechanistic Study",
    efficacy: "Very High",
    citations: ["J. Invest. Dermatol. 2024;144(5):1023-1035"],
  },
  {
    id: "rd4",
    title:
      "Bakuchiol as Retinol Alternative: Efficacy and Tolerability Profile",
    summary:
      "Head-to-head comparison of bakuchiol vs. retinol showing comparable anti-aging benefits with superior tolerability",
    keyFindings: [
      "Fine line reduction: 22% (bakuchiol) vs. 24% (retinol) at 12 weeks",
      "Hyperpigmentation improvement: comparable efficacy",
      "Erythema incidence: 6% (bakuchiol) vs. 43% (retinol)",
      "Patient preference: 78% favored bakuchiol for comfort",
    ],
    ingredients: ["Bakuchiol", "Retinol (comparison)"],
    studyType: "Comparative Clinical Trial",
    efficacy: "High",
    citations: ["Dermatol. Ther. 2024;37(3):e15234", "JAAD 2024;90(4):892-903"],
  },
];

// Mock Generated Content
export const mockGeneratedContent: GeneratedContent[] = [
  {
    id: "gc1",
    trendId: "t1",
    type: "instagram-carousel",
    status: "pending",
    confidence: 0.92,
    generatedAt: "2025-11-20T10:00:00Z",
    slides: [
      {
        number: 1,
        text: "Glass skin = science, not magic ✨",
        visualHint: "Split-screen: glowing skin vs. microscopic view",
      },
      {
        number: 2,
        text: "Hyaluronic acid holds 1000x its weight in water 💧",
        visualHint: "Animated molecule with water droplets",
      },
      {
        number: 3,
        text: "Clinical proof: 89% hydration boost in 12 weeks",
        visualHint: "Simple bar chart graphic",
      },
      {
        number: 4,
        text: "TEWL ⬇️ 34% = moisture stays locked in",
        visualHint: "Before/after skin barrier illustration",
      },
      {
        number: 5,
        text: "Want that glow? Layer + lock 🔬",
        visualHint: "Product layering steps visual",
      },
    ],
    caption:
      "The real tea on glass skin ☕✨ It's not just hype—hyaluronic acid is backed by science. Swipe for the breakdown 🔬💙",
    hashtags: [
      "GlassSkin",
      "SkincareScience",
      "HyaluronicAcid",
      "BeiersdorfResearch",
      "SkincareFacts",
    ],
    visualSuggestions: [
      "Use gradient blue-to-white backgrounds for science credibility",
      "Include micro-animations of water molecules for engagement",
    ],
    rdReferences: ["rd1"],
  },
  {
    id: "gc2",
    trendId: "t2",
    type: "reel",
    status: "approved",
    confidence: 0.88,
    generatedAt: "2025-11-20T11:15:00Z",
    caption:
      "Niacinamide isn't just a trend—it's science 🧪 Reduces sebum by 52% and visibly minimizes pores. The glow-up is real 💫",
    hashtags: [
      "Niacinamide",
      "PoreCare",
      "SkincareScience",
      "GlowUp",
      "SkinTexture",
    ],
    script:
      'Hook (0-3s): "Why does everyone love niacinamide?" [Close-up of smooth skin]\n\nBody (4-12s): "Science says: it cuts sebum by 52% and shrinks pores by 18%. Not magic—just Vitamin B3 doing its thing." [Quick cuts with graphics]\n\nCTA (13-15s): "Try it. Trust the science." [Product reveal]',
    visualSuggestions: [
      "Fast-paced editing with text overlays",
      "Before/after split-screen at 8-second mark",
      "Upbeat trending audio",
    ],
    rdReferences: ["rd2"],
    editedBy: "reviewer@beiersdorf.com",
    approvedAt: "2025-11-20T12:00:00Z",
  },
  {
    id: "gc3",
    trendId: "t3",
    type: "instagram-carousel",
    status: "pending",
    confidence: 0.85,
    generatedAt: "2025-11-20T11:30:00Z",
    slides: [
      {
        number: 1,
        text: "Slugging: weird name, real science 🐌",
        visualHint: "Playful snail illustration",
      },
      {
        number: 2,
        text: "Occlusives seal in moisture—98% less water loss",
        visualHint: "Barrier lock visualization",
      },
      {
        number: 3,
        text: "Studies show: barrier heals 65% faster",
        visualHint: "Time-lapse healing graphic",
      },
      {
        number: 4,
        text: "Pro tip: slug OVER your moisturizer",
        visualHint: "Layering steps illustration",
      },
    ],
    caption:
      "Slugging sounds weird but the science is solid 🔬🐌 Lock in that moisture and let your barrier heal. Here's how it works 👇",
    hashtags: [
      "Slugging",
      "SkinBarrier",
      "Skincare101",
      "SkincareScience",
      "MoistureBarrier",
    ],
    visualSuggestions: [
      "Use soft, nighttime aesthetic (dark blue/purple tones)",
      "Show product texture close-ups",
    ],
    rdReferences: ["rd3"],
  },
  {
    id: "gc4",
    trendId: "t1",
    type: "instagram-carousel",
    status: "rejected",
    confidence: 0.68,
    generatedAt: "2025-11-19T14:20:00Z",
    slides: [
      {
        number: 1,
        text: "🚨 This serum will SHOCK you!",
        visualHint: "Clickbait-style text with emoji overload",
      },
      {
        number: 2,
        text: "Removes wrinkles INSTANTLY! 100% guaranteed!",
        visualHint: "Exaggerated before/after comparison",
      },
      {
        number: 3,
        text: "Doctors HATE this one simple trick!!!",
        visualHint: "Dramatic text with multiple exclamation marks",
      },
    ],
    caption:
      "OMG you won't believe what this does to your skin!!! 😱😱😱 Click link in bio NOW!!!",
    hashtags: [
      "MiracleCure",
      "InstantResults",
      "AntiAgingSecret",
      "SkincareHack",
    ],
    visualSuggestions: [
      "Use bright red and yellow colors for urgency",
      "Add flashing elements and countdown timers",
    ],
    rdReferences: ["rd1"],
    reviewerNotes:
      "REJECTED: Content uses misleading claims and sensationalist language not supported by clinical data. Violates brand guidelines for scientific accuracy and trustworthiness. Claims like 'instant results' and '100% guaranteed' are unsubstantiated and could mislead consumers. Tone does not align with Beiersdorf's professional, evidence-based approach.",
    editedBy: "reviewer@beiersdorf.com",
  },
  {
    id: "gc5",
    trendId: "t2",
    type: "reel",
    status: "rejected",
    confidence: 0.71,
    generatedAt: "2025-11-18T16:45:00Z",
    caption:
      "This ingredient is literally MAGIC ✨🪄 No science needed, just trust us! #SkincareWizardry",
    hashtags: ["Magic", "NoScience", "JustBelieve", "Miracle"],
    script:
      'Hook (0-3s): "Forget science, this is pure magic!" [Mystical sparkles]\n\nBody (4-12s): "Who needs studies when you have results like these?" [Vague claims without data]\n\nCTA (13-15s): "Buy now before it disappears!" [Urgency without substance]',
    visualSuggestions: [
      "Add magical effects and sparkles throughout",
      "Use mystical music and fantasy elements",
      "Avoid showing any scientific references",
    ],
    rdReferences: [],
    reviewerNotes:
      "REJECTED: Content completely contradicts our science-first brand positioning. Uses 'magic' framing that undermines credibility. No R&D references provided. Creates false urgency. This approach is antithetical to Beiersdorf's commitment to transparent, evidence-based skincare education.",
    editedBy: "senior.reviewer@beiersdorf.com",
  },
];

// Mock Internal Briefs
export const mockInternalBriefs: InternalBrief[] = [
  {
    id: "ib1",
    title: "Campaign Brief: Glass Skin Hydration Initiative",
    rdDocumentId: "rd1",
    headline: "From Lab to Glow: The Science Behind Glass Skin",
    keyProofPoints: [
      {
        point: "89% hydration improvement clinically proven",
        evidence:
          "12-week double-blind study with 150 subjects showing significant skin capacitance increase",
        citation: "J. Dermatol. Sci. 2024;45(2):123-134",
      },
      {
        point: "Reduces water loss by 34% in just 4 weeks",
        evidence:
          "TEWL measurements demonstrate rapid barrier function enhancement",
        citation: "Int. J. Cosmet. Sci. 2024;46(3):289-301",
      },
      {
        point: "94% of users feel more hydrated",
        evidence:
          "Consumer perception aligns with clinical measurements—validated efficacy",
        citation: "Internal Study Report 2024-HA-001",
      },
    ],
    creativeHooks: [
      "Glass skin isn't a K-beauty trend—it's dermatological science",
      "What if your skin could hold 1000x its weight in water?",
      "The molecule that made glass skin possible",
    ],
    sampleCaptions: [
      "Science meets glow ✨ Our hyaluronic acid research proves glass skin is more than a trend—it's measurable hydration.",
      "1000x water retention. 89% hydration boost. This is what real science looks like 🔬💧",
      "From clinical trials to your routine: the glass skin breakthrough backed by Beiersdorf research",
    ],
    trainingSnippets: [
      "Hyaluronic acid works by binding water molecules in the epidermis, creating a moisture reservoir that plumps skin and smooths fine lines.",
      "TEWL (transepidermal water loss) is a key metric—our formulations reduce it significantly, proving barrier protection.",
    ],
    targetAudience:
      "Gen Z & Millennials (18-35) interested in science-backed skincare",
    generatedAt: "2025-11-20T09:30:00Z",
  },
];

// Simulated API delays
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
