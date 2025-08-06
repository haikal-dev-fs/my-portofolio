'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface AboutData {
  name: string;
  title: string;
  bio: string;
  email: string;
  profile_image?: string;
  resume_url?: string;
}

const Hero = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about');
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full animate-pulse"></div>
              <div className="relative w-full h-full bg-white rounded-full p-2">
                {aboutData?.profile_image ? (
                  <Image
                    src={aboutData.profile_image}
                    alt={aboutData.name || 'Profile'}
                    width={160}
                    height={160}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-600">
                      {aboutData?.name?.charAt(0) || 'P'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              {aboutData?.name || 'Your Name'}
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-600 font-medium mb-6">
              {aboutData?.title || 'Full Stack Developer'}
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariants}>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              {aboutData?.bio || 'Passionate developer with experience in modern web technologies.'}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </Button>
            {aboutData?.resume_url && (
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
                onClick={() => {
                  if (aboutData.resume_url) {
                    const link = document.createElement('a');
                    link.href = aboutData.resume_url;
                    link.download = aboutData.resume_url.includes('/uploads/') ? 'CV_Resume.pdf' : '';
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6 mb-16"
          >
            <a
              href="https://github.com/haikal-dev-fs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6 text-gray-700" />
            </a>
            <a
              href="https://www.linkedin.com/in/haikal-alfandi-61836922a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-blue-600" />
            </a>
            <a
              href="mailto:mhaikalas@gmail.com"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-6 h-6 text-red-500" />
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="animate-bounce"
          >
            <a
              href="#about"
              className="inline-block p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowDown className="w-6 h-6 text-gray-600" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
