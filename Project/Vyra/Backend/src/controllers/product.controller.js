import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

async function createProduct(req, res) {
    try {
        const { name, description, price } = req.body;
        const seller = req.user;
        const images = await Promise.all(req.files.map(async file => {
            return await uploadFile(file.buffer, file.originalname, seller._id)
        }));
        const product = await productModel.create({ name, description, price: { amount: price, currency: "INR" }, images, seller: seller._id });
        res.status(201).json({ message: "Product created successfully", success: true, product });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

async function getSellerProducts(req, res) {
    try {
        const sellerId = req.user._id;
        const products = await productModel.find({ seller: sellerId });
        res.status(200).json({ message: "Products fetched successfully", success: true, products });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}
export const productController = {
    createProduct,
    getSellerProducts
};