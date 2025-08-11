'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState({
    email: 'mhaikal@gmail.com',
    phone: '+62 8231 8979 805',
    location: 'Jakarta, Indonesia',
    githubUrl: 'https://github.com/haikal-dev-fs',
    linkedinUrl: 'https://www.linkedin.com/in/haikal-alfandi-61836922a/'
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      if (data.success && data.data) {
        setProfile({
          email: data.data.email || 'mhaikal@gmail.com',
          phone: data.data.phone || '+62 8231 8979 805',
          location: data.data.location || 'Jakarta, Indonesia',
          githubUrl: data.data.githubUrl || 'https://github.com/haikal-dev-fs',
          linkedinUrl: data.data.linkedinUrl || 'https://www.linkedin.com/in/haikal-alfandi-61836922a/'
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // Keep fallback data if API fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, '')}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(profile.location)}`
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: profile.githubUrl
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: profile.linkedinUrl
    }
  ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-display font-bold mb-6"
          >
            Get In <span className="gradient-gold">Touch</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to collaborate on your next project? Let&apos;s discuss how we can work together 
            to bring your ideas to life.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-primary-gold mb-6">
                Let&apos;s Start a Conversation
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Whether you have a project in mind, need consultation on technology choices, 
                or want to discuss project management strategies, I&apos;m here to help. 
                Let&apos;s connect and explore the possibilities.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary-gold transition-all card-hover group"
                >
                  <div className="p-3 rounded-lg bg-primary-gold/10 text-primary-gold group-hover:bg-primary-gold group-hover:text-primary-black transition-colors">
                    <contact.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-white group-hover:text-primary-gold transition-colors">
                      {contact.label}
                    </div>
                    <div className="text-gray-400">
                      {contact.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-8 border-t border-border"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-lg bg-card hover:bg-primary-gold hover:text-primary-black transition-colors border border-border hover:border-primary-gold"
                    title={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-card border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-card border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white placeholder-gray-500"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 bg-card border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white placeholder-gray-500"
                  placeholder="Project Collaboration"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full p-4 bg-card border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white placeholder-gray-500 resize-none"
                  placeholder="Tell me about your project or how I can help you..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-8 bg-primary-gold text-primary-black font-semibold rounded-lg hover:bg-primary-dark-gold transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-black/30 border-t-primary-black rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
