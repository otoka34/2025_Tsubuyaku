import React from 'react';
export default function LoadingDots2() {
    return (
      <div className="text-center mt-4 bg-orange-400 text-white px-4 py-2 rounded-lg transition w-full max-w-md font-semibold">
        <span>翻訳中です</span>
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
  