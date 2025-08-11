'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, Settings } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md border-b border-border' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-gold to-primary-dark-gold flex items-center justify-center font-bold text-primary-black">
                P
              </div>
              <span className="text-xl font-display font-bold gradient-gold">
                Portfolio
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-primary-gold transition-colors font-medium"
                >
                  {item.name}
                </motion.button>
              ))}
              
              {/* Admin Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-card hover:bg-primary-gold hover:text-primary-black transition-colors"
                title="Admin Panel"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-card hover:bg-primary-gold hover:text-primary-black transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          x: isMenuOpen ? '0%' : '100%' 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-40 ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="p-6 pt-20">
          <div className="space-y-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  x: isMenuOpen ? 0 : 20 
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center gap-4 w-full p-4 rounded-lg hover:bg-primary-gold hover:text-primary-black transition-colors text-left"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.button>
            ))}
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0, 
                x: isMenuOpen ? 0 : 20 
              }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="pt-4 border-t border-border"
            >
              <button className="flex items-center gap-4 w-full p-4 rounded-lg hover:bg-primary-gold hover:text-primary-black transition-colors text-left">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Admin Panel</span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Navbar;
