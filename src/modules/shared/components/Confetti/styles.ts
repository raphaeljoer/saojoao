import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

const keyframes = {
  '@keyframes confetti': {
    '0%': {
      transform: 'rotateZ(15deg) rotateY(0deg) translate(0, 0)'
    },
    '25%': {
      transform: 'rotateZ(5deg) rotateY(360deg) translate(-5vw, 20vh)'
    },
    '50%': {
      transform: 'rotateZ(15deg) rotateY(720deg) translate(5vw, 60vh)'
    },
    '75%': {
      transform: 'rotateZ(5deg) rotateY(1080deg) translate(-10vw, 80vh)'
    },
    '100%': {
      transform: 'rotateZ(15deg) rotateY(1440deg) translate(10vw, 110vh)'
    }
  }
};

// const confettiShare = {
//   left: '50%',
//   width: '1.6rem',
//   height: '1.6rem',
//   position: 'absolute',
//   transformOrigin: 'left top',
//   animation: 'confetti 5s ease-in-out -2s infinite'
// };

const element = {
  width: '1.6rem',
  height: '1.6rem',
  position: 'absolute',
  transformOrigin: 'left top',
  animation: 'confetti 5s ease-in-out -2s infinite',
  backgroundImage: 'url(/assets/bandeira.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  marginTop: -4,
  marginBottom: -4
};

const element2 = {
  width: '1.8rem',
  height: '1.8rem',
  position: 'absolute',
  transformOrigin: 'left top',
  animation: 'confetti 7s ease-in-out -2s infinite',
  backgroundImage: 'url(/assets/bandeira-2.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  marginTop: -4,
  marginBottom: -4
};

const element3 = {
  width: '2rem',
  height: '2rem',
  position: 'absolute',
  transformOrigin: 'left top',
  animation: 'confetti 8s ease-in-out -2s infinite',
  backgroundImage: 'url(/assets/bandeira-3.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  marginTop: -4,
  marginBottom: -4
};

export const confetti1 = {
  ...element,
  left: '10%',
  animationDelay: 0
};

export const confetti2 = {
  ...element,
  left: '20%',
  animationDelay: '-5s'
};

export const confetti3 = {
  ...element,
  left: '30%',
  animationDelay: '-3s'
};

export const confetti4 = {
  ...element,
  left: '40%',
  animationDelay: '-2.5s'
};

export const confetti5 = {
  ...element,
  left: '50%',
  animationDelay: '-9.5s'
};

export const confetti6 = {
  ...element,
  left: '60%',
  animationDelay: '-6s'
};

export const confetti7 = {
  ...element3,
  left: '70%',
  animationDelay: '-1.5s'
};

export const confetti8 = {
  ...element,
  left: '80%',
  animationDelay: '-2s'
};

export const confetti9 = {
  ...element,
  left: '90%',
  animationDelay: '-3.5s'
};

export const confetti10 = {
  ...element,
  left: '100%',
  animationDelay: '-2.5s'
};

export const confetti11 = {
  ...element2,
  left: '60%',
  animationDelay: '-6s'
};

export const confetti12 = {
  ...element3,
  left: '70%',
  animationDelay: '-1.5s'
};

export const confetti13 = {
  ...element2,
  left: '85%',
  animationDelay: '-7s'
};

export const confetti14 = {
  ...element3,
  left: '90%',
  animationDelay: '-0.5s'
};

export const confetti15 = {
  ...element,
  left: '100%',
  animationDelay: '-4s'
};

export const container: SxProps<Theme> = {
  position: 'fixed',
  overflow: 'hidden',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: '100vh',
  width: '100vw',
  pointerEvents: 'none',
  zIndex: (theme) => theme.zIndex.drawer,
  ...keyframes
};
