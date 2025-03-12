import React from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ product, darkMode }) => {
  // Get the first image from the imageLinks array
  const mainImage = product.imageLinks && product.imageLinks.length > 0
    ? product.imageLinks[0]
    : 'https://via.placeholder.com/220x220?text=No+Image';

  // Extract numeric rating value
  const ratingValue = product.rating ? parseFloat(product.rating.trim()) : 0;

  return (
    <div className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-md shadow-sm overflow-hidden hover:shadow-md transition-all duration-300`}>
      {/* Product Image - Reduced height */}
      <div className="h-36 overflow-hidden relative">
        <img
          src={mainImage}
          alt={product.productName}
          className="w-full h-full object-cover"
        />
        {product.discount && (
          <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
            {product.discount}
          </div>
        )}
      </div>

      {/* Product Details - Reduced padding */}
      <div className="p-2">
        {/* Product Name - Reduced font size and height */}
        <h3 className={`text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-1 line-clamp-2 h-8`}>
          {product.productName}
        </h3>

        {/* Price Information - Smaller font sizes */}
        <div className="flex items-baseline mb-1">
          <span className={`text-sm font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'} mr-1`}>
            {product.currentPrice}
          </span>
          {product.originalPrice && (
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} line-through`}>
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* Rating and Sold Count - Smaller icons and text */}
        <div className={`flex items-center justify-between text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <Star size={12} className={ratingValue > 0 ? "text-yellow-400" : `${darkMode ? 'text-gray-600' : 'text-gray-300'}`} fill={ratingValue > 0 ? "#FACC15" : darkMode ? "#4B5563" : "#D1D5DB"} />
            <span className="ml-0.5">{ratingValue.toFixed(1)}</span>
          </div>
          <span className="text-xs">{product.soldCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;