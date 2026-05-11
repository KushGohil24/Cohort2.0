import React from 'react'

const NewsLetterbox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  }
  return (
    <div className='text-center py-16'>
      <div className='flex items-center justify-center gap-3 mb-3'>
        <div className='w-8 h-[1px] bg-[#c9a96e]'></div>
        <p className='text-xs tracking-[3px] uppercase text-[#c9a96e]'>Stay Connected</p>
        <div className='w-8 h-[1px] bg-[#c9a96e]'></div>
      </div>
      <h2 className='vyra-heading text-2xl mb-2'>Subscribe & Get 20% Off</h2>
      <p className='text-[#999] text-sm mb-6 max-w-md mx-auto'>
        Be the first to know about new collections, exclusive offers, and jewelry styling tips.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center mx-auto border border-[#e0d6c8] overflow-hidden'>
        <input
          className='w-full flex-1 outline-none bg-transparent text-sm px-5 py-4 placeholder:text-[#bbb] placeholder:tracking-wider'
          type='email'
          placeholder='Your email address'
        />
        <button
          type='submit'
          className='bg-[#c9a96e] text-[#0a0a0a] text-xs py-4 px-8 tracking-[2px] uppercase hover:bg-[#a8893e] transition-colors whitespace-nowrap font-medium'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsLetterbox
