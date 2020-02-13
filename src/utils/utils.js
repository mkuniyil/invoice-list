import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const widthCheck = () => window.innerWidth < 960;
  const [isMobile, setIsMobile] = useState(widthCheck());

  useEffect(() => {
    const onResize = () => setIsMobile(widthCheck());

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  });

  return isMobile;
};

export default useIsMobile;
