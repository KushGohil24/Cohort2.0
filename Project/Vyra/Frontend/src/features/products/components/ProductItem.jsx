import React, { useContext } from 'react'
import { ShopContext } from '../../../context/shopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link className='group cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden bg-white border border-transparent hover:border-[#e0d6c8] transition-all duration-300'>
        <img
          className='w-full hover:scale-105 transition-transform duration-500 ease-out'
          src={image[0]}
          alt={name}
        />
      </div>
      <p className='pt-3 pb-1 text-sm text-[#555] group-hover:text-[#c9a96e] transition-colors'>{name}</p>
      <p className='text-sm font-medium text-[#333]'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
