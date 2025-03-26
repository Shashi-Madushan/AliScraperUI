import React, { useState, useEffect } from 'react';
import { Plus, Store, Edit2, Trash2, RefreshCw, Loader } from 'lucide-react';
import {apiClient} from '../services/authService'

const StoresContent = ({ darkMode }) => {
    const [stores, setStores] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        storeName: '',
        storeUrl: '',
        platformType: 'WOOCOMMERCE',
        apiKey: '',
        apiSecret: '',
        accessToken: '',
        storeIdentifier: ''
    });

    useEffect(() => {
        fetchStores();
       
    }, []);

    const fetchStores = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/stores');
            setStores(response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedStore) {
                await apiClient.put(`/stores/${selectedStore.id}`, formData);
            } else {
                await apiClient.post('/stores', formData);
            }
            setIsModalOpen(false);
            setSelectedStore(null);
            resetForm();
            fetchStores();
        } catch (error) {
            console.error('Error saving store:', error);
        }
    };

    const handleDelete = async (storeId) => {
        try {
            await apiClient.delete(`/stores/${storeId}`);
            setIsDeleteModalOpen(false);
            fetchStores();
        } catch (error) {
            console.error('Error deleting store:', error);
        }
    };

    const verifyConnection = async (storeId) => {
        try {
            const response = await apiClient.get(`/stores/${storeId}/verify`);
            // Update the store status in the UI
            const updatedStores = stores.map(store => 
                store.id === storeId ? { ...store, connected: response.data } : store
            );
            setStores(updatedStores);
        } catch (error) {
            console.error('Error verifying store connection:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            storeName: '',
            storeUrl: '',
            platformType: 'WOOCOMMERCE',
            apiKey: '',
            apiSecret: '',
            accessToken: '',
            storeIdentifier: ''
        });
    };


    return (
        <div className={`p-6 min-h-screen rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-200`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Connected Stores</h1>
            <div className="flex gap-4">
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setSelectedStore(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    Add Store
                </button>
            </div>
        </div>

        {/* Stores Grid with Loading State */}
        {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
                <Loader className={`animate-spin w-10 h-10 mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading stores...</p>
            </div>
        ) : stores.length === 0 ? (
            <div className={`p-8 text-center rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
                <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No stores found</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Add a store to start managing your product imports
                </p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store) => (
                    <div
                        key={store.id}
                        className={`p-6 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} shadow-sm transition-colors duration-200`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <Store className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                <div>
                                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{store.storeName}</h3>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{store.storeUrl}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => verifyConnection(store.id)}
                                    className={`p-2 ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors`}
                                >
                                    <RefreshCw size={18} />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedStore(store);
                                        setFormData(store);
                                        setIsModalOpen(true);
                                    }}
                                    className={`p-2 ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors`}
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedStore(store);
                                        setIsDeleteModalOpen(true);
                                    }}
                                    className={`p-2 ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'} transition-colors`}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                store.connected
                                    ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                                    : darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                            }`}>
                                {store.connected ? 'Connected' : 'Disconnected'}
                            </span>
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Platform: {store.platformType}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Add/Edit Store Modal */}
        {isModalOpen && (
            <div className={`fixed inset-0 ${darkMode ? 'bg-black' : 'bg-white'} bg-opacity-50 flex items-center justify-center p-4 z-50`} >
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full shadow-xl transition-colors duration-200`}>
                    hello
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full shadow-xl transition-colors duration-200`}>
                    <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedStore ? 'Edit Store' : 'Add New Store'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Store Name</label>
                            <input
                                type="text"
                                value={formData.storeName}
                                onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-600' : 'border-gray-300'}`}
                                required
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Store URL</label>
                            <input
                                type="url"
                                value={formData.storeUrl}
                                onChange={(e) => setFormData({...formData, storeUrl: e.target.value})}
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-600' : 'border-gray-300'}`}
                                required
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Platform</label>
                            <select
                                value={formData.platformType}
                                onChange={(e) => setFormData({...formData, platformType: e.target.value})}
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-600' : 'border-gray-300'}`}
                            >
                                <option value="WOOCOMMERCE">WooCommerce</option>
                                <option value="SHOPIFY">Shopify</option>
                                <option value="MAGENTO">Magento</option>
                                <option value="PRESTASHOP">PrestaShop</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>API Key</label>
                            <input
                                type="password"
                                value={formData.apiKey}
                                onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-600' : 'border-gray-300'}`}
                                required
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>API Secret</label>
                            <input
                                type="password"
                                value={formData.apiSecret}
                                onChange={(e) => setFormData({...formData, apiSecret: e.target.value})}
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-600' : 'border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    resetForm();
                                }}
                                className={`px-4 py-2 border rounded-md ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors`}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {selectedStore ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-sm w-full shadow-xl transition-colors duration-200`}>
                    <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Confirm Delete</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Are you sure you want to delete {selectedStore?.storeName}? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className={`px-4 py-2 border rounded-md ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleDelete(selectedStore.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
};

export default StoresContent;
