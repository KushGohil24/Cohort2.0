import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='mt-32'>
      {/* Gold divider */}
      <div className='h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mb-16'></div>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm'>
        {/* Brand */}
        <div>
          <h2 className='vyra-heading text-2xl tracking-wider mb-4'>VYRA</h2>
          <p className='w-full md:w-2/3 text-[#777] leading-relaxed'>
            Crafting timeless jewelry since 2020. Each piece in our collection is meticulously designed to celebrate life's most precious moments with unparalleled elegance.
          </p>
          {/* Social icons */}
          <div className='flex gap-4 mt-6'>
            <div className='w-8 h-8 rounded-full border border-[#e0d6c8] flex items-center justify-center cursor-pointer hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all'>
              <span className='text-xs'>IG</span>
            </div>
            <div className='w-8 h-8 rounded-full border border-[#e0d6c8] flex items-center justify-center cursor-pointer hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all'>
              <span className='text-xs'>FB</span>
            </div>
            <div className='w-8 h-8 rounded-full border border-[#e0d6c8] flex items-center justify-center cursor-pointer hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all'>
              <span className='text-xs'>PT</span>
            </div>
          </div>
        </div>

        {/* Company */}
        <div>
          <p className='text-xs tracking-[3px] uppercase mb-5 text-[#c9a96e]'>Company</p>
          <ul className='flex flex-col gap-2 text-[#777]'>
            <li><Link to='/' className='hover:text-[#c9a96e] transition-colors'>Home</Link></li>
            <li><Link to='/about' className='hover:text-[#c9a96e] transition-colors'>About Us</Link></li>
            <li><Link to='/collection' className='hover:text-[#c9a96e] transition-colors'>Collections</Link></li>
            <li className='hover:text-[#c9a96e] transition-colors cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className='text-xs tracking-[3px] uppercase mb-5 text-[#c9a96e]'>Get in Touch</p>
          <ul className='flex flex-col gap-2 text-[#777]'>
            <li>+91-98765-43210</li>
            <li>contact@vyra.com</li>
            <li className='mt-2 text-xs'>Mon - Sat: 10am - 7pm</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='mt-12'>
        <hr className='border-[#e0d6c8]' />
        <div className='flex flex-col sm:flex-row justify-between items-center py-5 text-xs text-[#999] tracking-wider'>
          <p>© 2026 VYRA Jewelry. All rights reserved.</p>
          <p className='mt-2 sm:mt-0'>Crafted with ♦ in India</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
