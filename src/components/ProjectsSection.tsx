'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, ExternalLink, Eye } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: string;
  featured: boolean;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with admin panel and payment integration',
      imageUrl: '/api/placeholder/600/400',
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/example/ecommerce',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'web',
      featured: true
    },
    {
      id: '2',
      title: 'Project Management Tool',
      description: 'Collaborative project management application with real-time features',
      imageUrl: '/api/placeholder/600/400',
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/example/projectmgmt',
      technologies: ['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL'],
      category: 'web',
      featured: true
    },
    {
      id: '3',
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication',
      imageUrl: '/api/placeholder/600/400',
      demoUrl: 'https://demo.example.com',
      technologies: ['React Native', 'Firebase', 'Biometrics API'],
      category: 'mobile',
      featured: false
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('all');
  const categories = ['all', 'web', 'mobile', 'desktop'];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="py-20 px-6">
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
            Featured <span className="gradient-gold">Projects</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Explore my latest work across different technologies and domains. 
            Each project represents a unique challenge and solution.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium capitalize transition-all ${
                activeCategory === category
                  ? 'bg-primary-gold text-primary-black'
                  : 'bg-card text-gray-300 hover:bg-primary-gold hover:text-primary-black border border-border hover:border-primary-gold'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary-gold transition-all duration-300 card-hover">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-gold/20 to-primary-dark-gold/20 flex items-center justify-center">
                    <div className="text-4xl">🖥️</div>
                  </div>
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-full bg-primary-gold text-primary-black hover:bg-primary-dark-gold transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-full bg-card text-white hover:bg-gray-700 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-gold transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 text-xs bg-primary-gold text-primary-black rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-background rounded-full text-gray-300 border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 text-sm text-gray-400">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Links */}
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 bg-primary-gold text-primary-black rounded-lg font-medium text-center hover:bg-primary-dark-gold transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 border border-border text-gray-300 rounded-lg font-medium text-center hover:border-primary-gold hover:text-primary-gold transition-colors flex items-center justify-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-primary-gold text-primary-gold font-semibold rounded-lg hover:bg-primary-gold hover:text-primary-black transition-colors"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
