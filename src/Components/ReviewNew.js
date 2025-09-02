'use client'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function ReviewNew() {
    const swiperRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    
    const goToPrevSlide = () => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    };

    const goToNextSlide = () => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    }
    
    return (
        <div className='bg-[#1e1e1e] w-[100%] h-[100vh] flex items-center justify-center'>
            <div className='w-[100%] lg:w-[50%] m-auto h-[50%] '>
                <h2 className='text-[1rem]  lg:text-[0.875rem] font-bold text-white uppercase tracking-wider text-center'>hear our client</h2>
                <h2  style={{lineHeight:"120%" ,letterSpacing:"120%"}} className='lg:text-[4.5vw] text-[14.5vw]   font-bold text-white uppercase tracking-wider text-center'>Reviews</h2>
                <div className='w-[75%] md:w-[90%] lg:w-[75%] m-auto  h-[200px] flex align-center md:h-[50%] lg:h-[200px] '>
                    <Swiper ref={swiperRef} onSwiper={(swiper) => {
                        setSwiperInstance(swiper);
                    }}>
                        <SwiperSlide>
                            <p style={{lineHeight:"150%"}} className='text-center text-[1.1rem] italic mx-auto text-[#c1d0d8]  md:text-[3.5rem] lg:text-[1.1rem]'>
                                &quot;DCPL&apos;s work on heritage conservation projects demonstrates exceptional understanding of traditional techniques while incorporating modern conservation standards.&quot;
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <p style={{lineHeight:"150%"}} className='text-center text-[1.1rem] italic mx-auto text-[#c1d0d8] md:text-[3.5rem] lg:text-[1.1rem]'>
                                &quot;The Jubilee Park redevelopment exceeded all expectations. DCPL created a space that honors tradition while serving modern community needs beautifully.&quot;
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <p className='text-center text-[1.1rem] italic mx-auto text-[#c1d0d8] md:text-[3.5rem] lg:text-[1.1rem]'>
                                &quot;Working with DCPL has been inspirational. Their attention to cultural context and environmental sustainability sets them apart in the industry.&quot;
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <p className='text-center text-[1.1rem] italic mx-auto text-[#c1d0d8] md:text-[3.5rem] lg:text-[1.1rem]'>
                                Our commitment to excellence has earned recognition from government bodies,
                                cultural institutions, and satisfied clients across India.
                            </p>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className='w-[75%] m-auto  flex items-center justify-center md:mt-[10%] lg:mt-[0%]' >
                    <button className=' text-black lg:px-4 lg:py-2 sm:px-4 py-2 px-2 md:px-30 md:py-20 mx-2 md:mx-10  lg:mx-2 rounded-full bg-[#c1d0d8]' onClick={goToPrevSlide}>
                        <img src="../assets/left-Arrow.svg" alt="Previous" />
                    </button>
                    <button className=' text-black lg:px-4 lg:py-2 sm:px-4 py-2 px-2 md:px-30 md:py-20 mx-2 md:mx-10 lg:mx-2 rounded-full bg-[#c1d0d8]' onClick={goToNextSlide}>
                        <img src="../assets/right-arrow.svg" alt="Next" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReviewNew;