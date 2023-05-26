import { useEffect, useState } from 'react';

const formatNumber = (number: number) => {
  return number.toString().padStart(2, '0');
};

type Props = {
  prefix?: string;
  suffix?: string;
  targetTime: Date;
};

export const Countdown = ({ prefix, suffix, targetTime }: Props) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const currentTime = new Date();
      const distance = targetTime.getTime() - currentTime.getTime();

      if (distance <= 0) {
        setCountdown('Voting has ended.');
        return;
      }

      const days = formatNumber(Math.floor(distance / (1000 * 60 * 60 * 24)));
      const hours = formatNumber(Math.floor((distance / (1000 * 60 * 60)) % 24)); //prettier-ignore
      const minutes = formatNumber(Math.floor((distance / (1000 * 60)) % 60));
      const seconds = formatNumber(Math.floor((distance / 1000) % 60));

      setCountdown(
        `${prefix || ''} ${days} dias ${hours}h ${minutes}m ${seconds}s ${
          suffix || ''
        }`
      );
    };

    calculateCountdown();

    const intervalId = setInterval(calculateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [prefix, suffix, targetTime]);

  return <>{countdown}</>;
};
