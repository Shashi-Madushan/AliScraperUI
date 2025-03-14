import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";
import { ArrowLeft } from "lucide-react";

function ProductEdit({ productId, onBack, darkMode }) {
  // const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(productId);
        setProduct(data);
        setError("");
      } catch (err) {
        setError("Failed to fetch product. Please try again.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return(
    <>
    <div className="flex items-center justify-between mb-4">
    <button onClick={onBack} className="flex items-center">
      <ArrowLeft className="mr-2" />
      Back to Products
    </button>
    <h2 className="text-2xl font-semibold">Edit Product</h2>
  </div>
    <div>{error}</div>
    </>
  ) ;

  return (
    <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2" />
          Back to Products
        </button>
        <h2 className="text-2xl font-semibold">Edit Product</h2>
      </div>
      <div className="mb-4">
        <strong>ID:</strong> {product?.id}
      </div>
      <div className="mb-4">
        <strong>Product ID:</strong> {product?.productID}
      </div>
      <div className="mb-4">
        <strong>Name:</strong> {product?.productName}
      </div>
      <div className="mb-4">
        <strong>Current Price:</strong> {product?.currentPrice}
      </div>
      <div className="mb-4">
        <strong>Original Price:</strong> {product?.originalPrice}
      </div>
      <div className="mb-4">
        <strong>Discount:</strong> {product?.discount}
      </div>
      <div className="mb-4">
        <strong>Rating:</strong> {product?.rating}
      </div>
      <div className="mb-4">
        <strong>Sold Count:</strong> {product?.soldCount}
      </div>
      <div className="mb-4">
        <strong>User Name:</strong> {product?.userName}
      </div>
      <div className="mb-4">
        <strong>Specifications:</strong>
        <ul>
          {product?.specifications && Object.entries(product.specifications).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Description:</strong>
        <p>{product?.description?.[0]?.text}</p>
        <div>
          {product?.description?.[0]?.images && product.description[0].images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Description Image ${index + 1}`}
              className="w-20 h-20 object-cover rounded mr-2"
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <strong>Images:</strong>
        <div>
          {product?.imageLinks && product.imageLinks.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              className="w-20 h-20 object-cover rounded mr-2"
            />
          ))}
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Save
      </button>
    </div>
  );
}

export default ProductEdit;