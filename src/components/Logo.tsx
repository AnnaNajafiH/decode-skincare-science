import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-beiersdorf-blue rounded-lg flex items-center justify-center">
        {/* Simple, generic mark inspired by a droplet/crest — keeps it brand-adjacent without copying trademarks */}
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M12 2C9.5 5 7 8 7 11a5 5 0 0010 0c0-3-2.5-6-5-9z"
            fill="white"
          />
          <path
            d="M9.8 15.6c.9.8 2.1 1.4 3.4 1.4 1.3 0 2.5-.6 3.4-1.4a4.6 4.6 0 00-6.8 0z"
            fill="rgba(255,255,255,0.9)"
          />
        </svg>
      </div>

      <div>
        <h1 className="text-xl font-bold text-gray-900">DermaSignal</h1>
        <p className="text-xs text-gray-500">a Beiersdorf Studio</p>
      </div>
    </div>
  );
};

export default Logo;
