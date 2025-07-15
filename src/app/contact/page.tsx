'use client'

import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate form submission - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Reset form or show success message
        alert('Thank you for your message! I\'ll get back to you soon.')
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
        })
        setIsSubmitting(false)
    }

    return (
        <div className='grid'>
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl 2xl:text-6xl mb-4">Get in Touch</h1>
                <p className="text-xl md:text-2xl 2xl:text-3xl">Have a question or want to work together? I'd love to hear from you!</p>
            </div>
            
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="firstName">
                            First Name *
                        </label>
                        <input 
                            className="appearance-none block w-full bg-gray-800 text-white border border-gray-600 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-400" 
                            id="firstName" 
                            name="firstName"
                            type="text" 
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="lastName">
                            Last Name *
                        </label>
                        <input 
                            className="appearance-none block w-full bg-gray-800 text-white border border-gray-600 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-400" 
                            id="lastName" 
                            name="lastName"
                            type="text" 
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="email">
                            Email Address *
                        </label>
                        <input 
                            className="appearance-none block w-full bg-gray-800 text-white border border-gray-600 rounded-sm py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-400" 
                            id="email" 
                            name="email"
                            type="email" 
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="subject">
                            Subject *
                        </label>
                        <input 
                            className="appearance-none block w-full bg-gray-800 text-white border border-gray-600 rounded-sm py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-400" 
                            id="subject" 
                            name="subject"
                            type="text" 
                            placeholder="Project Collaboration"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="message">
                            Message *
                        </label>
                        <textarea 
                            className="appearance-none block w-full bg-gray-800 text-white border border-gray-600 rounded-sm py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-400 resize-vertical min-h-[120px]" 
                            id="message" 
                            name="message"
                            placeholder="Tell me about your project or question..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <p className="text-gray-400 text-xs italic">Feel free to share as much detail as you'd like!</p>
                    </div>
                </div>
                
                <button 
                    className={`w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-sm transition-colors ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    )
}
