export type SkillGroup = {
  /** Short, lowercase id used as the terminal argument, e.g. `skills cloud` */
  id: string
  label: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'cloud',
    label: 'Cloud & Platform',
    skills: ['Cloud computing', 'Azure Cloud & Azure Devops', 'Kubernetes', 'Docker', 'Openstack', 'Microservices', 'Akamai'],
  },
  {
    id: 'devops',
    label: 'DevOps & Automation',
    skills: [
      'DevOps',
      'Continuous Integration (CI)',
      'Continuous Delivery (CD)',
      'Bicep/ARM',
      'Yaml',
      'SaltStack',
      'Git',
      'LogicMonitor',
      'Linux System Administration',
    ],
  },
  {
    id: 'dev',
    label: 'Development',
    skills: ['Webdevelopment', '.NET', 'C#', 'Python', 'TypeScript', 'Javascript', 'ReactJS', 'NextJS', 'HTML', 'CSS', 'jQuery'],
  },
  {
    id: 'data',
    label: 'Data',
    skills: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'creative',
    label: 'Creative & More',
    skills: ['Webdesign', 'Photography', 'Photoshop', 'Lightroom', 'Search Engine Optimization (SEO)', 'Blockchain', 'Scrum'],
  },
]

/** Flat list, kept for anything that just needs every skill */
export const skills: string[] = skillGroups.flatMap((group) => group.skills)
