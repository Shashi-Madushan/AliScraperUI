import { useEffect, useState } from "react";
import { getProducts } from "../services/ProductService";
import ProductCard from "./ProductCard";
import { Grid, List } from "lucide-react";

const ProductsContent = ({ darkMode, onProductSelect, searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [viewMode, setViewMode] = useState("grid");


    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
            setError("");
        } catch (err) {
            setError("Failed to fetch products. Please try again.");
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(product =>
                product.productName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [searchTerm, products]);
    
    const toggleViewMode = (mode) => {
        setViewMode(mode);
    };

    const renderListItem = (product) => (
        <div 
            key={product.id}
            className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-md shadow-sm p-3 mb-2 flex items-center justify-between hover:shadow-md transition-all duration-300 cursor-pointer`}
        >
            {/* Product Details */}
            <div 
                className="flex items-center flex-grow"
                onClick={() => onProductSelect(product)}
            >
                {/* Product Image */}
                <div className="h-16 w-16 overflow-hidden relative flex-shrink-0">
                    <img
                        src={product.imageLinks && product.imageLinks.length > 0 ? product.imageLinks[0] : 'https://via.placeholder.com/220x220?text=No+Image'}
                        alt={product.productName}
                        className="w-full h-full object-cover rounded"
                    />
          
                </div>
        
                <div className="ml-3 flex-grow">
                    <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-1 line-clamp-1`}>
                        {product.productName}
                    </h3>
        
                    <div className="flex items-baseline mb-1">
                        <span className={`text-sm font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'} mr-2`}>
                            {product.currentPrice}
                        </span>
                        {product.originalPrice && (
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} line-through`}>
                                {product.originalPrice}
                            </span>
                        )}
                    </div>
        
                    <div className={`flex items-center text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div className="flex items-center">
                            <span className="mr-2">Rating: {parseFloat(product.rating || 0).toFixed(1)}</span>
                            <span>Sold: {product.soldCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Button */}
            <button
                onClick={async () => {
                    await fetchProducts(); // Refresh products after deletion
                }}
                className={`ml-3 px-3 py-1 text-sm font-medium rounded ${darkMode ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-red-500 text-white hover:bg-red-400'}`}
            >
                Delete
            </button>
        </div>
    );
    
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Products</h2>
                
                {/* View Toggle Buttons */}
                <div className={`flex space-x-2 p-1 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <button 
                        onClick={() => toggleViewMode('grid')}
                        className={`p-1.5 rounded ${viewMode === 'grid' 
                            ? (darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800') 
                            : (darkMode ? 'text-gray-300' : 'text-gray-600')}`}
                        aria-label="Grid view"
                    >
                        <Grid size={18} />
                    </button>
                    <button 
                        onClick={() => toggleViewMode('list')}
                        className={`p-1.5 rounded ${viewMode === 'list' 
                            ? (darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800') 
                            : (darkMode ? 'text-gray-300' : 'text-gray-600')}`}
                        aria-label="List view"
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>
    
            {/* Error Message */}
            {error && (
                <div className={`${darkMode ? 'bg-red-900 border-red-700 text-red-100' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-3 mb-4`} role="alert">
                    <p>{error}</p>
                </div>
            )}
    
            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <div className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-500'}`}></div>
                </div>
            ) : (
                viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.id}
                                product={product} 
                                darkMode={darkMode} 
                                onProductSelect={() => onProductSelect(product)} 
                                onDelete={fetchProducts}  />
                            ))
                        ) : (
                            <div className={`col-span-full text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                No products found.
                            </div>
                        )}
                    </div>
                ) : (
                    /* List View */
                    <div className="flex flex-col">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => renderListItem(product))
                        ) : (
                            <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                No products found.
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default ProductsContent;
