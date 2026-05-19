import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../../context/shopContext'
import { useAuth } from '../../auth/hook/useAuth'

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      {/* Logo */}
      <Link to='/' className='flex items-center gap-2'>
        <span className='vyra-heading text-3xl tracking-wider' style={{ color: 'var(--vyra-dark)' }}>
          VYRA
        </span>
        <span className='text-[10px] tracking-[4px] uppercase' style={{ color: 'var(--vyra-gold)' }}>
          Jewelry
        </span>
      </Link>

      {/* Nav Links */}
      <ul className='hidden sm:flex gap-7 text-sm tracking-wide uppercase'>
        <NavLink to='/' className='flex flex-col items-center gap-1 group'>
          <p className='transition-colors duration-300 group-hover:text-[#c9a96e]'>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#c9a96e] hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1 group'>
          <p className='transition-colors duration-300 group-hover:text-[#c9a96e]'>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#c9a96e] hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1 group'>
          <p className='transition-colors duration-300 group-hover:text-[#c9a96e]'>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#c9a96e] hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1 group'>
          <p className='transition-colors duration-300 group-hover:text-[#c9a96e]'>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#c9a96e] hidden' />
        </NavLink>
      </ul>

      {/* Right Icons */}
      <div className='gap-6 flex items-center'>
        {/* Search */}
        <Link to='/collection'>
          <svg onClick={() => setShowSearch(true)} className='w-5 h-5 cursor-pointer transition-colors hover:text-[#c9a96e]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
          </svg>
        </Link>

        {/* Profile / Auth */}
        <div className='relative' ref={profileRef}>
          {isAuthenticated ? (
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className='w-8 h-8 rounded-full bg-[#c9a96e] flex items-center justify-center cursor-pointer text-[#0a0a0a] text-sm font-medium'
            >
              {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          ) : (
            <Link to='/login' className='bg-[#c9a96e] text-[#0a0a0a] px-4 py-2 text-[10px] uppercase tracking-widest font-semibold hover:bg-[#a8893e] transition-colors'>
              Login
            </Link>
          )}
          {isAuthenticated && isProfileOpen && (
            <div className='absolute right-0 pt-4 z-50'>
              <div className='flex flex-col gap-2 w-44 py-4 px-5 bg-white shadow-lg border border-[#e0d6c8] rounded'>
                <p className='text-xs tracking-wider uppercase text-[#c9a96e] mb-1'>{user?.fullname}</p>
                <Link onClick={() => setIsProfileOpen(false)} to='/profile' className='cursor-pointer hover:text-[#c9a96e] text-sm transition-colors'>My Profile</Link>
                <Link onClick={() => setIsProfileOpen(false)} to='/orders' className='cursor-pointer hover:text-[#c9a96e] text-sm transition-colors'>My Orders</Link>
                {user?.role === 'seller' && (
                  <Link onClick={() => setIsProfileOpen(false)} to='/dashboard' className='cursor-pointer hover:text-[#c9a96e] text-sm transition-colors'>Dashboard</Link>
                )}
                <hr className='border-[#e0d6c8] my-1' />
                <p onClick={() => { setIsProfileOpen(false); handleLogout(); }} className='cursor-pointer hover:text-red-500 text-sm transition-colors'>Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        {isAuthenticated && (
          <Link to='/cart' className='relative'>
            <svg className='w-5 h-5 transition-colors hover:text-[#c9a96e]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
            </svg>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#c9a96e] text-[#0a0a0a] aspect-square rounded-full text-[8px] font-bold'>
              {getCartCount()}
            </p>
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <svg onClick={() => setVisible(true)} className='w-5 h-5 cursor-pointer sm:hidden' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
      </div>

      {/* Mobile Side Menu */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-[#faf7f2] transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-[#333]'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-4 cursor-pointer border-b border-[#e0d6c8]'>
            <svg className='h-4 w-4 rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
            <p className='text-sm uppercase tracking-wider'>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-[#e0d6c8] text-sm uppercase tracking-wider hover:text-[#c9a96e] transition-colors' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-[#e0d6c8] text-sm uppercase tracking-wider hover:text-[#c9a96e] transition-colors' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-[#e0d6c8] text-sm uppercase tracking-wider hover:text-[#c9a96e] transition-colors' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-[#e0d6c8] text-sm uppercase tracking-wider hover:text-[#c9a96e] transition-colors' to='/contact'>Contact</NavLink>
          {!isAuthenticated && (
            <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-[#e0d6c8] text-sm uppercase tracking-wider text-[#c9a96e]' to='/login'>Login</NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
