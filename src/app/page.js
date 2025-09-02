import Image from "next/image";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import NewHero from "../Components/NewHero";
import About from "../Components/About";
import Services from "../Components/Services";
import Projects from "../Components/Projects";
import Achivments from "../Components/Achivments";
import Awards from "../Components/Awards";
import Reviews from "../Components/Reviews";
import Gallery from "../Components/Gallery";
import ReviewNew from "../Components/ReviewNew";
import Team from "../Components/Team";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";

  export default function Home() {
  return (
    <main>
      <Navbar />
      {/* <Hero /> */}
      <NewHero />
      <About /> 
      <Services />
      <Projects />
      <Achivments />
      {/* <Awards /> */}
      {/* <Reviews /> */}
      <Gallery />
      <Team />
      <ReviewNew />
      <Contact />
      <Footer />
    </main>
  );
}
