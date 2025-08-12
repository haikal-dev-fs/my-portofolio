'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  const [profile, setProfile] = useState({
    name: "Muhammad Haikal",
    title: "Project Manager & Fullstack Engineer",
    bio: "Bridging the gap between technical excellence and project success.",
    email: "haikal@example.com",
    linkedinUrl: "https://linkedin.com/in/haikal-dev",
    githubUrl: "https://github.com/haikal-dev-fs"
  });
  
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Don't try to check CV for now to avoid 500 error
    // checkCV();
  }, []);

  const handleDownloadCV = () => {
    // Simple alert instead of trying to download
    alert('CV tidak tersedia saat ini. Silakan hubungi saya langsung untuk CV.');
  };

  if (!mounted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-gradient-to-br from-background via-primary-black to-background">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-700 rounded w-64 mb-4"></div>
          <div className="h-8 bg-gray-700 rounded w-96 mb-8"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-gradient-to-br from-background via-primary-black to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-gold/5 via-transparent to-transparent"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-display font-bold"
          >
            <span className="block">Hello, I'm</span>
            <span className="gradient-gold">{profile.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl lg:text-4xl text-gray-300 font-light"
          >
            {profile.title}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {profile.bio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadCV}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-gold to-yellow-500 text-black font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary-gold/25"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download CV
            </motion.button>

            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-card border border-border rounded-full text-gray-400 hover:text-primary-gold hover:border-primary-gold transition-all duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-card border border-border rounded-full text-gray-400 hover:text-primary-gold hover:border-primary-gold transition-all duration-300"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href={`mailto:${profile.email}`}
                className="p-4 bg-card border border-border rounded-full text-gray-400 hover:text-primary-gold hover:border-primary-gold transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
