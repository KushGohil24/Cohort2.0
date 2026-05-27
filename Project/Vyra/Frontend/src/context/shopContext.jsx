import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../features/products/service/product.api";
import { useCart } from "../features/cart/hook/useCart";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 49;
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const { cartItems, handleAddToCart, handleGetCart, handleUpdateQuantity } = useCart();

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            if (response && response.success && response.products.length > 0) {
                const mappedProducts = response.products.map(item => ({
                    _id: item._id,
                    name: item.title,
                    description: item.description,
                    price: item.price,
                    image: item.images?.map(img => img.url) || [],
                    category: item.category || 'Necklaces',
                    metal: item.metal || 'Brass',
                    stock: item.stock ?? 0,
                    bestseller: item.bestseller || false,
                    tags: item.tags || [],
                    variants: item.variants || []
                }));
                setProducts(mappedProducts);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products from DB:", error);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
        handleGetCart();
    }, []);

    const addToCart = async (itemId, variantId = null) => {
        if (!variantId) {
            const product = products.find(p => p._id === itemId);
            if (product && product.variants && product.variants.length > 0) {
                variantId = product.variants[0]._id;
            }
        }
        await handleAddToCart(itemId, variantId, 1);
    };

    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const updateQuantity = async (itemId, variantId, currentQuantity, newQuantity) => {
        await handleUpdateQuantity(itemId, variantId, currentQuantity, newQuantity);
    };

    const getCartAmount = () => {
        return cartItems.reduce((total, item) => {
            const priceVal = typeof item.price === 'object' ? item.price.amount : item.price;
            return total + (priceVal * item.quantity);
        }, 0);
    };

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate, fetchProducts
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;