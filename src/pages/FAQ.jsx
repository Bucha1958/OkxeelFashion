import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import Head from '../components/Head';
import Footer from '../components/Footer';
import WhatsappPopUp from '../components/WhatsappPopUp';

const FAQ = () => {
    const [ openIndex, setOpenIndex ] = useState(null)

    const faqs = [
        {
            question: "What is your return policy?",
            answer: "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship worldwide. Shipping costs will apply, and will be added at checkout."
        },
        {
            question: "How can I track my order?",
            answer: "You can track your order using the tracking number provided in your order confirmation email."
        },
    ]

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }
  return (
    <>
        <Head />
        <div className='max-w-[70%] mx-auto font-poppins p-4 mt-[10%]'>
            <h1 className='text-2xl font-semibold mb-4 text-center'>FAQs</h1>
            <div className='text-sm space-x-5 mb-10 text-center mt-10'>
                <span className='hover:text-gray-700 cursor-pointer'><Link to="/">Home</Link></span>
                <FontAwesomeIcon icon={faChevronRight} />
                <span>FAQs</span>
            </div>
            
            
            <div className='space-y-4'>
                {faqs.map((faq, index) => (
                    <div>
                        <button className='w-full border-gray-200 border-b text-left mt-6 flex justify-between' key={index}
                            onClick={() => toggleIndex(index)}
                        >
                            <span>{faq.question}</span>
                            <span>{openIndex !== index ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} /> }</span>
                        </button>
                        {openIndex === index && (
                            <div className='text-sm text-gray-500 mt-6 border-b border-gray-200'>{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        <WhatsappPopUp />
        <Footer />
    </>
    
  )
}

export default FAQ