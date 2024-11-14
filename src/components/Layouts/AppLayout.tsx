import { ReactNode } from 'react';
import { Container } from 'src/components/UI';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};
