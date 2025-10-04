"use client";
import Heading from "./Heading";
import Faq from "./Faq";

export default function Services() {
    return (
        <section id="services" className="relative min-h-screen bg-white overflow-hidden">
            <div className="container mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* Left Side - Elegant Heading */}
                    <div className="sticky top-20">
                        <div className=" pl-8">
                            <Heading className="text-black mb-6">
                            SERVICES
                            </Heading>
                            <p className="text-gray-600 text-lg font-light leading-relaxed max-w-md">
                                We provide comprehensive architectural services with precision, 
                                creativity, and attention to detail that stands the test of time.
                            </p>
                        </div>
                    </div>
                    
                    {/* Right Side - Elegant FAQ */}
                    <div className="relative">
                        <Faq />
                    </div>
                </div>
            </div>
        </section>
    );
}