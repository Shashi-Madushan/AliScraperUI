import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import { Outlet } from "react-router-dom";

const ProductsContent = ({ darkMode, onProductSelect, searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
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

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Products</h2>
               
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
                /* Products Grid - Increased number of columns */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} darkMode={darkMode} onProductSelect={() => onProductSelect(product)} />
                        ))
                    ) : (
                        <div className={`col-span-full text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            No products found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductsContent;