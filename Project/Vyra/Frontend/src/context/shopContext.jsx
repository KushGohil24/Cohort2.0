import { createContext, useEffect, useState } from "react";
import { products as staticProducts } from '../assets/frontend_assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../features/products/service/product.api";

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    const currency = "$";
    const delivery_fee = 10;
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            if (response && response.success) {
                const mappedProducts = response.products.map(item => ({
                    _id: item._id,
                    name: item.title,
                    description: item.description,
                    price: item.price,
                    image: item.images?.map(img => img.url) || [],
                    category: item.category || 'Necklaces',
                    subCategory: item.subCategory || 'Gold',
                    sizes: item.sizes && item.sizes.length > 0 ? item.sizes : ['S', 'M', 'L'],
                    bestseller: item.bestseller || false
                }));
                setProducts(mappedProducts);
            } else {
                // Fallback to static products if API call fails or DB is empty
                setProducts(staticProducts);
            }
        } catch (error) {
            console.error("Error fetching products from DB:", error);
            setProducts(staticProducts);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCart = async(itemId, size)=>{
        if(!size){
            toast.error('Please Select Product Size');
            return ;
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        
        const product = products.find(p => p._id === itemId);
        const name = product ? product.name : "Product";
        toast.success(`Added "${name}" to cart!`);
    }
   
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                }catch (error){

                }
            }
        }
        return totalCount;
    }
    const updateQuantity = async (itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }
    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue;
            const priceVal = typeof itemInfo.price === 'object' ? itemInfo.price.amount : itemInfo.price;
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalAmount += priceVal * cartItems[items][item]
                    }
                }catch(error){

                }
            }
        }
        return totalAmount;
    }
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate, fetchProducts
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}
export default ShopContextProvider