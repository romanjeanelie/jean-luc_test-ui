import React, { useEffect, useRef, useContext } from "react";
import useWindowSize from "../../hooks/useWindowSize";

// Styles
import styled from "styled-components";

const Parent = styled.div`
  width: 100vw;
  height: 100%;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  width: max-content;

  /* overflow: hidden; */
`;

const ScrollContext = React.createContext();

const SmoothScroll = ({ children }) => {
  const windowSize = useWindowSize();
  const scrollingContainerRef = useRef();
  const scrollValueRef = useRef();

  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    setWrapperWidth();
  }, [windowSize.width]);

  const setWrapperWidth = () => {
    document.body.style.height = `${scrollingContainerRef.current.getBoundingClientRect().width}px`;
  };

  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  });

  const smoothScrollingHandler = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    scrollingContainerRef.current.style.transform = `translateX(-${data.previous}px)`;
    scrollValueRef.current = data.previous;
    requestAnimationFrame(() => smoothScrollingHandler());
  };

  return (
    <ScrollContext.Provider value={data.previous}>
      <Parent className="parent">
        <ScrollContainer ref={scrollingContainerRef}>{children}</ScrollContainer>
      </Parent>
    </ScrollContext.Provider>
  );
};

const useSmoothScroll = () => {
  const value = useContext(ScrollContext);
  console.log("use smooth scroll", value);
  return value;
};

export { SmoothScroll, useSmoothScroll };
