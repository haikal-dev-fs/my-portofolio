import db from '../src/lib/db';
import { profiles, projects, experiences } from '../src/lib/db/schema';

async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  try {
    // Insert default profile
    await db.insert(profiles).values({
      name: 'Your Name',
      title: 'Project Manager & Fullstack Engineer',
      bio: 'Passionate about building innovative solutions and leading successful projects from concept to deployment. Experienced in both technical development and project management.',
      email: 'your.email@example.com',
      phone: '+62 812 3456 7890',
      location: 'Jakarta, Indonesia',
      linkedinUrl: 'https://linkedin.com/in/yourprofile',
      githubUrl: 'https://github.com/yourprofile',
      skills: JSON.stringify([
        'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
        'Python', 'Project Management', 'Agile/Scrum', 'Leadership'
      ])
    });

    // Insert sample projects
    const sampleProjects = [
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with admin panel and payment integration',
        longDescription: 'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product management, shopping cart, payment processing with Stripe, order tracking, and a complete admin dashboard for inventory and order management.',
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/example/ecommerce',
        technologies: JSON.stringify(['React', 'Node.js', 'MongoDB', 'Stripe', 'Express']),
        category: 'web',
        featured: true,
        order: 0
      },
      {
        title: 'Project Management Tool',
        description: 'Collaborative project management application with real-time features',
        longDescription: 'A sophisticated project management tool that enables teams to collaborate effectively. Features include task management, real-time updates via WebSocket, file sharing, team communication, project analytics, and comprehensive reporting dashboards.',
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/example/projectmgmt',
        technologies: JSON.stringify(['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL', 'Prisma']),
        category: 'web',
        featured: true,
        order: 1
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication',
        longDescription: 'A secure and user-friendly mobile banking application that provides comprehensive banking services. Features include account management, fund transfers, bill payments, transaction history, QR code payments, and advanced security with biometric authentication.',
        demoUrl: 'https://demo.example.com',
        technologies: JSON.stringify(['React Native', 'Firebase', 'Biometrics API', 'Redux']),
        category: 'mobile',
        featured: false,
        order: 2
      },
      {
        title: 'Data Analytics Dashboard',
        description: 'Real-time analytics dashboard for business intelligence',
        longDescription: 'An interactive data analytics dashboard that provides real-time insights for business decision making. Features include customizable charts, data visualization, automated reports, KPI tracking, and integration with multiple data sources.',
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/example/analytics',
        technologies: JSON.stringify(['Vue.js', 'D3.js', 'Python', 'FastAPI', 'Redis']),
        category: 'web',
        featured: false,
        order: 3
      }
    ];

    await db.insert(projects).values(sampleProjects);

    // Insert sample experiences
    const sampleExperiences = [
      {
        company: 'Tech Innovation Corp',
        position: 'Senior Project Manager',
        description: 'Led cross-functional teams of 15+ members to deliver enterprise-scale projects. Managed budgets up to $2M and reduced delivery time by 30% through agile methodologies and process optimization.',
        startDate: '2022-01',
        location: 'Jakarta, Indonesia',
        skills: JSON.stringify(['Agile', 'Scrum', 'Budget Management', 'Team Leadership', 'Stakeholder Management']),
        order: 0
      },
      {
        company: 'Digital Solutions Ltd',
        position: 'Fullstack Developer',
        description: 'Developed and maintained web applications serving 100K+ users. Built RESTful APIs and responsive frontends using modern tech stack. Collaborated with design team to create intuitive user experiences.',
        startDate: '2020-03',
        endDate: '2021-12',
        location: 'Jakarta, Indonesia',
        skills: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'AWS', 'REST APIs']),
        order: 1
      },
      {
        company: 'StartupX',
        position: 'Frontend Developer',
        description: 'Built user interfaces for early-stage fintech startup. Collaborated with product team to translate business requirements into technical solutions. Implemented responsive designs and optimized performance.',
        startDate: '2019-06',
        endDate: '2020-02',
        location: 'Jakarta, Indonesia',
        skills: JSON.stringify(['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Jest']),
        order: 2
      }
    ];

    await db.insert(experiences).values(sampleExperiences);

    console.log('✅ Database seeded successfully!');
    console.log('📊 Inserted:');
    console.log('  - 1 profile');
    console.log(`  - ${sampleProjects.length} projects`);
    console.log(`  - ${sampleExperiences.length} experiences`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Run the seed function
seedDatabase();
