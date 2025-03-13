import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductEdit from "./ProductEdit";


const ProductCard = ({ product, darkMode }) => {
  const navigate = useNavigate();

  // Get the first image from the imageLinks array
  const mainImage = product.imageLinks && product.imageLinks.length > 0
    ? product.imageLinks[0]
    : 'https://via.placeholder.com/220x220?text=No+Image';

  // Extract numeric rating value
  const ratingValue = product.rating ? parseFloat(product.rating.trim()) : 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}/edit`);
  };

  return (
    <div
      className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-md shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer`}
      onClick={handleCardClick}
    >
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