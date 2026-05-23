import React, { useContext } from 'react'
import { ShopContext } from '../../../context/shopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, stock, metal }) => {
  const { currency } = useContext(ShopContext);
  const priceDisplay = typeof price === 'object'
    ? (price.currency === 'INR' ? '₹' : '$') + price.amount
    : currency + price;

  const isOOS = stock === 0;

  return (
    <Link className='group cursor-pointer' to={`/product/${id}`}>
      <div className='relative overflow-hidden bg-[#faf7f2] border border-transparent hover:border-[#e0d6c8] transition-all duration-300'>
        <img
          className={`w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-500 ease-out ${isOOS ? 'opacity-60' : ''}`}
          src={image[0]}
          alt={name}
        />
        {isOOS && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/20'>
            <span className='bg-[#0a0a0a] text-white text-[10px] tracking-[2px] uppercase px-3 py-1.5'>
              Out of Stock
            </span>
          </div>
        )}
        {!isOOS && stock !== undefined && stock <= 5 && (
          <div className='absolute top-2 left-2'>
            <span className='bg-amber-500 text-white text-[9px] tracking-[1px] uppercase px-2 py-1'>
              Only {stock} left
            </span>
          </div>
        )}
      </div>
      <p className='pt-3 pb-0.5 text-sm text-[#555] group-hover:text-[#c9a96e] transition-colors leading-snug'>{name}</p>
      {metal && (
        <p className='text-[10px] text-[#aaa] tracking-wider uppercase mb-1'>{metal}</p>
      )}
      <p className='text-sm font-medium text-[#333]'>{priceDisplay}</p>
    </Link>
  );
};

export default ProductItem;
