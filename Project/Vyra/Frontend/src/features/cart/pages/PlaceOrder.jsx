import React, { useContext, useState } from 'react'
import Title from '../../Shared/Components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../../../context/shopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate } = useContext(ShopContext);

  const inputClass = 'vyra-input rounded-none w-full';

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t border-[#e0d6c8]'>
      {/* Delivery Form */}
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

      {/* Order Summary + Payment */}
      <div className='w-full sm:min-w-[300px] sm:max-w-[380px]'>
        <CartTotal />

        <div className='mt-8'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col mt-4'>
            {[
              { id: 'upi', label: 'UPI' },
              { id: 'card', label: 'CARD' },
              { id: 'cod', label: 'CASH ON DELIVERY' },
            ].map(({ id, label }) => (
              <div
                key={id}
                onClick={() => setMethod(id)}
                className={`flex items-center gap-3 border p-3 px-4 cursor-pointer transition-all ${method === id ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-[#e0d6c8] hover:border-[#c9a96e]'}`}
              >
                <span className={`w-3.5 h-3.5 border rounded-full transition-colors flex-shrink-0 ${method === id ? 'bg-[#c9a96e] border-[#c9a96e]' : 'border-[#ccc]'}`} />
                <p className='text-sm font-medium tracking-wider'>{label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/orders')}
            className='w-full mt-6 py-4 bg-[#c9a96e] hover:bg-[#a8893e] text-[#0a0a0a] text-xs font-bold tracking-[3px] uppercase transition-colors duration-300 active:scale-[0.98]'
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
