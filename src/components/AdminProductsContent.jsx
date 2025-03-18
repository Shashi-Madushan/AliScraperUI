
import React, { useEffect, useState } from 'react';
import { Package, Trash2, ExternalLink, Search } from 'lucide-react';
import { getAllProducts, deleteProduct } from '../services/adminService';

const AdminProductsContent = ({ darkMode, searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getAllProducts();
            setProducts(data || []);
            setError(null);
        } catch (err) {
            setError('Failed to load products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        if (confirmDelete === productId) {
            try {
                await deleteProduct(productId);
                setProducts(products.filter(product => product.id !== productId));
                setConfirmDelete(null);
            } catch (err) {
                setError('Failed to delete product');
                console.error(err);
            }
        } else {
            setConfirmDelete(productId);
            setTimeout(() => setConfirmDelete(null), 3000);
        }
    };

    const filteredProducts = products.filter(product => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return (
            product.productName?.toLowerCase().includes(search) ||
            product.specifications?.Category?.toLowerCase().includes(search) ||
            product.userName?.toLowerCase().includes(search)
        );
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900' : 'bg-red-100'} text-center`}>
                <p className={darkMode ? 'text-red-200' : 'text-red-700'}>{error}</p>
                <button 
                    className={`mt-2 px-4 py-2 rounded ${darkMode ? 'bg-red-800 hover:bg-red-700' : 'bg-red-200 hover:bg-red-300'}`}
                    onClick={fetchProducts}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Products Management
                </h1>
                
                <div className={`relative ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search size={16} />
                    </div>
                    <input
                        type="text"
                        className={`pl-10 pr-4 py-2 rounded-lg ${
                            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                        } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className={`p-6 text-center rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-500'}>
                        {searchTerm ? 'No products match your search criteria.' : 'No products found in the system.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredProducts.map((product) => (
                        <div 
                            key={product.id}
                            className={`rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}
                        >
                            <div className="flex p-4">
                                <div className="flex-shrink-0 w-48 h-48 mr-4">
                                    {product.imageLinks && product.imageLinks.length > 0 ? (
                                        <img 
                                            src={product.imageLinks[0]} 
                                            alt={product.productName}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}>
                                            <Package size={48} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                            {product.productName}
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 rounded text-sm ${
                                                darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {product.currentPrice}
                                            </span>
                                            {product.rating && (
                                                <span className={`px-2 py-1 rounded text-sm ${
                                                    darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                                                }`}>
                                                    ★ {product.rating}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <p>Product ID: {product.productID}</p>
                                        <p>Category: {product.specifications?.Category || 'N/A'}</p>
                                        <p>Sold: {product.soldCount || 'N/A'}</p>
                                        <p>Owner: {product.userName}</p>
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className={`inline-flex items-center px-3 py-1 rounded text-sm ${
                                                confirmDelete === product.id
                                                    ? darkMode ? 'bg-red-600 text-red-100' : 'bg-red-500 text-white'
                                                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-red-800' : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                                            }`}
                                        >
                                            <Trash2 size={14} className="mr-1" />
                                            {confirmDelete === product.id ? 'Confirm Delete' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminProductsContent;
