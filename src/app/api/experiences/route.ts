import { NextRequest, NextResponse } from 'next/server';

// Dummy data based on your AboutSection.tsx updates
type Experience = {
	id: string;
	company: string;
	position: string;
	description: string;
	startDate: string;
	endDate: string | null;
	location: string;
	skills: string[] | string;
	order: number;
	createdAt: string;
	updatedAt: string;
};

const defaultExperiences: Experience[] = [
	{
		id: '1',
		company: 'PT TOWUTI KARYA ABADI',
		position: 'Project Manager & Fullstack Engineer',
		description:
			'Led cross-functional teams of 5+ members to deliver high-impact projects on time and within budget. Developed FMS systems for mining operations and implemented real-time fleet monitoring.',
		startDate: '2024-12-01',
		endDate: null,
		location: 'Jakarta, Indonesia',
		skills: [
			'Agile',
			'Scrum',
			'Team Leadership',
			'PHP',
			'Laravel',
			'Lumen',
			'Swagger',
			'MySQL',
			'Vue',
		], // FIX: Keep as array, not JSON string
		order: 0,
		createdAt: '2024-12-01T00:00:00.000Z',
		updatedAt: '2024-12-01T00:00:00.000Z',
	},
	{
		id: '2',
		company: 'PT POLYTAMA PROPINDO',
		position: 'Application Developer - Intern',
		description:
			"Successfully migrated PT Polytama Propindo's outdated website to a modern platform, significantly improving functionality and user experience and Worked on enhancing the performance and user interface of several websites within the company",
		startDate: '2023-09-01',
		endDate: '2024-02-01',
		location: 'Indramayu, Indonesia',
		skills: ['Laravel', 'PHP', 'Bootstrap', 'PostgreSQL', 'JavaScript'], // FIX: Keep as array
		order: 1,
		createdAt: '2023-09-01T00:00:00.000Z',
		updatedAt: '2024-02-01T00:00:00.000Z',
	},
	{
		id: '3',
		company: 'PT NUSHA DIGITAL SOLUTION',
		position: 'Front End Engineer',
		description:
			'Developed responsive web applications using Laravel framework for clients and implemented front-end components using JavaScript, CSS, and Bootstrap, ensuring optimal user experience.',
		startDate: '2022-08-01',
		endDate: '2023-07-01',
		location: 'Jakarta, Indonesia',
		skills: [
			'PHP',
			'Swagger',
			'HTML',
			'CSS',
			'Mysql',
			'Bootstrap',
			'JavaScript',
		], // FIX: Keep as array
		order: 2,
		createdAt: '2022-08-01T00:00:00.000Z',
		updatedAt: '2023-07-01T00:00:00.000Z',
	},
	{
		id: '4',
		company: 'PT SUCOFINDO',
		position: 'IT OFFICER - Intern',
		description:
			'Manage IT infrastructure and support services for the organization. Ensure system reliability and security. Data Entry and Management.',
		startDate: '2019-08-01',
		endDate: '2019-11-01',
		location: 'Cirebon, Indonesia',
		skills: ['PHP', 'HTML', 'CSS', 'Mysql'], // FIX: Keep as array
		order: 3,
		createdAt: '2019-08-01T00:00:00.000Z',
		updatedAt: '2019-11-01T00:00:00.000Z',
	},
];

export async function GET() {
	try {
		// FIX: Proper skills processing with correct logic
		const processedExperiences = defaultExperiences.map((exp) => {
			let processedSkills = [];

			if (Array.isArray(exp.skills)) {
				processedSkills = exp.skills;
			} else if (typeof exp.skills === 'string') {
				try {
					if (exp.skills.startsWith('[')) {
						processedSkills = JSON.parse(exp.skills);
					} else {
						processedSkills = [exp.skills];
					}
				} catch (error) {
					console.error('Failed to parse skills:', exp.skills);
					processedSkills = [];
				}
			} else {
				processedSkills = [];
			}

			return {
				...exp,
				skills: Array.isArray(processedSkills) ? processedSkills : [],
			};
		});

		return NextResponse.json({
			success: true,
			data: Array.isArray(processedExperiences) ? processedExperiences : [],
		});
	} catch (error) {
		console.error('Error fetching experiences:', error);
		// Return empty array on error
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to fetch experiences',
				data: [], // Always provide empty array as fallback
			},
			{ status: 500 }
		);
	}
}
