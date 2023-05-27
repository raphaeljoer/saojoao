import { StylesProps } from '@/modules/shared/types/styles-props';

const keyframes = {
  '@keyframes rise': {
    '0%': {
      transform: 'translate(70vw, 100vh) rotateZ(10deg) rotateY(-20deg) scale(0.5)', //prettier-ignore
      opacity: 1
    },
    '25%': {
      transform: 'translate(72vw, 75vh) rotateZ(-15deg) rotate(-20deg) scale(1)', //prettier-ignore
      opacity: 1
    },
    '50%': {
      transform: 'translate(69vw, 50vh) rotateZ(-10deg) scale(1.1)',
      opacity: 1
    },
    '75%': {
      transform: 'translate(71vw, 25vh) rotateZ(-25deg) scale(1.2)',
      opacity: 1
    },
    '100%': {
      transform: 'translate(69vw, -10vh) rotateZ(5deg) rotateY(180deg) scale(1.3)', //prettier-ignore
      opacity: 1
    }
  }
};

export const container: StylesProps = {
  display: 'flex',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  width: '100vw',
  height: '100vh',
  zIndex: -1,
  ...keyframes
};

type BalloonProps = {
  delay: number;
  duration: number;
  zIndex?: number;
};

export const balloon = ({
  delay = 2,
  duration = 10,
  zIndex = -1
}: BalloonProps): StylesProps => {
  return {
    display: 'flex',
    position: 'absolute',
    transformOrigin: 'left top',
    animation: `rise ${duration}s linear infinite`,
    animationDelay: `${delay}s`,
    opacity: 0,
    zIndex
  };
};
