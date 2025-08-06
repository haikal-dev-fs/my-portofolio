import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:your.email@example.com',
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo/Brand */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Portfolio</h3>
            <p className="text-gray-400 max-w-md">
              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors group"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#home" className="text-gray-400 hover:text-white transition-colors">
              Home
            </a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gray-700"></div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p className="flex items-center justify-center gap-1">
              © {currentYear} Made with{' '}
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              by Your Name
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
