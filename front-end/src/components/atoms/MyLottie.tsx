import Lottie from 'lottie-react';

export default function MyLottie(lottie, className = '') {
  if (lottie)
    return (
      <Lottie
        className={`max-w-[450px] mx-auto ${className}`}
        animationData={lottie}
        loop={true}
      />
    );

  return <></>;
}
