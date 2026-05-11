import React, { useContext } from 'react'
import { ShopContext } from '../../../context/shopContext'
import Title from '../../Shared/Components/Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between py-2'>
          <p className='text-[#777]'>Subtotal</p>
          <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr className='border-[#e0d6c8]' />
        <div className='flex justify-between py-2'>
          <p className='text-[#777]'>Shipping</p>
          <p className='text-[#c9a96e]'>{getCartAmount() === 0 ? `${currency}0.00` : `${currency}${delivery_fee}.00`}</p>
        </div>
        <hr className='border-[#e0d6c8]' />
        <div className='flex justify-between py-3'>
          <b className='text-[#333]'>Total</b>
          <b className='text-[#333]'>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
