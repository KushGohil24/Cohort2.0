import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../../context/shopContext'
import Title from '../../Shared/Components/Title';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = cartItems.map(item => ({
      _id: item.product?._id || item.product,
      variantId: item.variant,
      quantity: item.quantity,
      price: item.price
    }));
    setCartData(tempData);
  }, [cartItems]);

  if (cartData.length === 0) {
    return (
      <div className='border-t border-[#e0d6c8] pt-10 px-4'>
        <div className='text-2xl mb-6'>
          <Title text1={'YOUR'} text2={'CART'} />
        </div>
        <div className='flex flex-col items-center justify-center py-20 text-[#aaa] gap-4'>
          <svg className='w-14 h-14 text-[#e0d6c8]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
          </svg>
          <p className='text-sm tracking-wider'>Your cart is empty</p>
          <button
            onClick={() => navigate('/collection')}
            className='vyra-btn tracking-[2px] text-xs mt-2'
          >
            Browse Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='border-t border-[#e0d6c8] pt-10 px-0'>
      <div className='text-2xl mb-6 px-4 sm:px-0'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div className='flex flex-col divide-y divide-[#e0d6c8]'>
        {cartData.map((item, index) => {
          const productData = products.find(p => p._id === item._id);
          if (!productData) return null;

          const priceVal = typeof item.price === 'object'
            ? item.price.amount
            : (typeof productData.price === 'object' ? productData.price.amount : productData.price);
            
          const priceDisplay = typeof item.price === 'object'
            ? (item.price.currency === 'INR' ? '₹' : '$') + item.price.amount
            : (typeof productData.price === 'object' ? (productData.price.currency === 'INR' ? '₹' : '$') + productData.price.amount : currency + productData.price);
            
          const lineTotal = priceVal * item.quantity;

          return (
            <div key={index} className='py-4 px-4 sm:px-0'>
              <div className='flex items-start gap-4'>

                {/* Product Image */}
                <img
                  src={productData.image[0]}
                  alt={productData.name}
                  className='w-20 h-20 sm:w-24 sm:h-24 object-cover flex-shrink-0 border border-[#e0d6c8]'
                />

                {/* Product Details */}
                <div className='flex-1 min-w-0'>
                  <Link to={`/product/${productData._id}`} className='text-sm font-medium text-[#333] leading-snug hover:text-[#c9a96e] transition-colors'>
                    {productData.name}
                  </Link>
                  {productData.metal && (
                    <p className='text-[10px] text-[#aaa] tracking-wider uppercase mt-0.5'>{productData.metal}</p>
                  )}
                  <p className='text-xs text-[#777] mt-1'>{priceDisplay} each</p>

                  {/* Quantity Controls */}
                  <div className='flex items-center gap-0 mt-3'>
                    {/* Minus */}
                    <button
                      onClick={() => updateQuantity(item._id, item.variantId, item.quantity, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className='w-8 h-8 flex items-center justify-center border border-[#e0d6c8] text-[#555] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors disabled:opacity-30 disabled:cursor-not-allowed active:bg-[#faf7f2]'
                      aria-label='Decrease quantity'
                    >
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 12H4' />
                      </svg>
                    </button>

                    {/* Quantity Display */}
                    <div className='w-10 h-8 flex items-center justify-center border-t border-b border-[#e0d6c8] text-sm font-medium text-[#333] select-none'>
                      {item.quantity}
                    </div>

                    {/* Plus */}
                    <button
                      onClick={() => updateQuantity(item._id, item.variantId, item.quantity, item.quantity + 1)}
                      className='w-8 h-8 flex items-center justify-center border border-[#e0d6c8] text-[#555] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors active:bg-[#faf7f2]'
                      aria-label='Increase quantity'
                    >
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right side: Line Total + Remove */}
                <div className='flex flex-col items-end gap-2 flex-shrink-0'>
                  <p className='text-sm font-semibold text-[#333]'>
                    {typeof item.price === 'object' && item.price.currency === 'INR' ? '₹' : currency}{lineTotal}
                  </p>
                  <button
                    onClick={() => updateQuantity(item._id, item.variantId, item.quantity, 0)}
                    className='text-[#bbb] hover:text-red-400 transition-colors p-1'
                    aria-label='Remove item'
                    title='Remove'
                  >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Order Summary */}
      <div className='mt-8 px-4 sm:px-0 pb-20'>
        <div className='sm:flex sm:justify-end'>
          <div className='w-full sm:w-[420px] border border-[#e0d6c8] p-5 bg-[#faf7f2]'>
            <CartTotal />
            <button
              onClick={() => navigate('/place-order')}
              className='w-full mt-5 py-4 bg-[#c9a96e] hover:bg-[#a8893e] text-[#0a0a0a] text-xs font-bold tracking-[3px] uppercase transition-colors duration-300 active:scale-[0.98]'
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => navigate('/collection')}
              className='w-full mt-2 py-3 border border-[#e0d6c8] text-[#777] text-xs tracking-[2px] uppercase hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors duration-300'
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
