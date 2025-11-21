import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Instagram,
  Play,
  FileVideo,
  Loader2,
  CheckCircle,
  Eye,
} from "lucide-react";
import { Trend, GeneratedContent } from "../types";
import { contentService } from "../services/contentService";
import InstagramPost from "./InstagramPost";
import Confetti from "./Confetti";

type ContentGeneratorProps = {
  preselectedTrendId?: string;
};

const ContentGenerator: React.FC<ContentGeneratorProps> = ({
  preselectedTrendId,
}) => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<string>("");
  const [contentType, setContentType] = useState<string>("instagram-carousel");
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    loadTrends();
  }, []);

  // When parent sets a preselected trend (e.g. from the TrendDashboard), pick it
  useEffect(() => {
    if (preselectedTrendId) {
      setSelectedTrend(preselectedTrendId);
    }
  }, [preselectedTrendId]);

  const loadTrends = async () => {
    try {
      const data = await contentService.getTrends();
      setTrends(data);
      // Prefer preselectedTrendId if provided, otherwise default to first
      if (preselectedTrendId) {
        const found = data.find((t) => t.id === preselectedTrendId);
        if (found) setSelectedTrend(preselectedTrendId);
        else if (data.length > 0) setSelectedTrend(data[0].id);
      } else if (data.length > 0) setSelectedTrend(data[0].id);
    } catch (error) {
      console.error("Failed to load trends:", error);
    }
  };

  const handleGenerate = async () => {
    if (!selectedTrend) return;

    setGenerating(true);
    setGeneratedContent(null);

    try {
      const content = await contentService.generateContent(
        selectedTrend,
        contentType
      );
      setGeneratedContent(content);
      // small celebration when generation finishes
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1600);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setGenerating(false);
    }
  };

  const contentTypes = [
    { id: "instagram-carousel", name: "Instagram Carousel", icon: Instagram },
    { id: "reel", name: "Reel Caption", icon: Play },
    { id: "video-script", name: "Video Script", icon: FileVideo },
  ];

  const selectedTrendData = trends.find((t) => t.id === selectedTrend);

  return (
    <div className="space-y-6">
      {/* Celebration confetti */}
      {showConfetti && <Confetti />}
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <Sparkles className="w-7 h-7 text-purple-600" />
          Content Generator
        </h2>
        <p className="text-gray-600">
          Transform trending topics into engaging, science-backed content for
          Gen Z
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Trend
            </label>
            <select
              value={selectedTrend}
              onChange={(e) => setSelectedTrend(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beiersdorf-blue focus:border-transparent"
            >
              {trends.map((trend) => (
                <option key={trend.id} value={trend.id}>
                  {trend.name} (Score: {trend.score})
                </option>
              ))}
            </select>

            {selectedTrendData && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  {selectedTrendData.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTrendData.keywords.slice(0, 4).map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-2 py-1 bg-white rounded-md text-gray-600"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Content Type
            </label>
            <div className="space-y-2">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition ${
                    contentType === type.id
                      ? "border-beiersdorf-blue bg-beiersdorf-light"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <type.icon className="w-5 h-5" />
                  <span className="font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating || !selectedTrend}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-beiersdorf-blue text-white rounded-lg hover:from-purple-700 hover:to-beiersdorf-navy transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Content
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          {!generatedContent && !generating && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <Sparkles className="w-16 h-16 mb-4 opacity-20" />
              <p>Select a trend and content type, then click Generate</p>
            </div>
          )}

          {generating && (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-12 h-12 animate-spin text-beiersdorf-blue mb-4" />
              <p className="text-gray-600">AI is crafting your content...</p>
              <p className="text-sm text-gray-500 mt-2">
                This may take a few seconds
              </p>
            </div>
          )}

          {generatedContent && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  Generated Content
                </h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  <CheckCircle className="w-4 h-4" />
                  {Math.round(generatedContent.confidence * 100)}% Confidence
                </div>
              </div>

              {generatedContent.slides && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Carousel Slides
                  </h4>
                  <div className="space-y-3">
                    {generatedContent.slides.map((slide) => (
                      <div
                        key={slide.number}
                        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200"
                      >
                        <div className="text-xs font-bold text-purple-600 mb-2">
                          SLIDE {slide.number}
                        </div>
                        <p className="text-gray-900 font-medium mb-2">
                          {slide.text}
                        </p>
                        <p className="text-sm text-gray-600 italic">
                          💡 {slide.visualHint}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {generatedContent.caption && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Caption</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">{generatedContent.caption}</p>
                  </div>
                </div>
              )}

              {generatedContent.hashtags && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {generatedContent.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {generatedContent.script && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Video Script
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-900 whitespace-pre-wrap font-sans">
                      {generatedContent.script}
                    </pre>
                  </div>
                </div>
              )}

              {generatedContent.visualSuggestions && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Visual Suggestions
                  </h4>
                  <ul className="space-y-2">
                    {generatedContent.visualSuggestions.map(
                      (suggestion, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="text-purple-600">•</span>
                          {suggestion}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3">
                  📚 R&D References: {generatedContent.rdReferences.join(", ")}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    Preview as Instagram Post
                  </button>
                  <button
                    onClick={async () => {
                      if (!generatedContent) return;
                      setSending(true);
                      setSendSuccess(null);
                      try {
                        const submitted = await contentService.submitForReview(
                          generatedContent
                        );
                        setSendSuccess(submitted.id);
                        // celebration on successful send
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 1600);
                      } catch (err) {
                        console.error("Failed to send to review:", err);
                        setSendSuccess(null);
                      } finally {
                        setSending(false);
                      }
                    }}
                    disabled={sending || !generatedContent}
                    className="flex-1 py-3 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition font-medium disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send to Review Queue"
                    )}
                  </button>
                </div>
                {sendSuccess && (
                  <div className="mt-3 text-sm text-green-600 font-medium">
                    Sent to review (id: {sendSuccess})
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instagram Preview Modal */}
      {showPreview && generatedContent && generatedContent.slides && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="relative max-w-lg w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕ Close Preview
            </button>
            <InstagramPost
              username="@beiersdorf"
              slides={generatedContent.slides.map((slide) => ({
                text: slide.text,
                visualHint: slide.visualHint,
              }))}
              caption={generatedContent.caption || ""}
              hashtags={generatedContent.hashtags || []}
              likes={2847}
              timeAgo="Just now"
              product={{
                name: "Bioderma Sensibio H2O",
                url: "",
                image: "/assets/brand/bioderma-sensibio.jpg",
                sku: "SENS-H2O",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
