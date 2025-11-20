# 🏗️ System Architecture - Beiersdorf Science Content Ecosystem

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    BEIERSDORF SCIENCE CONTENT ECOSYSTEM          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         DATA SOURCES                             │
├─────────────────────────────────────────────────────────────────┤
│  📱 Social Media          │  📚 R&D Knowledge Base               │
│  • Instagram              │  • Clinical Studies                  │
│  • TikTok                 │  • Efficacy Reports                  │
│  • Twitter/X              │  • Ingredient Research               │
│  • Reddit                 │  • Safety Data                       │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INGESTION LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  🔍 Trend Detector        │  📄 Document Parser                  │
│  • NLP Processing         │  • PDF/Text Extraction               │
│  • Keyword Extraction     │  • Citation Indexing                 │
│  • Velocity Scoring       │  • Metadata Tagging                  │
│  • Burst Detection        │  • Vector Embeddings                 │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AI GENERATION ENGINE                          │
├─────────────────────────────────────────────────────────────────┤
│  🤖 LLM Core              │  📊 Context Builder                  │
│  • OpenAI GPT-4           │  • Trend + R&D Fusion               │
│  • Anthropic Claude       │  • Template Selection               │
│  • Local Llama 2/3        │  • Constraint Enforcement           │
│                           │  • Citation Linking                  │
│  ✅ Trust Checker         │                                      │
│  • Fact Verification      │                                      │
│  • Confidence Scoring     │                                      │
│  • Claim Strength         │                                      │
└─────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
┌───────────────────────────────┐  ┌───────────────────────────────┐
│   EXTERNAL CONTENT PIPELINE   │  │  INTERNAL CONTENT PIPELINE    │
│  (Human-in-the-Loop)          │  │  (No Approval Required)       │
├───────────────────────────────┤  ├───────────────────────────────┤
│  👤 Review Queue              │  │  ⚡ Instant Generation         │
│  • Approve/Reject/Edit        │  │  • Campaign Briefs            │
│  • Trust Score Display        │  │  • Training Snippets          │
│  • Reviewer Notes             │  │  • Explainer Pages            │
│  • Audit Log                  │  │  • Auto-Export (DOCX/MD)      │
└───────────────────────────────┘  └───────────────────────────────┘
                    │                             │
                    ▼                             ▼
┌───────────────────────────────┐  ┌───────────────────────────────┐
│   📱 Gen Z Social Media       │  │  🏢 Internal Marketing Teams  │
│  • Instagram Feed             │  │  • Campaign Managers          │
│  • Reels                      │  │  • Sales Training             │
│  • Stories                    │  │  • Creative Teams             │
│  • TikTok                     │  │  • Product Education          │
└───────────────────────────────┘  └───────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    MONITORING & ANALYTICS                        │
├─────────────────────────────────────────────────────────────────┤
│  📊 Metrics                  │  🔔 Alerts                        │
│  • Trend Detection Rate      │  • Low Confidence Outputs        │
│  • Content Approval Rate     │  • Fact Check Failures           │
│  • Avg Review Time           │  • API Rate Limits               │
│  • Confidence Scores         │  • System Health                 │
│  • Reviewer Edit Rate        │                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Trend Detection Module

**Purpose**: Identify emerging skincare topics on social media

**Process**:

```
Social Posts → NLP Preprocessing → Entity Extraction →
Frequency Analysis → Burst Detection → Trend Scoring →
Candidate Trends
```

**Outputs**:

- Trend name and description
- Velocity score (hot/rising/stable)
- Related posts (exemplars)
- Keywords and hashtags
- Detection timestamp

---

### 2. Content Generation Module

**Purpose**: Transform trends + R&D into Gen Z content

**Process**:

```
Trend Context + R&D Evidence → Prompt Template Selection →
LLM Generation → Citation Injection → Trust Scoring →
Generated Content
```

**Output Formats**:

- **Instagram Carousel**: 3-5 slides, visual hints, caption, hashtags
- **Reel Caption**: 150 chars, hook + CTA
- **Video Script**: Timed segments (0-15s hook, body, CTA)

**Constraints**:

- Must cite R&D source
- Gen Z tone (emoji, short sentences)
- Confidence threshold (>75%)
- Character limits per format

---

### 3. Human-in-the-Loop Review

**Purpose**: Ensure accuracy and brand safety before publish

**Workflow**:

```
Generated Content → Review Queue → Reviewer Opens →
Trust Score Loaded → Review Actions (Approve/Edit/Reject) →
Audit Log → Publish/Discard
```

**Trust Score Components**:

- Overall confidence (0-100%)
- Factual accuracy (R&D corpus match)
- Source reliability
- Claim strength (verified/likely/uncertain)
- Flags (missing citations, weak claims)

---

### 4. Internal Brief Generator

**Purpose**: Speed up marketing with instant R&D-to-campaign conversion

**Process**:

```
R&D Document Selection → Target Audience Input →
LLM Brief Generation → Structured Output →
Export (DOCX/MD)
```

**Output Includes**:

- Campaign headline
- 3 key proof points (with citations)
- Creative hooks (3 options)
- Sample social captions (3 options)
- Training snippets (2 bullets)

**No Approval**: Instant generation for internal use

---

### 5. Analytics Dashboard

**Purpose**: Monitor system performance and content quality

**Metrics Tracked**:

- Trends detected (per time period)
- Content generated (by type)
- Approval rate (% approved vs rejected)
- Average confidence score
- Average review time
- Reviewer edit rate
- Top trending topics
- Content type performance

---

## Data Flow Diagram

### External Content Flow (Instagram Post)

```
1. Social Stream → [Trend Detector] → Trend Signal
                                          │
2. Trend Signal + R&D Docs → [LLM Generator] → Draft Post
                                                    │
3. Draft Post → [Review Queue] → Reviewer
                                     │
4. Reviewer → [Approve] → Published Content
              [Reject]  → Discard
              [Edit]    → Modified Draft → Approve → Published
```

### Internal Content Flow (Campaign Brief)

```
1. R&D Document Selection → [Brief Generator] → Complete Brief
                                                      │
2. Complete Brief → [Export] → DOCX/MD → Team
```

---

## Technology Stack (Production Recommendations)

### Frontend

- **Framework**: React 18 + TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Query or Redux Toolkit
- **Build**: Vite or Next.js

### Backend

- **API**: FastAPI (Python) or Express (Node.js)
- **Database**: PostgreSQL (structured) + Redis (cache)
- **Queue**: Celery (Python) or Bull (Node.js)
- **Vector DB**: Pinecone or Weaviate (for R&D embeddings)

### AI/ML

- **LLM**: OpenAI GPT-4, Anthropic Claude, or local Llama 3
- **NLP**: spaCy, Hugging Face Transformers
- **Embeddings**: sentence-transformers
- **Fact-Checking**: Custom RAG (Retrieval-Augmented Generation)

### Data Sources

- **Social APIs**: Twitter API v2, Instagram Graph API, TikTok Research API
- **Scraping**: Playwright or Selenium (for platforms without APIs)
- **R&D Storage**: S3/Azure Blob + metadata in PostgreSQL

### Infrastructure

- **Containerization**: Docker
- **Orchestration**: Kubernetes or AWS ECS
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

---

## Security & Compliance

### Data Protection

- **Social Data**: Anonymize user info, comply with platform ToS
- **R&D Data**: Role-based access control (RBAC)
- **Generated Content**: Watermarking, audit trail

### Content Safety

- **Brand Guidelines**: Tone checker, keyword blacklist
- **Legal Review**: Flag system for claims requiring legal sign-off
- **Source Verification**: Only approved R&D documents used

---

## Scalability Considerations

### Horizontal Scaling

- Microservices architecture (trend detector, generator, reviewer)
- Load balancer for API requests
- Database read replicas

### Performance Optimization

- Redis cache for frequent queries
- Pre-generate content templates
- Batch processing for low-priority tasks
- CDN for static assets

### Cost Management

- LLM call batching
- Caching for duplicate requests
- Tiered LLM usage (GPT-4 for high-priority, GPT-3.5 for drafts)

---

## Future Enhancements

### Phase 2 (6 months)

- ✅ Multi-language support (German, French, Spanish)
- ✅ Video generation (AI avatars, voiceovers)
- ✅ A/B testing framework
- ✅ Influencer recommendation engine

### Phase 3 (12 months)

- ✅ Real-time collaboration (multiple reviewers)
- ✅ Predictive trend forecasting
- ✅ Automated posting scheduler
- ✅ Performance tracking (engagement metrics)

---

## Current Implementation (Prototype)

**What's Built**:

- ✅ Full frontend with all 5 modules
- ✅ Mock data layer (4 trends, 4 R&D docs, 3 contents)
- ✅ Simulated API delays (realistic UX)
- ✅ Complete UI/UX workflow

**What's Next** (Backend Integration):

- 🔲 Replace mock service with real API
- 🔲 Connect LLM (OpenAI/Anthropic)
- 🔲 Integrate social media APIs
- 🔲 Add PostgreSQL database
- 🔲 Deploy with Docker

---

**Current Status**: ✅ **Frontend Prototype Complete & Running**

**Access**: http://localhost:3000/
