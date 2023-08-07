// NextJS import
import Link from "next/link"
import Image from 'next/image'

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-regular-svg-icons'
import { faGithub, faInstagram, faLinkedin, faReact } from '@fortawesome/free-brands-svg-icons'

export default function Sidebar() {
    return (
        <div className="custom-sidebar grid">
            <div className="place-content-top mb-12">
                <div className="relative m-auto mb-5 w-[80%] pb-[80%] sm:w-[50%] sm:pb-[50%] md:w-[90%] md:pb-[90%] lg:w-[70%] lg:pb-[70%]">
                    <Image className="w-full h-full rounded-[50%] overflow-hidden"
                        src="/images/kelvinstuten.jpg"
                        fill={true}
                        alt="Kelvin Stuten, DevOps Engineer, exploring nature with his camera"
                        priority
                    />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl sm:text-3xl md:text-2xl lg:text-3xl font-bold">Kelvin Stuten</h1>
                    <h2 className="text-2xl sm:text-2xl md:text-xl lg:text-2xl">DevOps Engineer</h2>
                </div>
            </div>
            <div className="place-content-center self-center mb-12">
                <h3 className="text-center text-xl uppercase mb-2">Follow me on</h3>
                <ul className="grid place-content-center gap-3">
                    <li className="font-bold hover:scale-110"><Link className="block" href="https://www.linkedin.com/in/kelvinstuten" target="_blank"><FontAwesomeIcon className="text-3xl align-middle mr-2" icon={faLinkedin} />Linkedin</Link></li>
                    <li className="font-bold hover:scale-110"><Link className="block" href="https://github.com/kelvinstuten" target="_blank"><FontAwesomeIcon className="text-3xl align-middle mr-2" icon={faGithub} />Github</Link></li>
                    <li className="font-bold hover:scale-110"><Link className="block" href="https://www.instagram.com/kelvinstuten" target="_blank"><FontAwesomeIcon className="text-3xl align-middle mr-2" icon={faInstagram} />Instagram</Link></li>                </ul>
            </div>
            <div className="place-content-center self-center mb-12">
                <h3 className="text-center text-md uppercase mb-2">or say hello!</h3>
                <ul className="grid place-content-center gap-3">
                    <li className="font-bold hover:scale-110"><Link className="block" href="mailto:hello@kelvin.st" target="_blank"><FontAwesomeIcon className="text-3xl align-middle mr-2" icon={faEnvelope} />E-mail</Link></li>
                </ul>
            </div>
            <div className="place-content-bottom self-center xl:self-end">
                <p className="text-center">Made with <FontAwesomeIcon className="animate-ping" icon={faHeart} /></p>
            </div>
        </div>
    );
}
