// hooks/useScoreStream.ts
import { useEffect, useRef, useState } from 'react';
import EventSource from 'react-native-sse';
import { API_BASE_URL } from '../helpers/apiHelper';

interface UseScoreStreamProps {
  username: string;
  active: boolean;
  timeoutMs?: number;
}

interface ScoreEvent {
  score?: number;
}

const useScoreStream = ({
  username,
  active,
  timeoutMs = 60000,
}: UseScoreStreamProps) => {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // gunakan refs untuk finalization timer & buffer supaya bisa dibersihkan pada cleanup
  const finalizationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const bufferedScoreRef = useRef<number | null>(null);

  useEffect(() => {
    // jika tidak aktif atau username kosong, pastikan hook reset dan cleanup
    if (!active || !username) {
      // cleanup existing ES connection
      if (eventSourceRef.current) {
        try {
          eventSourceRef.current.close();
        } catch {}
        eventSourceRef.current = null;
      }
      // clear timers
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (finalizationTimerRef.current) {
        clearTimeout(finalizationTimerRef.current);
        finalizationTimerRef.current = null;
      }
      // reset states so caller won't see old score
      setScore(null);
      setLoading(false);
      setError(null);
      bufferedScoreRef.current = null;
      return;
    }

    // START: aktifkan SSE
    setScore(null); // ✨ sangat penting: reset old score saat kita mulai
    setLoading(true);
    setError(null);
    bufferedScoreRef.current = null;

    const url = `${API_BASE_URL}/score/stream?username=${encodeURIComponent(
      username,
    )}`;

    // close previous if any
    if (eventSourceRef.current) {
      try {
        eventSourceRef.current.close();
      } catch {}
      eventSourceRef.current = null;
    }

    try {
      const es = new EventSource(url, {
        headers: {
          Accept: 'text/event-stream',
        },
        withCredentials: false,
      });
      eventSourceRef.current = es;

      // timeout fallback (global)
      timeoutRef.current = setTimeout(() => {
        setError('Timeout menerima skor');
        setLoading(false);
        try {
          es.close();
        } catch {}
      }, timeoutMs);

      es.addEventListener('message', (event: any) => {
        try {
          const data: ScoreEvent = JSON.parse(event.data);
          if (typeof data.score !== 'number') throw new Error('invalid score');

          // simpan sementara
          bufferedScoreRef.current = data.score;

          // reset finalization timer
          if (finalizationTimerRef.current) {
            clearTimeout(finalizationTimerRef.current);
            finalizationTimerRef.current = null;
          }

          // tunggu singkat untuk memastikan tidak ada update berikutnya
          finalizationTimerRef.current = setTimeout(() => {
            // finalize: set hasil sebagai final
            setScore(bufferedScoreRef.current);
            setLoading(false);

            // clear timeout fallback
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }

            // close connection karena sudah diterima final score
            try {
              es.close();
            } catch {}
            eventSourceRef.current = null;
            finalizationTimerRef.current = null;
            bufferedScoreRef.current = null;
          }, 800); // 800ms buffer; boleh disesuaikan (500-1500ms)
        } catch (err) {
          // parsing error atau format salah
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setError('Data skor tidak valid');
          setLoading(false);
          try {
            eventSourceRef.current?.close();
          } catch {}
          eventSourceRef.current = null;
        }
      });

      es.addEventListener('error', (_err: any) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        if (finalizationTimerRef.current) {
          clearTimeout(finalizationTimerRef.current);
          finalizationTimerRef.current = null;
        }
        bufferedScoreRef.current = null;
        setError('Koneksi SSE gagal');
        setLoading(false);
        try {
          es.close();
        } catch {}
        eventSourceRef.current = null;
      });
    } catch (err) {
      setError('Gagal membuka koneksi SSE');
      setLoading(false);
      eventSourceRef.current = null;
    }

    return () => {
      // cleanup saat unmount atau saat dependencies berubah
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (finalizationTimerRef.current) {
        clearTimeout(finalizationTimerRef.current);
        finalizationTimerRef.current = null;
      }
      bufferedScoreRef.current = null;
      if (eventSourceRef.current) {
        try {
          eventSourceRef.current.close();
        } catch {}
        eventSourceRef.current = null;
      }
      // important: do NOT keep previous score alive across runs
      setScore(null);
      setLoading(false);
      setError(null);
    };
    // hanya ketika username/active/timeoutMs berubah, re-run
  }, [username, active, timeoutMs]);

  return { score, loading, error };
};

export default useScoreStream;
