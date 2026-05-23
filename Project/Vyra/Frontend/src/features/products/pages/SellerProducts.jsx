import React, { useEffect, useState } from 'react';
import { useProduct } from '../hook/useProduct';
import ProductItem from '../components/ProductItem';
import Title from '../../Shared/Components/Title';
import { Link } from 'react-router-dom';

const SellerProducts = () => {
    const { handleGetSellerProducts } = useProduct();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await handleGetSellerProducts();
                if (data) {
                    setProducts(data);
                }
            } catch (error) {
                console.error("Error fetching seller products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <div className="text-2xl">
                    <Title text1="MY" text2="PRODUCTS" />
                </div>
                <Link to="/create-product" className="bg-[#c9a96e] text-[#0a0a0a] px-6 py-2 text-sm uppercase tracking-widest font-semibold hover:bg-[#a8893e] transition-colors rounded">
                    Create Product
                </Link>
            </div>
            
            {products.length === 0 ? (
                <div className="text-center text-gray-500 py-12 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <p className="mb-4">You haven't created any products yet.</p>
                    <Link to="/create-product" className="text-[#c9a96e] hover:underline">Click here to create your first product</Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {products.map((item, index) => (
                        <ProductItem 
                            key={index} 
                            id={item._id} 
                            image={item.images?.map(img => img.url) || []} 
                            name={item.title} 
                            price={item.price}
                            metal={item.metal}
                            stock={item.stock ?? 0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SellerProducts;
