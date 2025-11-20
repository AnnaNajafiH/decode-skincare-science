import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Edit3, Eye, Clock, Shield } from "lucide-react";
import Confetti from "./Confetti";
import { GeneratedContent, TrustScore } from "../types";
import { contentService } from "../services/contentService";

const ReviewQueue: React.FC = () => {
  const [contents, setContents] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] =
    useState<GeneratedContent | null>(null);
  const [trustScore, setTrustScore] = useState<TrustScore | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [approvedMessage, setApprovedMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">(
    "pending"
  );

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const data = await contentService.getGeneratedContent();
      setContents(data);
    } catch (error) {
      console.error("Failed to load content:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTrustScore = async (contentId: string) => {
    try {
      const score = await contentService.getTrustScore(contentId);
      setTrustScore(score);
    } catch (error) {
      console.error("Failed to load trust score:", error);
    }
  };

  const handleApprove = async (contentId: string) => {
    try {
      const approved = await contentService.approveContent(
        contentId,
        reviewNotes
      );
      // update modal content status to approved so user sees it immediately
      setSelectedContent((prev) =>
        prev
          ? { ...prev, status: "approved", approvedAt: approved.approvedAt }
          : prev
      );
      setApprovedMessage("Content Approved & Published");
      setShowConfetti(true);
      setReviewNotes("");

      // keep confetti visible briefly then refresh list and close modal
      setTimeout(async () => {
        setShowConfetti(false);
        setApprovedMessage(null);
        await loadContent();
        setSelectedContent(null);
      }, 1400);
    } catch (error) {
      console.error("Failed to approve content:", error);
    }
  };

  const handleReject = async (contentId: string) => {
    try {
      await contentService.rejectContent(contentId, reviewNotes || "Rejected");
      await loadContent();
      setSelectedContent(null);
      setReviewNotes("");
    } catch (error) {
      console.error("Failed to reject content:", error);
    }
  };

  const handleViewDetails = (content: GeneratedContent) => {
    setSelectedContent(content);
    setTrustScore(null);
    loadTrustScore(content.id);
  };

  const filteredContents = contents.filter(
    (content) => filter === "all" || content.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beiersdorf-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading review queue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti />}
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-7 h-7 text-green-600" />
              Human-in-the-Loop Review Queue
            </h2>
            <p className="text-gray-600 mt-1">
              Review and approve AI-generated content before publication
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-yellow-100 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">
                {contents.filter((c) => c.status === "pending").length}
              </div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-4">
          {(["all", "pending", "approved"] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                filter === filterOption
                  ? "bg-beiersdorf-blue text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredContents.map((content) => (
          <div
            key={content.id}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      content.status
                    )}`}
                  >
                    {content.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">
                    {content.type.replace("-", " ")}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {new Date(content.generatedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Shield
                    className={`w-5 h-5 ${
                      content.confidence > 0.8
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  />
                  <span className="text-sm font-medium">
                    Confidence: {Math.round(content.confidence * 100)}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleViewDetails(content)}
                className="px-4 py-2 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Review
              </button>
            </div>

            {content.caption && (
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-700 line-clamp-2">
                  {content.caption}
                </p>
              </div>
            )}

            {content.slides && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {content.slides.slice(0, 3).map((slide) => (
                  <div
                    key={slide.number}
                    className="flex-shrink-0 w-40 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200"
                  >
                    <div className="text-xs font-bold text-purple-600 mb-1">
                      Slide {slide.number}
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-2">
                      {slide.text}
                    </p>
                  </div>
                ))}
                {content.slides.length > 3 && (
                  <div className="flex-shrink-0 w-40 bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <span className="text-sm text-gray-500">
                      +{content.slides.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2 mt-3">
              {content.hashtags?.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Review Detail Modal */}
      {selectedContent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedContent(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {approvedMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                <div className="text-green-800 font-semibold">
                  {approvedMessage}
                </div>
              </div>
            )}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Content Review
                </h3>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      selectedContent.status
                    )}`}
                  >
                    {selectedContent.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">
                    {selectedContent.type.replace("-", " ")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedContent(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Trust Score */}
            {trustScore ? (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Trust & Accuracy Score
                </h4>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.round(trustScore.overall * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Overall</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(trustScore.factualAccuracy * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Factual Accuracy
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 capitalize">
                      {trustScore.claimStrength}
                    </div>
                    <div className="text-sm text-gray-600">Claim Strength</div>
                  </div>
                </div>
                {trustScore.flags.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-yellow-800 mb-2">
                      ⚠️ Flags:
                    </p>
                    <ul className="space-y-1">
                      {trustScore.flags.map((flag, idx) => (
                        <li key={idx} className="text-sm text-yellow-700">
                          • {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 mb-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-beiersdorf-blue"></div>
                <span className="ml-3 text-gray-600">
                  Loading trust score...
                </span>
              </div>
            )}

            {/* Content Details */}
            <div className="space-y-4 mb-6">
              {selectedContent.slides && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Carousel Slides
                  </h4>
                  <div className="space-y-3">
                    {selectedContent.slides.map((slide) => (
                      <div
                        key={slide.number}
                        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200"
                      >
                        <div className="text-sm font-bold text-purple-600 mb-2">
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

              {selectedContent.caption && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Caption</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">{selectedContent.caption}</p>
                  </div>
                </div>
              )}

              {selectedContent.hashtags && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedContent.hashtags.map((tag) => (
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
            </div>

            {/* Review Notes */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Review Notes (Optional)
              </label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add notes about edits or approval reasoning..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beiersdorf-blue focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            {selectedContent.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(selectedContent.id)}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve & Publish
                </button>
                <button
                  onClick={() => handleReject(selectedContent.id)}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </button>
                <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Edit
                </button>
              </div>
            )}

            {selectedContent.status === "approved" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-medium">
                  Content Approved & Published
                </p>
                {selectedContent.approvedAt && (
                  <p className="text-sm text-green-600 mt-1">
                    {new Date(selectedContent.approvedAt).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewQueue;
