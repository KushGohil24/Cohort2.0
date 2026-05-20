import React, { useState, useEffect } from "react";
import { useProduct } from "../hook/useProduct";
import Title from "../../Shared/Components/Title";
import { useNavigate, Link } from "react-router-dom";

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: [],
        category: "",
        subCategory: "",
    });

    const [errors, setErrors] = useState({});
    const [previews, setPreviews] = useState([]);

    // Manage image preview URLs to avoid memory leaks
    useEffect(() => {
        const objectUrls = formData.image.map((file) => URL.createObjectURL(file));
        setPreviews(objectUrls);

        // Revoke the URLs on unmount or when images change
        return () => {
            objectUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [formData.image]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const currentImages = formData.image;
        const updatedImages = [...currentImages, ...files];

        if (updatedImages.length > 7) {
            setErrors({ ...errors, image: "Maximum 7 images allowed" });
            return;
        }

        setFormData({ ...formData, image: updatedImages });
        
        // Clear errors if there are any
        if (updatedImages.length > 0 && errors.image) {
            const { image, ...rest } = errors;
            setErrors(rest);
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        const updatedImages = formData.image.filter((_, index) => index !== indexToRemove);
        setFormData({ ...formData, image: updatedImages });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const submitData = new FormData();
            submitData.append("title", formData.name);
            submitData.append("priceAmount", formData.price);
            submitData.append("priceCurrency", "INR");
            submitData.append("description", formData.description);
            
            formData.image.forEach((file) => {
                submitData.append("images", file);
            });

            await handleCreateProduct(submitData);
            setFormData({
                name: "",
                price: "",
                description: "",
                image: [],
                category: "",
                subCategory: "",
            });
            navigate('/seller-products');
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.name) errors.name = "Product name is required";
        if (!data.price) errors.price = "Price is required";
        if (!data.description) errors.description = "Description is required";
        if (data.image.length === 0) errors.image = "At least one image is required";
        return errors;
    };

    return (
        <div className="min-h-[80vh] bg-[#faf7f2] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl mb-4">
                <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-[#c9a96e] hover:text-[#a8893e] transition-colors">
                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>
            </div>
            <div className="max-w-2xl w-full bg-white p-8 sm:p-10 rounded shadow-sm border border-[#e0d6c8]">
                <div className="text-3xl text-center mb-8">
                    <Title text1="CREATE" text2="PRODUCT" />
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Product Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="appearance-none block w-full px-4 py-3 border border-[#e0d6c8] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#c9a96e] focus:border-[#c9a96e] transition-colors sm:text-sm rounded-none"
                                placeholder="Enter product name"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="price" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Price (INR)</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className="appearance-none block w-full px-4 py-3 border border-[#e0d6c8] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#c9a96e] focus:border-[#c9a96e] transition-colors sm:text-sm rounded-none"
                                placeholder="0.00"
                            />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="description" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="appearance-none block w-full px-4 py-3 border border-[#e0d6c8] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#c9a96e] focus:border-[#c9a96e] transition-colors sm:text-sm rounded-none resize-none"
                                placeholder="Describe the jewelry piece"
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="image" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Product Images</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border border-[#e0d6c8] border-dashed bg-gray-50 hover:bg-[#faf7f2] transition-colors cursor-pointer rounded-none">
                                <div className="space-y-2 text-center">
                                    <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label htmlFor="image" className="relative cursor-pointer bg-transparent rounded-none font-medium text-[#c9a96e] hover:text-[#a8893e] focus-within:outline-none">
                                            <span>Upload images</span>
                                            <input id="image" name="image" type="file" multiple accept="image/*" onChange={handleImageUpload} className="sr-only" />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                            
                            {/* Uploaded Images Preview Grid */}
                            {previews.length > 0 && (
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                                    {previews.map((url, index) => (
                                        <div key={url} className="relative aspect-square border border-[#e0d6c8] group overflow-hidden bg-white">
                                            <img
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-1 right-1 bg-black/60 hover:bg-[#c9a96e] text-white hover:text-black rounded-full w-5 h-5 flex items-center justify-center transition-all shadow-sm focus:outline-none"
                                                title="Remove image"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-gray-500 text-xs mt-2 italic">Maximum 7 images allowed. <span className="font-semibold text-[#c9a96e]">{formData.image.length}</span> selected.</p>
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold text-[#0a0a0a] bg-[#c9a96e] hover:bg-[#a8893e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9a96e] tracking-widest uppercase transition-all duration-300"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;