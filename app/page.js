"use client";
import React, { useEffect, useState } from "react";
import ImageEditor from "@/components/ImageEditor";
import MobileView from "@/components/MobileView";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (showEditor) {
    return isMobile ? <MobileView /> : <ImageEditor />;
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-tr from-[#22073d] via-[#005e99] to-[#b85a0a] text-white animate-gradient">


      {/* Header */}
<Navbar/>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            {/* <img 
              src="/logo.png" 
              alt="Pixora Logo" 
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain mr-4"
            /> */}
            <h1 className="text-5xl sm:text-7xl font-extrabold font-poppins tracking-tight drop-shadow-md">
              <span className="text-[#000000]">PIXORA</span>
            </h1>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-light text-gray-200 mb-6 leading-relaxed">
            Professional Image Editing, Reimagined
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Transform your creative vision into reality with our cutting-edge browser-based image editor. 
            No downloads required – just pure, powerful editing tools at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => setShowEditor(true)}
              className="px-10 py-4 rounded-full bg-[#00D1FF] text-gray-900 text-lg font-semibold shadow-xl hover:bg-[#00bde3] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Start Creating
            </button>
            <button className="px-10 py-4 rounded-full border-2 border-[#00D1FF] text-[#00D1FF] text-lg font-semibold hover:bg-[#00D1FF] hover:text-gray-900 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-[#00D1FF] mb-2">500K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00D1FF] mb-2">50M+</div>
              <div className="text-gray-400">Images Edited</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#00D1FF] mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Why Choose <span className="text-[#00D1FF]">PIXORA</span>?
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Experience the future of image editing with our comprehensive suite of professional tools, 
            designed for both beginners and experts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-[#00D1FF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-300">
                Process images instantly with our optimized engine. No waiting, no delays – just seamless editing experience.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-[#00D1FF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Intuitive Design</h3>
              <p className="text-gray-300">
                Clean, modern interface that gets out of your way. Focus on your creativity, not learning complex tools.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-[#00D1FF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Tools</h3>
              <p className="text-gray-300">
                Access advanced features like layer management, filters, color correction, and precision editing tools.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-[#00D1FF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-300">
                Your images never leave your device. All processing happens locally in your browser for maximum privacy.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-[#00D1FF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Auto-Save</h3>
              <p className="text-gray-300">
                Never lose your work with automatic saving and version history. Pick up exactly where you left off.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-[#00D1FF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Cross-Platform</h3>
              <p className="text-gray-300">
                Works seamlessly on desktop, tablet, and mobile. Edit anywhere, anytime with responsive design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Transform Your Images?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who trust PIXORA for their image editing needs. 
            Start your creative journey today – no registration required.
          </p>
          <button
            onClick={() => setShowEditor(true)}
            className="px-12 py-4 rounded-full bg-[#00D1FF] text-gray-900 text-xl font-semibold shadow-xl hover:bg-[#00bde3] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Launch Editor Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-8 px-6 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img 
                src="/logo.png" 
                alt="Pixora Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold text-[#00D1FF]">PIXORA</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 PIXORA. All rights reserved.</p>
              <p className="text-sm mt-1">Empowering creativity through innovation</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}