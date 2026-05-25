import productModel from "../models/product.model";

export const stockOfVariant = async (productId, variantId) => {
    const product = await productModel.findOne({ _id: productId, 'variants._id': variantId }, { variants: 1 })
    const stock = product?.variants.find((variant) => variant._id.toString() === variantId)?.stock
    return stock
}

