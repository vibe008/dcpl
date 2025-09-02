"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const heroImage = "../assets/hero-architecture.jpg"
export default function NewHero() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 1024);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return (
        <motion.section initial={{width:"0"}} animate={{width:isMobile ? "100%" : "95%"}} transition={{duration:1}} className="w-[100%] lg:w-[95%] m-auto">
            <div className="hero-images-wrapper" style={{ alignItems: "stretch", minHeight: isMobile ? "50vh" : "85vh", maxHeight: "85vh", marginBottom: "40px", marginLeft: "auto", position: "relative", overflow: "hidden", height: isMobile?"50vh":"100vh" }}>
                <div className="hero-image-background" style={{ backgroundPosition: "50%", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed", width: "100%", height: "100%", backgroundImage: "url('../assets/bgsky.webp')" }} />
                {/* Large WOODLAND text */}
                <div className="page-title" style={{
                    zIndex: 2,
                    gridColumnGap: 16,
                    gridRowGap: 16,
                    mixBlendMode: "overlay",
                    gridTemplateRows: "auto auto",
                    gridTemplateColumns: "1fr 1fr",
                    gridAutoColumns: "1fr",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingLeft: isMobile ? "0px" : "40px",
                    paddingRight: isMobile ? "0px" : "40px",
                    display: "inline-flex",
                    position: "absolute",
                    inset: isMobile ? "18vw 2% auto" : "2vw 0% auto"
                }}>
                    <div className="container" style={{ width: "100%", maxWidth: "none", marginLeft: "auto", marginRight: "auto", color: "#000000" }}>
                        <h1 className="large-title font-geistMono.variable" style={{
                            fontSize: isMobile ? "20vw" : "15vw", lineHeight: "100%", letterSpacing: isMobile ? "29px" : "27px",
                        }} aria-label="dera">
                            <div aria-hidden="true" className="gsap_split_word gsap_split_word1" style={{ position: "relative", display: "inline-block" }}>
                                <motion.div initial={{ opacity: 0, transform: "translate3d(0px, 100%, 0px)" }} animate={{ opacity: 1, transform: "translate3d(0px, 0%, 0px)" }} duration={1} transition={{ delay: 0.5, ease: "easeOut" }} className="gsap_split_letter gsap_split_letter1" style={{ position: "relative", display: "inline-block", translate: "none", rotate: "none", scale: "none", transform: "translate3d(0px, 0%, 0px)" }}> D
                                </motion.div>
                                <motion.div initial={{ opacity: 0, transform: "translate3d(0px, 100%, 0px)" }} animate={{ opacity: 1, transform: "translate3d(0px, 0%, 0px)" }} duration={1} transition={{ delay: 0.7, ease: "easeOut" }} className="gsap_split_letter gsap_split_letter2" style={{ position: "relative", display: "inline-block", translate: "none", rotate: "none", scale: "none", transform: "translate3d(0px, 0%, 0px)" }}> C
                                </motion.div>
                                <motion.div initial={{ opacity: 0, transform: "translate3d(0px, 100%, 0px)" }} animate={{ opacity: 1, transform: "translate3d(0px, 0%, 0px)" }} duration={1} transition={{ delay: 0.8, ease: "easeOut" }} className="gsap_split_letter gsap_split_letter3" style={{ position: "relative", display: "inline-block", translate: "none", rotate: "none", scale: "none", transform: "translate3d(0px, 0%, 0px)" }}> P
                                </motion.div>
                                <motion.div initial={{ opacity: 0, transform: "translate3d(0px, 100%, 0px)" }} animate={{ opacity: 1, transform: "translate3d(0px, 0%, 0px)" }} duration={1} transition={{ delay: 0.9, ease: "easeOut" }} className="gsap_split_letter gsap_split_letter4" style={{ position: "relative", display: "inline-block", translate: "none", rotate: "none", scale: "none", transform: "translate3d(0px, 0%, 0px)" }}> L
                                </motion.div>
                            </div>
                        </h1>
                    </div>
                </div>

                <div className="hero-image-foreground" style={{
                    zIndex: 3,
                    backgroundImage: "url('../assets/front.webp')",
                    // backgroundImage: "url('../assets/hero-architecture.jpg')",
                    backgroundPosition: "50% 0",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundAttachment: isMobile ? "scroll" : "fixed",
                    position: "absolute",
                    inset: isMobile ? "0%" : "0%"
                }} />
            </div>
            <div className="animated-overlay-blocks" style={{
                zIndex: 4,
                display: "flex",
                position: "absolute",
                inset: "0%",
                overflow: "hidden"
            }}>
                <div className="left-overlay-block" style={{ translate: "none", rotate: "none", scale: "none", transform: "translate3d(-100%, 0px, 0px)" }}>

                </div>
                <div className="right-overlay-block" style={{ translate: "none", rotate: "none", scale: "none", transform: "translate3d(100%, 0px, 0px)" }}>

                </div>
            </div>

        </motion.section>
    );
}