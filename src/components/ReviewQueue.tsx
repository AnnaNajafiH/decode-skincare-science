import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Edit3, Eye, Clock, Shield } from "lucide-react";
import Confetti from "./Confetti";
import { GeneratedContent } from "../types";
import { contentService } from "../services/contentService";

const ReviewQueue: React.FC = () => {
  const [contents, setContents] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] =
    useState<GeneratedContent | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [approvedMessage, setApprovedMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("pending");

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
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
              <span className="hidden sm:inline">
                Human-in-the-Loop Review Queue
              </span>
              <span className="sm:hidden">Review Queue</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Review and approve AI-generated content before publication
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 sm:px-4 py-2 bg-yellow-100 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-yellow-700">
                {contents.filter((c) => c.status === "pending").length}
              </div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {(["all", "pending", "approved", "rejected"] as const).map(
            (filterOption) => {
              // Define button styling based on filter type
              let activeStyle = "";
              let inactiveStyle = "";
              let icon = null;

              switch (filterOption) {
                case "rejected":
                  activeStyle = "bg-red-600 text-white shadow-md";
                  inactiveStyle =
                    "bg-red-50 text-red-700 border-2 border-red-300 hover:bg-red-100";
                  icon = <XCircle className="w-4 h-4" />;
                  break;
                case "approved":
                  activeStyle = "bg-green-600 text-white shadow-md";
                  inactiveStyle =
                    "bg-green-50 text-green-700 border-2 border-green-300 hover:bg-green-100";
                  icon = <CheckCircle className="w-4 h-4" />;
                  break;
                case "pending":
                  activeStyle = "bg-yellow-600 text-white shadow-md";
                  inactiveStyle =
                    "bg-yellow-50 text-yellow-700 border-2 border-yellow-300 hover:bg-yellow-100";
                  icon = <Clock className="w-4 h-4" />;
                  break;
                case "all":
                  activeStyle = "bg-beiersdorf-blue text-white shadow-md";
                  inactiveStyle =
                    "bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200";
                  icon = <Eye className="w-4 h-4" />;
                  break;
              }

              return (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition capitalize flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                    filter === filterOption ? activeStyle : inactiveStyle
                  }`}
                >
                  {icon}
                  <span className="whitespace-nowrap">{filterOption}</span>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredContents.map((content) => (
          <div
            key={content.id}
            className={`rounded-xl shadow-sm p-4 sm:p-6 border-2 hover:shadow-md transition ${
              content.status === "rejected"
                ? "bg-red-50 border-red-300 opacity-75"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(
                      content.status
                    )} ${content.status === "rejected" ? "animate-pulse" : ""}`}
                  >
                    {content.status === "rejected"
                      ? "❌ REJECTED"
                      : content.status.toUpperCase()}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 capitalize">
                    {content.type.replace("-", " ")}
                  </span>
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">
                      {new Date(content.generatedAt).toLocaleString()}
                    </span>
                    <span className="sm:hidden">
                      {new Date(content.generatedAt).toLocaleDateString()}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Shield
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      content.status === "rejected"
                        ? "text-red-500"
                        : content.confidence > 0.8
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  />
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      content.status === "rejected" ? "text-red-700" : ""
                    }`}
                  >
                    Confidence: {Math.round(content.confidence * 100)}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleViewDetails(content)}
                className={`px-3 sm:px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap ${
                  content.status === "rejected"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-beiersdorf-blue text-white hover:bg-beiersdorf-navy"
                }`}
              >
                <Eye className="w-4 h-4" />
                {content.status === "rejected" ? "View Rejection" : "Review"}
              </button>
            </div>

            {content.caption && (
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-3">
                <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">
                  {content.caption}
                </p>
              </div>
            )}

            {content.slides && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {content.slides.slice(0, 3).map((slide) => (
                  <div
                    key={slide.number}
                    className={`flex-shrink-0 w-32 sm:w-40 rounded-lg p-2 sm:p-3 border ${
                      content.status === "rejected"
                        ? "bg-red-100 border-red-300"
                        : "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200"
                    }`}
                  >
                    <div
                      className={`text-xs font-bold mb-1 ${
                        content.status === "rejected"
                          ? "text-red-700"
                          : "text-purple-600"
                      }`}
                    >
                      Slide {slide.number}
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-2">
                      {slide.text}
                    </p>
                  </div>
                ))}
                {content.slides.length > 3 && (
                  <div className="flex-shrink-0 w-32 sm:w-40 bg-gray-100 rounded-lg p-2 sm:p-3 flex items-center justify-center">
                    <span className="text-xs sm:text-sm text-gray-500">
                      +{content.slides.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            )}

            {content.status === "rejected" && content.reviewerNotes && (
              <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-xs font-semibold text-red-900 mb-1">
                  Rejection Reason:
                </p>
                <p className="text-xs text-red-800 line-clamp-2">
                  {content.reviewerNotes}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              {content.hashtags?.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded-full ${
                    content.status === "rejected"
                      ? "bg-red-100 text-red-700 line-through"
                      : "bg-beiersdorf-light text-beiersdorf-blue"
                  }`}
                >
                  #{tag.replace(/\s+/g, "")}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Review Detail Modal */}
      {selectedContent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedContent(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 my-2 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {approvedMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                <div className="text-sm sm:text-base text-green-800 font-semibold">
                  {approvedMessage}
                </div>
              </div>
            )}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
                  Content Review
                </h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(
                      selectedContent.status
                    )}`}
                  >
                    {selectedContent.status === "rejected"
                      ? "❌ REJECTED"
                      : selectedContent.status.toUpperCase()}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 capitalize">
                    {selectedContent.type.replace("-", " ")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedContent(null)}
                className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl ml-2 flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Rejection Reason - Show prominently if rejected */}
            {selectedContent.status === "rejected" &&
              selectedContent.reviewerNotes && (
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2 text-base sm:text-lg">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    Rejection Reason
                  </h4>
                  <p className="text-sm sm:text-base text-red-800 leading-relaxed">
                    {selectedContent.reviewerNotes}
                  </p>
                  {selectedContent.editedBy && (
                    <p className="text-xs sm:text-sm text-red-600 mt-3">
                      Reviewed by: {selectedContent.editedBy}
                    </p>
                  )}
                </div>
              )}

            {/* Trust Score - Temporarily disabled 
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
            <div className="space-y-4 mb-4 sm:mb-6">
              {selectedContent.slides && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                    Carousel Slides
                  </h4>
                  <div className="space-y-3">
                    {selectedContent.slides.map((slide) => (
                      <div
                        key={slide.number}
                        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 sm:p-4 border border-purple-200"
                      >
                        <div className="text-xs sm:text-sm font-bold text-purple-600 mb-2">
                          SLIDE {slide.number}
                        </div>
                        <p className="text-sm sm:text-base text-gray-900 font-medium mb-2">
                          {slide.text}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 italic">
                          💡 {slide.visualHint}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedContent.caption && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                    Caption
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <p className="text-sm sm:text-base text-gray-900">
                      {selectedContent.caption}
                    </p>
                  </div>
                </div>
              )}

              {selectedContent.hashtags && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                    Hashtags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedContent.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-full text-xs sm:text-sm"
                      >
                        #{tag.replace(/\s+/g, "")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Review Notes */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                Review Notes (Optional)
              </label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add notes about edits or approval reasoning..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-beiersdorf-blue focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            {selectedContent.status === "pending" && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleApprove(selectedContent.id)}
                  className="flex-1 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Approve & Publish</span>
                  <span className="sm:hidden">Approve</span>
                </button>
                <button
                  onClick={() => handleReject(selectedContent.id)}
                  className="flex-1 py-2.5 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Reject
                </button>
                <button className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-beiersdorf-blue bg-white text-beiersdorf-blue rounded-lg hover:bg-beiersdorf-light transition font-semibold flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Edit
                </button>
              </div>
            )}

            {selectedContent.status === "approved" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-2" />
                <p className="text-sm sm:text-base text-green-800 font-medium">
                  Content Approved & Published
                </p>
                {selectedContent.approvedAt && (
                  <p className="text-xs sm:text-sm text-green-600 mt-1">
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
