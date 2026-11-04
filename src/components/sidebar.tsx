// NextJS import
import Image from 'next/image'

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Sidebar() {
    return (
        <div className="custom-sidebar grid">
            <div className="place-content-top mb-12">
                <div className="relative m-auto mb-5 w-[80%] pb-[80%] sm:w-[50%] sm:pb-[50%] md:w-[90%] md:pb-[90%] lg:w-[70%] lg:pb-[70%]">
                    <Image 
                        className="w-full h-full rounded-[50%] overflow-hidden object-cover"
                        src="/images/kelvin-stuten-2026.jpg"
                        fill={true}
                        sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, (max-width: 1024px) 90vw, 70vw"
                        alt="Kelvin Stuten, Tech Lead and DevOps Engineer, exploring nature with his camera"
                        priority
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAGBgYGBgYKBgYKDgoKCg4SDg4ODhIXEhISEhIXHBcXFxcXFxwcHBwcHBwcIiIiIiIiJycnJycsLCwsLCwsLCws/9sAQwEHBwcLCgsTCgoTLh8aHy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4u/90ABAAB/9oADAMBAAIRAxEAPwDxzwl4VGt6DqM32Gae42/6JIgOCyAkheQpPrn8Oa4CS2mikaKWNkdCVZWUggjggj1FfZHw4VU8E6XsAGYyTjjku2a8Q8SO/wDwkWpcn/j7n7/9NGqVGzbNHK6Ssf/Z"
                        quality={85}
                    />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl sm:text-3xl md:text-2xl lg:text-3xl font-bold">Kelvin Stuten</h1>
                    <h2 className="text-2xl sm:text-2xl md:text-xl lg:text-2xl">DevOps Tech Lead</h2>
                </div>
            </div>
            <div className="place-content-center self-center mb-12">
                <h3 className="text-center text-xl uppercase mb-2">Follow me on</h3>
                <ul className="grid place-content-center gap-3">
                    <li className="font-bold hover:scale-110"><a className="block" href="https://www.linkedin.com/in/kelvinstuten" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="text-3xl align-middle mr-2" icon={faLinkedin} />Linkedin</a></li>
                    <li className="font-bold hover:scale-110"><a className="block" href="https://github.com/kelvinstuten" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="text-3xl align-middle mr-2" icon={faGithub} />Github</a></li>
                    <li className="font-bold hover:scale-110"><a className="block" href="https://www.instagram.com/kelvinstuten" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="text-3xl align-middle mr-2" icon={faInstagram} />Instagram</a></li>
                </ul>
            </div>
            <div className="place-content-center self-center mb-12">
                <h3 className="text-center text-md uppercase mb-2">or say hello!</h3>
                <ul className="grid place-content-center gap-3">
                    <li className="font-bold hover:scale-110"><a className="block" href="mailto:hello@kelvin.st"><FontAwesomeIcon className="text-3xl align-middle mr-2" icon={faEnvelope} />E-mail</a></li>
                </ul>
            </div>
            <div className="place-content-bottom self-center xl:self-end">
                <p className="text-center">Made with <FontAwesomeIcon className="animate-pulse" icon={faHeart} /></p>
            </div>
        </div>
    );
}
