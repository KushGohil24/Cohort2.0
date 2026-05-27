import { createProduct, getAllProducts, getSellerProducts, addVariant } from "../service/product.api"

export const useProduct = () => {
    async function handleCreateProduct(productData){
        try {
            const response = await createProduct(productData);
            return response.product;
        } catch (error) {
            throw error;
        }
    }
    async function handleGetSellerProducts(){
        try {
            const response = await getSellerProducts();
            return response.products;
        } catch (error) {
            throw error;
        }
    }
    async function handleGetAllProducts(){
        try{
            const response = await getAllProducts();
            return response.products;
        }catch(error){
            throw error;
        }
    }
    async function handleAddVariant(productId, formData){
        try{
            const response = await addVariant(productId, formData);
            if (!response.success) throw new Error(response.message);
            return response.product;
        }catch(error){
            throw error;
        }
    }
    return { handleCreateProduct, handleGetSellerProducts, handleGetAllProducts, handleAddVariant };
}