"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const links = document.querySelectorAll("a");
    const cursorText = document.querySelector(
      ".cursor-text"
    ) as HTMLDivElement | null; // Type assertion

    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, { x: clientX, y: clientY });
    };
    const onMouseEnterLink = (event: MouseEvent) => {
      const link = event.target as HTMLAnchorElement;
      if (cursorText && link.classList.contains("view")) {
        // Check if cursorText exists
        gsap.to(cursor, { scale: 4 });
        cursorText.style.display = "block";
      } else {
        gsap.to(cursor, { scale: 4 });
      }
    };
    const onMouseleaveLink = () => {
      if (cursorText) {
        // Check if cursorText exists
        gsap.to(cursor, { scale: 1 });
        cursorText.style.display = "none";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseleaveLink);
    });

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseleaveLink);
      });
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div id="custom-cursor" className="custom-cursor">
      <span className="cursor-text">View</span>
    </div>
  );
};

export default Cursor;
