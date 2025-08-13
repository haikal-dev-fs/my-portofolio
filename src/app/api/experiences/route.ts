import { NextRequest, NextResponse } from 'next/server';

// Dummy data based on your AboutSection.tsx updates
const defaultExperiences = [
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
		], // Always array
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
		skills: ['Laravel', 'PHP', 'Bootstrap', 'PostgreSQL', 'JavaScript'], // Always array
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
		skills: ['PHP', 'Swagger', 'HTML', 'CSS', 'Mysql', 'Bootstrap', 'JavaScript'], // Always array
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
		skills: ['PHP', 'HTML', 'CSS', 'Mysql'], // Always array
		order: 3,
		createdAt: '2019-08-01T00:00:00.000Z',
		updatedAt: '2019-11-01T00:00:00.000Z',
	},
];

export async function GET() {
	try {
		// FIX: Ultra-safe processing - handle both hardcoded arrays and JSON strings
		const processedExperiences = defaultExperiences.map((exp) => {
			let processedSkills: string[] = [];

			try {
				// Handle different skill formats
				if (Array.isArray(exp.skills)) {
					// Already an array
					processedSkills = exp.skills.filter((skill: any) => 
						typeof skill === 'string' && skill.trim().length > 0
					);
				} else if (typeof exp.skills === 'string') {
					try {
						// Try to parse as JSON first
						const parsed = JSON.parse(exp.skills);
						if (Array.isArray(parsed)) {
							processedSkills = parsed.filter((skill: any) => 
								typeof skill === 'string' && skill.trim().length > 0
							);
						} else {
							// If it's not an array after parsing, treat as empty
							processedSkills = [];
						}
					} catch (parseError) {
						// If JSON parse fails, treat as single skill or empty
						console.warn('Failed to parse skills JSON:', exp.skills);
						const skillsStr = exp.skills as string;
						processedSkills = (typeof skillsStr === 'string' && skillsStr.trim()) 
							? [skillsStr.trim()] 
							: [];
					}
				} else if (exp.skills === null || exp.skills === undefined) {
					// Handle null/undefined
					processedSkills = [];
				} else {
					// Any other type, convert to string or empty
					processedSkills = [];
				}
			} catch (skillsError) {
				console.warn('Error processing skills for experience:', exp.id, skillsError);
				processedSkills = [];
			}

			return {
				id: exp.id || '',
				company: exp.company || '',
				position: exp.position || '',
				description: exp.description || '',
				startDate: exp.startDate || '',
				endDate: exp.endDate || null,
				location: exp.location || '',
				skills: processedSkills, // Always guaranteed to be a valid array
				order: exp.order || 0,
				createdAt: exp.createdAt || new Date().toISOString(),
				updatedAt: exp.updatedAt || new Date().toISOString(),
			};
		});

		return NextResponse.json({
			success: true,
			data: processedExperiences,
		});
	} catch (error) {
		console.error('Error fetching experiences:', error);
		return NextResponse.json(
			{
				success: false,
				message: 'Failed to fetch experiences',
				data: [],
			},
			{ status: 500 }
		);
	}
}
