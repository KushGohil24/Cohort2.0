import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

async function createProduct(req, res) {
    try {
        const {
            title,
            description,
            priceAmount,
            priceCurrency,
            category,
            metal,
            stock,
            bestseller,
            tags
        } = req.body;

        const seller = req.user;

        const images = await Promise.all(req.files.map(async file => {
            return await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname,
                folder: seller._id.toString()
            });
        }));

        const product = await productModel.create({
            title,
            description,
            price: { amount: Number(priceAmount), currency: priceCurrency || "INR" },
            images,
            seller: seller._id,
            category,
            metal,
            stock: stock !== undefined ? Number(stock) : 0,
            bestseller: bestseller === 'true' || bestseller === true,
            tags: tags ? (typeof tags === 'string' ? JSON.parse(tags) : tags) : []
        });

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

async function getAllProducts(req, res) {
    try {
        const products = await productModel.find({});
        res.status(200).json({ message: "Products fetched successfully", success: true, products });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

async function getProduct(req, res) {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        res.status(200).json({ message: "Product fetched successfully", success: true, product });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

export const productController = {
    createProduct,
    getSellerProducts,
    getAllProducts,
    getProduct
};