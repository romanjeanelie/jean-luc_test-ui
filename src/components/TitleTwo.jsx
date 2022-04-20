import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useEffect, useRef, useState } from "react";
import Home from "./Home";
// Styles
import styled from "styled-components";

gsap.registerPlugin(MorphSVGPlugin);

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  .subtitle-container {
    margin-top: 7rem;
    overflow: hidden;
    p {
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.3rem;
      font-size: 2rem;
    }
  }
`;
const SVGContainer = styled.div`
  width: 100%;
  padding: 20px;

  .cls-2 {
    fill: white;
  }
`;

const SVGTitle = styled.svg`
  height: auto;
  max-width: 100%;
`;
const Background1 = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  height: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f4f3f1;
`;
const Background2 = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  height: 0;
  width: 100vw;
  height: 100vh;
  background-color: #111;
`;

export default function TitleTwo({ timeline, index }) {
  const el = useRef();
  const svgRef = useRef();
  const subtitleRef = useRef();
  const background1Ref = useRef();
  const background2Ref = useRef();

  const [isLoaded, setIsLoaded] = useState(true);

  const animReset = () => {
    gsap.set(".cls-2", {
      autoAlpha: 0,
    });

    gsap.set(subtitleRef.current, {
      y: "-100%",
    });
    gsap.set([background1Ref.current, background2Ref.current], {
      y: "100%",
    });
  };

  const animLetter = ({ from, to, index }) => {
    const tl = gsap.timeline({ delay: index * 0.05 });

    tl.set(from, {
      autoAlpha: 1,
      scaleX: 0,
    });
    tl.set(to, {
      autoAlpha: 1,
      transformOrigin: "center top",
      scaleY: 0,
      scaleX: "random(0, 0.7)",
    });

    tl.to(to, {
      scaleY: 1,
      duration: "random(1, 1.7)",
      ease: "expo.inOut",
    });
    tl.to(from, {
      scaleX: 1,
      duration: 1.5,
      ease: "expo.inOut",
    });
    tl.to(
      to,
      {
        scaleX: 0,
        duration: 1.5,
        ease: "expo.inOut",
      },
      "-=1.9"
    );
  };

  const animTiret = () => {
    const tl = gsap.timeline({ delay: 2 });

    // MorphSVGPlugin.convertToPath(to);

    tl.set("#tiret", {
      autoAlpha: 1,
      transformOrigin: "right center",
      scaleX: 0,
      scaleY: "random(0.2, 0.7)",
      x: "-80vw",
    });
    tl.to("#tiret", {
      scaleX: 20,
      x: 0,
      duration: 0.5,
    });

    tl.to(
      "#tiret",
      {
        scaleX: 1,
        scaleY: 1,
        duration: 1,
        ease: "expo.inOut",
      },
      "-=0.3"
    );
  };

  const animJ = () => {
    const tl = gsap.timeline({ delay: 0.1 });

    tl.set(["#letter-j-big"], {
      autoAlpha: 1,
      scaleX: 0,
    });
    tl.set("#rect-j", {
      autoAlpha: 1,
      transformOrigin: "center top",
      scaleY: 0,
      scaleX: "random(0.2, 0.7)",
    });

    tl.to("#rect-j", {
      scaleY: 1,
      duration: 1,
      ease: "expo.inOut",
    });
    tl.to(
      "#letter-j-big",
      {
        scaleX: 1,
        duration: 2,
        ease: "expo.inOut",
      },
      "+=0.4"
    );
    tl.to(
      "#rect-j",
      {
        scaleX: 0,
        duration: 1.5,
      },
      "<"
    );
    tl.to(
      "#letter-j-big",
      {
        morphSVG: "#letter-j",
        duration: 1.5,
        ease: "power2.out",
      },
      "-=0.9"
    );
  };

  const animSubtitle = () => {
    const tl = gsap.timeline({ delay: 3.5 });

    tl.to(subtitleRef.current, {
      y: 0,
      duration: 1,
      ease: "power2.out",
    });
  };

  const animBackground = () => {
    const tl = gsap.timeline({ delay: 5 });

    tl.to(background1Ref.current, {
      y: 0,
      duration: 1.5,
      ease: "power2.inOut",
    });
    tl.to(
      background2Ref.current,
      {
        y: 0,
        duration: 1.4,
        ease: "power3.in",
        // onComplete: () => {
        //   gsap.set([svgRef.current, subtitleRef.current], { autoAlpha: 0 });
        //   setIsLoaded(true);
        // },
      },
      "-=1.35"
    );
    tl.to(background2Ref.current, {
      y: "-100%",
      duration: 0.5,
      // ease: "power2.out",
      onStart: () => {
        gsap.set([el.current], { autoAlpha: 0 });
        setIsLoaded(true);
      },
    });
    tl.to(
      background1Ref.current,
      {
        y: "-99%",
        duration: 2.8,
        ease: "expo.out",
      },
      "<"
    );
  };

  useEffect(() => {
    animReset();

    if (isLoaded) {
      gsap.set(background1Ref.current, {
        y: "-99%",
      });
      gsap.set(background2Ref.current, {
        y: "-100%",
      });
      gsap.set([el.current], { autoAlpha: 0 });

      return;
    }
    animLetter({ from: "#letter-o", to: "#rect-oa", index: 1 });
    animLetter({ from: "#letter-u1", to: "#rect-u1a", index: 2 });
    animLetter({ from: "#letter-e1", to: "#rect-e1", index: 3 });
    animLetter({ from: "#letter-s", to: "#rect-s", index: 4 });
    animLetter({ from: "#letter-t", to: "#rect-t", index: 5 });
    animLetter({ from: "#letter-e2", to: "#rect-e2", index: 7 });
    animLetter({ from: "#letter-a", to: "#rect-a", index: 8 });
    animLetter({ from: "#letter-n", to: "#rect-na", index: 9 });
    animLetter({ from: "#letter-l", to: "#rect-l", index: 10 });
    animLetter({ from: "#letter-u2", to: "#rect-u2b", index: 11 });
    animLetter({ from: "#letter-c", to: "#rect-c", index: 12 });
    animJ();
    animTiret();

    animSubtitle();
    animBackground();
  }, [timeline]);

  return (
    <>
      <Container ref={el}>
        <SVGContainer>
          <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 797.93 168.02">
            <defs />
            <g id="Layer_2" data-name="Layer 2">
              <g className="cls-1" id="Layer_1-2" data-name="Layer 1">
                <g id="Final_group" data-name="Final group">
                  <path
                    id="letter-o"
                    className="cls-2"
                    d="M4.88 137.66V29.71C4.88 8.12 15.57.21 30.74.21 47 .21 57.89 7.7 57.89 29.71v108c0 22.23-11.11 29.72-27.15 29.72s-25.86-8.61-25.86-29.77ZM37.16 143V24.8c0-5.77-2.57-7.91-5.77-7.91-3.64 0-5.78 2.14-5.78 7.91V143c0 6 2.35 7.69 5.78 7.69 2.99.01 5.77-1.91 5.77-7.69Z"
                  />
                  <path
                    id="letter-u1"
                    className="cls-2"
                    d="M121.16 137.66c0 19.24-8.12 29.72-25.65 29.72-16.67 0-25.86-9.84-25.86-29.5V2.35h20.73v140.23c0 5.34 1.93 8.12 6.41 8.12 4.28 0 6.63-2.78 6.63-8.34V2.35h17.74Z"
                  />
                  <path
                    id="letter-e1"
                    className="cls-2"
                    d="M202.18 164.81h-43V2.35H202v16.89h-22v51.51h17.74v16.89H180v60.28h22.23Z"
                  />
                  <path
                    id="letter-s"
                    className="cls-2"
                    d="M259.25 135.1c0 24.15-9.83 32.28-27.15 32.28-16 0-23.08-10.27-23.08-34.63a129.25 129.25 0 0 1 1.71-21.81l16 1.28a113.56 113.56 0 0 0-1.5 18.17c0 16.46 2.14 20.31 7.7 20.31 4.06 0 5.77-2.78 5.77-10.47V130c0-13-1.92-25.44-14.32-43.4-12-17.53-16.25-31-16.25-50.44v-4.1C208.16 11.12 216.07 0 234.24 0 252.2 0 258 12.61 258 35.06c0 11.11-.43 16.46-1.07 20.73l-16.24-1.28a106.73 106.73 0 0 0 1.06-17.1c0-16.67-2.13-20.52-6.84-20.52-4.06 0-5.77 2.35-5.77 9.83v6.41a66.4 66.4 0 0 0 11.55 38.48c11.75 17.1 18.59 34.2 18.59 56.65Z"
                  />
                  <path
                    id="letter-t"
                    className="cls-2"
                    d="M315.47 19.24h-15.18v145.57h-20.73V19.24h-15.18V2.35h51.09Z"
                  />
                  <path
                    id="letter-j"
                    className="cls-2"
                    d="M391.36 137.88c0 19.23-8.13 29.5-25.65 29.5-15.18 0-23.52-10.27-23.52-34.42a116.78 116.78 0 0 1 1.5-20.52l16.24 1.71a111.18 111.18 0 0 0-1.07 15.39c0 17.1 2.14 21.38 6.63 21.38 4.06 0 5.13-3 5.13-7.27V2.35h20.74Z"
                  />
                  <path
                    id="letter-j-big"
                    className="cls-2"
                    d="M391.36 137.88c0 19.23-8.13 29.5-25.65 29.5-15.18 0-23.52-10.27-23.52-34.42 0-10.26.86-119 1.5-122.39l16.24 1.71c-.64 3.85-1.07 112.34-1.07 117.26 0 17.1 2.14 21.38 6.63 21.38 4.06 0 5.13-3 5.13-7.27V2.35h20.74Z"
                  />
                  <path
                    id="letter-e2"
                    className="cls-2"
                    d="M446.72 164.81h-43V2.35h42.76v16.89h-22v51.51h17.74v16.89h-17.73v60.28h22.23Z"
                  />
                  <path
                    id="letter-a"
                    className="cls-2"
                    d="M450.35 164.81 464.68 2.35H492l14.32 162.46h-20.05l-1.71-24.37h-14.33l-1.71 24.37Zm20.95-41.26h12.4l-5.56-89.78h-1.07Z"
                  />
                  <path
                    id="letter-n"
                    className="cls-2"
                    d="M563.43 164.81h-13L531.8 72.46h-1.07v92.35h-16.89V2.35h16.25l15.39 84h.85v-84h17.1Z"
                  />
                  <path id="tiret" className="cls-2" d="M618.15 101.54h-40.61V84.86h40.61Z" />
                  <path id="letter-l" className="cls-2" d="M675.66 164.81h-43.4V2.35H653v145.57h22.66Z" />
                  <path
                    id="letter-u2"
                    className="cls-2"
                    d="M735.72 137.66c0 19.24-8.12 29.72-25.65 29.72-16.67 0-25.86-9.84-25.86-29.5V2.35h20.73v140.23c0 5.34 1.92 8.12 6.41 8.12 4.28 0 6.63-2.78 6.63-8.34V2.35h17.74Z"
                  />
                  <path
                    id="letter-c"
                    className="cls-2"
                    d="M773.35 168c-17.75 0-25.87-10.26-25.87-29.72V30.14c0-20.09 8.34-29.93 25.65-29.93 15.61 0 24.58 7.91 24.58 34.42 0 11.33-.64 16.89-1.28 21.16l-15.82-1.28a112.32 112.32 0 0 0 1.07-16.67c0-18-2.14-21-7-21-4.06 0-6.42 2.35-6.42 9.4V143c0 6 2.14 8.33 6.2 8.33 5.13 0 7.27-4.49 7.27-21.8a93.77 93.77 0 0 0-1.28-15.82l15.82-1.28a100.58 100.58 0 0 1 1.71 20.09c-.05 28.23-9.24 35.48-24.63 35.48Z"
                  />
                  <path id="rect-j" className="cls-2" d="M370.62 2.35h20.73v165.02h-20.73z" />
                  <path id="rect-e2" className="cls-2" d="M403.75 1.07h20.73v165.02h-20.73z" />
                  <path id="rect-a" className="cls-2" d="M467.13 2.35h20.73v165.02h-20.73z" />
                  <path id="rect-na" className="cls-2" d="M511.56 2.35h20.73v165.02h-20.73z" />
                  <path id="rect-nb" className="cls-2" d="M542.7 1.07h20.73v165.02H542.7z" />
                  <path id="rect-l" className="cls-2" d="M632.26 1.6h20.73v165.02h-20.73z" />
                  <path id="rect-u2a" className="cls-2" d="M684.21 2.35h20.73v165.02h-20.73z" />
                  <path id="rect-u2b" className="cls-2" d="M714.99 2.35h20.73v165.02h-20.73z" />
                  <path id="rect-c" className="cls-2" d="M747.48 2.35h20.73v165.02h-20.73z" />
                  <path id="rect-t" className="cls-2" d="M279.56 0h20.73v165.02h-20.73z" />
                  <path id="rect-s" className="cls-2" d="M223.34 0h20.73v165.02h-20.73z" />
                  <path id="rect-e1" className="cls-2" d="M159.96 1.07h20.73v165.02h-20.73z" />
                  <path id="rect-u1b" className="cls-2" d="M104.62 1.28h20.73V166.3h-20.73z" />
                  <path id="rect-u1a" className="cls-2" d="M69.65 0h20.73v165.02H69.65z" />
                  <path id="rect-ob" className="cls-2" d="M36.52 2.35h20.73v165.02H36.52z" />
                  <path id="rect-oa" className="cls-2" d="M0 2.35h20.73v165.02H0z" />
                </g>
              </g>
            </g>
          </svg>
          <div className="subtitle-container">
            <p ref={subtitleRef}> Recherche de séances de cinéma par réalisteurs.ices</p>
          </div>
        </SVGContainer>
      </Container>
      <Background1 ref={background1Ref} />
      <Background2 ref={background2Ref} />
      <Home />
    </>
  );
}
