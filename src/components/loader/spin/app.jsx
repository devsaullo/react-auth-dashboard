import React from 'react';

export const Spinner = () => {
  return (
    <div
      className="ml-1 w-4 h-4 border-slate-100 bg-transparent border-2 border-solid border-t-transparent rounded-full"
      style={{
        animation: 'spin 600ms linear infinite',
      }}
    >
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

