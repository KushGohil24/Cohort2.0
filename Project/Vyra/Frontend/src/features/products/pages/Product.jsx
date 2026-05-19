import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../../context/shopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t border-[#e0d6c8] pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 transition-colors ${item === image ? 'border-[#c9a96e]' : 'border-transparent hover:border-[#e0d6c8]'}`}
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='vyra-heading text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-3'>
            {[...Array(4)].map((_, i) => (
              <svg key={i} className='w-4 h-4 text-[#c9a96e]' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
              </svg>
            ))}
            <svg className='w-4 h-4 text-[#e0d6c8]' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
            <p className='pl-2 text-sm text-[#999]'>(122)</p>
          </div>
          <p className='mt-5 text-3xl vyra-heading text-[#333]'>
            {typeof productData.price === 'object' 
              ? (productData.price.currency === 'INR' ? '₹' : '$') + productData.price.amount 
              : currency + productData.price}
          </p>
          <p className='mt-5 text-[#777] md:w-4/5 text-sm leading-relaxed'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p className='text-xs tracking-[2px] uppercase text-[#c9a96e]'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 text-sm transition-all duration-200 ${item === size
                    ? 'border-[#c9a96e] bg-[#c9a96e]/10 text-[#c9a96e]'
                    : 'border-[#e0d6c8] hover:border-[#c9a96e] bg-white'
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className='vyra-btn tracking-[2px] text-xs'
          >
            <span>Add to Cart</span>
          </button>

          <hr className='mt-8 sm:w-4/5 border-[#e0d6c8]' />
          <div className='text-sm text-[#999] mt-5 flex flex-col gap-1.5'>
            <p>✦ Premium Quality Craftsmanship</p>
            <p>✦ Free insured delivery</p>
            <p>✦ Lifetime exchange guarantee</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-[#e0d6c8] px-5 py-3 text-sm tracking-wider text-[#c9a96e]'>Description</b>
          <p className='border border-[#e0d6c8] px-5 py-3 text-sm text-[#999]'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-[#e0d6c8] px-6 py-6 text-sm text-[#777] leading-relaxed'>
          <p>Every Vyra piece is crafted with meticulous attention to detail, using only the finest materials. Our artisans blend traditional techniques with contemporary design to create jewelry that transcends trends and becomes a cherished part of your story.</p>
          <p>Each piece undergoes rigorous quality checks to ensure a flawless finish. Our commitment to excellence ensures that your Vyra fashion jewelry will elevate any outfit and bring you joy with every wear.</p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} productId={productId} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
