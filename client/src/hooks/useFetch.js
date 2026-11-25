import { useCallback, useEffect, useState } from 'react';
import api from '../api/axios.js';

export default function useFetch(url, { fallback = null, enabled = true } = {}) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!enabled) {
      setData(fallback);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: result } = await api.get(url);
      const isEmptyArray = Array.isArray(result) && result.length === 0;
      setData(isEmptyArray ? fallback : result);
    } catch (err) {
      setError(err);
      setData(fallback);
    } finally {
      setLoading(false);
    }
  }, [url, fallback, enabled]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}
