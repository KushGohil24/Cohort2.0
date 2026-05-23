import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../features/products/service/product.api";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 49;
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    // Flat cart: { itemId: quantity }
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

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
    }, []);

    const addToCart = (itemId) => {
        const product = products.find(p => p._id === itemId);
        if (!product) return;

        if (product.stock === 0) {
            toast.error("This item is out of stock.");
            return;
        }

        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        toast.success(`Added "${product.name}" to cart!`);
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            setCartItems(prev => {
                const updated = { ...prev };
                delete updated[itemId];
                return updated;
            });
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: quantity }));
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (!product) continue;
            const priceVal = typeof product.price === 'object' ? product.price.amount : product.price;
            totalAmount += priceVal * cartItems[itemId];
        }
        return totalAmount;
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