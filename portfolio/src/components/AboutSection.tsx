'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, MapPin, Award, Users, Target, Code } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  skills: string[];
}

const AboutSection = () => {
  const [experiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'Tech Innovation Corp',
      position: 'Senior Project Manager',
      description: 'Led cross-functional teams of 15+ members to deliver enterprise-scale projects. Managed budgets up to $2M and reduced delivery time by 30% through agile methodologies.',
      startDate: '2022-01',
      endDate: undefined,
      location: 'Jakarta, Indonesia',
      skills: ['Agile', 'Scrum', 'Budget Management', 'Team Leadership']
    },
    {
      id: '2',
      company: 'Digital Solutions Ltd',
      position: 'Fullstack Developer',
      description: 'Developed and maintained web applications serving 100K+ users. Built RESTful APIs and responsive frontends using modern tech stack.',
      startDate: '2020-03',
      endDate: '2021-12',
      location: 'Jakarta, Indonesia',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      id: '3',
      company: 'StartupX',
      position: 'Frontend Developer',
      description: 'Built user interfaces for early-stage fintech startup. Collaborated with design team to create intuitive user experiences.',
      startDate: '2019-06',
      endDate: '2020-02',
      location: 'Jakarta, Indonesia',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma']
    }
  ]);

  const stats = [
    { icon: Target, label: 'Projects Completed', value: '50+' },
    { icon: Users, label: 'Team Members Led', value: '100+' },
    { icon: Award, label: 'Years Experience', value: '5+' },
    { icon: Code, label: 'Technologies Mastered', value: '20+' },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-background">
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
            About <span className="gradient-gold">Me</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Bridging the gap between technical excellence and project success. 
            I bring both hands-on development skills and strategic project management expertise.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Stats & Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-card p-6 rounded-2xl border border-border hover:border-primary-gold transition-all card-hover"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-lg bg-primary-gold/10 text-primary-gold">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold gradient-gold">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-primary-gold">Core Competencies</h3>
              
              <div className="space-y-4">
                {[
                  { category: 'Management', skills: ['Agile/Scrum', 'Team Leadership', 'Budget Management', 'Risk Assessment'] },
                  { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
                  { category: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
                  { category: 'DevOps', skills: ['AWS', 'Docker', 'CI/CD', 'Git'] },
                ].map((skillGroup, index) => (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="bg-card p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-primary-gold"></div>
                      <span className="font-semibold text-white">{skillGroup.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm bg-background rounded-full text-gray-300 border border-border"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-primary-gold">Professional Journey</h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
              
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-20 pb-12 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 rounded-full bg-primary-gold border-4 border-background"></div>
                  
                  {/* Experience card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-card p-6 rounded-2xl border border-border hover:border-primary-gold transition-all card-hover"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">
                          {exp.position}
                        </h4>
                        <div className="text-primary-gold font-semibold mb-2">
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex flex-col lg:items-end text-sm text-gray-400 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(exp.startDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              year: 'numeric' 
                            })} - {exp.endDate 
                              ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  year: 'numeric' 
                                })
                              : 'Present'
                            }
                          </span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm bg-primary-gold/10 text-primary-gold rounded-full border border-primary-gold/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
