import { useEffect, useState } from 'react';
import { Text } from 'react-native';

export default function AnimatedScore({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        setDisplay(end);
        return;
      }
      const progress = elapsed / duration;
      setDisplay(Math.round(start + (end - start) * progress));
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [value]);

  return <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{display}</Text>;
}
