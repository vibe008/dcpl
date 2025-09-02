"use client";

import Heading from "./Heading";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Projects() {
    const projectsData = [
        {
            id: 1,
            title: "Double Basement Car Parking ",
            content: "Complete redevelopment of Mathura's iconic park with modern amenities while preserving its cultural significance.",
            image: "/assets/homeProject1.jpg",
            year: "2022",
            type: "Architecture",
            city: "Alwar",
        },
        {
            id: 2,
            title: "Akshay vat ,Patalpuri and Saraswati Koop",
            content: "Heritage conservation project preserving this important historical monument using traditional techniques.",
            image: "/assets/homeProject2.jpg",
            year: "2022",
            type: "Architecture",
            city: "Mathura",
        },
        {
            id: 3,
            title: "Hanumant Vihar Colony",
            content: "Sustainable residential development incorporating smart city principles and green building technologies.",
            image: "/assets/homeProject3.jpg",
            year: "2022",
            type: "Architecture",
            city: "Mathura",
        },
        {
            id: 4,
            title: "Govind Vihar Colony",
            content: "Sustainable residential development incorporating smart city principles and green building technologies.",
            image: "/assets/homeProject4.jpg",
            year: "2022",
            type: "Architecture",
            city: "Mathura",
        },
    ];
    return (
        <section className="w-[95%] m-auto mt-10  lg:mt-0" >
            <div className="w-[50%]">
                <Heading>Projects</Heading>
            </div>
            {projectsData.map((project) => (
                <div key={project.id} className={`w-[100%] h-[400px] lg:h-[550px] sm:h-[400px]   md:h-[2000px] my-15   flex items-center  mb-[150px]  ${project.id % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <motion.div  style={{ height: "100%"}} className=" relative w-[100%] lg:w-[90%] ">
                        <motion.img  whileInView={{width:"100%"}} initial={{width:0}} transition={{duration:1}}  className={`w-[100%] h-[70%] lg:h-[100%] md:h-[80%] object-cover absolute ${project.id % 2 === 0 ? "right-0" : "left-0"}`} src={project.image} />
                        <div  
                         className={`w-[100%] lg:w-[25%]   h-[40%] lg:h-[70%]  md:h-[20%]   lg:bg-[#ffffffd9] absolute bottom-0 lg:bottom-1/2 md:bottom-[0px] transform translate-y-1/2 md:translate-y-0  lg:translate-y-1/2 shadow-none lg:shadow-xl flex items-center ${project.id % 2 === 0 ? "lg:right-0  lg:translate-x-1/2" : "lg:left-[-10%]  sm:left-[0%] sm:translate-x-(-2.5)"  }`} >
                            <div className=" p-0 lg:p-10 flex flex-col justify-between h-[80%] w-[95%] lg:w-[100%] m-auto">
                                <h3 style={{
                                    marginTop: 0,
                                    marginBottom: 0,
                                    fontWeight: 500,
                                    lineHeight: "120%",
                                }} className="text-[1.5rem] lg:text-[1.5rem] md:text-[2rem] capitalize">{project.title}</h3>
                                <div className="flex w-[80%] lg:w-[100%] justify-between items-center mt-[1rem]">
                                    <div className="flex items-center gap-2 ">
                                        <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
                                        <div className="text-[.876rem] lg:text-[.876rem] md:text-[1.5rem]">{project.year}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
                                        <div className="text-[.876rem] lg:text-[.876rem] md:text-[1.5rem]">{project.type}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
                                        <div className="text-[.876rem] lg:text-[.876rem] md:text-[1.5rem]">{project.city}</div>
                                    </div>
                                </div>

                                <p style={{
                                    fontWeight: 500,
                                    lineHeight: "150%",
                                    marginTop: "1rem",
                                }} className="text-[.9rem] lg:text-[.9rem] md:text-[2rem]">{project.content}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ))}

            <div className="w-[95%] m-auto flex justify-center ">
                <button  className="bg-black text-white px-10 md:px-20 lg:px-10 py-2 md:py-10 lg:py-5 text-[.876rem] md:text-[2rem] lg:text-[1rem] rounded-full cursor-pointer">View All Projects</button>
            </div>
        </section>
    );
}