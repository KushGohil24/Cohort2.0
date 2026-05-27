import api from "../../../services/api";

export const cartApi = {
    addToCart: (productId, variantId, quantity) => {
        const url = variantId ? `/cart/add/${productId}/${variantId}` : `/cart/add/${productId}`;
        return api.post(url, { quantity });
    },
    getCart: () => api.get("/cart"),
};