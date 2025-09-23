import { useAppSelector } from '@/app/hooks';

import { selectIsLoading } from '@/shared/state/loading.slice';

const GlobalLoading = () => {
  const isLoading = useAppSelector(selectIsLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"
        aria-hidden="true"
      />

      <output className="sr-only">Loading...</output>
    </div>
  );
};

export default GlobalLoading;
