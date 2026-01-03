import { useEffect, useRef, useState } from 'react';

type Phase = 'WAITING' | 'REMINDING' | 'CONFIRMED' | 'TIMEOUT';

const MAX_WAIT = 30; // total timeout
const REMIND_AT = 15; // mulai reminding
const DUMMY_CONFIRM_AT = 8; // simulasi mekanik confirm

export function useWaitingConfirmation() {
  const [seconds, setSeconds] = useState(0);
  const [phase, setPhase] = useState<Phase>('WAITING');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  /** ===== PHASE CONTROLLER ===== */
  useEffect(() => {
    if (seconds === DUMMY_CONFIRM_AT) {
      setPhase('CONFIRMED');
      return;
    }

    if (seconds >= MAX_WAIT) {
      setPhase('TIMEOUT');
      return;
    }

    if (seconds >= REMIND_AT) {
      setPhase('REMINDING');
    }
  }, [seconds]);

  /** ===== RESET (for retry) ===== */
  const reset = () => {
    setSeconds(0);
    setPhase('WAITING');
  };

  return {
    seconds,
    phase,
    isTimeout: phase === 'TIMEOUT',
    reset,
  };
}
