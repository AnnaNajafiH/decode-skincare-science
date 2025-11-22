import React, { useState, useEffect } from "react";
import { TrendingUp, Flame, ArrowUp, Clock, Hash, Eye } from "lucide-react";
import { Trend } from "../types";
import { contentService } from "../services/contentService";

type TrendDashboardProps = {
  onCreatePost?: (trendId: string) => void;
};

const TrendDashboard: React.FC<TrendDashboardProps> = ({ onCreatePost }) => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [filter, setFilter] = useState<"all" | "hot" | "rising">("all");

  useEffect(() => {
    loadTrends();
  }, []);

  const loadTrends = async () => {
    setLoading(true);
    try {
      const data = await contentService.getTrends();
      setTrends(data);
    } catch (error) {
      console.error("Failed to load trends:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrends = trends.filter(
    (trend) => filter === "all" || trend.velocity === filter
  );

  const getVelocityIcon = (velocity: string) => {
    switch (velocity) {
      case "hot":
        return <Flame className="w-5 h-5 text-red-500" />;
      case "rising":
        return <ArrowUp className="w-5 h-5 text-orange-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
    }
  };

  const getVelocityColor = (velocity: string) => {
    switch (velocity) {
      case "hot":
        return "bg-red-100 text-red-700 border-red-300";
      case "rising":
        return "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return "bg-blue-100 text-blue-700 border-blue-300";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beiersdorf-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Detecting trends...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-beiersdorf-blue" />
              Trend Detection Dashboard
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Real-time social media trend analysis for skincare science
            </p>
          </div>
          <button
            onClick={loadTrends}
            className="px-4 py-2 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap self-start sm:self-auto"
          >
            <Clock className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {(["all", "hot", "rising"] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                filter === filterOption
                  ? "bg-beiersdorf-blue text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredTrends.map((trend) => (
          <div
            key={trend.id}
            onClick={() => setSelectedTrend(trend)}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {getVelocityIcon(trend.velocity)}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold border ${getVelocityColor(
                    trend.velocity
                  )}`}
                >
                  {trend.velocity.toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-beiersdorf-blue">
                  {trend.score}
                </div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {trend.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {trend.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Clock className="w-4 h-4" />
              {new Date(trend.detectedAt).toLocaleDateString()}
            </div>

            <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
              {trend.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs"
                >
                  <Hash className="w-3 h-3" />
                  {keyword.replace(/\s+/g, "")}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-200 space-y-2">
              <span className="text-xs text-gray-500 block">
                {trend.relatedPosts.length} related posts
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Determine urgency: only hot velocity gets urgent treatment */}
                {(() => {
                  const isHot = trend.velocity === "hot";
                  const baseBtn = isHot
                    ? "text-xs text-white px-2.5 py-1 rounded-md font-bold shadow-lg transform-gpu hover:scale-105 transition whitespace-nowrap"
                    : "text-xs bg-beiersdorf-blue text-white px-2.5 py-1 rounded-md font-medium hover:bg-beiersdorf-navy transition whitespace-nowrap";
                  const hotBg = isHot
                    ? "bg-gradient-to-r from-red-600 to-orange-500 pulse-glow-hot"
                    : "bg-beiersdorf-blue";
                  return (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCreatePost && onCreatePost(trend.id);
                        }}
                        className={`${baseBtn} ${hotBg}`}
                        aria-label={
                          isHot
                            ? `Create post urgently for ${trend.name}`
                            : `Create post for ${trend.name}`
                        }
                      >
                        {isHot ? (
                          <span className="flex items-center gap-1.5">
                            <span>Act Now</span>
                          </span>
                        ) : (
                          <span>Create Post</span>
                        )}
                      </button>

                      {isHot && (
                        <span className="urgent-badge bg-red-50 text-red-700 whitespace-nowrap px-2 py-1 text-xs rounded">
                          🔥 High priority
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTrend(trend);
                        }}
                        className="text-xs text-beiersdorf-blue font-medium hover:underline flex items-center gap-1 whitespace-nowrap"
                      >
                        <Eye className="w-3 h-3" />
                        View Details
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Detail Modal */}
      {selectedTrend && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTrend(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {selectedTrend.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {selectedTrend.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedTrend(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl flex-shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
              <div className="bg-beiersdorf-light rounded-lg p-3 sm:p-4">
                <div className="text-2xl sm:text-3xl font-bold text-beiersdorf-blue">
                  {selectedTrend.score}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Trend Score
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="text-base sm:text-lg font-bold text-gray-900 capitalize">
                  {selectedTrend.velocity}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Velocity</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="text-base sm:text-lg font-bold text-gray-900">
                  {selectedTrend.relatedPosts.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Posts</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTrend.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-full text-sm"
                  >
                    #{keyword.replace(/\s+/g, "")}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Related Social Posts
              </h4>
              <div className="space-y-3">
                {selectedTrend.relatedPosts.map((post) => (
                  <div key={post.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-gray-900">
                        {post.author}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {post.platform}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{post.text}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>❤️ {post.likes.toLocaleString()}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedTrend(null)}
              className="w-full py-3 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendDashboard;
