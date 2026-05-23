import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../context/shopContext'
import Title from '../../Shared/Components/Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory, productId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      if (category) productsCopy = productsCopy.filter(item => item.category === category);
      if (subCategory) productsCopy = productsCopy.filter(item => item.metal === subCategory);
      productsCopy = productsCopy.filter(item => item._id !== productId);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory, productId]);

  if (related.length === 0) return null;

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'YOU MAY'} text2={'ALSO LIKE'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} stock={item.stock} metal={item.metal} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
