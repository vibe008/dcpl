"use client";
import Heading from "./Heading";
export default function About() {
    return (
        <section id="about" className="w-[95%] m-auto flex flex-col lg:flex-row sm:flex-col lg:gap-13 py-10 lg:py-20">
            <div className="w-[50%]">
                <Heading>About</Heading>
            </div>
            <div className="w-[100%] lg:w-[50%] flex flex-col lg:flex-row gap-5 lg:gap-13">
                <div className="w-[100%] lg:w-[50%] my-5 lg:my-0">
                    <p className="lg:text-[.875rem] md:text-[2.5rem]  sm:text-[1rem]"> Dera Consultants was founded by Ar. Mayank Garg in 2011.
                        Later in 2014, it was converted to Dera Consultants Private
                        Limited.
                        DCPL currently has 02 appointed Directors/Decision makers
                        Mayank Garg & Anand Thakkar.</p>
                </div>
                <div className="w-[100%] lg:w-[50%]">
                    <p className="lg:text-[.875rem] md:text-[2.5rem]  sm:text-[1rem]"> We are a multidisciplinary practice that provides professional services in Architectural design,
                        interior design, Engineering, Urban planning, Project management and construction
                        management.
                        We believe that design is essentially problem-solving. The objective is to find simple and elegant
                        solutions to practical problems, within the unique constraints faced by each project.</p>
                </div>
            </div>
        </section>
    );
}