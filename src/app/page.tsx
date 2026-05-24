import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { skills } from '@/data/skills'
import TypewriterHero from '@/components/TypewriterHero'

export default function Home() {
  return (
    <div className='grid'>
      <TypewriterHero />
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
