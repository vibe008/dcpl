"use client";
import Heading from "./Heading";
import Faq from "./Faq";
export default function Services() {
    return (
        <section id="services" className="w-[95%] m-auto flex flex-col md:flex- sm:flex-col lg:flex-row sm:gap-13 py-10 lg:py-20 ">
            <div className="w-[50%]">
                <Heading>Services</Heading>
            </div>
            <div className="w-[100%] lg:w-[50%] flex ">
               <Faq />
            </div>
        </section>
    );
}