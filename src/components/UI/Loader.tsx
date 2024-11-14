import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-40 h-40 border-[6px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
