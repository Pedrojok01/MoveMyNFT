import { useEffect, useState } from "react";

const MOBILE_MAX_WIDTH = 549;
const TABLET_MAX_WIDTH = 768;
const SMALL_SCREEN_MAX_WIDTH = 1050;

export const useWindowWidthAndHeight = () => {
  const [windowSize, setWindowSize] = useState<number[]>([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const changeWindowSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", changeWindowSize);
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);

  const isMobile = windowSize[0] <= MOBILE_MAX_WIDTH;
  const isTablet = windowSize[0] <= TABLET_MAX_WIDTH;
  const isSmallScreen = windowSize[0] <= SMALL_SCREEN_MAX_WIDTH;

  return { windowSize, isMobile, isTablet, isSmallScreen };
};
