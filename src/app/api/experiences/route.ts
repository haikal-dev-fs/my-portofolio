import { NextRequest, NextResponse } from 'next/server';

// Dummy data based on your AboutSection.tsx updates
const defaultExperiences = [
  {
    id: '1',
    company: 'PT TOWUTI KARYA ABADI',
    position: 'Project Manager & Fullstack Engineer',
    description: 'Led cross-functional teams of 5+ members to deliver high-impact projects on time and within budget. Developed FMS systems for mining operations and implemented real-time fleet monitoring.',
    startDate: '2024-12',
    endDate: null,
    location: 'Jakarta, Indonesia',
    skills: JSON.stringify(['Agile', 'Scrum', 'Team Leadership', 'PHP', 'Laravel', 'Lumen', 'Swagger', 'MySQL', 'Vue']),
    order: 0,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: '2',
    company: 'PT POLYTAMA PROPINDO',
    position: 'Application Developer - Intern',
    description: "Successfully migrated PT Polytama Propindo's outdated website to a modern platform, significantly improving functionality and user experience and Worked on enhancing the performance and user interface of several websites within the company",
    startDate: '2023-09',
    endDate: '2024-02',
    location: 'Indramayu, Indonesia',
    skills: JSON.stringify(['Laravel', 'PHP', 'Bootstrap', 'PostgreSQL', 'JavaScript']),
    order: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: '3',
    company: 'PT NUSHA DIGITAL SOLUTION',
    position: 'Front End Engineer',
    description: 'Developed responsive web applications using Laravel framework for clients and implemented front-end components using JavaScript, CSS, and Bootstrap, ensuring optimal user experience.',
    startDate: '2022-08',
    endDate: '2023-07',
    location: 'Jakarta, Indonesia',
    skills: JSON.stringify(['PHP', 'Swagger', 'HTML', 'CSS', 'Mysql', 'Bootstrap', 'JavaScript']),
    order: 2,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: '4',
    company: 'PT SUCOFINDO',
    position: 'IT OFFICER - Intern',
    description: 'Manage IT infrastructure and support services for the organization. Ensure system reliability and security. Data Entry and Management.',
    startDate: '2019-08',
    endDate: '2019-11',
    location: 'Cirebon, Indonesia',
    skills: JSON.stringify(['PHP', 'HTML', 'CSS', 'Mysql']),
    order: 3,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: defaultExperiences
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}
