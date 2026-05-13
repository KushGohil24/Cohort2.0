import React from 'react'
import { useAuth } from '../hook/useAuth'

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className='flex flex-col items-center justify-center py-20 px-4'>
      <div className='w-full max-w-md bg-white shadow-lg border border-[#e0d6c8] p-8 rounded-lg'>
        <h1 className='text-3xl font-medium mb-8 text-center text-[#0a0a0a] uppercase tracking-widest vyra-heading'>My Profile</h1>
        
        {user ? (
          <div className='flex flex-col gap-6 text-[#333]'>
            <div className='flex flex-col items-center mb-4'>
              <div className='w-24 h-24 rounded-full bg-[#c9a96e] flex items-center justify-center text-[#0a0a0a] text-4xl font-medium mb-4'>
                {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <h2 className='text-xl font-medium text-[#0a0a0a]'>{user.fullname}</h2>
              <p className='text-sm text-gray-500'>{user.email}</p>
            </div>

            <div className='flex flex-col gap-4 mt-2'>
              <div className='flex justify-between items-center border-b border-[#e0d6c8] pb-3'>
                <span className='uppercase text-xs tracking-wider font-semibold text-[#c9a96e]'>Full Name</span>
                <span className='font-medium text-sm'>{user.fullname}</span>
              </div>
              <div className='flex justify-between items-center border-b border-[#e0d6c8] pb-3'>
                <span className='uppercase text-xs tracking-wider font-semibold text-[#c9a96e]'>Email</span>
                <span className='font-medium text-sm'>{user.email}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className='text-center text-sm text-gray-500'>Loading profile data...</p>
        )}
      </div>
    </div>
  )
}

export default Profile
