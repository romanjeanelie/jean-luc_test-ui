import { useEffect, useState } from "react";

const useIntersect = (el) => {
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    if (!el.current) return;
    computeBounds();
  }, [el]);

  const computeBounds = () => {
    const boundsEl = el.current.getBoundingClientRect();
    setBounds(boundsEl);
  };

  useEffect(() => {
    if (bounds) {
      requestAnimationFrame(() => handleIntersect());
    }
  }, [bounds]);

  const handleIntersect = () => {
    requestAnimationFrame(() => handleIntersect());
  };
};

export default useIntersect;
