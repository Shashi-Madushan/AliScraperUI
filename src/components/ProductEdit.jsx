import React, { useState, useEffect } from "react";
import { ArrowLeft, X, Trash2, Code, AlertCircle, Store } from "lucide-react";
import { apiClient } from "../services/authService";
import {updateProduct} from "../services/productService"

function ProductEdit({ product, onBack, darkMode }) {
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    currentPrice: "",
    originalPrice: "",
    discount: "",
    rating: "",
    soldCount: "",
    imageLinks: [],
    specifications: {},
    description: { text: "", images: [] },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // Add new state variables for store functionality
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeLoading, setStoreLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [storeImportLoading, setStoreImportLoading] = useState(false);

  useEffect(() => {
    if (product) {
      try {
        setFormData({
          id: product.id || "",
          productName: product.productName || "",
          currentPrice: product.currentPrice || "",
          originalPrice: product.originalPrice || "",
          discount: product.discount || "",
          rating: product.rating || "",
          soldCount: product.soldCount || "",
          imageLinks: product.imageLinks || [],
          specifications: product.specifications || {},
          description: product.description?.[0] || { text: "", images: [] },
        });
      } catch (err) {
        console.error("Error setting form data:", err);
        setError("Failed to load product data correctly");
      }
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error for this field if it exists
    if (formErrors[id]) {
      setFormErrors((prev) => ({
        ...prev,
        [id]: null,
      }));
    }
  };

  const handleSpecificationChange = (index, field, value) => {
    try {
      const specs = Object.entries(formData.specifications);
      if (field === "name") {
        const oldKey = specs[index][0];
        const newSpecs = { ...formData.specifications };
        delete newSpecs[oldKey];
        newSpecs[value] = specs[index][1];
        setFormData((prev) => ({
          ...prev,
          specifications: newSpecs,
        }));
      } else {
        const key = specs[index][0];
        setFormData((prev) => ({
          ...prev,
          specifications: {
            ...prev.specifications,
            [key]: value,
          },
        }));
      }
    } catch (err) {
      console.error("Error updating specification:", err);
      setError("Failed to update specification");
    }
  };

  const removeSpecification = (index) => {
    try {
      const specs = Object.entries(formData.specifications);
      if (index < 0 || index >= specs.length) return;

      const keyToRemove = specs[index][0];
      const newSpecs = { ...formData.specifications };
      delete newSpecs[keyToRemove];

      setFormData((prev) => ({
        ...prev,
        specifications: newSpecs,
      }));
    } catch (err) {
      console.error("Error removing specification:", err);
      setError("Failed to remove specification");
    }
  };

  const removeImage = (index) => {
    try {
      if (index < 0 || index >= formData.imageLinks.length) return;

      const newImageLinks = formData.imageLinks.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        imageLinks: newImageLinks,
      }));
    } catch (err) {
      console.error("Error removing image:", err);
      setError("Failed to remove image");
    }
  };

  const removeDescriptionImage = (index) => {
    try {
      if (index < 0 || index >= (formData.description.images?.length || 0))
        return;

      setFormData((prev) => ({
        ...prev,
        description: {
          ...prev.description,
          images: prev.description.images.filter((_, i) => i !== index),
        },
      }));
    } catch (err) {
      console.error("Error removing description image:", err);
      setError("Failed to remove description image");
    }
  };

  const addSpecification = () => {
    try {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [`New Spec ${Object.keys(prev.specifications).length + 1}`]: "",
        },
      }));
    } catch (err) {
      console.error("Error adding specification:", err);
      setError("Failed to add specification");
    }
  };

  const handleGenerateDescription = async () => {
    if (!aiPrompt.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        aiPrompt: "Please enter a prompt for the AI",
      }));
      return;
    }

    setIsGenerating(true);
    setFormErrors((prev) => ({ ...prev, aiPrompt: null }));

    try {
      const response = await apiClient.post(
        "/description/generateDescription",
        {
          userPrompt: aiPrompt,
          productData: formData.specifications,
          productName:formData.productName,
        }
      );

      const generated = response.data.description;
      setGeneratedDescription(generated);
    } catch (err) {
      console.error("Error generating description:", err);
      setError("Failed to generate description");
    } finally {
      setIsGenerating(false);
    }
  };

  const applyGeneratedDescription = () => {
    if (generatedDescription) {
      try {
        setFormData((prev) => ({
          ...prev,
          description: {
            ...prev.description,
            text: generatedDescription,
          },
        }));
      } catch (err) {
        console.error("Error applying generated description:", err);
        setError("Failed to apply generated description");
      }
    }
  };

  const toggleJsonModal = () => {
    setShowJsonModal(!showJsonModal);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.productName.trim()) {
      errors.productName = "Product name is required";
    }

    if (!formData.currentPrice) {
      errors.currentPrice = "Current price is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const prepareProductData = () => {
    // Create a deep copy to ensure we're not carrying any problematic references
    const productData = JSON.parse(JSON.stringify({
      id:formData.id,
      productName: formData.productName,
      currentPrice: formData.currentPrice,
      originalPrice: formData.originalPrice,
      discount: formData.discount,
      rating: formData.rating,
      soldCount: formData.soldCount,
      imageLinks: formData.imageLinks || [],
      specifications: formData.specifications || {},
      description: [formData.description] || [{ text: "", images: [] }],
    }));
    
    return productData;
  };

  const handleUpdateProduct = () => {
    if (!validateForm()) return;

    // Here you would implement the actual update logic
    console.log("Updating product with data:", formData);
    setLoading(true);
    updateProduct(product.id, formData)
      .then(() => {
        // Handle success
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to update product: " + err.message);
        setLoading(false);
      });
  };

  const fetchStores = async () => {
    setStoreLoading(true);
    try {
      const response = await apiClient.get('/stores');
      
      console.log('Stores data received:', response.data);
      
      const storesData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.stores || response.data.data || []);
      
      setStores(storesData);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setError("Failed to fetch stores");
    } finally {
      setStoreLoading(false);
    }
  };

  const handleAddToStore = () => {
    setShowStoreModal(true);
    fetchStores();
  };

  const handleStoreSelect = (storeId) => {
    setSelectedStore(storeId);
  };

  const handleImportConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleImportToStore = async () => {
    if (!selectedStore) return;
    
    setStoreImportLoading(true);
    setShowStoreModal(false);
    setShowConfirmation(false);
    
    try {
      const productData = prepareProductData();
    
      await apiClient.post(`/woocommerce/import-product?storeId=${selectedStore}`, 
        productData
      );
      
      // Reset states after successful import
      setSelectedStore(null);
      setShowConfirmation(false);
    } catch (err) {
      console.error("Error importing product to store:", err);
      setError(`Failed to import product to store: ${err.response?.data?.message || err.message}`);
    } finally {
      setStoreImportLoading(false);
    }
  };

  const closeStoreModal = () => {
    setShowStoreModal(false);
    setSelectedStore(null);
    setShowConfirmation(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div
        className={`p-4 rounded-lg shadow-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="flex items-center">
            <ArrowLeft className="mr-2" />
            Back to Products
          </button>
          <h2 className="text-2xl font-semibold">Edit Product</h2>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-start">
          <AlertCircle className="flex-shrink-0 mr-2" />
          <span>{error}</span>
        </div>
        <button
          onClick={() => setError(null)}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2" />
          Back to Products
        </button>
        <h2 className="text-2xl font-semibold">Edit Product</h2>
        <button
          onClick={toggleJsonModal}
          className={`flex items-center py-1 px-3 rounded ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          <Code size={16} className="mr-1" />
          View JSON
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDE: Product Information */}
        <div className="space-y-4">
          {/* Product Images */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Product Images</h3>
            {formData.imageLinks.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {formData.imageLinks.map((link, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-200 aspect-square max-h-30"
                  >
                    <img
                      src={link || "/api/placeholder/100/100"}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/100/100";
                      }}
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                      aria-label="Remove image"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400">
                No product images available
              </div>
            )}
          </div>
          {/* Product Details */}
          <div className="space-y-2">
            <div className="mb-2">
              <label
                className="block text-xs font-medium mb-1"
                htmlFor="productName"
              >
                Product Name:{" "}
                {formErrors.productName && (
                  <span className="text-red-500 text-xs ml-1">*</span>
                )}
              </label>
              <input
                className={`shadow-sm border rounded w-full py-1 px-2 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-700 border-gray-300"
                } ${formErrors.productName ? "border-red-500" : ""}`}
                id="productName"
                type="text"
                value={formData.productName}
                onChange={handleInputChange}
              />
              {formErrors.productName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.productName}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="mb-2">
                <label
                  className="block text-xs font-medium mb-1"
                  htmlFor="currentPrice"
                >
                  Current Price:{" "}
                  {formErrors.currentPrice && (
                    <span className="text-red-500 text-xs ml-1">*</span>
                  )}
                </label>
                <input
                  className={`shadow-sm border rounded w-full py-1 px-2 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-700 border-gray-300"
                  } ${formErrors.currentPrice ? "border-red-500" : ""}`}
                  id="currentPrice"
                  type="text"
                  value={formData.currentPrice}
                  onChange={handleInputChange}
                />
                {formErrors.currentPrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.currentPrice}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  className="block text-xs font-medium mb-1"
                  htmlFor="originalPrice"
                >
                  Original Price:
                </label>
                <input
                  className={`shadow-sm border rounded w-full py-1 px-2 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  id="originalPrice"
                  type="text"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="mb-2">
                <label
                  className="block text-xs font-medium mb-1"
                  htmlFor="discount"
                >
                  Discount:
                </label>
                <input
                  className={`shadow-sm border rounded w-full py-1 px-2 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  id="discount"
                  type="text"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <label
                  className="block text-xs font-medium mb-1"
                  htmlFor="rating"
                >
                  Rating:
                </label>
                <input
                  className={`shadow-sm border rounded w-full py-1 px-2 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  id="rating"
                  type="text"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <label
                  className="block text-xs font-medium mb-1"
                  htmlFor="soldCount"
                >
                  Sold Count:
                </label>
                <input
                  className={`shadow-sm border rounded w-full py-1 px-2 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  id="soldCount"
                  type="text"
                  value={formData.soldCount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          {/* Specifications Table */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold">Specifications:</h3>
              <button
                onClick={addSpecification}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
              >
                Add Spec
              </button>
            </div>
            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              {Object.keys(formData.specifications).length > 0 ? (
                <div
                  className={`rounded-lg overflow-hidden border ${
                    darkMode ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`divide-y ${
                      darkMode ? "divide-gray-600" : "divide-gray-200"
                    }`}
                  >
                    <div
                      className={`grid grid-cols-[1fr_1fr_auto] ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <div className="px-2 py-1 text-xs font-medium uppercase tracking-wider">
                        Name
                      </div>
                      <div className="px-2 py-1 text-xs font-medium uppercase tracking-wider">
                        Value
                      </div>
                      <div className="px-2 py-1 text-xs font-medium uppercase tracking-wider">
                        Action
                      </div>
                    </div>
                    {Object.entries(formData.specifications).map(
                      ([name, value], index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-[1fr_1fr_auto] ${
                            darkMode ? "bg-gray-800" : "bg-white"
                          }`}
                        >
                          <div className="px-2 py-1">
                            <input
                              className={`shadow-sm border rounded w-full py-0.5 px-1 text-xs leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                darkMode
                                  ? "bg-gray-700 text-white border-gray-600"
                                  : "bg-white text-gray-700 border-gray-300"
                              }`}
                              type="text"
                              value={name}
                              onChange={(e) =>
                                handleSpecificationChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="px-2 py-1">
                            <input
                              className={`shadow-sm border rounded w-full py-0.5 px-1 text-xs leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                darkMode
                                  ? "bg-gray-700 text-white border-gray-600"
                                  : "bg-white text-gray-700 border-gray-300"
                              }`}
                              type="text"
                              value={value}
                              onChange={(e) =>
                                handleSpecificationChange(
                                  index,
                                  "value",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="px-2 py-1 flex items-center">
                            <button
                              onClick={() => removeSpecification(index)}
                              className="text-red-500 hover:text-red-700"
                              aria-label="Remove specification"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center text-gray-500 dark:text-gray-400 text-sm">
                  No specifications added yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Description & AI Generator */}
        <div className="space-y-6 md:col-span-2">
          {/* AI Description Generator */}
          <div
            className={`border rounded-lg p-4 ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-3">
              AI Description Generator
            </h3>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="aiPrompt"
              >
                Prompt for AI:{" "}
                {formErrors.aiPrompt && (
                  <span className="text-red-500 text-xs ml-1">*</span>
                )}
              </label>
              <textarea
                id="aiPrompt"
                className={`shadow-sm border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-700 border-gray-300"
                } ${formErrors.aiPrompt ? "border-red-500" : ""}`}
                rows="3"
                placeholder="Enter details to guide AI description generation (e.g., target audience, key features to highlight)"
                value={aiPrompt}
                onChange={(e) => {
                  setAiPrompt(e.target.value);
                  if (formErrors.aiPrompt) {
                    setFormErrors((prev) => ({ ...prev, aiPrompt: null }));
                  }
                }}
              />
              {formErrors.aiPrompt && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.aiPrompt}
                </p>
              )}
            </div>
            <div className="flex mb-4">
              <button
                className={`bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow mr-2 ${
                  isGenerating || !aiPrompt.trim()
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleGenerateDescription}
                disabled={isGenerating || !aiPrompt.trim()}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                    Generating...
                  </span>
                ) : (
                  "Generate Description"
                )}
              </button>
              <button
                className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !generatedDescription ? "opacity-60 cursor-not-allowed" : ""
                }`}
                onClick={applyGeneratedDescription}
                disabled={!generatedDescription}
              >
                Apply
              </button>
            </div>
            {generatedDescription && (
              <div
                className={`border rounded p-3 max-h-48 overflow-y-auto ${
                  darkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <h4 className="text-sm font-medium mb-1">
                  Generated Description:
                </h4>
                <p className="text-sm whitespace-pre-line">
                  {generatedDescription}
                </p>
              </div>
            )}
          </div>

          {/* Manual Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description:</h3>
            <textarea
              className={`shadow-sm border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              id="description"
              rows="15"
              value={formData.description.text || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: {
                    ...prev.description,
                    text: e.target.value,
                  },
                }))
              }
              placeholder="Enter product description here"
            />
          </div>

          {/* Description Images */}
          <div>
            <h4 className="text-md font-medium mb-2">Description Images:</h4>
            {formData.description.images?.length > 0 ? (
              <div className="grid grid-cols-5 gap-2">
                {formData.description.images.map((link, index) => (
                  <div
                    key={`desc-${index}`}
                    className="relative bg-gray-200 aspect-square max-h-24"
                  >
                    <img
                      src={link || "/api/placeholder/100/100"}
                      alt={`Description ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/100/100";
                      }}
                    />
                    <button
                      onClick={() => removeDescriptionImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                      aria-label="Remove description image"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center text-gray-500 dark:text-gray-400 text-sm">
                No description images available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
          onClick={handleAddToStore}
        >
          <Store size={18} className="mr-2" />
          Add to Store
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleUpdateProduct}
        >
          Update product
        </button>
      </div>

      {/* JSON Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`relative w-3/4 max-w-4xl max-h-[80vh] overflow-auto rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            } p-6`}
          >
            <button
              onClick={toggleJsonModal}
              className={`absolute top-4 right-4 ${
                darkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Product Data (JSON)</h3>
            <div
              className={`overflow-auto p-4 rounded ${
                darkMode ? "bg-gray-900" : "bg-gray-100"
              }`}
            >
              <pre className="text-sm whitespace-pre-wrap break-words font-mono">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={toggleJsonModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Store Selection Modal */}
      {showStoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div
            className={`relative w-96 max-h-[80vh] overflow-auto rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            } p-6 border ${darkMode ? "border-gray-600" : "border-gray-200"}`}
          >
            <button
              onClick={closeStoreModal}
              className={`absolute top-4 right-4 ${
                darkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Select Store</h3>
            {storeLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : showConfirmation ? (
              <div>
                <div className="mb-4 p-4 bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-lg">
                  <p>Are you sure you want to import this product to the selected store?</p>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className={`py-2 px-4 rounded font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                    disabled={storeImportLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImportToStore}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                    disabled={storeImportLoading}
                  >
                    {storeImportLoading ? (
                      <span className="flex items-center">
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                        Importing...
                      </span>
                    ) : (
                      "Confirm Import"
                    )}
                  </button>
                </div>
              </div>
            ) : stores && stores.length > 0 ? (
              <div>
                <div className="mb-4 max-h-60 overflow-y-auto">
                  <div className={`rounded-lg overflow-hidden border ${
                    darkMode ? "border-gray-600" : "border-gray-200"
                  }`}>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {stores.map((store) => (
                        <div
                          key={store.id || store._id}
                          className={`p-3 flex items-center cursor-pointer ${
                            selectedStore === (store.id || store._id)
                              ? darkMode 
                                ? "bg-blue-900 bg-opacity-50" 
                                : "bg-blue-50" 
                              : darkMode 
                                ? "hover:bg-gray-700" 
                                : "hover:bg-gray-50"
                          }`}
                          onClick={() => handleStoreSelect(store.id || store._id)}
                        >
                          <input
                            type="radio"
                            id={`store-${store.id || store._id}`}
                            name="store"
                            checked={selectedStore === (store.id || store._id)}
                            onChange={() => handleStoreSelect(store.id || store._id)}
                            className="mr-3 h-4 w-4 text-blue-600"
                          />
                          <label
                            htmlFor={`store-${store.id || store._id}`}
                            className="flex-grow cursor-pointer"
                          >
                            <div className="font-medium">{store.storeName || store.name || store.store_name || "Unnamed Store"}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {store.storeUrl || store.url || store.website || store.store_url || "No URL provided"}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={closeStoreModal}
                    className={`py-2 px-4 rounded font-medium ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleImportConfirmation}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded ${
                      !selectedStore ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!selectedStore}
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  {stores && stores.length === 0 
                    ? "No stores available" 
                    : "Failed to load stores. Please try again."}
                </p>
                {!stores && (
                  <button
                    onClick={fetchStores}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Retry
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductEdit;
