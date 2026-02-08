// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faCode, faSeedling, faRoute, faCircle, faCloud, faPalette } from '@fortawesome/free-solid-svg-icons'

// Skills data
const skills = [
  'Cloud computing',
  'Kubernetes',
  'Webdevelopment',
  'DevOps',
  'Azure Cloud & Azure Devops',
  'Continuous Integration (CI)',
  'Continuous Delivery (CD)',
  'Linux System Administration',
  'SaltStack',
  'Akamai',
  'LogicMonitor',
  'Webdesign',
  'Git',
  'Photography',
  'Photoshop',
  'Lightroom',
  'Openstack',
  'Blockchain',
  'Docker',
  'Microservices',
  'Search Engine Optimization (SEO)',
  '.NET',
  'C#',
  'Python',
  'ReactJS',
  'NextJS',
  'Bicep/ARM',
  'Yaml',
  'Javascript',
  'TypeScript',
  'HTML',
  'CSS',
  'jQuery',
  'SQL',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Scrum'
]

export default function Home() {
  return (
      <div className='grid'>
        <div className='grid gap-2 mb-5 md:mb-10'>
            <p className="text-4xl md:text-5xl 2xl:text-6xl ">Hi, I&apos;m Kelvin!</p>
            <p className="text-xl md:text-2xl 2xl:text-3xl">Started as a student <FontAwesomeIcon icon={faGraduationCap} /> web designer <FontAwesomeIcon icon={faPalette} /></p>
            <p className="text-xl md:text-2xl 2xl:text-3xl">Followed <FontAwesomeIcon icon={faRoute} /> my passion to become a front and backend web developer <FontAwesomeIcon icon={faCode} /></p>
            <p className="text-xl md:text-2xl 2xl:text-3xl">And finally grown up <FontAwesomeIcon icon={faSeedling} /> to be a DevOps Tech Lead <FontAwesomeIcon icon={faCloud} /></p>
        </div>
        <div className='grid gap-2'>
          <p className="text-xl md:text-2xl 2xl:text-3xl">And did you know that I picked up some cool skills along the way?</p>
          <ul className="flex flex-wrap max-w-4xl gap-2 xl:gap-3 text-xs md:text-lg 2xl:text-xl">
            {skills.map((skill) => (
              <li key={skill}>
                <FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
  )
}
