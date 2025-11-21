import React from "react";

/**
 * Brand-adjacent Logo component.
 * This intentionally avoids reproducing the official Beiersdorf trademark.
 * It uses the brand color and a simple 'B' monogram mark with the app name
 * and a small "Beiersdorf Studio" descriptor to make the affiliation clear.
 */
const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-beiersdorf-blue rounded-md flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <rect width="28" height="28" rx="6" fill="#0032A3" />
          <path
            d="M9.5 8.5h3.8c1.6 0 2.8.9 2.8 2.4 0 .9-.5 1.6-1.2 1.9.9.2 1.6.9 1.6 2.1 0 1.8-1.4 3-3.6 3H9.5V8.5zM11 10.2v5.5h1.9c1 0 1.6-.5 1.6-1.3 0-.8-.6-1.2-1.6-1.2H11z"
            fill="white"
          />
        </svg>
      </div>

      <div>
        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
          B.SkinWise
        </h1>
        <p className="text-xs text-gray-500">Beiersdorf Studio</p>
      </div>
    </div>
  );
};

export default Logo;
