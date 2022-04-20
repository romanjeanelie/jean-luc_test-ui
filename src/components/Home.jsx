import React, { useRef, useEffect, useState } from "react";
import YearTimeline from "./YearTimeline";
import { useScroll } from "react-use";
import { useIntersection } from "react-use";

// Styles
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// TODO Put to utils
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const Container = styled.div`
  height: 100vh;
  font-size: 1.5rem;
  display: flex;
`;
const Top = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Logo = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 1rem;
  font-size: 4rem;
  font-family: balboa-extra-condensed, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    text-align: center;
  }
`;
const ShowtimesContainer = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 1rem;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  font-size: 2rem;
  letter-spacing: 0.2rem;

  .label {
    opacity: 0.4;
  }
`;
const ListShowTimes = styled.ul`
  text-align: right;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const Day = styled.li`
  cursor: pointer;
  &:nth-child(3n) {
    opacity: 0.4;
  }
`;

const Line = styled.div`
  position: absolute;
  top: calc(50% - 21.2rem);
  left: 0;
  width: 89.3%;
  margin: 0 calc(40vw + 36rem);
  height: 0.4rem;
  background: white;
  transform-origin: left;

  transform: scaleX(0);
`;
const TimelineContainer = styled.div`
  padding-left: 40vw;
  width: max-content;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SearchBar = styled.input`
  display: none;
  z-index: 1;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  border-bottom: 1px solid white;
  width: 60rem;
  padding: 1rem;
`;
const Footer = styled.footer`
  display: none;
  width: 100%;
  position: absolute;
  bottom: 0;
  /* display: flex; */
  padding: 1rem;
  justify-content: space-between;
`;
const Left = styled.div``;
const Right = styled.div`
  margin-top: auto;
`;

const Home = () => {
  const years = ["1950", "1960", "1970", "1980", "1990", "2000", "2001", "2002", "2003"];
  const timelineContainerRef = useRef(null);

  const yearTimelineRefs = useRef([]);

  /**
   * Timeline - Vanilla Version
   */
  const fullWidthYears = useRef(0);

  const [boundsYears, setBoundsYears] = useState([]);
  const [activeYear, setActiveYear] = useState([]);
  const prevArray = useRef([]);

  const scrollValue = useRef(0);

  useEffect(() => {
    // computeBoundsYears();
  }, [yearTimelineRefs.current]);

  const computeBoundsYears = () => {
    setBoundsYears([]);
    // TODO Add on resize
    yearTimelineRefs.current.forEach((el, i) => {
      setBoundsYears((bounds) => [
        ...bounds,
        { index: i, left: el.getBoundingClientRect().x, width: el.getBoundingClientRect().width },
      ]);
    });
    fullWidthYears.current = timelineContainerRef.current.offsetWidth;
  };

  useEffect(() => {
    if (!boundsYears.length) return;
    // window.addEventListener("wheel", (e) => onScroll(e));
  }, [boundsYears]);

  const onScroll = (e) => {
    checkIntersect();
    updateScroll(e);
  };

  const checkIntersect = () => {
    const threshold = 300;
    let newActiveyear = [];
    boundsYears.forEach((bound) => {
      if (
        bound.left < window.innerWidth + scrollValue.current - threshold &&
        bound.left + bound.width - threshold > scrollValue.current
      ) {
        newActiveyear.push(bound.index);
      }
    });
    if (!equals(prevArray.current, newActiveyear)) {
      setActiveYear(newActiveyear);
    }
    prevArray.current = newActiveyear;
  };

  const updateScroll = (e) => {
    scrollValue.current += e.deltaY;
    if (scrollValue.current <= 0 || scrollValue.current >= fullWidthYears.current) return;
    timelineContainerRef.current.style.transform = `translateX(-${scrollValue.current}px)`;
  };

  useEffect(() => {
    // console.log(activeYear);
  }, [activeYear]);

  /**
   * Timeline - GSAP Version
   */
  const lineRef = useRef();

  useEffect(() => {
    // window.addEventListener("scroll", () => {
    //   console.log(window.scrollY);
    // });
    // Set body height
    document.body.style.height = `${
      window.innerHeight + (timelineContainerRef.current.scrollWidth - window.innerWidth)
    }px`;

    // Set Horizontal scroll$
    const offset = 40;
    const scrollSpace = timelineContainerRef.current.scrollWidth - document.documentElement.clientWidth;

    gsap.to(".year-timeline", {
      x: () => -scrollSpace + "px",
      ease: "none",
      scrollTrigger: {
        trigger: timelineContainerRef.current,
        pin: true,
        scrub: 1,
        end: `${scrollSpace}`,
        onUpdate: (self) => {
          console.log(self.progress);
        },
      },
    });
    // Update line
    gsap.to(lineRef.current, {
      x: () => -scrollSpace + "px",
      ease: "none",
      scrollTrigger: {
        trigger: timelineContainerRef.current,
        pin: true,
        scrub: 1,
        end: `${scrollSpace}`,
      },
    });
    gsap.to(lineRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: timelineContainerRef.current,
        pin: true,
        scrub: 1.5,
        end: `${scrollSpace}`,
      },
    });

    // Set Intersect
    gsap.utils.toArray(".year-timeline").forEach((element, i) => {
      const widthEl = element.getBoundingClientRect().width;
      ScrollTrigger.create({
        scrub: 1,
        // Start at 70% of the viewport
        start: element.offsetLeft - window.innerWidth * 0.4,
        // Leave at when it leaves the viewport at 50%
        end: element.offsetLeft + widthEl * 0.5,
        trigger: element,
        onUpdate: (self) => {
          yearTimelineRefs.current[i].onUpdate(self.progress);
        },
        onEnter: () => {
          yearTimelineRefs.current[i].onEnter();
        },
        onLeave: () => {
          yearTimelineRefs.current[i].onLeave();
        },
        onEnterBack: () => {
          yearTimelineRefs.current[i].onEnterBack();
        },
        onLeaveBack: () => {
          yearTimelineRefs.current[i].onLeaveBack();
        },
      });
    });
  }, []);

  return (
    <Container>
      <Top>
        <Logo>
          Ou est jean-luc
          <span>-</span>
          <span> Recherche de séances de cinéma par réalisateurs.ices</span>
        </Logo>
        <ShowtimesContainer>
          <p className="label">séances pour</p>
          <ListShowTimes>
            <Day>ajourd'hui</Day>
            <Day>demain</Day>
            <Day>mercredi</Day>
            <Day>jeudi</Day>
            <Day>vendredi</Day>
            <Day>samedi</Day>
            <Day>dimanche</Day>
          </ListShowTimes>
        </ShowtimesContainer>
      </Top>

      <TimelineContainer ref={timelineContainerRef}>
        <Line ref={lineRef} />
        {years.map((year, i) => (
          <YearTimeline
            className="year-timeline"
            ref={(el) => (yearTimelineRefs.current[i] = el)}
            key={year}
            year={year}
          />
        ))}
      </TimelineContainer>

      <SearchBar type="text" placeholder="filtrer par nom" />
      <Footer>
        <Left>
          <p>234 Réalisateurs.ices</p>
          <p>184 film</p>
        </Left>
        <Right>
          <p>Semaine du 12 avril</p>
        </Right>
      </Footer>
    </Container>
  );
};

export default Home;
