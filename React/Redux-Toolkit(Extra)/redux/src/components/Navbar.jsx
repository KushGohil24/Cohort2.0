import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/slice/themeSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state)=>state.theme.value)
  return (
    <div className='navbar-container'>
        <div className='navbar'>
            <h2>Redux Theme App</h2>
            <div className='theme-controls'>
                <span>Theme: {theme}</span>
                <button
                    onClick={()=>{
                        dispatch(toggleTheme())
                    }}
                >Toggle Theme</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar