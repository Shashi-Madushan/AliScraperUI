import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  LogIn,
  Moon,
  Sun,
  Package,
  Store,
  TrendingUp,
  Clock,
  Search,
  Shield,
  RefreshCw,
  ZapIcon,
  CheckCircle,
  CreditCard,
  ChevronRight,
  ChevronDown,
  Globe,
  UserPlus,
  Truck,
  Star,
  Menu,
  X
} from "lucide-react";
import { getToken, logout } from "./services/authService";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = getToken();
    setIsAuthenticated(!!token);
    
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} min-h-screen transition-colors duration-300`}>
      {/* Navigation Bar - Adding floating effect with rounded corners */}
      <div className="w-full px-4 sm:px-6 lg:px-8 fixed top-0 z-50 pt-4">
        <nav className={`${darkMode ? "bg-gray-800/95 backdrop-blur-sm" : "bg-white/95 backdrop-blur-sm"} 
          transition-all duration-300 
          shadow-lg rounded-xl 
          max-w-7xl mx-auto
          border ${darkMode ? "border-gray-700" : "border-gray-200"}
          transform hover:translate-y-0.5 hover:shadow-xl`}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo and Brand */}
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${darkMode ? "bg-blue-600" : "bg-blue-500"} flex items-center justify-center`}>
                  <span className="text-white font-bold">FS</span>
                </div>
                <span className="ml-2 font-bold text-xl">FREE SCRAPER</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <a href="#features" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>Features</a>
                <a href="#pricing" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>Pricing</a>
                <a href="#faq" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>FAQ</a>
                
                {/* Auth Buttons */}
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => navigate("/dashboard")}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white transition-colors`}
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={handleLogout}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-colors`}
                    >
                      <LogOut size={16} className="mr-1" /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => navigate("/login")}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-colors`}
                    >
                      <LogIn size={16} className="mr-1" /> Login
                    </button>
                    <button 
                      onClick={() => navigate("/register")}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white transition-colors`}
                    >
                      Register
                    </button>
                  </div>
                )}
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-colors`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center space-x-3">
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-md ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden ${darkMode ? "bg-gray-800" : "bg-white"} rounded-b-xl overflow-hidden`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a 
                  href="#features" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#pricing" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="#faq" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                
                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => {
                        navigate("/dashboard");
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                      <LogIn size={16} className="mr-2" /> Login
                    </button>
                    <button 
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                    >
                      <UserPlus size={16} className="mr-2" /> Register
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Hero Section - Adjusted padding to account for floating navbar */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className={`text-4xl md:text-5xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                Automate Your <span className="text-blue-500">Dropshipping</span> Business
              </h1>
              <p className={`mt-4 text-lg md:text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Scrape products from AliExpress and seamlessly import them to your WooCommerce or Shopify store in just a few clicks.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => navigate("/register")}
                  className={`px-6 py-3 text-lg font-medium rounded-lg ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white transition-colors flex items-center justify-center`}
                >
                  Get Started Free <ChevronRight size={20} className="ml-1" />
                </button>
                <a 
                  href="#features"
                  className={`px-6 py-3 text-lg font-medium rounded-lg ${darkMode ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" : "bg-white hover:bg-gray-100 border border-gray-300"} transition-colors flex items-center justify-center`}
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className={`relative rounded-lg overflow-hidden shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"} p-2`}>
                <img 
                  src="https://placehold.co/600x400/2563eb/FFFFFF/png?text=Product+Scraper+Preview" 
                  alt="Product Scraper Interface" 
                  className="w-full rounded shadow-sm"
                />
                <div className={`absolute top-0 left-0 w-full h-full rounded-lg opacity-30 ${darkMode ? "bg-gradient-to-tr from-blue-800 to-transparent" : "bg-gradient-to-tr from-blue-500 to-transparent"}`}></div>
              </div>
              <div className="mt-4 flex justify-center space-x-8">
                <div className="flex items-center">
                  <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-1`} />
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-1`} />
                  <span className="text-sm">Free starter plan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-12 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"} shadow-md`}>
              <div className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>10,000+</div>
              <div className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Products Scraped</div>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"} shadow-md`}>
              <div className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>5,000+</div>
              <div className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Happy Users</div>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"} shadow-md`}>
              <div className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>98%</div>
              <div className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Success Rate</div>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white"} shadow-md`}>
              <div className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>24/7</div>
              <div className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Powerful Features</h2>
            <p className={`mt-4 text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Everything you need to supercharge your dropshipping business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} transition-colors`}>
              <div className={`p-3 rounded-full inline-block ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
                <Search className={`h-6 w-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              </div>
              <h3 className="mt-4 text-xl font-medium">One-Click Product Scraping</h3>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Simply paste an AliExpress URL and our system will extract all product details, images, descriptions, and variants automatically.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} transition-colors`}>
              <div className={`p-3 rounded-full inline-block ${darkMode ? "bg-green-900" : "bg-green-100"}`}>
                <Store className={`h-6 w-6 ${darkMode ? "text-green-400" : "text-green-600"}`} />
              </div>
              <h3 className="mt-4 text-xl font-medium">Store Integration</h3>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Seamlessly connect to WooCommerce, Shopify, and other platforms to import products with a single click.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} transition-colors`}>
              <div className={`p-3 rounded-full inline-block ${darkMode ? "bg-purple-900" : "bg-purple-100"}`}>
                <Package className={`h-6 w-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
              </div>
              <h3 className="mt-4 text-xl font-medium">Product Management</h3>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Edit product details, set your own pricing, and customize descriptions before importing to your store.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} transition-colors`}>
              <div className={`p-3 rounded-full inline-block ${darkMode ? "bg-red-900" : "bg-red-100"}`}>
                <TrendingUp className={`h-6 w-6 ${darkMode ? "text-red-400" : "text-red-600"}`} />
              </div>
              <h3 className="mt-4 text-xl font-medium">Price Monitoring</h3>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Track price changes on AliExpress products and automatically adjust your store prices to maintain margins.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} transition-colors`}>
              <div className={`p-3 rounded-full inline-block ${darkMode ? "bg-yellow-900" : "bg-yellow-100"}`}>
                <RefreshCw className={`h-6 w-6 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
              </div>
              <h3 className="mt-4 text-xl font-medium">Auto Updates</h3>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Keep your products in sync with automated inventory updates to prevent selling out-of-stock items.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} transition-colors`}>
              <div className={`p-3 rounded-full inline-block ${darkMode ? "bg-indigo-900" : "bg-indigo-100"}`}>
                <Globe className={`h-6 w-6 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
              </div>
              <h3 className="mt-4 text-xl font-medium">AI Product Descriptions</h3>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Generate unique, SEO-friendly product descriptions with our AI technology to boost your store's ranking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>How It Works</h2>
            <p className={`mt-4 text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Three simple steps to dropshipping success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
                <Search className={`h-8 w-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              </div>
              <h3 className="mt-6 text-xl font-medium">1. Find Products</h3>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Browse AliExpress for products you want to sell and copy the product URL.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
                <Package className={`h-8 w-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              </div>
              <h3 className="mt-6 text-xl font-medium">2. Scrape & Edit</h3>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Paste the URL into our platform, customize product details, and set your pricing.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
                <Store className={`h-8 w-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              </div>
              <h3 className="mt-6 text-xl font-medium">3. Import & Sell</h3>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Import products directly to your store with a single click and start selling.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate("/register")}
              className={`px-6 py-3 text-lg font-medium rounded-lg ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white transition-colors`}
            >
              Start Scraping Now
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Simple, Transparent Pricing</h2>
            <p className={`mt-4 text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Choose the plan that works for your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"} transition-all hover:transform hover:scale-105`}>
              <div className={`p-6 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <h3 className="text-xl font-semibold">Free</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$0</span>
                  <span className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>/ month</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>10 product scrapes per month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>1 store connection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>Basic editing tools</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>Email support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() => navigate("/register")}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium ${darkMode ? "bg-gray-700 hover:bg-gray-600 border border-blue-500" : "bg-white hover:bg-gray-100 border border-blue-500"} text-blue-500 transition-colors`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? "bg-gray-800 ring-2 ring-blue-500" : "bg-white ring-2 ring-blue-500"} transition-all hover:transform hover:scale-105 z-10`}>
              <div className="absolute inset-x-0 top-0">
                <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
              </div>
              <div className={`p-6 ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
                <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-blue-500 text-white uppercase">Most Popular</div>
                <h3 className="mt-2 text-xl font-semibold">Pro</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$29</span>
                  <span className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>/ month</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>100 product scrapes per month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>3 store connections</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>Advanced editing tools</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>AI product descriptions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>Price monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>Priority support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() => navigate("/register")}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white transition-colors`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            
            {/* Business Plan */}
            <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"} transition-all hover:transform hover:scale-105`}>
              <div className={`p-6 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <h3 className="text-xl font-semibold">Business</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$79</span>
                  <span className={`ml-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>/ month</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>Unlimited product scrapes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>10 store connections</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>All Pro features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>Bulk product import</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>Automated inventory sync</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`h-5 w-5 ${darkMode ? "text-blue-400" : "text-blue-500"} mr-2 flex-shrink-0`} />
                    <span>24/7 premium support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() => navigate("/register")}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium ${darkMode ? "bg-gray-700 hover:bg-gray-600 border border-blue-500" : "bg-white hover:bg-gray-100 border border-blue-500"} text-blue-500 transition-colors`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>What Our Users Say</h2>
            <p className={`mt-4 text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Trusted by thousands of dropshippers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-700" : "bg-white"}`}>
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400" fill="#FACC15" />
                ))}
              </div>
              <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                "This tool has completely transformed my dropshipping business. I save hours every week and my product listings look more professional than ever."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">JD</div>
                <div className="ml-3">
                  <div className="font-medium">John Doe</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Fashion Store Owner</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-700" : "bg-white"}`}>
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400" fill="#FACC15" />
                ))}
              </div>
              <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                "The AI product description feature alone is worth the subscription. It generates unique content that helps my products stand out from competitors."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">SJ</div>
                <div className="ml-3">
                  <div className="font-medium">Sarah Johnson</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Home Goods Retailer</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-700" : "bg-white"}`}>
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400" fill="#FACC15" />
                ))}
              </div>
              <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                "I was skeptical at first, but now I can't imagine running my stores without this tool. The price monitoring feature has helped me maximize profits automatically."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">MR</div>
                <div className="ml-3">
                  <div className="font-medium">Mike Rodriguez</div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Tech Gadget Seller</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Frequently Asked Questions</h2>
            <p className={`mt-4 text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Find answers to common questions
            </p>
          </div>
          
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className={`rounded-lg overflow-hidden shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <button 
                className={`flex justify-between items-center w-full px-6 py-4 text-left ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                onClick={() => toggleAccordion(1)}
              >
                <span className="font-medium">How does the product scraping work?</span>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${activeAccordion === 1 ? "transform rotate-180" : ""}`}
                />
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === 1 ? "max-h-40" : "max-h-0"}`}>
                <div className={`px-6 pb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Our system uses advanced web scraping technology to extract product data from AliExpress. Simply copy and paste the product URL into our platform, and within seconds, we'll extract all the product details including title, description, images, variants, and pricing.
                </div>
              </div>
            </div>
            
            {/* FAQ Item 2 */}
            <div className={`rounded-lg overflow-hidden shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <button 
                className={`flex justify-between items-center w-full px-6 py-4 text-left ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                onClick={() => toggleAccordion(2)}
              >
                <span className="font-medium">Which e-commerce platforms do you support?</span>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${activeAccordion === 2 ? "transform rotate-180" : ""}`}
                />
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === 2 ? "max-h-40" : "max-h-0"}`}>
                <div className={`px-6 pb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  We currently support direct integration with WooCommerce and Shopify. We're actively working on adding support for more platforms including Magento, PrestaShop, and BigCommerce in the near future.
                </div>
              </div>
            </div>
            
            {/* FAQ Item 3 */}
            <div className={`rounded-lg overflow-hidden shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <button 
                className={`flex justify-between items-center w-full px-6 py-4 text-left ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                onClick={() => toggleAccordion(3)}
              >
                <span className="font-medium">Is the AI product description feature available on all plans?</span>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${activeAccordion === 3 ? "transform rotate-180" : ""}`}
                />
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === 3 ? "max-h-40" : "max-h-0"}`}>
                <div className={`px-6 pb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  The AI product description generator is available on our Pro and Business plans. Free plan users can still edit product descriptions manually, but the AI-powered generation is a premium feature designed to save time and improve SEO.
                </div>
              </div>
            </div>
            
            {/* FAQ Item 4 */}
            <div className={`rounded-lg overflow-hidden shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <button 
                className={`flex justify-between items-center w-full px-6 py-4 text-left ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                onClick={() => toggleAccordion(4)}
              >
                <span className="font-medium">Can I cancel my subscription at any time?</span>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${activeAccordion === 4 ? "transform rotate-180" : ""}`}
                />
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === 4 ? "max-h-40" : "max-h-0"}`}>
                <div className={`px-6 pb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your subscription will remain active until the end of the current billing period.
                </div>
              </div>
            </div>
            
            {/* FAQ Item 5 */}
            <div className={`rounded-lg overflow-hidden shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <button 
                className={`flex justify-between items-center w-full px-6 py-4 text-left ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                onClick={() => toggleAccordion(5)}
              >
                <span className="font-medium">How accurate is the product data scraping?</span>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${activeAccordion === 5 ? "transform rotate-180" : ""}`}
                />
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeAccordion === 5 ? "max-h-40" : "max-h-0"}`}>
                <div className={`px-6 pb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Our scraping technology has a 98% accuracy rate for product data. We extract all available information including variants, specifications, images, and descriptions. You can always review and edit the data before importing it to your store.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-blue-900"}`}>Ready to Supercharge Your Dropshipping Business?</h2>
          <p className={`mt-4 text-xl max-w-2xl mx-auto ${darkMode ? "text-blue-100" : "text-blue-700"}`}>
            Join thousands of successful dropshippers using our platform to automate product sourcing and grow their business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate("/register")}
              className={`px-6 py-3 text-lg font-medium rounded-lg ${darkMode ? "bg-white text-blue-900 hover:bg-gray-100" : "bg-blue-600 text-white hover:bg-blue-700"} transition-colors`}
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => navigate("/login")}
              className={`px-6 py-3 text-lg font-medium rounded-lg ${darkMode ? "bg-blue-800 text-white hover:bg-blue-700 border border-white" : "bg-white text-blue-600 hover:bg-gray-100 border border-blue-600"} transition-colors`}
            >
              Log In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? "bg-gray-900" : "bg-gray-800"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${darkMode ? "bg-blue-600" : "bg-blue-500"} flex items-center justify-center`}>
                  <span className="text-white font-bold">FS</span>
                </div>
                <span className="ml-2 font-bold text-xl text-white">FREE SCRAPER</span>
              </div>
              <p className="mt-4 text-gray-400">
                The ultimate dropshipping automation tool for e-commerce entrepreneurs.
              </p>
            </div>
            
            {/* Links 1 */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-gray-300 transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-gray-300 transition-colors">Pricing</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-gray-300 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            {/* Links 2 */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            {/* Links 3 */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© {new Date().getFullYear()} Free Scraper. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <button className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-700"} transition-colors`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </button>
                <button className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-700"} transition-colors`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </button>
                <button className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-700"} transition-colors`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;