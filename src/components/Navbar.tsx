'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { name: 'Home', href: '#home', icon: Home, type: 'scroll' },
    { name: 'About', href: '#about', icon: User, type: 'scroll' },
    { name: 'Projects', href: '/projects', icon: Briefcase, type: 'link' },
    { name: 'Contact', href: '#contact', icon: Mail, type: 'scroll' },
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    if (item.type === 'scroll' && pathname === '/') {
      // If on homepage and it's a scroll link, scroll to section
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.type === 'scroll' && pathname !== '/') {
      // If not on homepage but need to scroll, go home first then scroll
      router.push('/' + item.href);
    } else if (item.type === 'link') {
      // If it's a page link, navigate to page
      router.push(item.href);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary-gold to-primary-dark-gold flex items-center justify-center font-bold text-primary-black text-sm sm:text-base">
                  P
                </div>
                <span className="text-lg sm:text-xl font-display font-bold gradient-gold">
                  Portfolio
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleNavigation(item)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-300 hover:text-primary-gold transition-colors font-medium"
                >
                  {item.name}
                </motion.button>
              ))}
              
              {/* Admin Button */}
              <motion.a
                href="/admin"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-card hover:bg-primary-gold hover:text-primary-black transition-colors inline-flex items-center justify-center"
                title="Admin Panel"
              >
                <Settings className="w-5 h-5" />
              </motion.a>
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
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-card/95 backdrop-blur-md border-l border-border z-40 ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="p-4 sm:p-6 pt-16 sm:pt-20">
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
                onClick={() => handleNavigation(item)}
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
              <a 
                href="/admin"
                className="flex items-center gap-4 w-full p-4 rounded-lg hover:bg-primary-gold hover:text-primary-black transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Admin Panel</span>
              </a>
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
