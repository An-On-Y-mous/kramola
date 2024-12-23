import React from "react";

const NewsLoadingSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-4">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="flex items-center space-x-4">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Featured Article */}
      <div className="space-y-4">
        <div className="h-64 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Article List */}
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex space-x-4">
          <div className="h-24 w-24 bg-gray-200 rounded animate-pulse flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsLoadingSkeleton;
