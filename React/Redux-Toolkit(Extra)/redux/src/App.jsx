import React from 'react'
import "./App.css"
import { useDispatch, useSelector } from 'react-redux'
import { decreament, increament, reset } from './redux/slice/counterSlice';
import Navbar from './components/Navbar';

const App = () => {
  const dispatch = useDispatch();
  const num = useSelector((state)=>state.counter.value)
  const theme = useSelector((state)=>state.theme.value)
  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <div className='container'>
        <h1 className='count-display'>{num}</h1>
        <div className='button-group'>
          <button
            onClick={()=>{
              dispatch(decreament())
            }}
          >-</button>
          <button 
            onClick={()=>{
              dispatch(reset())
            }}
          >Reset</button>
          <button
            onClick={()=>{
              dispatch(increament())
            }}
          >+</button>
        </div>
      </div>
    </div>
  )
}

export default App