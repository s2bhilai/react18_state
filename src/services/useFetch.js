import { useState, useEffect, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const isMounted = useRef(false); // React will track this value between renders
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true; //Since useEffect is run after component mounts
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          if (isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
      // getProducts("shoes")
      //   .then((response) => setProducts(response))
      //   .catch((e) => setError(e))
      //   .finally(() => setLoading(false));
    }

    init();

    //This function called when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data, error, loading };
}
