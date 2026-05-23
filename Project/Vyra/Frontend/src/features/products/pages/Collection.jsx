import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../context/shopContext'
import Title from '../../Shared/Components/Title';
import ProductItem from '../components/ProductItem';

const CATEGORIES = [
  'Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Anklets', 'Bangles',
  'Pendants', 'Chains', 'Nose Pins', 'Hair Accessories', 'Brooches', 'Sets'
];

const METALS = [
  'Brass', 'Base Metal', 'Silver', 'Copper', 'Yellow Gold', 'White Gold',
  'Platinum', 'Rose Gold', 'Stainless Steel', 'Sterling Silver',
  'Precious Metal', 'Pearl', 'Plastic', 'Bamboo', 'Ceramic', 'Enamel',
  'Fabric', 'Lac', 'Leather', 'Resin', 'Rubber', 'Shell', 'Wood', 'Mother of Pearl'
];

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [metal, setMetal] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [showOOSFilter, setShowOOSFilter] = useState(false);

  const toggleCategory = (e) => {
    const val = e.target.value;
    setCategory(prev =>
      prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]
    );
  };

  const toggleMetal = (e) => {
    const val = e.target.value;
    setMetal(prev =>
      prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]
    );
  };

  const getPrice = (item) =>
    typeof item.price === 'object' ? item.price.amount : item.price;

  const applyFilter = () => {
    let copy = products.slice();
    if (showSearch && search) {
      copy = copy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      copy = copy.filter(item => category.includes(item.category));
    }
    if (metal.length > 0) {
      copy = copy.filter(item => metal.includes(item.metal));
    }
    if (showOOSFilter) {
      copy = copy.filter(item => item.stock > 0);
    }
    setFilterProducts(copy);
  };

  const sortProduct = () => {
    let copy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(copy.sort((a, b) => getPrice(a) - getPrice(b)));
        break;
      case 'high-low':
        setFilterProducts(copy.sort((a, b) => getPrice(b) - getPrice(a)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, metal, search, showSearch, products, showOOSFilter]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-[#e0d6c8]'>
      {/* Filter Sidebar */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-sm flex items-center cursor-pointer gap-2 tracking-[2px] uppercase'
        >
          Filters
          <svg className={`h-3 w-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </p>

        {/* In Stock toggle */}
        <div className={`border border-[#e0d6c8] pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <label className='flex items-center gap-2 text-sm text-[#777] cursor-pointer'>
            <input
              type='checkbox'
              className='w-3 accent-[#c9a96e]'
              checked={showOOSFilter}
              onChange={e => setShowOOSFilter(e.target.checked)}
            />
            <span className='text-xs font-medium tracking-[1px] uppercase text-[#c9a96e]'>In Stock Only</span>
          </label>
        </div>

        {/* Category Filter */}
        <div className={`border border-[#e0d6c8] pl-5 py-3 mt-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-xs font-medium tracking-[2px] uppercase text-[#c9a96e]'>Category</p>
          <div className='flex flex-col gap-2 text-sm text-[#777] max-h-52 overflow-y-auto pr-2'>
            {CATEGORIES.map(cat => (
              <label key={cat} className='flex gap-2 items-center cursor-pointer hover:text-[#c9a96e] transition-colors'>
                <input type='checkbox' className='w-3 accent-[#c9a96e] cursor-pointer' value={cat} checked={category.includes(cat)} onChange={toggleCategory} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Metal Filter */}
        <div className={`border border-[#e0d6c8] pl-5 py-3 my-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-xs font-medium tracking-[2px] uppercase text-[#c9a96e]'>Material / Metal</p>
          <div className='flex flex-col gap-2 text-sm text-[#777] max-h-64 overflow-y-auto pr-2'>
            {METALS.map(m => (
              <label key={m} className='flex gap-2 items-center cursor-pointer hover:text-[#c9a96e] transition-colors'>
                <input type='checkbox' className='w-3 accent-[#c9a96e] cursor-pointer' value={m} checked={metal.includes(m)} onChange={toggleMetal} />
                {m}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 items-center'>
          <Title text1={'OUR'} text2={'COLLECTION'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border border-[#e0d6c8] text-sm px-3 py-2 outline-none bg-transparent text-[#777] focus:border-[#c9a96e] transition-colors cursor-pointer'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {filterProducts.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-[#aaa] gap-3'>
            <svg className='w-12 h-12 text-[#e0d6c8]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <p className='text-sm tracking-wider'>No products found</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
                stock={item.stock}
                metal={item.metal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
