import React, { useEffect, useState, useRef, useLayoutEffect } from "react";

// Styles
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
`;
const Point = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  background: red;
  border-radius: 50%;
  margin-left: ${(props) => props.left};
`;
const Line = styled.div`
  display: none;
  width: ${(props) => props.length};
  height: 2rem;
  background: red;
`;

const Timeline = ({ dateRefs }) => {
  console.log(dateRefs);
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);
  const pointsRef = useRef([]);

  useEffect(() => {
    computeOffsetPoints();
  }, []);

  useEffect(() => {
    if (!points.length) return;
    computeWidthLines();
  }, [points]);

  const computeOffsetPoints = () => {
    setPoints([]);
    setTimeout(() => {
      dateRefs.current.forEach((date) => {
        console.log(date);
        const bounds = date.getBoundingClientRect();
        const { left } = bounds;
        setPoints((points) => [...points, { left }]);
      });
    }, 100);
    const dateEls = document.querySelectorAll(".date-wrapper");
    dateEls.forEach((el) => {
      //   const bounds = el.getBoundingClientRect();
      //   const { left } = bounds;
      //   setPoints((points) => [...points, { left }]);
    });
  };

  const computeWidthLines = () => {
    console.log("compute lines", points);

    const sum = points.reduce((prev, current) => {
      //   console.log(prev, current.left);
      return current.left - prev;
    }, 0);
  };

  return (
    <Container>
      {points.map((point, i) => (
        <React.Fragment key={i}>
          <Point left={`${point.left}px`} />
          <p>{point.left}---</p>
          {/* <Line length={`${point.length / 7.4}rem`} /> */}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default Timeline;
