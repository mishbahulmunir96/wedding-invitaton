"use client";

import { FC } from "react";

interface FloralDividerProps {
  flipped?: boolean;
}

const FloralDivider: FC<FloralDividerProps> = ({ flipped = false }) => {
  return (
    <div
      className="relative flex items-center justify-center py-8"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 60"
        className={`h-12 w-full max-w-md ${flipped ? "rotate-180" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4a017" stopOpacity="0" />
            <stop offset="50%" stopColor="#e8c44a" stopOpacity="1" />
            <stop offset="100%" stopColor="#d4a017" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line
          x1="20"
          y1="30"
          x2="380"
          y2="30"
          stroke="url(#goldGrad)"
          strokeWidth="1"
        />

        <g
          transform="translate(140 30)"
          stroke="#d4a017"
          strokeWidth="0.8"
          fill="none"
        >
          <path d="M0 0 Q -10 -6 -20 0 Q -10 6 0 0" opacity="0.7" />
          <circle cx="-22" cy="0" r="1.2" fill="#e8c44a" />
        </g>

        <g transform="translate(200 30)">
          <circle
            cx="0"
            cy="0"
            r="10"
            fill="none"
            stroke="#d4a017"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <path
            d="M0 -6 L4 0 L0 6 L-4 0 Z"
            fill="#d4a017"
            opacity="0.9"
          />
          <circle cx="0" cy="0" r="1.5" fill="#f5d87a" />
        </g>

        <g
          transform="translate(260 30)"
          stroke="#d4a017"
          strokeWidth="0.8"
          fill="none"
        >
          <path d="M0 0 Q 10 -6 20 0 Q 10 6 0 0" opacity="0.7" />
          <circle cx="22" cy="0" r="1.2" fill="#e8c44a" />
        </g>
      </svg>
    </div>
  );
};

export default FloralDivider;
