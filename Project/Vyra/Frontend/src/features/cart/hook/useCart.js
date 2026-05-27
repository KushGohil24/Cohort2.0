import { addItems, setItems } from "../state/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { cartApi } from "../service/cart.api";
import { toast } from "react-toastify";

export const useCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleGetCart = async () => {
        try {
            const response = await cartApi.getCart();
            if (response.data?.success) {
                dispatch(setItems(response.data.cart.items || []));
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const handleAddToCart = async (productId, variantId = null, quantity = 1) => {
        try {
            const response = await cartApi.addToCart(productId, variantId, quantity);
            if (response.data?.success) {
                toast.success(response.data.message);
                // Refresh cart from server to get populated products
                await handleGetCart();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding to cart");
            console.error("Error adding to cart:", error);
        }
    };

    const handleUpdateQuantity = async (productId, variantId = null, currentQuantity, newQuantity) => {
        try {
            const difference = newQuantity - currentQuantity;
            const response = await cartApi.addToCart(productId, variantId, difference);
            if (response.data?.success) {
                await handleGetCart();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating quantity");
            console.error("Error updating quantity:", error);
        }
    };

    return {
        cartItems,
        handleAddToCart,
        handleGetCart,
        handleUpdateQuantity
    };
};