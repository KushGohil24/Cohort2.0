import React, { useContext } from 'react'
import { ShopContext } from '../../../context/shopContext'
import Title from '../../Shared/Components/Title'

const Orders = () => {
  const { products, currency, delivery_fee } = useContext(ShopContext);

  return (
    <div className='border-t border-[#e0d6c8] pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {products.slice(1, 4).map((item, index) => {
          const basePrice = typeof item.price === 'object' ? item.price.amount : item.price;
          const currencySymbol = typeof item.price === 'object' && item.price.currency === 'INR' ? '₹' : currency;
          const totalPaid = basePrice + delivery_fee;

          return (
            <div key={index} className='py-4 border-t border-[#e0d6c8] flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium text-[#333]'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-[#555]'>
                    <p>{currencySymbol}{totalPaid}</p>
                    <p className='text-[#999]'>Qty: 1</p>
                    {item.metal && <p className='text-[#999]'>Metal: {item.metal}</p>}
                  </div>
                <p className='mt-2 text-xs text-[#999]'>
                  Date: <span className='text-[#555]'>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-[#c9a96e]'></p>
                <p className='text-sm text-[#555]'>Ready to Ship</p>
              </div>
              <button className='border border-[#e0d6c8] px-4 py-2 text-sm hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all tracking-wider'>
                Track Order
              </button>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Orders
