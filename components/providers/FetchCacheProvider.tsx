import { type ReactNode, createContext, useContext, useState } from 'react';

type FetchCache<T> = Map<string, T>;

const FetchCacheContext = createContext<FetchCache<any>>(new Map());

export default function FetchCacheProvider<T>({
  children,
}: {
  children: ReactNode;
}) {
  const [cache] = useState<FetchCache<T>>(new Map());

  return (
    <FetchCacheContext.Provider value={cache}>
      {children}
    </FetchCacheContext.Provider>
  );
}

export const useFetchCache = <T,>() =>
  useContext(FetchCacheContext) as FetchCache<T>;
