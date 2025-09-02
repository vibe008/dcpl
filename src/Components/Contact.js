'use client'
import React from 'react'
import Image from 'next/image'

function Contact() {
    return (
        <div className=' w-[100%] h-[100%]  '>
            <div className='w-[95%] m-auto relative flex flex-col lg:flex-row' >
                <div className='w-[100%] lg:w-[40%]  pt-[15%]'>
                    <h2 className='text-[4.5rem] md:text-[6rem] lg:text-[4.5rem] ' style={{
                        color: "black",
                        letterSpacing: '-3px',
                        textTransform: 'uppercase',
                        marginTop: '-5px',
                        marginBottom: '10px',
                        fontWeight: '700',
                        lineHeight: '110%'
                    }}    >
                        Partner with <br /> us
                    </h2>
                    <p className='text-[.875rem] text-[#747474] md:text-[2.5rem] lg:text-[.875rem] md:my-15 lg:my-0'>
                        Ready to transform your vision into reality? Get in touch with our team to discuss your architectural needs and discover how we can help.
                    </p>
                    <div>
                        <form>
                         <div className='flex flex-col mt-5 md:my-15 lg:my-5'>
                            <label className='text-[.875rem] my-0.5 text-[#747474] md:text-[2rem] lg:text-[.875rem]' htmlFor="name">Your Full Name</label>
                            <input className='bg-[#f5f5f5] py-2 md:py-8 lg:py-2 rounded outline-none' type="text" id="name" />
                         </div>
                         <div className='flex flex-col mt-5 md:my-15 lg:my-5'>
                            <label className='text-[.875rem] my-0.5 text-[#747474] md:text-[2rem] lg:text-[.875rem]' htmlFor="email">Email</label>
                            <input className='bg-[#f5f5f5] p-2 md:p-8 lg:p-2 rounded outline-none' type="email" id="email" />
                         </div>
                         <div className='flex flex-col mt-5 md:my-15 lg:my-5'>
                            <label className='text-[.875rem] my-0.5 text-[#747474] md:text-[2rem] lg:text-[.875rem]' htmlFor="phone">Phone</label>
                            <input className='bg-[#f5f5f5] p-2 md:p-8 lg:p-2 rounded outline-none' type="text" id="phone" />
                         </div>
                         <div className='flex flex-col mt-5 md:my-15 lg:my-5'>
                            <label className='text-[.875rem] my-0.5 text-[#747474] md:text-[2rem] lg:text-[.875rem]' htmlFor="message">Message</label>
                            <textarea className='bg-[#f5f5f5] p-2 md:p-8 lg:p-2 rounded outline-none' id="message"></textarea>
                         </div>
                         <div>
                            <button className='bg-black text-white p-2 mt-5 md:mt-10 lg:mt-5 rounded w-[100%] md:p-8 lg:p-2 md:text-[2rem] lg:text-[.875rem]'>Submit</button>
                         </div>
                        </form>
                    </div>
                </div>

                <div className='w-[100%] lg:w-[50%] mt-20 lg:mt-0 lg:absolute lg:right-0 lg:top-[-10%] h-[105%] '>
                     <img src="/assets/contact.jpg" alt="" className='w-full h-full object-cover' />
                </div>
            </div>
        </div>
    )
}
export default Contact