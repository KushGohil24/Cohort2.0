import React, { useState, useEffect } from "react";
import { useProduct } from "../hook/useProduct";
import Title from "../../Shared/Components/Title";
import { useNavigate, Link } from "react-router-dom";

const CATEGORIES = [
    'Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Anklets', 'Bangles',
    'Pendants', 'Chains', 'Nose Pins', 'Hair Accessories', 'Brooches', 'Sets'
];

const METALS = [
    'Brass', 'Base Metal', 'Silver', 'Copper', 'Yellow Gold', 'White Gold',
    'Platinum', 'Rose Gold', 'Stainless Steel', 'Sterling Silver',
    'Precious Metal', 'Pearl', 'Plastic', 'Bamboo', 'Ceramic', 'Enamel',
    'Fabric', 'Lac', 'Leather', 'Resin', 'Rubber', 'Shell', 'Wood', 'Mother of Pearl'
];

const INITIAL_FORM = {
    name: "",
    price: "",
    description: "",
    image: [],
    category: "Necklaces",
    metal: "Brass",
    stock: "",
    bestseller: false,
};

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [previews, setPreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Image preview URLs
    useEffect(() => {
        const urls = formData.image.map(f => URL.createObjectURL(f));
        setPreviews(urls);
        return () => urls.forEach(url => URL.revokeObjectURL(url));
    }, [formData.image]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const updated = [...formData.image, ...files];
        if (updated.length > 7) {
            setErrors({ ...errors, image: "Maximum 7 images allowed" });
            return;
        }
        setFormData({ ...formData, image: updated });
        if (updated.length > 0 && errors.image) {
            const { image, ...rest } = errors;
            setErrors(rest);
        }
    };

    const handleRemoveImage = (i) => {
        setFormData({ ...formData, image: formData.image.filter((_, idx) => idx !== i) });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const validate = (data) => {
        const errs = {};
        if (!data.name.trim()) errs.name = "Product name is required";
        if (!data.price || Number(data.price) <= 0) errs.price = "A valid price is required";
        if (!data.description.trim()) errs.description = "Description is required";
        if (data.image.length === 0) errs.image = "At least one image is required";
        if (data.stock === "" || Number(data.stock) < 0) errs.stock = "Stock quantity is required (0 or more)";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate(formData);
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        try {
            setIsSubmitting(true);
            const submitData = new FormData();
            submitData.append("title", formData.name);
            submitData.append("priceAmount", formData.price);
            submitData.append("priceCurrency", "INR");
            submitData.append("description", formData.description);
            submitData.append("category", formData.category);
            submitData.append("metal", formData.metal);
            submitData.append("stock", formData.stock);
            submitData.append("bestseller", formData.bestseller);
            formData.image.forEach(file => submitData.append("images", file));

            await handleCreateProduct(submitData);
            setFormData(INITIAL_FORM);
            navigate('/seller-products');
        } catch (error) {
            console.error("Error creating product:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputCls = "appearance-none block w-full px-4 py-3 border border-[#e0d6c8] placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#c9a96e] focus:border-[#c9a96e] transition-colors sm:text-sm rounded-none";
    const selectCls = "appearance-none block w-full px-4 py-3 border border-[#e0d6c8] text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#c9a96e] focus:border-[#c9a96e] transition-colors sm:text-sm rounded-none cursor-pointer";
    const labelCls = "block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider";

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

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Name */}
                    <div>
                        <label htmlFor="name" className={labelCls}>Product Name</label>
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={inputCls} placeholder="e.g. Gold-tone Layered Necklace" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Price + Stock row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="price" className={labelCls}>Price (₹ INR)</label>
                            <input id="price" name="price" type="number" min="1" value={formData.price} onChange={handleChange} className={inputCls} placeholder="0" />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>
                        <div>
                            <label htmlFor="stock" className={labelCls}>Stock Quantity</label>
                            <input id="stock" name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} className={inputCls} placeholder="0" />
                            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className={labelCls}>Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className={`${inputCls} resize-none`} placeholder="Describe your jewelry piece — material, style, occasion..." />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Category + Metal row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className={labelCls}>Category</label>
                            <select id="category" name="category" value={formData.category} onChange={handleChange} className={selectCls}>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="metal" className={labelCls}>Metal / Material</label>
                            <select id="metal" name="metal" value={formData.metal} onChange={handleChange} className={selectCls}>
                                {METALS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Bestseller toggle */}
                    <div>
                        <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer">
                            <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleChange} className="w-4 h-4 accent-[#c9a96e]" />
                            Mark as Bestseller
                        </label>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className={labelCls}>Product Images</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border border-[#e0d6c8] border-dashed bg-gray-50 hover:bg-[#faf7f2] transition-colors cursor-pointer rounded-none">
                            <div className="space-y-2 text-center">
                                <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600 justify-center">
                                    <label htmlFor="image" className="cursor-pointer font-medium text-[#c9a96e] hover:text-[#a8893e]">
                                        <span>Upload images</span>
                                        <input id="image" name="image" type="file" multiple accept="image/*" onChange={handleImageUpload} className="sr-only" />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">PNG, JPG up to 5MB</p>
                            </div>
                        </div>

                        {previews.length > 0 && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                                {previews.map((url, i) => (
                                    <div key={url} className="relative aspect-square border border-[#e0d6c8] group overflow-hidden bg-white">
                                        <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                        <button type="button" onClick={() => handleRemoveImage(i)} className="absolute top-1 right-1 bg-black/60 hover:bg-[#c9a96e] text-white rounded-full w-5 h-5 flex items-center justify-center transition-all">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <p className="text-gray-500 text-xs mt-2 italic">
                            Maximum 7 images. <span className="font-semibold text-[#c9a96e]">{formData.image.length}</span> selected.
                        </p>
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                    </div>

                    <div className="pt-2">
                        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold text-[#0a0a0a] bg-[#c9a96e] hover:bg-[#a8893e] focus:outline-none tracking-widest uppercase transition-all duration-300 disabled:opacity-60">
                            {isSubmitting ? "Creating..." : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;