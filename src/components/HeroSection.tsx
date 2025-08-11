'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Download } from 'lucide-react';

interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
  avatarUrl?: string;
  skills?: string[];
}

const HeroSection = () => {
  const [profile, setProfile] = useState<Profile>({
    name: "Your Name",
    title: "Project Manager & Fullstack Engineer",
    bio: "Passionate about building innovative solutions and leading successful projects from concept to deployment. Experienced in both technical development and project management.",
    email: "mhaikalas@gmail.com",
    phone: "+62 8231 8979 805",
    location: "Jakarta, Indonesia",
    linkedinUrl: "https://www.linkedin.com/in/haikal-alfandi-61836922a/",
    githubUrl: "https://github.com/haikal-dev-fs",
    skills: ["PHP", "Laravel", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Project Management", "Agile/Scrum"]
  });
  
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
    checkCvAvailability();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      if (data.success && data.data) {
        const profileData = data.data;
        setProfile({
          ...profileData,
          skills: profileData.skills ? JSON.parse(profileData.skills) : []
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // Keep fallback data if API fails
    }
  };

  const checkCvAvailability = async () => {
    try {
      // First try the API
      const cvResponse = await fetch('/api/cv/check');
      if (cvResponse.ok) {
        const data = await cvResponse.json();
        if (data.success && data.cvUrl) {
          setCvUrl(data.cvUrl);
          return;
        }
      }
      
      // Fallback: check for standard cv.pdf file
      const testResponse = await fetch('/uploads/cv/cv.pdf', { method: 'HEAD' });
      if (testResponse.ok) {
        setCvUrl('/uploads/cv/cv.pdf');
      }
    } catch (error) {
      console.log('No CV available');
    }
  };

  const handleDownloadCV = () => {
    if (cvUrl) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = `${profile.name.replace(/\s+/g, '_')}_CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('CV not available. Please contact me directly for my resume.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-primary-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Content */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block"
            >
              <span className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium border border-gray-600 text-white">
                👋 Hello, I&apos;m
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl lg:text-7xl font-display font-bold"
            >
              <span className="gradient-gold">{profile.name}</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-300 font-medium"
            >
              {profile.title}
            </motion.p>
          </div>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-400 text-lg leading-relaxed max-w-xl"
          >
            {profile.bio}
          </motion.p>

          {/* Contact Info */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 text-primary-gold" />
              <span>{profile.email}</span>
            </div>
            {profile.phone && (
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-primary-gold" />
                <span>{profile.phone}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-primary-gold" />
                <span>{profile.location}</span>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadCV}
              className={`px-8 py-4 font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                cvUrl 
                  ? 'bg-primary-gold text-primary-black hover:bg-primary-dark-gold' 
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}
              disabled={!cvUrl}
            >
              <Download className="w-5 h-5" />
              {cvUrl ? 'Download CV' : 'CV Not Available'}
            </motion.button>
            
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-4"
          >
            {profile.githubUrl && (
              <motion.a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-lg bg-card hover:bg-primary-gold hover:text-primary-black transition-colors"
              >
                <Github className="w-6 h-6" />
              </motion.a>
            )}
            {profile.linkedinUrl && (
              <motion.a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-lg bg-card hover:bg-primary-gold hover:text-primary-black transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Right Content - Skills & Avatar */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Avatar placeholder */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: 20 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mx-auto w-80 h-80 rounded-2xl bg-gradient-to-br from-primary-gold to-primary-dark-gold p-1"
          >
            <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center text-6xl">
              👤
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-primary-gold">Core Skills</h3>
            <div className="flex flex-wrap gap-3">
              {profile.skills?.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-card rounded-full text-sm font-medium border border-border hover:border-primary-gold hover:bg-primary-gold hover:text-primary-black transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
