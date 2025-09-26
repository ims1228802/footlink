import { useState } from "react";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (apiCall) => {
    setLoading(true);
    setError(null);

    try {
      return await apiCall();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}
