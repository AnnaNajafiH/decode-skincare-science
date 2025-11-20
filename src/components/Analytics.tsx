import React from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  AlertCircle,
} from "lucide-react";

const Analytics: React.FC = () => {
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
    </div>
  );
};

export default Analytics;
