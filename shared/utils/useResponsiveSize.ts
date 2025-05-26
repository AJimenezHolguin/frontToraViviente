import { useEffect, useState } from "react";

import { Sizes } from "@/types/sizes.enum";

export const UseResponsiveSize = (propSize?: Sizes) => {
  const [size, setSize] = useState<Sizes>(propSize || Sizes.MD);

  useEffect(() => {
    const handleResize = () => {
      if (!propSize) {
        const width = window.innerWidth;

        if (width < 640) {
          setSize(Sizes.SM);
        } else if (width <= 1366) {
          setSize(Sizes.MD);
        } else {
          setSize(Sizes.LG);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};
