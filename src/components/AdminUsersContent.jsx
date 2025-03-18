import React, { useEffect, useState } from 'react';
import { User, Trash2, Shield, ShieldOff, Search } from 'lucide-react';
import { getAllUsers, deleteUser, changeUserRole } from '../services/adminService';

const AdminUsersContent = ({ darkMode, searchTerm }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [confirmRoleChange, setConfirmRoleChange] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            setUsers(data || []);
            setError(null);
        } catch (err) {
            setError('Failed to load users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (confirmDelete === userId) {
            try {
                await deleteUser(userId);
                setUsers(users.filter(user => user.id !== userId));
                setConfirmDelete(null);
            } catch (err) {
                setError('Failed to delete user');
                console.error(err);
            }
        } else {
            setConfirmDelete(userId);
            // Auto-reset confirm state after 3 seconds
            setTimeout(() => setConfirmDelete(null), 3000);
        }
    };

    const handleRoleChange = async (userId, currentRole) => {
        if (confirmRoleChange === userId) {
            try {
                const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
                await changeUserRole(userId, newRole);
                setUsers(users.map(user => 
                    user.id === userId 
                        ? {...user, role: newRole} 
                        : user
                ));
                setConfirmRoleChange(null);
            } catch (err) {
                setError('Failed to change user role');
                console.error(err);
            }
        } else {
            setConfirmRoleChange(userId);
            // Auto-reset confirm state after 3 seconds
            setTimeout(() => setConfirmRoleChange(null), 3000);
        }
    };

    const filteredUsers = users.filter(user => {
        if (!searchTerm) return true;
        
        const search = searchTerm.toLowerCase();
        return (
            (user.username && user.username.toLowerCase().includes(search)) ||
            (user.email && user.email.toLowerCase().includes(search)) ||
            (user.role && user.role.toLowerCase().includes(search))
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
                    onClick={fetchUsers}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    User Management
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
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            {filteredUsers.length === 0 ? (
                <div className={`p-6 text-center rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-500'}>
                        {searchTerm ? 'No users match your search criteria.' : 'No users found in the system.'}
                    </p>
                </div>
            ) : (
                <div className={`overflow-x-auto rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                <User size={16} className="text-gray-600" />
                                            </div>
                                            <div className="ml-4">
                                                <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {user.username}
                                                </div>
                                                <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.role === 'ADMIN'
                                                ? darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                                                : darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.active
                                                ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                                                : darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {user.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleRoleChange(user.id, user.role)}
                                            className={`inline-flex items-center mr-3 px-2 py-1 rounded ${
                                                confirmRoleChange === user.id
                                                    ? darkMode ? 'bg-yellow-600 text-yellow-100' : 'bg-yellow-500 text-white'
                                                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-yellow-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                            title={`Change role to ${user.role === 'ADMIN' ? 'USER' : 'ADMIN'}`}
                                        >
                                            {user.role === 'ADMIN' ? (
                                                <ShieldOff size={16} className="mr-1" />
                                            ) : (
                                                <Shield size={16} className="mr-1" />
                                            )}
                                            {confirmRoleChange === user.id ? 'Confirm' : ''}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className={`inline-flex items-center px-2 py-1 rounded ${
                                                confirmDelete === user.id
                                                    ? darkMode ? 'bg-red-600 text-red-100' : 'bg-red-500 text-white'
                                                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-red-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                            title="Delete user"
                                        >
                                            <Trash2 size={16} className="mr-1" />
                                            {confirmDelete === user.id ? 'Confirm' : ''}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminUsersContent;