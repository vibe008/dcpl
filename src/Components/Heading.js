"use client";
import { useState, useEffect } from "react";
export default function Heading({children}) {

        const [isMobile, setIsMobile] = useState(false);
    
        useEffect(() => {
          const handleResize = () => setIsMobile(window.innerWidth < 1024);
          handleResize();
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }, []);
    return (
        <h2 style={{
            color: "var(--black)",
            letterSpacing: "-3px",
            textTransform: "uppercase",
            marginTop: "-5px",
            marginBottom: "10px",
            fontSize: isMobile ? "4rem" : "4.5rem",
            fontWeight: "700",
            lineHeight: "110%"
        }} >{children}</h2>
    );
}