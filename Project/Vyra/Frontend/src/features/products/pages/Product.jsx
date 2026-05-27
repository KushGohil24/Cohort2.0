import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../../context/shopContext';
import RelatedProducts from '../components/RelatedProducts';
import { useCart } from '../../cart/hook/useCart';
import { useAuth } from '../../auth/hook/useAuth';
import { useProduct } from '../hook/useProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, cartItems, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const { handleAddToCart } = useCart();
  
  const { user } = useAuth();
  const { handleAddVariant } = useProduct();
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [variantFormData, setVariantFormData] = useState({
    stock: '', priceAmount: '', attributes: ''
  });
  const [variantImages, setVariantImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onVariantSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData();
    fd.append('stock', variantFormData.stock);
    fd.append('priceAmount', variantFormData.priceAmount);
    
    // Parse attributes from key:value,key2:value2 format to JSON object if needed, or pass as string
    const attrsObj = {};
    if (variantFormData.attributes) {
      variantFormData.attributes.split(',').forEach(pair => {
        const [k, v] = pair.split(':').map(s => s.trim());
        if (k && v) attrsObj[k] = v;
      });
    }
    fd.append('attributes', JSON.stringify(attrsObj));

    for (let i = 0; i < variantImages.length; i++) {
        fd.append('images', variantImages[i]);
    }
    
    try {
        const updatedProduct = await handleAddVariant(productId, fd);
        setProductData(updatedProduct);
        setShowVariantForm(false);
        setVariantFormData({ stock: '', priceAmount: '', attributes: '' });
        setVariantImages([]);
        alert("Variant added successfully!");
    } catch (err) {
        alert("Error adding variant: " + err.message);
    } finally {
        setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const found = products.find(item => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image[0]);
    }
  }, [productId, products]);

  if (!productData) return <div className='opacity-0 min-h-[60vh]' />;

  const priceDisplay = typeof productData.price === 'object'
    ? (productData.price.currency === 'INR' ? '₹' : '$') + productData.price.amount
    : currency + productData.price;

  const stock = productData.stock ?? 0;
  const isOOS = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;
  const isInCart = cartItems.some(item => 
    (item.product?._id || item.product) === productData._id
  );

  return (
    <div className='border-t border-[#e0d6c8] pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product layout */}
      <div className='flex gap-12 flex-col sm:flex-row'>
        {/* Image gallery */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                className={`w-[24%] sm:w-full aspect-[4/5] object-cover sm:mb-3 flex-shrink-0 cursor-pointer border-2 transition-colors ${item === image ? 'border-[#c9a96e]' : 'border-transparent hover:border-[#e0d6c8]'}`}
                alt={`${productData.name} view ${index + 1}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%] relative bg-[#faf7f2]'>
            <img src={image} className='w-full aspect-[4/5] object-cover' alt={productData.name} />
            {isOOS && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                <span className='bg-[#0a0a0a] text-white text-xs tracking-[3px] uppercase px-6 py-3'>Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='vyra-heading text-2xl mt-2'>{productData.name}</h1>

          {/* Metal / Material badge */}
          {productData.metal && (
            <span className='inline-block mt-2 text-[10px] tracking-[2px] uppercase text-[#c9a96e] border border-[#c9a96e]/40 px-2 py-0.5'>
              {productData.metal}
            </span>
          )}

          {/* Star Rating placeholder */}
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

          {/* Price */}
          <p className='mt-5 text-3xl vyra-heading text-[#333]'>{priceDisplay}</p>

          {/* Description */}
          <p className='mt-5 text-[#777] md:w-4/5 text-sm leading-relaxed'>{productData.description}</p>

          {/* Stock Status */}
          <div className='mt-5'>
            {isOOS ? (
              <span className='text-xs tracking-[2px] uppercase text-red-400 border border-red-300 px-3 py-1'>
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className='text-xs tracking-[2px] uppercase text-amber-500 border border-amber-300 px-3 py-1'>
                Low Stock — Only {stock} left
              </span>
            ) : (
              <span className='text-xs tracking-[2px] uppercase text-green-600 border border-green-300 px-3 py-1'>
                In Stock
              </span>
            )}
          </div>

          {/* Cart Button */}
          {isOOS ? (
            <button
              disabled
              className='mt-8 vyra-btn tracking-[2px] text-xs opacity-40 cursor-not-allowed'
            >
              <span>Out of Stock</span>
            </button>
          ) : isInCart ? (
            <button
              onClick={() => navigate('/cart')}
              className='mt-8 vyra-btn-gold tracking-[2px] text-xs flex items-center gap-2'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
              </svg>
              <span>Go to Cart</span>
            </button>
          ) : (
            <button
              onClick={() => addToCart(productData._id)}
              className='mt-8 vyra-btn tracking-[2px] text-xs'
            >
              <span>Add to Cart</span>
            </button>
          )}

          <hr className='mt-8 sm:w-4/5 border-[#e0d6c8]' />

          {/* Fashion jewelry trust signals */}
          <div className='text-sm text-[#999] mt-5 flex flex-col gap-1.5'>
            <p>✦ Trendy fashion jewelry</p>
            <p>✦ Lightweight &amp; comfortable to wear</p>
            <p>✦ Easy returns within 7 days</p>
            <p>✦ Secure &amp; fast delivery</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-[#e0d6c8] px-5 py-3 text-sm tracking-wider text-[#c9a96e]'>Description</b>
          <p className='border border-[#e0d6c8] px-5 py-3 text-sm text-[#999]'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-[#e0d6c8] px-6 py-6 text-sm text-[#777] leading-relaxed'>
          <p>Vyra brings you the latest in fashion jewelry — pieces that are designed to express your style without breaking the bank. Our collection spans bold statement pieces to everyday essentials.</p>
          <p>Each item is carefully inspected for finish, wearability, and comfort. While our pieces are fashion jewelry and not made of precious metals or real gemstones, they are crafted to look stunning and last long with proper care.</p>
        </div>
      </div>

      {/* Seller Administration */}
      {user?._id === productData.seller && (
        <div className='mt-20 border-2 border-dashed border-[#c9a96e] p-6 bg-[#faf7f2]'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl vyra-heading text-[#0a0a0a]'>Seller Administration</h2>
            <button 
              onClick={() => setShowVariantForm(!showVariantForm)}
              className='bg-[#0a0a0a] text-white px-4 py-2 text-xs uppercase tracking-widest'
            >
              {showVariantForm ? 'Cancel' : 'Add New Variant'}
            </button>
          </div>
          
          {showVariantForm && (
            <form onSubmit={onVariantSubmit} className='flex flex-col gap-4 mt-6 border-t border-[#e0d6c8] pt-6'>
              <h3 className='text-sm font-semibold text-[#333] tracking-widest uppercase'>Variant Details</h3>
              
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs text-[#777] uppercase tracking-wider'>Stock Quantity</label>
                  <input 
                    type='number' 
                    required 
                    min='0'
                    value={variantFormData.stock}
                    onChange={(e) => setVariantFormData({...variantFormData, stock: e.target.value})}
                    className='border border-[#e0d6c8] px-3 py-2 text-sm focus:outline-none focus:border-[#c9a96e]'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-xs text-[#777] uppercase tracking-wider'>Price (Amount)</label>
                  <input 
                    type='number' 
                    required 
                    min='0'
                    value={variantFormData.priceAmount}
                    onChange={(e) => setVariantFormData({...variantFormData, priceAmount: e.target.value})}
                    className='border border-[#e0d6c8] px-3 py-2 text-sm focus:outline-none focus:border-[#c9a96e]'
                  />
                </div>
              </div>
              
              <div className='flex flex-col gap-1'>
                <label className='text-xs text-[#777] uppercase tracking-wider'>Attributes (e.g. Size:M, Color:Red)</label>
                <input 
                  type='text'
                  placeholder='Size:M, Color:Red'
                  value={variantFormData.attributes}
                  onChange={(e) => setVariantFormData({...variantFormData, attributes: e.target.value})}
                  className='border border-[#e0d6c8] px-3 py-2 text-sm focus:outline-none focus:border-[#c9a96e]'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-xs text-[#777] uppercase tracking-wider'>Variant Images (up to 5)</label>
                <input 
                  type='file' 
                  multiple 
                  accept='image/*'
                  required
                  onChange={(e) => setVariantImages(e.target.files)}
                  className='border border-[#e0d6c8] px-3 py-2 text-sm focus:outline-none focus:border-[#c9a96e] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[#e0d6c8] file:text-[#333] hover:file:bg-[#c9a96e]'
                />
              </div>

              <button 
                type='submit' 
                disabled={isSubmitting}
                className='mt-4 bg-[#c9a96e] hover:bg-[#a8893e] text-[#0a0a0a] py-3 text-xs uppercase tracking-[2px] font-bold transition-colors disabled:opacity-50'
              >
                {isSubmitting ? 'Saving...' : 'Save Variant'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.metal} productId={productId} />
    </div>
  );
};

export default Product;
