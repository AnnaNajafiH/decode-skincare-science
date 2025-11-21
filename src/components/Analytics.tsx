import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  AlertCircle,
  History,
  Calendar,
  Instagram,
  ExternalLink,
} from "lucide-react";

const Analytics: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  // Mock analytics data
  const stats = {
    trendsDetected: 47,
    contentGenerated: 124,
    contentApproved: 98,
    avgConfidence: 87,
    avgApprovalTime: "4.2 mins",
    reviewerEditRate: 23,
  };

  const trendingTopics = [
    { name: "Glass Skin", posts: 12400, growth: "+245%" },
    { name: "Niacinamide", posts: 8900, growth: "+189%" },
    { name: "Slugging", posts: 6700, growth: "+156%" },
    { name: "Retinol Alternatives", posts: 5400, growth: "+143%" },
    { name: "Ceramides", posts: 4200, growth: "+98%" },
  ];

  const contentPerformance = [
    {
      type: "Instagram Carousel",
      generated: 45,
      approved: 38,
      avgConfidence: 88,
    },
    { type: "Reels", generated: 52, approved: 42, avgConfidence: 85 },
    { type: "Video Scripts", generated: 27, approved: 18, avgConfidence: 79 },
  ];

  // Mock posted content history
  const postedHistory = [
    {
      id: "post1",
      date: "2025-11-20",
      platform: "Instagram",
      type: "Carousel",
      topic: "Glass Skin",
      slides: 5,
      likes: 2847,
      comments: 156,
      url: "https://instagram.com/p/example1",
    },
    {
      id: "post2",
      date: "2025-11-19",
      platform: "Instagram",
      type: "Reel",
      topic: "Niacinamide Benefits",
      slides: 1,
      likes: 4521,
      comments: 289,
      url: "https://instagram.com/p/example2",
    },
    {
      id: "post3",
      date: "2025-11-18",
      platform: "Instagram",
      type: "Carousel",
      topic: "Slugging Routine",
      slides: 4,
      likes: 1923,
      comments: 94,
      url: "https://instagram.com/p/example3",
    },
    {
      id: "post4",
      date: "2025-11-17",
      platform: "Instagram",
      type: "Carousel",
      topic: "Retinol Alternatives",
      slides: 5,
      likes: 3156,
      comments: 201,
      url: "https://instagram.com/p/example4",
    },
    {
      id: "post5",
      date: "2025-11-16",
      platform: "Instagram",
      type: "Carousel",
      topic: "Ceramides Explained",
      slides: 5,
      likes: 2634,
      comments: 142,
      url: "https://instagram.com/p/example5",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <BarChart3 className="w-7 h-7 text-pink-600" />
          Analytics & Insights
        </h2>
        <p className="text-gray-600">
          Monitor system performance and content effectiveness
        </p>
      </div>
      {/* Posted Content History Button */}
      <div className="bg-gradient-to-br from-beiersdorf-blue to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <History className="w-6 h-6" />
              Posted Content History
            </h3>
            <p className="text-sm opacity-90 mb-4">
              View all content that has been published across platforms
            </p>
            <button
              onClick={() => setShowHistory(true)}
              className="bg-white text-beiersdorf-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md flex items-center gap-2"
            >
              <History className="w-5 h-5" />
              View History ({postedHistory.length} posts)
            </button>
          </div>
          <div className="hidden lg:block text-6xl opacity-20">📊</div>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-80">Last 30 Days</span>
          </div>
          <div className="text-4xl font-bold mb-1">{stats.trendsDetected}</div>
          <div className="text-sm opacity-90">Trends Detected</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-80">Total</span>
          </div>
          <div className="text-4xl font-bold mb-1">
            {stats.contentGenerated}
          </div>
          <div className="text-sm opacity-90">Content Pieces Generated</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-80">
              Approval Rate
            </span>
          </div>
          <div className="text-4xl font-bold mb-1">
            {Math.round((stats.contentApproved / stats.contentGenerated) * 100)}
            %
          </div>
          <div className="text-sm opacity-90">
            {stats.contentApproved} Approved
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.avgConfidence}%
              </div>
              <div className="text-sm text-gray-600">Avg Confidence Score</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${stats.avgConfidence}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.avgApprovalTime}
              </div>
              <div className="text-sm text-gray-600">Avg Review Time</div>
            </div>
          </div>
          <p className="text-xs text-gray-500">From generation to approval</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.reviewerEditRate}%
              </div>
              <div className="text-sm text-gray-600">Reviewer Edit Rate</div>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Content modified before approval
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Topics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-beiersdorf-blue" />
            Top Trending Topics
          </h3>
          <div className="space-y-4">
            {trendingTopics.map((topic, idx) => (
              <div
                key={topic.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-beiersdorf-blue to-beiersdorf-accent text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{topic.name}</p>
                    <p className="text-sm text-gray-500">
                      {topic.posts.toLocaleString()} mentions
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {topic.growth}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-beiersdorf-blue" />
            Content Type Performance
          </h3>
          <div className="space-y-4">
            {contentPerformance.map((item) => (
              <div
                key={item.type}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{item.type}</h4>
                  <span className="text-sm text-gray-500">
                    {item.avgConfidence}% confidence
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex-1">
                    <div className="text-gray-600 mb-1">Generated</div>
                    <div className="font-bold text-gray-900">
                      {item.generated}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-600 mb-1">Approved</div>
                    <div className="font-bold text-green-600">
                      {item.approved}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-600 mb-1">Rate</div>
                    <div className="font-bold text-beiersdorf-blue">
                      {Math.round((item.approved / item.generated) * 100)}%
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-beiersdorf-blue h-2 rounded-full"
                    style={{
                      width: `${(item.approved / item.generated) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold text-green-700">Trend Detection</div>
            <div className="text-sm text-gray-600 mt-1">Operational</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold text-green-700">LLM Generator</div>
            <div className="text-sm text-gray-600 mt-1">Operational</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold text-green-700">Trust Checker</div>
            <div className="text-sm text-gray-600 mt-1">Operational</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-3xl mb-2">⚠️</div>
            <div className="font-semibold text-yellow-700">Social APIs</div>
            <div className="text-sm text-gray-600 mt-1">Rate Limited</div>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setShowHistory(false)}
        >
          <div
            className="relative max-w-5xl w-full my-8 bg-white rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-xl p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <History className="w-7 h-7 text-beiersdorf-blue" />
                  Posted Content History
                </h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                All content published to social media platforms
              </p>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {postedHistory.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Instagram className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              {post.topic}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <span className="px-3 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-full text-sm font-semibold">
                            {post.type}
                          </span>
                          {post.slides > 1 && (
                            <span className="text-sm text-gray-600">
                              {post.slides} slides
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-red-500">❤️</span>
                            <span className="font-semibold text-gray-700">
                              {post.likes.toLocaleString()}
                            </span>
                            <span className="text-gray-500">likes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">💬</span>
                            <span className="font-semibold text-gray-700">
                              {post.comments}
                            </span>
                            <span className="text-gray-500">comments</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition font-medium flex items-center gap-2 whitespace-nowrap"
                      >
                        View Post
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {postedHistory.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-20">📭</div>
                  <p className="text-gray-500 text-lg">
                    No content has been posted yet
                  </p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 rounded-b-xl p-4">
              <button
                onClick={() => setShowHistory(false)}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
