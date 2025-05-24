// loading.tsx
import React from 'react';

export default function LoadingDots() {
  return (
    <div className="text-gray-500 text-lg font-medium flex items-center space-x-1">
      <span>変換中です</span>
      <span className="dot dot1">.</span>
      <span className="dot dot2">.</span>
      <span className="dot dot3">.</span>

      <style jsx>{`
        .dot {
          animation: bounce 1.2s infinite;
          display: inline-block;
        }
        .dot1 {
          animation-delay: 0s;
        }
        .dot2 {
          animation-delay: 0.2s;
        }
        .dot3 {
          animation-delay: 0.4s;
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
