import React, { useState } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { deleteProduct } from '../services/ProductService';

const ProductCard = ({ product, darkMode, onProductSelect, onDelete }) => {
  // const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get the first image from the imageLinks array
  const mainImage = product.imageLinks && product.imageLinks.length > 0
    ? product.imageLinks[0]
    : 'https://via.placeholder.com/220x220?text=No+Image';

  // Extract numeric rating value
  const ratingValue = product.rating ? parseFloat(product.rating.trim()) : 0;

  const handleCardClick = () => {
    onProductSelect(product.id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(product.id);
      if (onDelete) onDelete(product.id);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
      // Optionally show an error notification
    }
  };

  const cancelDelete = (e) => {
    if (e) e.stopPropagation();
    setShowConfirmation(false);
  };

  return (
    <div
      className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-md shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer relative`}
      onClick={handleCardClick}
    >
      {/* Delete Icon */}
      <div 
        className="absolute top-1 left-1 z-10 bg-red-500 text-white rounded-full p-1 cursor-pointer hover:bg-red-600 transition-colors"
        onClick={handleDeleteClick}
      >
        <Trash2 size={12} />
      </div>

      {/* Product Image - Further reduced height */}
      <div className="h-28 overflow-hidden relative">
        <img
          src={mainImage}
          alt={product.productName}
          className="w-full h-full object-cover"
        />
        {product.discount && (
          <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1 py-0.5 rounded-sm">
            {product.discount}
          </div>
        )}
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={cancelDelete}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Confirm Deletion</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Are you sure you want to delete "{product.productName}"?</p>
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-1.5">
        <h3 className={`text-[11px] font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-0.5 line-clamp-2 h-7`}>
          {product.productName}
        </h3>

        <div className="flex items-baseline mb-0.5">
          <span className={`text-xs font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'} mr-1`}>
            {product.currentPrice}
          </span>
          {product.originalPrice && (
            <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} line-through`}>
              {product.originalPrice}
            </span>
          )}
        </div>

        <div className={`flex items-center justify-between text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <Star size={10} className={ratingValue > 0 ? "text-yellow-400" : `${darkMode ? 'text-gray-600' : 'text-gray-300'}`} fill={ratingValue > 0 ? "#FACC15" : darkMode ? "#4B5563" : "#D1D5DB"} />
            <span className="ml-0.5">{ratingValue.toFixed(1)}</span>
          </div>
          <span className="text-[10px]">{product.soldCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;