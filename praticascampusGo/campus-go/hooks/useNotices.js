
import { useCallback, useEffect, useState } from 'react';
import { getNotices } from '../services/api';

export default function useNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotices = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const data = await getNotices();
      setNotices(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar avisos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadNotices();
  }, [loadNotices]);

  const retry = () => loadNotices();
  const refresh = () => loadNotices(true);

  return {
    notices,
    loading,
    error,
    refreshing,
    retry,
    refresh,
  };
}
