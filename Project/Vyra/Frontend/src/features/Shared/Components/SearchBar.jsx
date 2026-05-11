import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../context/shopContext'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className='border-t border-b border-[#e0d6c8] bg-white/50 text-center backdrop-blur-sm'>
      <div className='inline-flex items-center justify-center border border-[#e0d6c8] px-5 py-2.5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 focus-within:border-[#c9a96e] transition-colors'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          className='flex-1 outline-none bg-transparent text-sm placeholder:text-[#bbb] placeholder:tracking-wider'
          placeholder='Search our jewelry collection...'
        />
        <svg className='w-4 h-4 text-[#c9a96e]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
        </svg>
      </div>
      <svg onClick={() => setShowSearch(false)} className='inline w-3.5 h-3.5 cursor-pointer text-[#999] hover:text-[#c9a96e] transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
      </svg>
    </div>
  ) : null
}

export default SearchBar
