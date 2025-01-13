// use-resize.js
import { useState, useEffect } from "react";

export const useResize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const breakpoints = {
    SCREEN_SM: 576,
    SCREEN_MD: 768,
    SCREEN_LG: 992,
    SCREEN_XL: 1200,
    SCREEN_XXL: 1400,
  };

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      const windowTarget = event.target as Window;
      setWidth(windowTarget.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    xm: width < breakpoints.SCREEN_SM,
    sm: width >= breakpoints.SCREEN_SM && width <= breakpoints.SCREEN_MD,
    md: width > breakpoints.SCREEN_MD && width <= breakpoints.SCREEN_LG,
    lg: width > breakpoints.SCREEN_LG && width <= breakpoints.SCREEN_XL,
    xl: width > breakpoints.SCREEN_XL && width <= breakpoints.SCREEN_XXL,
    xxl: width > breakpoints.SCREEN_XXL,
  };
};
