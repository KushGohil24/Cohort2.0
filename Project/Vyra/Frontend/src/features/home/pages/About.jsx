import React from 'react'
import Title from '../../Shared/Components/Title'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t border-[#e0d6c8]'>
        <Title text1={'ABOUT'} text2={'VYRA'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='w-full max-w-sm h-80 bg-[#0a0a0a] flex items-center justify-center relative'>
            <div className='w-32 h-32 border border-[#c9a96e]/30 rotate-45'></div>
            <div className='w-20 h-20 border border-[#c9a96e]/20 rotate-45 absolute'></div>
            <span className='vyra-heading text-[#c9a96e] text-4xl absolute'>V</span>
          </div>
        </div>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-[#555]'>
          <p className='leading-relaxed'>
            Vyra was born from a passion for timeless artistry and a belief that jewelry should be more than an accessory — it should be a reflection of who you are. Founded in 2020, we set out to create pieces that celebrate life's most precious moments with unparalleled elegance.
          </p>
          <p className='leading-relaxed'>
            Every piece in our collection is meticulously handcrafted by skilled artisans who blend traditional techniques with contemporary design. We source premium materials — from high-quality zirconia to premium plated metals — ensuring that each creation meets the highest standards of quality and beauty.
          </p>
          <b className='text-[#c9a96e] text-xs tracking-[3px] uppercase'>Our Promise</b>
          <p className='leading-relaxed'>
            At Vyra, we believe in transparency, sustainability, and craftsmanship. Every piece comes with a quality guarantee. Because fashion jewelry should come with a commitment that lasts.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE VYRA'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-[#e0d6c8] px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5'>
          <b className='text-[#333]'>Ethical Sourcing</b>
          <p className='text-[#777]'>Every gemstone and metal is responsibly sourced, ensuring our commitment to ethical practices and environmental stewardship.</p>
        </div>
        <div className='border border-[#e0d6c8] px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5'>
          <b className='text-[#333]'>Master Craftsmanship</b>
          <p className='text-[#777]'>Our artisans bring decades of expertise to every piece, blending time-honored techniques with modern design sensibility.</p>
        </div>
        <div className='border border-[#e0d6c8] px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5'>
          <b className='text-[#333]'>Lifetime Guarantee</b>
          <p className='text-[#777]'>We stand behind every piece with our lifetime exchange guarantee and complimentary maintenance services.</p>
        </div>
      </div>
    </div>
  )
}

export default About
