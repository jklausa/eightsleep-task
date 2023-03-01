import { useEffect, useState } from "react";

export interface FamilyUser {
  sleepDataURL: URL;
  displayName: string;
  relationship?: string;
}

export function useFamilyUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<[FamilyUser]>();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      let fetchedData = await fetch(familyURL);
      setData(await fetchedData.json());
    } catch (e) {
      setError(e);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, data, error, fetchData };
}
const familyURL =
  "https://gist.githubusercontent.com/jklausa/1a8c06f2e9c48706846244319cd407d1/raw/2420c752ed40370c131161d2bf54057e2fa86619/family-data.json";
