import { useCallback, useEffect, useState } from 'react';

export const useNetworkData = <T>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<T>();

  const fetchData = useCallback(() => {
    const run = async () => {
      setIsLoading(true);

      try {
        const fetchedData = await fetch(url);
        setData(await fetchedData.json());
        setError(undefined);
      } catch (e) {
        setData(undefined);
        if (e instanceof Error) {
          setError(e);
        } else {
          setError(new Error(`Unknown error`));
        }
      }

      setIsLoading(false);
    };

    run().catch((e) => {
      setError(e);
    });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, data, error, refetch: fetchData };
};
