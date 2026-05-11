import React from 'react'
import { Link } from 'react-router-dom'

import ringsImg from '../../../assets/categories/rings.png'
import necklacesImg from '../../../assets/categories/necklaces.png'
import earringsImg from '../../../assets/categories/earrings.png'
import braceletsImg from '../../../assets/categories/bracelets.png'

const categories = [
  { name: 'Rings', img: ringsImg, desc: 'Eternal Bonds' },
  { name: 'Necklaces', img: necklacesImg, desc: 'Grace & Elegance' },
  { name: 'Earrings', img: earringsImg, desc: 'Subtle Brilliance' },
  { name: 'Bracelets', img: braceletsImg, desc: 'Wrist Artistry' },
]

const CategoryShowcase = () => {
  return (
    <div className='py-20'>
      {/* Section header */}
      <div className='text-center mb-16'>
        <div className='flex items-center justify-center gap-4 mb-4'>
          <div className='w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a96e]/50'></div>
          <p className='text-[10px] tracking-[5px] uppercase text-[#c9a96e] font-medium'>Curated For You</p>
          <div className='w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a96e]/50'></div>
        </div>
        <h2 className='vyra-heading text-3xl sm:text-4xl text-[#333]'>Explore the Collections</h2>
      </div>

      {/* Category circles */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 max-w-5xl mx-auto px-4'>
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to='/collection'
            className='group flex flex-col items-center gap-5 cursor-pointer'
          >
            {/* Circular image frame */}
            <div className='relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-[#e0d6c8] transition-all duration-500 group-hover:border-[#c9a96e] group-hover:shadow-[0_0_40px_rgba(201,169,110,0.2)]'>
              <img
                src={cat.img}
                alt={cat.name}
                className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
              />
              {/* Overlay on hover */}
              <div className='absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/20 transition-all duration-500 rounded-full'></div>
            </div>

            {/* Text */}
            <div className='text-center'>
              <p className='text-sm font-medium tracking-[2px] uppercase text-[#333] group-hover:text-[#c9a96e] transition-colors duration-300'>{cat.name}</p>
              <p className='text-[11px] text-[#999] mt-1.5 tracking-wider'>{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryShowcase
