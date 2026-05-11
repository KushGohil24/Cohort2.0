import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../context/shopContext'
import Title from '../../Shared/Components/Title';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems])

  return (
    <div className='border-t border-[#e0d6c8] pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className='py-4 border-t border-b border-[#e0d6c8] text-[#555] grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                <div>
                  <p className='text-sm sm:text-base font-medium text-[#333]'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p className='text-sm'>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border border-[#e0d6c8] bg-white text-xs'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                className='border border-[#e0d6c8] max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center outline-none focus:border-[#c9a96e] transition-colors'
                type="number"
                defaultValue={item.quantity}
                min={1}
              />
              <svg
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className='w-4 h-4 mr-4 cursor-pointer text-[#999] hover:text-red-400 transition-colors'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
              </svg>
            </div>
          )
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='vyra-btn-gold tracking-[2px] text-xs my-8'>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
