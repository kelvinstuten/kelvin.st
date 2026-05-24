import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Kelvin Stuten',
  description: 'Get in touch with Kelvin Stuten — DevOps Tech Lead. Available for collaboration, consulting, or just a chat.',
}

export default function Contact() {
  return (
    <div className='grid'>
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl 2xl:text-6xl mb-4">Get in Touch</h1>
        <p className="text-xl md:text-2xl 2xl:text-3xl">Have a question or want to work together? I&apos;d love to hear from you!</p>
      </div>
      <ContactForm />
    </div>
  )
}
