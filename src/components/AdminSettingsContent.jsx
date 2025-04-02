import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Key, AlertCircle, Trash2 } from "lucide-react";
import { apiClient, logout } from "../services/authService";

const AccountContent = ({ darkMode }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get("/user/me");
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await apiClient.post("/user/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setShowPasswordModal(false);
      // Clear password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      // Show success notification
      alert("Password changed successfully");
    } catch (err) {
      setError("Failed to change password");
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      await apiClient.post("/user/deleteAccount");
      logout();
      navigate("/login");
    } catch (err) {
      setError("Failed to delete account");
    }
  };

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading)
    return (
      <div className={`flex rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } items-center justify-center min-h-screen`}>
        Loading...
      </div>
    );
  if (!userData)
    return (
      <div className={`flex rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } items-center justify-center min-h-screen`}>
        No user data found
      </div>
    );

  return (
    <div
      className={`min-h-screen rounded-xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } transition-colors duration-200`}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Account Settings
          </h1>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Manage your account settings and preferences
          </p>
        </div>

        {/* User Info Section */}
        <div
          className={`p-6 rounded-lg shadow-sm space-y-6 transition-colors duration-200 ${
            darkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <User
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />{" "}
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Use Name
                </p>
                <p className={darkMode ? "text-white" : "text-gray-900"}>
                  {userData.username || "Not provided"}
                </p>
              </div>
            </div>{" "}
            <div className="flex items-center space-x-4">
              <User
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />{" "}
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Full Name
                </p>
                <p className={darkMode ? "text-white" : "text-gray-900"}>
                  {userData.fullName || "Not provided"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail
                className={`w-5 h-5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Email
                </p>
                <p className={darkMode ? "text-white" : "text-gray-900"}>
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div
          className={`p-6 rounded-lg shadow-sm space-y-6 transition-colors duration-200 ${
            darkMode ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Security
          </h2>
          <div className="space-y-4">
            <button
              onClick={() => setShowPasswordModal(true)}
              className={`flex items-center space-x-2 ${
                darkMode
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              <Key className="w-5 h-5" />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div
          className={`p-6 rounded-lg shadow-sm space-y-6 transition-colors duration-200 ${
            darkMode ? "bg-red-900/20" : "bg-red-50"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            Danger Zone
          </h2>
          <div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className={`flex items-center space-x-2 ${
                darkMode
                  ? "text-red-400 hover:text-red-300"
                  : "text-red-600 hover:text-red-700"
              }`}
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className={`rounded-lg p-6 max-w-md w-full shadow-xl transition-colors duration-200 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Change Password
              </h3>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 transition-colors duration-200 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "border-gray-300"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 transition-colors duration-200 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "border-gray-300"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 transition-colors duration-200 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "border-gray-300"
                    }`}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-200 ${
                      darkMode
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className={`rounded-lg p-6 max-w-md w-full shadow-xl transition-colors duration-200 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div
                className={`flex items-center space-x-2 mb-4 ${
                  darkMode ? "text-red-400" : "text-red-600"
                }`}
              >
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Delete Account</h3>
              </div>
              <p
                className={`mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Are you sure you want to delete your account? This action cannot
                be undone and all your data will be permanently removed.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-200 ${
                    darkMode
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div
            className={`fixed bottom-4 right-4 border-l-4 border-red-500 p-4 rounded shadow-lg z-50 max-w-md ${
              darkMode
                ? "bg-red-900/20 text-red-400"
                : "bg-red-100 text-red-700"
            }`}
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountContent;
