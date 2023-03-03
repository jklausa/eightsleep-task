import { useCallback, useState } from 'react';

import { useFetchCache } from '#components/providers/FetchCacheProvider';

const doFetch = async <T>(
  url: string,
  cache: Map<string, any>,
  controller: AbortController
): Promise<T> => {
  const response = await fetch(url, {
    signal: controller.signal,
  });

  const data = await response.json();

  cache.set(url, data);

  return data;
};

export const useNetworkData = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<T>();
  const [requestUrl, setRequestUrl] = useState<string>();

  const cache = useFetchCache<T>();

  const fetchData = useCallback(
    (url: string, readFromCache: boolean = true) => {
      const controller = new AbortController();

      if (isLoading) {
        return;
      }

      if (readFromCache && cache.has(url)) {
        setData(cache.get(url));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setRequestUrl(url);

      doFetch<T>(url, cache, controller)
        .then((data) => {
          setData(data);
          setError(undefined);
        })
        .catch((e) => {
          console.error(`Error fetching data from URL: ${url}`, e);
          setError(e);
        })
        .finally(() => {
          setIsLoading(false);
        });

      return () => {
        controller.abort();
      };
    },
    [cache, isLoading]
  );

  const refetch = useCallback(() => {
    if (requestUrl != null) {
      fetchData(requestUrl, false);
    }
  }, [fetchData, requestUrl]);

  return { isLoading, data, error, fetchData, refetch };
};
