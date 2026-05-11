import React from 'react'
import Title from '../../Shared/Components/Title'
import NewsLetterbox from '../../Shared/Components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t border-[#e0d6c8]'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <div className='flex items-center justify-center'>
          <div className='w-full max-w-sm h-64 bg-[#0a0a0a] flex items-center justify-center rounded'>
            <div className='text-center'>
              <span className='vyra-heading text-[#c9a96e] text-3xl block mb-2'>VYRA</span>
              <span className='text-[#777] text-xs tracking-[3px] uppercase'>Fine Jewelry</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-medium text-xl text-[#333] vyra-heading'>Our Boutique</p>
          <p className='text-[#777] leading-relaxed'>
            123 Heritage Lane<br />
            Jewelers Quarter, Mumbai 400001<br />
            Maharashtra, India
          </p>
          <p className='text-[#777]'>
            Tel: +91-98765-43210<br />
            Email: contact@vyra.com
          </p>
          <p className='font-medium text-[#333] vyra-heading'>Visit Us</p>
          <p className='text-[#777]'>Monday - Saturday: 10:00 AM - 7:00 PM<br />Sunday: By Appointment Only</p>
          <button className='vyra-btn tracking-[2px] text-xs'>
            <span>Book an Appointment</span>
          </button>
        </div>
      </div>

      <NewsLetterbox />
    </div>
  )
}

export default Contact
