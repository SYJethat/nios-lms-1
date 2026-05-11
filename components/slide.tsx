"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CollaborationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 20) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY * 2.2; // Smooth right-to-left horizontal scroll
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });

    return () => slider.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      {/* Dummy content before section for scrolling test */}
      <div className="h-[700px] bg-gradient-to-b from-slate-100 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">Shakti Cloud</h1>
          <p className="text-2xl text-gray-600 mt-4">Scroll down to see the collaborations section</p>
        </div>
      </div>

      {/* Sticky Horizontal Scroll Section */}
      <div ref={sectionRef} className="sticky top-0 z-40 bg-white border-t border-b border-gray-100 py-24 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              BUILT WITH THE BEST
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Shakti Cloud is Engineered through Deep<br />
              Collaborations with Global Tech Leaders
            </h2>
          </div>

          {/* Horizontal Scrollable Cards */}
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12"
              style={{ scrollbarWidth: "none" }}
            >
              {/* NVIDIA Card */}
              <div className="min-w-[calc(50%-16px)] snap-start bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 rounded-3xl p-12 hover:shadow-2xl transition-all duration-500">
                <div className="mb-10">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/2/25/NVIDIA_Logo.svg"
                    alt="NVIDIA"
                    width={220}
                    height={60}
                    className="h-14 w-auto"
                  />
                </div>
                <h3 className="text-3xl font-semibold mb-6 text-gray-900">Strategic Collaboration with NVIDIA</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  One of only 6 global NVIDIA Cloud Partners and the first in APAC.
                  Shakti Cloud powers India's largest AI deployment with thousands of H100 GPUs,
                  delivering 99.95% of NVIDIA's benchmark performance.
                </p>
                <div className="mt-10 flex items-center gap-3 text-blue-600 font-medium">
                  Learn more about our NVIDIA partnership
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Microsoft Azure Card */}
              <div className="min-w-[calc(50%-16px)] snap-start bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-3xl p-12 hover:shadow-2xl transition-all duration-500">
                <div className="mb-10">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg"
                    alt="Microsoft Azure"
                    width={180}
                    height={60}
                    className="h-14 w-auto"
                  />
                </div>
                <h3 className="text-3xl font-semibold mb-6 text-gray-900">Exclusive Access to Microsoft Azure AI Ecosystem</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Seamless integration of Azure OpenAI, Azure ML, GitHub Copilot, and more —
                  all running on sovereign Indian infrastructure with full compliance to data residency norms.
                </p>
                <div className="mt-10 flex items-center gap-3 text-blue-600 font-medium">
                  Explore Azure AI on Shakti Cloud
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              {/* NVIDIA Card */}
              <div className="min-w-[calc(50%-16px)] snap-start bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 rounded-3xl p-12 hover:shadow-2xl transition-all duration-500">
                <div className="mb-10">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/2/25/NVIDIA_Logo.svg"
                    alt="NVIDIA"
                    width={220}
                    height={60}
                    className="h-14 w-auto"
                  />
                </div>
                <h3 className="text-3xl font-semibold mb-6 text-gray-900">Strategic Collaboration with NVIDIA</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  One of only 6 global NVIDIA Cloud Partners and the first in APAC.
                  Shakti Cloud powers India's largest AI deployment with thousands of H100 GPUs,
                  delivering 99.95% of NVIDIA's benchmark performance.
                </p>
                <div className="mt-10 flex items-center gap-3 text-blue-600 font-medium">
                  Learn more about our NVIDIA partnership
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Microsoft Azure Card */}
              <div className="min-w-[calc(50%-16px)] snap-start bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-3xl p-12 hover:shadow-2xl transition-all duration-500">
                <div className="mb-10">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg"
                    alt="Microsoft Azure"
                    width={180}
                    height={60}
                    className="h-14 w-auto"
                  />
                </div>
                <h3 className="text-3xl font-semibold mb-6 text-gray-900">Exclusive Access to Microsoft Azure AI Ecosystem</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Seamless integration of Azure OpenAI, Azure ML, GitHub Copilot, and more —
                  all running on sovereign Indian infrastructure with full compliance to data residency norms.
                </p>
                <div className="mt-10 flex items-center gap-3 text-blue-600 font-medium">
                  Explore Azure AI on Shakti Cloud
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 text-sm text-gray-500">
            Hover over the cards and scroll with your mouse wheel → Slide right to left
          </div>
        </div>
      </div>

      {/* Content after the sticky section */}
      <div className="h-[900px] bg-black text-white flex items-center justify-center text-center px-8">
        <div>
          <h2 className="text-5xl font-bold mb-6">Next Section</h2>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
            The collaborations section stayed sticky while you horizontally scrolled the cards.<br />
            Now continue normal vertical scrolling.
          </p>
        </div>
      </div>
    </>
  );
}