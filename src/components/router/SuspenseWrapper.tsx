import { type ReactNode, Suspense } from 'react';

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div>Loading...</div>
  </div>
);

interface SuspenseWrapperProps {
  children: ReactNode;
}

const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

export default SuspenseWrapper;
