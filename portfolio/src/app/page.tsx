'use client';

import Navbar from '@/components/Navbar';
import SmoothScrollContainer from '@/components/SmoothScrollContainer';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="bg-primary-black text-white">
      <Navbar />
      <SmoothScrollContainer>
        <section id="home" className="min-h-screen">
          <HeroSection />
        </section>
        <section id="about" className="min-h-screen py-20">
          <AboutSection />
        </section>
        <section id="projects" className="min-h-screen py-20">
          <ProjectsSection />
        </section>
        <section id="contact" className="min-h-screen py-20">
          <ContactSection />
        </section>
        
        {/* Footer */}
        <footer className="border-t border-gray-700 py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-gold to-primary-dark-gold flex items-center justify-center font-bold text-primary-black text-sm">
                  P
                </div>
                <span className="font-medium">Portfolio 2025</span>
              </div>
              
              <p className="text-gray-400 text-sm">
                Built with Next.js, TypeScript, Tailwind CSS & Framer Motion
              </p>
              
              <p className="text-gray-400 text-sm">
                © 2025 All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </SmoothScrollContainer>
    </main>
  );
}
