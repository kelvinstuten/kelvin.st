// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faCode, faSeedling, faRoute, faCircle, faCloud, faPalette } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-regular-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  return (
      <div className='grid'>
        <div className='grid gap-2 mb-5 md:mb-10'>
            <p className="text-4xl md:text-5xl 2xl:text-6xl ">Hi, I&apos;m Kelvin!</p>
            <p className="text-xl md:text-2xl 2xl:text-3xl">Started as a student <FontAwesomeIcon icon={faGraduationCap} /> web designer <FontAwesomeIcon icon={faPalette} /></p>
            <p className="text-xl md:text-2xl 2xl:text-3xl">Followed <FontAwesomeIcon icon={faRoute} /> my passion to become a front and backend web developer <FontAwesomeIcon icon={faCode} /></p>
            <p className="text-xl md:text-2xl 2xl:text-3xl">And finally grown up <FontAwesomeIcon icon={faSeedling} /> to be a real DevOps engineer <FontAwesomeIcon icon={faCloud} /></p>
        </div>
        <div className='grid gap-2'>
          <p className="text-xl md:text-2xl 2xl:text-3xl">And did you know that I picked up some cool skills along the way?</p>
          <ul className="flex flex-wrap max-w-4xl gap-2 xl:gap-3 text-xs md:text-lg 2xl:text-xl">
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Cloud computing</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Kubernetes</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Webdevelopment</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />DevOps</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Azure Cloud & Azure Devops</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Continuous Integration (CI)</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Continuous Delivery (CD)</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Linux System Administration</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />SaltStack</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Akamai services</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Webdesign</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Git</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Photography</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Photoshop</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Lightroom</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Openstack</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Blockchain</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Docker</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Microservices</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Search Engine Optimization (SEO)</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />.NET</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />C#</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Python</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />ReactJS</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />NextJS</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Bicep/ARM</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Yaml</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Javascript</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />TypeScript</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />HTML</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />CSS</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />jQuery</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />SQL</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />MySQL</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />PostgreSQL</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />MongoDB</li>
            <li><FontAwesomeIcon className="text-xs align-middle mr-1" icon={faCircle} />Scrum</li>
          </ul>
        </div>
      </div>
  )
}
