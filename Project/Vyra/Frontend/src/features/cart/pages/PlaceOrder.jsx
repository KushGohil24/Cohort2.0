import React, { useContext, useState } from 'react'
import Title from '../../Shared/Components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../../../context/shopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate } = useContext(ShopContext);

  const inputClass = 'vyra-input rounded-none';

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-[#e0d6c8]'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input className={inputClass} type="text" placeholder='First name' />
          <input className={inputClass} type="text" placeholder='Last name' />
        </div>
        <input className={inputClass} type="email" placeholder='Email address' />
        <input className={inputClass} type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input className={inputClass} type="text" placeholder='City' />
          <input className={inputClass} type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className={inputClass} type="number" placeholder='Zipcode' />
          <input className={inputClass} type="text" placeholder='Country' />
        </div>
        <input className={inputClass} type="number" placeholder='Phone' />
      </div>

      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div
              onClick={() => setMethod('upi')}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer transition-all ${method === 'upi' ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-[#e0d6c8] hover:border-[#c9a96e]'}`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full transition-colors ${method === 'upi' ? 'bg-[#c9a96e] border-[#c9a96e]' : 'border-[#ccc]'}`}></p>
              <p className='text-sm font-medium mx-2 tracking-wider'>UPI</p>
            </div>
            <div
              onClick={() => setMethod('card')}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer transition-all ${method === 'card' ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-[#e0d6c8] hover:border-[#c9a96e]'}`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full transition-colors ${method === 'card' ? 'bg-[#c9a96e] border-[#c9a96e]' : 'border-[#ccc]'}`}></p>
              <p className='text-sm font-medium mx-2 tracking-wider'>CARD</p>
            </div>
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer transition-all ${method === 'cod' ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-[#e0d6c8] hover:border-[#c9a96e]'}`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full transition-colors ${method === 'cod' ? 'bg-[#c9a96e] border-[#c9a96e]' : 'border-[#ccc]'}`}></p>
              <p className='text-sm font-medium mx-2 tracking-wider'>COD</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button onClick={() => navigate('/orders')} className='vyra-btn tracking-[2px] text-xs'>
              <span>Place Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
