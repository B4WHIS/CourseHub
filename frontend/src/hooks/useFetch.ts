// Custom hook để fetch dữ liệu từ API
import { useState, useEffect } from 'react';

// Kết quả trả về từ hook
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hàm gọi API
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Lỗi khi tải dữ liệu');
        }

        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err: unknown) {
        // Nếu lỗi thì lưu message vào error state
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Lỗi không xác định');
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
