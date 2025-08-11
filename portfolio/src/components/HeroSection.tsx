'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
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
    email: "your.email@example.com",
    phone: "+1234567890",
    location: "Jakarta, Indonesia",
    linkedinUrl: "https://linkedin.com/in/yourprofile",
    githubUrl: "https://github.com/yourprofile",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Project Management", "Agile/Scrum"]
  });

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
              className="px-8 py-4 bg-primary-gold text-primary-black font-semibold rounded-lg hover:bg-primary-dark-gold transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-primary-gold text-primary-gold font-semibold rounded-lg hover:bg-primary-gold hover:text-primary-black transition-colors"
            >
              View Projects
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
