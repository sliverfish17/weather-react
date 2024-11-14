import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className="min-h-screen max-w-[1144px] px-4 mx-auto container">{children}</div>;
};
