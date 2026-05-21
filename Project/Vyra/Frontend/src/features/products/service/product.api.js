import API from "../../../services/api.js";

export async function createProduct(productData) {
    try {
        // The API instance already has baseURL ending in "/api"
        const response = await API.post("/products", productData);
        if (response.data.success) {
            return response.data;
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return { message: "Network error", success: false };
    }
}

export async function getSellerProducts() {
    try {
        const response = await API.get("/products/seller");
        if (response.data.success) {
            return response.data;
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return { message: "Network error", success: false };
    }
}

export async function getAllProducts() {
    try {
        const response = await API.get("/products");
        if (response.data.success) {
            return response.data;
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return { message: "Network error", success: false };
    }
}