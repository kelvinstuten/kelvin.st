import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faCode, faSeedling, faRoute, faCloud, faPalette } from '@fortawesome/free-solid-svg-icons'
import SkillsTerminal from '@/components/SkillsTerminal'

export default function Home() {
  return (
      <div className='grid'>
        <section className='grid gap-2 mb-5 md:mb-10' aria-labelledby="intro-heading">
            <h2 id="intro-heading" className="text-3xl md:text-4xl 2xl:text-5xl">Hi, I&apos;m Kelvin!</h2>
            <p className="text-lg md:text-xl 2xl:text-2xl">Started as a student <FontAwesomeIcon icon={faGraduationCap} aria-hidden /> web designer <FontAwesomeIcon icon={faPalette} aria-hidden /></p>
            <p className="text-lg md:text-xl 2xl:text-2xl">Followed <FontAwesomeIcon icon={faRoute} aria-hidden /> my passion to become a front and backend web developer <FontAwesomeIcon icon={faCode} aria-hidden /></p>
            <p className="text-lg md:text-xl 2xl:text-2xl">And finally grown up <FontAwesomeIcon icon={faSeedling} aria-hidden /> to be a DevOps Tech Lead <FontAwesomeIcon icon={faCloud} aria-hidden /></p>
        </section>
        <section className='grid gap-3' aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="text-lg md:text-xl 2xl:text-2xl">And did you know that I picked up some cool skills along the way?</h2>
          <SkillsTerminal />
        </section>
      </div>
  )
}
