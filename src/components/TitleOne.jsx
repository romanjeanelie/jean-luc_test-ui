import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useEffect, useRef, useState } from "react";

// Styles
import styled from "styled-components";

gsap.registerPlugin(MorphSVGPlugin);

const SVGContainer = styled.div`
  width: 100%;
  background: #111;
  padding: 20px;

  .cls-2 {
    fill: white;
  }
`;

const SVGTitle = styled.svg`
  height: auto;
  max-width: 100%;
`;

export default function TitleOne({ timeline, index }) {
  const el = useRef();

  const animReset = () => {
    gsap.set(".cls-2", {
      autoAlpha: 0,
    });

    gsap.set("#letter-o", {
      autoAlpha: 1,
    });
  };

  const animLetterO = () => {
    const tl = gsap.timeline({ delay: 0.3 });

    // gsap.set("#letter-o", {
    //   x: "50%",
    // });
    tl.set("#letter-o", {
      morphSVG: "#rect-1",
      transformOrigin: "center",
    });
    tl.to("#letter-o", {
      morphSVG: "#rect-2",
      duration: 1,
      ease: "expo.inOut",
    });
    tl.to(
      "#letter-o",
      {
        morphSVG: "#letter-oa",
        duration: 1.5,
        ease: "expo.inOut",
      },
      "-=0.3"
    );

    tl.to(
      "#letter-o",
      {
        morphSVG: "#letter-o",
        duration: 1.5,
        ease: "expo.inOut",
      },
      "-=0.3"
    );
  };

  const animOtherLetters = () => {
    const tl = gsap.timeline({ delay: 1.4 });
    tl.set(
      [
        "#letter-u1",
        "#letter-e1",
        "#letter-s",
        "#letter-t",
        "#letter-j",
        "#letter-e2",
        "#letter-a",
        "#letter-e2",
        "#letter-n",
        "#tiret",
        "#letter-l",
        "#letter-u2",
        "#letter-c",
      ],
      {
        scaleX: 0.1,
        scaleY: 0,
        autoAlpha: 1,
        transformOrigin: "center top",
      }
    );
    tl.to(
      [
        "#letter-u1",
        "#letter-e1",
        "#letter-s",
        "#letter-s",
        "#letter-t",
        "#letter-j",
        "#letter-e2",
        "#letter-a",
        "#letter-e2",
        "#letter-n",
        "#tiret",
        "#letter-l",
        "#letter-u2",
        "#letter-c",
      ],
      {
        // scaleX: 2,
        scaleY: 1.3,
        duration: 1,
        stagger: 0.02,
        ease: "power1.out",
        // ease: "power2.inOut",
      }
    );
    tl.to(
      [
        "#letter-u1",
        "#letter-e1",
        "#letter-s",
        "#letter-s",
        "#letter-t",
        "#letter-j",
        "#letter-e2",
        "#letter-a",
        "#letter-e2",
        "#letter-n",
        "#tiret",
        "#letter-l",
        "#letter-u2",
        "#letter-c",
      ],
      {
        scaleX: 1,
        scaleY: 1,

        duration: 1,
        stagger: -0.08,
        // ease: "expo.inOut",
        ease: "power2.inOut",
      },
      "-=0.8"
    );
  };

  const animLetter = ({ from, to }) => {
    animLetterO();
  };

  useEffect(() => {
    // MorphSVGPlugin.convertToPath("#title-svg");
    animReset();
    animLetterO();
    animOtherLetters();
  }, [timeline]);

  return (
    <SVGContainer ref={el}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 793.05 168.44">
        <defs />
        <g id="Layer_2" data-name="Layer 2">
          <g className="cls-1" id="Layer_1-2" data-name="Layer 1">
            <path
              id="letter-oa"
              className="cls-2"
              d="M0 137.66V29.71C0 8.12 10.69.21 25.87.21h740c15.89.2 27.15 7.78 27.15 29.5v108c0 22.09-11.28 29.62-27.15 29.72h-740C9.83 167.38 0 158.82 0 137.66ZM771.64 143V24.8c0-5.3-2.93-7.58-5.77-7.91h-740c-3.63 0-5.77 2.14-5.77 7.91V143c0 6 742.39 7.69 745.81 7.69h-740c2.84-.07 745.73-2.03 745.73-7.69Z"
            />
            <path
              id="letter-o"
              className="cls-2"
              d="M0 138.73V30.78C0 9.19 10.69 1.28 25.87 1.28 42.11 1.28 53 8.76 53 30.78v108c0 22.22-11.1 29.66-27.13 29.66S0 159.89 0 138.73Zm32.28 5.34V25.87c0-5.78-2.57-7.91-5.77-7.91-3.64 0-5.78 2.13-5.78 7.91v118.2c0 6 2.36 7.7 5.78 7.7 2.99 0 5.77-1.92 5.77-7.7Z"
            />
            <path
              id="letter-u1"
              className="cls-2"
              d="M116.28 137.66c0 19.24-8.12 29.72-25.65 29.72-16.67 0-25.86-9.84-25.86-29.5V2.35H85.5v140.23c0 5.34 1.93 8.12 6.42 8.12 4.27 0 6.62-2.78 6.62-8.34V2.35h17.74Z"
            />
            <path
              id="letter-e1"
              className="cls-2"
              d="M197.3 164.81h-43V2.35h42.76v16.89h-22v51.51h17.74v16.89h-17.73v60.28h22.23Z"
            />
            <path
              id="letter-s"
              className="cls-2"
              d="M254.37 135.1c0 24.15-9.83 32.28-27.14 32.28-16 0-23.09-10.27-23.09-34.63a130.32 130.32 0 0 1 1.71-21.81l16 1.28a113.79 113.79 0 0 0-1.49 18.17c0 16.46 2.13 20.31 7.69 20.31 4.06 0 5.77-2.78 5.77-10.47V130c0-13-1.92-25.44-14.32-43.4-12-17.53-16.24-31-16.24-50.44v-4.1c0-20.94 7.9-32.06 26.07-32.06 18 0 23.73 12.61 23.73 35.06 0 11.11-.43 16.46-1.07 20.73l-16.24-1.28a106.46 106.46 0 0 0 1.07-17.1c0-16.67-2.14-20.52-6.85-20.52-4.06 0-5.77 2.35-5.77 9.83v6.41a66.4 66.4 0 0 0 11.55 38.48c11.75 17.1 18.59 34.2 18.59 56.65Z"
            />
            <path id="letter-t" className="cls-2" d="M310.59 19.24h-15.17v145.57h-20.74V19.24H259.5V2.35h51.09Z" />
            <path
              id="letter-j"
              className="cls-2"
              d="M386.48 137.88c0 19.23-8.13 29.5-25.65 29.5-15.18 0-23.52-10.27-23.52-34.42a116.78 116.78 0 0 1 1.5-20.52l16.24 1.71a111.27 111.27 0 0 0-1.05 15.39c0 17.1 2.13 21.38 6.62 21.38 4.06 0 5.13-3 5.13-7.27V2.35h20.74Z"
            />
            <path
              id="letter-e2"
              className="cls-2"
              d="M441.84 164.81h-43V2.35h42.75v16.89h-22v51.51h17.74v16.89h-17.72v60.28h22.23Z"
            />
            <path
              id="letter-a"
              className="cls-2"
              d="M445.48 164.81 459.8 2.35h27.36l14.32 162.46h-20.09l-1.71-24.37h-14.32l-1.71 24.37Zm20.94-41.26h12.4l-5.56-89.78h-1.06Z"
            />
            <path
              id="letter-n"
              className="cls-2"
              d="M558.55 164.81h-13l-18.63-92.35h-1.07v92.35H509V2.35h16.25l15.39 84h.85v-84h17.1Z"
            />
            <path id="tiret" className="cls-2" d="M613.27 101.54h-40.61V84.86h40.61Z" />
            <path id="letter-l" className="cls-2" d="M670.78 164.81h-43.4V2.35h20.74v145.57h22.66Z" />
            <path
              id="letter-u2"
              className="cls-2"
              d="M730.84 137.66c0 19.24-8.12 29.72-25.65 29.72-16.67 0-25.86-9.84-25.86-29.5V2.35h20.73v140.23c0 5.34 1.92 8.12 6.41 8.12 4.28 0 6.63-2.78 6.63-8.34V2.35h17.74Z"
            />
            <path
              id="letter-c"
              className="cls-2"
              d="M768.47 168c-17.75 0-25.87-10.26-25.87-29.72V30.14c0-20.09 8.34-29.93 25.65-29.93 15.61 0 24.58 7.91 24.58 34.42 0 11.33-.64 16.89-1.28 21.16l-15.82-1.28a111 111 0 0 0 1.07-16.67c0-18-2.13-21-7-21-4.06 0-6.41 2.35-6.41 9.4V143c0 6 2.13 8.33 6.19 8.33 5.14 0 7.27-4.49 7.27-21.8a93.77 93.77 0 0 0-1.28-15.82l15.82-1.28a100.58 100.58 0 0 1 1.71 20.09c-.05 28.23-9.24 35.48-24.63 35.48Z"
            />
            <path id="rect-1" className="cls-2" d="M365.74 2.35h20.73v165.02h-20.73z" />
            <path id="rect-2" className="cls-2" d="M0 2.35h793.05v165.02H0z" />
          </g>
        </g>
      </svg>
    </SVGContainer>
  );
}
