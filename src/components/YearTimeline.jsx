import React, { useEffect, useRef, useImperativeHandle } from "react";

// Styles
import styled from "styled-components";

import useIntersect from "../hooks/useIntersect";
const Container = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  padding-top: 6rem;
  padding-left: 20rem;

  opacity: 0.2;
  transition: opacity 300ms;

  .line {
    transform: scaleX(0);
    transform-origin: center left;
    transition: transform 800ms ease-out;
  }
  &.is-active {
    opacity: 1;

    .line {
      /* transform: scaleX(1); */
    }
  }

  &:nth-child(n + 2) {
    /* opacity: 0.2; */
  }
  &:nth-child(2) {
    padding-right: 30rem;
  }
  &:nth-child(5) {
    padding-right: 33rem;
  }
  &:last-child {
    .line {
      display: none;
    }
  }
`;

const Timeline = styled.div`
  position: absolute;
  top: 0;
  left: 35rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Point = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: white;
  margin-right: 0;
`;

const Line = styled.div`
  display: none;
  width: 100%;
  margin-left: 2px;
  height: 0.4rem;
  background: white;
`;
const Year = styled.div`
  font-family: balboa-extra-condensed, sans-serif;
  font-weight: 400;
  font-size: 30rem;
`;
const Directors = styled.ul`
  margin-top: 30rem;
  font-weight: 600;
  font-size: 2rem;
`;
const Director = styled.li`
  margin-bottom: 0.4rem;
`;

const YearTimeline = React.forwardRef(({ year, className }, ref) => {
  const containerRef = useRef();
  const lineRef = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        onUpdate(progress) {
          lineRef.current.style.transform = `scaleX(${progress})`;
        },
        onEnter() {
          containerRef.current.classList.add("is-active");
          lineRef.current.style.transform = `scaleX(${1})`;
        },
        onLeave() {
          containerRef.current.classList.remove("is-active");
        },
        onEnterBack() {
          containerRef.current.classList.add("is-active");
        },
        onLeaveBack() {
          containerRef.current.classList.remove("is-active");
        },
      };
    },
    []
  );

  return (
    <Container ref={containerRef} className={["date-wrapper", className]}>
      <Timeline>
        <Point />
        <Line ref={lineRef} className="line" />
      </Timeline>
      <Year>{year}</Year>
      <Directors>
        <Director>Jean-Luc Godard</Director>
        <Director>Eric Rohmer</Director>
        <Director>François Truffaut</Director>
      </Directors>
    </Container>
  );
});

export default YearTimeline;
