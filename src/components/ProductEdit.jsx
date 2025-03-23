import React, { useState, useEffect } from "react";
import { ArrowLeft, X, Trash2 } from "lucide-react";

function ProductEdit({ product, onBack, darkMode }) {
  const [formData, setFormData] = useState({
    productName: '',
    currentPrice: '',
    originalPrice: '',
    discount: '',
    rating: '',
    soldCount: '',
    imageLinks: [],
    specifications: {},
    description: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || '',
        currentPrice: product.currentPrice || '',
        originalPrice: product.originalPrice || '',
        discount: product.discount || '',
        rating: product.rating || '',
        soldCount: product.soldCount || '',
        imageLinks: product.imageLinks || [],
        specifications: product.specifications || {},
        description: product.description?.[0] || { text: '', images: [] } // Set both text and images
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSpecificationChange = (index, field, value) => {
    const specs = Object.entries(formData.specifications);
    if (field === 'name') {
      const oldKey = specs[index][0];
      const newSpecs = { ...formData.specifications };
      delete newSpecs[oldKey];
      newSpecs[value] = specs[index][1];
      setFormData(prev => ({
        ...prev,
        specifications: newSpecs
      }));
    } else {
      const key = specs[index][0];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [key]: value
        }
      }));
    }
  };

  const removeSpecification = (index) => {
    const specs = Object.entries(formData.specifications);
    const keyToRemove = specs[index][0];
    const newSpecs = { ...formData.specifications };
    delete newSpecs[keyToRemove];
    
    setFormData(prev => ({
      ...prev,
      specifications: newSpecs
    }));
  };

  const handleImageLinkChange = (index, value) => {
    const newImageLinks = [...formData.imageLinks];
    newImageLinks[index] = value;
    setFormData(prev => ({
      ...prev,
      imageLinks: newImageLinks
    }));
  };

  const removeImage = (index) => {
    const newImageLinks = formData.imageLinks.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      imageLinks: newImageLinks
    }));
  };

  const addImageLink = () => {
    setFormData(prev => ({
      ...prev,
      imageLinks: [...prev.imageLinks, '']
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [`New Spec ${Object.keys(prev.specifications).length + 1}`]: ''
      }
    }));
  };

  if (loading) return <div>Loading...</div>;
  
  if (error) return (
    <>
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2" />
          Back to Products
        </button>
        <h2 className="text-2xl font-semibold">Edit Product</h2>
      </div>
      <div>{error}</div>
    </>
  );

  return (
    <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2" />
          Back to Products
        </button>
        <h2 className="text-2xl font-semibold">Edit Product</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Top Left: Product Images */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Product Images</h3>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {formData.imageLinks.map((link, index) => (
              <div key={index} className="relative bg-gray-200 aspect-square max-h-40">
                <img 
                  src={link || "/api/placeholder/100/100"} 
                  alt={`Product Image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <button 
              onClick={addImageLink}
              className="bg-gray-200 flex items-center justify-center aspect-square max-h-24"
            >
              + Add Image
            </button>
          </div>
        </div>

        {/* Top Right: Product Details */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="productName">
              Product Name:
            </label>
            <input
              className={`shadow-sm border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'
              }`}
              id="productName"
              type="text"
              value={formData.productName}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="currentPrice">
              Current Price:
            </label>
            <input
              className={`shadow-sm border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'
              }`}
              id="currentPrice"
              type="text"
              value={formData.currentPrice}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="originalPrice">
              Original Price:
            </label>
            <input
              className={`shadow-sm border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'
              }`}
              id="originalPrice"
              type="text"
              value={formData.originalPrice}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="discount">
              Discount:
            </label>
            <input
              className={`shadow-sm border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'
              }`}
              id="discount"
              type="text"
              value={formData.discount}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="rating">
              Rating:
            </label>
            <input
              className={`shadow-sm border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'
              }`}
              id="rating"
              type="text"
              value={formData.rating}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="soldCount">
              Sold Count:
            </label>
            <input
              className={`shadow-sm border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'
              }`}
              id="soldCount"
              type="text"
              value={formData.soldCount}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Bottom Left: Specifications Table */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Specifications:</h3>
            <button 
              onClick={addSpecification}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Add Spec
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className={`grid grid-cols-[1fr_1fr_auto] ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="px-4 py-2 text-xs font-medium uppercase tracking-wider">Name</div>
                <div className="px-4 py-2 text-xs font-medium uppercase tracking-wider">Value</div>
                <div className="px-4 py-2 text-xs font-medium uppercase tracking-wider">Action</div>
              </div>
              <div className={`divide-y ${darkMode ? 'divide-gray-600' : 'divide-gray-200'}`}>
                {Object.entries(formData.specifications).map(([name, value], index) => (
                  <div key={index} className={`grid grid-cols-[1fr_1fr_auto] ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="px-4 py-2">
                      <input
                        className={`shadow-sm border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'
                        }`}
                        type="text"
                        value={name}
                        onChange={(e) => handleSpecificationChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="px-4 py-2">
                      <input
                        className={`shadow-sm border rounded w-full py-1 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'
                        }`}
                        type="text"
                        value={value}
                        onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                      />
                    </div>
                    <div className="px-4 py-2 flex items-center">
                      <button 
                        onClick={() => removeSpecification(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right: Description and Description Images */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Description:</h3>
          <textarea
            className={`shadow-sm border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${
              darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'
            }`}
            id="description"
            rows="4"
            value={formData.description.text || ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: {
                  ...prev.description,
                  text: e.target.value,
                },
              }))
            }
          />

          <h4 className="text-md font-medium mb-2">Description Images:</h4>
          <div className="grid grid-cols-4 gap-2">
            {formData.description.images?.map((link, index) => (
              <div key={`desc-${index}`} className="relative bg-gray-200 aspect-square max-h-35">
                <img
                  src={link || "/api/placeholder/100/100"}
                  alt={`Description Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      description: {
                        ...prev.description,
                        images: prev.description.images.filter((_, i) => i !== index),
                      },
                    }))
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
          Delete product
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
          Add to Store
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          Update product
        </button>
      </div>
    </div>
  );
}

export default ProductEdit;
