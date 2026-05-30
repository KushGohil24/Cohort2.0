import React, { useState, useEffect } from "react";
import { useProduct } from "../hook/useProduct";
import Title from "../../Shared/Components/Title";
import { useNavigate, Link } from "react-router-dom";

// Helper icons
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

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
    const { handleCreateProduct, handleAddVariant } = useProduct();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [previews, setPreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Variant states
    const [variants, setVariants] = useState([]);
    const [isAddingVariant, setIsAddingVariant] = useState(false);
    const [attributeInputs, setAttributeInputs] = useState([ { key: '', value: '' } ]);
    const [newVariant, setNewVariant] = useState({
        images: [],
        stock: 0,
        attributes: {},
        price: { amount: '', currency: 'INR' }
    });

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

    // Handlers for New Variant Form
    const handleAddNewVariant = () => {
        const hasValidAttribute = attributeInputs.some(attr => attr.key.trim() && attr.value.trim());
        if (!hasValidAttribute) {
            alert("At least one valid attribute is required.");
            return;
        }

        const cleanImages = newVariant.images.map(img => ({ url: img.previewUrl, file: img.file }));
        const cleanAttributes = { ...newVariant.attributes };

        const variantToSave = {
            images: cleanImages,
            stock: Number(newVariant.stock),
            attributes: cleanAttributes,
            price: newVariant.price.amount ? { amount: Number(newVariant.price.amount), currency: newVariant.price.currency } : null
        };

        setVariants([...variants, variantToSave]);
        setIsAddingVariant(false);

        setAttributeInputs([ { key: '', value: '' } ]);
        setNewVariant({
            images: [],
            stock: 0,
            attributes: {},
            price: { amount: '', currency: 'INR' }
        });
    };

    const handleAddAttribute = () => {
        setAttributeInputs(prev => [ ...prev, { key: '', value: '' } ]);
    };

    const handleAttributeChange = (index, field, value) => {
        const updatedInputs = [ ...attributeInputs ];
        updatedInputs[ index ][ field ] = value;
        setAttributeInputs(updatedInputs);

        const newAttrsObj = {};
        updatedInputs.forEach(attr => {
            if (attr.key.trim() !== '') {
                newAttrsObj[ attr.key.trim() ] = attr.value;
            }
        });
        setNewVariant(prev => ({ ...prev, attributes: newAttrsObj }));
    };

    const handleRemoveAttribute = (index) => {
        const updatedInputs = attributeInputs.filter((_, i) => i !== index);
        setAttributeInputs(updatedInputs);

        const newAttrsObj = {};
        updatedInputs.forEach(attr => {
            if (attr.key.trim() !== '') {
                newAttrsObj[ attr.key.trim() ] = attr.value;
            }
        });
        setNewVariant(prev => ({ ...prev, attributes: newAttrsObj }));
    };

    const handleVariantImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const availableSlots = 7 - newVariant.images.length;
        const filesToAdd = files.slice(0, availableSlots);

        if (files.length > availableSlots) {
            alert(`You can only upload up to 7 images. ${filesToAdd.length} added.`);
        }

        const newImageObjects = filesToAdd.map(file => ({
            file,
            previewUrl: URL.createObjectURL(file)
        }));

        setNewVariant(prev => ({
            ...prev,
            images: [ ...prev.images, ...newImageObjects ]
        }));

        e.target.value = '';
    };

    const handleRemoveVariantImage = (index) => {
        const imageToRemove = newVariant.images[ index ];
        if (imageToRemove?.previewUrl) {
            URL.revokeObjectURL(imageToRemove.previewUrl);
        }
        const updatedImages = newVariant.images.filter((_, i) => i !== index);
        setNewVariant(prev => ({ ...prev, images: updatedImages }));
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

            // Create base product
            const product = await handleCreateProduct(submitData);

            // If variants exist, upload them
            if (product && product._id && variants.length > 0) {
                for (const variant of variants) {
                    const variantData = new FormData();
                    variantData.append("stock", variant.stock);
                    if (variant.price?.amount) {
                        variantData.append("priceAmount", variant.price.amount);
                        variantData.append("priceCurrency", variant.price.currency);
                    }
                    variantData.append("attributes", JSON.stringify(variant.attributes));
                    variant.images.forEach(img => variantData.append("images", img.file));

                    await handleAddVariant(product._id, variantData);
                }
            }

            setFormData(INITIAL_FORM);
            setVariants([]);
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
                            <label htmlFor="price" className={labelCls}>Base Price (₹ INR)</label>
                            <input id="price" name="price" type="number" min="1" value={formData.price} onChange={handleChange} className={inputCls} placeholder="0" />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>
                        <div>
                            <label htmlFor="stock" className={labelCls}>Initial Stock (Default Variant)</label>
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

                    <hr className="my-8 border-[#e0d6c8]" />

                    {/* Variants Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-serif text-xl text-[#0a0a0a]">Product Variants (Optional)</h3>
                            {!isAddingVariant && (
                                <button
                                    type="button"
                                    onClick={() => setIsAddingVariant(true)}
                                    className="text-sm font-semibold text-[#c9a96e] hover:text-[#a8893e] uppercase tracking-wider flex items-center gap-1"
                                >
                                    <PlusIcon /> Add Variant
                                </button>
                            )}
                        </div>

                        {variants.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                {variants.map((v, i) => (
                                    <div key={i} className="border border-[#e0d6c8] p-4 bg-gray-50 flex gap-4">
                                        <div className="w-16 h-16 bg-white border border-[#e0d6c8]">
                                            {v.images.length > 0 && <img src={v.images[0].url} alt="Variant" className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <div className="flex flex-wrap gap-1 mb-1">
                                                {Object.entries(v.attributes).map(([key, val]) => (
                                                    <span key={key} className="bg-white border border-[#e0d6c8] px-2 py-0.5 text-xs text-gray-700">
                                                        {key}: {val}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600">Stock: {v.stock}</p>
                                            {v.price && <p className="text-sm text-[#c9a96e]">₹{v.price.amount}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {isAddingVariant && (
                            <div className="bg-gray-50 p-6 border border-[#e0d6c8]">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-serif text-lg">New Variant</h4>
                                    <button type="button" onClick={() => setIsAddingVariant(false)} className="text-gray-500 hover:text-gray-800 text-xs uppercase tracking-wider">Cancel</button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Attributes (e.g. Size, Color) *</label>
                                        <div className="space-y-2">
                                            {attributeInputs.map((attr, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <input type="text" placeholder="Key (e.g. Size)" value={attr.key} onChange={(e) => handleAttributeChange(index, 'key', e.target.value)} className={inputCls} />
                                                    <input type="text" placeholder="Value (e.g. M)" value={attr.value} onChange={(e) => handleAttributeChange(index, 'value', e.target.value)} className={inputCls} />
                                                    {attributeInputs.length > 1 && (
                                                        <button type="button" onClick={() => handleRemoveAttribute(index)} className="px-3 text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200">
                                                            <TrashIcon />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" onClick={handleAddAttribute} className="mt-2 text-xs font-semibold text-[#c9a96e] hover:text-[#a8893e] uppercase tracking-wider flex items-center gap-1">
                                            <PlusIcon /> Add Attribute
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Stock</label>
                                            <input type="number" value={newVariant.stock} onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })} className={inputCls} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Price (Optional)</label>
                                            <input type="number" placeholder="Uses base price if empty" value={newVariant.price.amount} onChange={(e) => setNewVariant({ ...newVariant, price: { ...newVariant.price, amount: e.target.value } })} className={inputCls} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Images (Max 7)</label>
                                        <input type="file" multiple accept="image/*" onChange={handleVariantImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#c9a96e] file:text-white hover:file:bg-[#a8893e] cursor-pointer" />
                                        {newVariant.images.length > 0 && (
                                            <div className="flex gap-2 mt-2">
                                                {newVariant.images.map((img, i) => (
                                                    <div key={i} className="relative w-16 h-16 border border-[#e0d6c8]">
                                                        <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                        <button type="button" onClick={() => handleRemoveVariantImage(i)} className="absolute top-0.5 right-0.5 bg-black/50 text-white rounded-full p-0.5"><TrashIcon /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button type="button" onClick={handleAddNewVariant} className="mt-4 bg-[#0a0a0a] text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors">
                                        Save Variant
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-6">
                        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold text-[#0a0a0a] bg-[#c9a96e] hover:bg-[#a8893e] focus:outline-none tracking-widest uppercase transition-all duration-300 disabled:opacity-60">
                            {isSubmitting ? "Creating Product..." : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;