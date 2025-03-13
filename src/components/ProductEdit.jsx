import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";

function ProductEdit() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(id);
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
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <div className="mb-4">
        <strong>ID:</strong> {product.id}
      </div>
      <div className="mb-4">
        <strong>Product ID:</strong> {product.productID}
      </div>
      <div className="mb-4">
        <strong>Name:</strong> {product.productName}
      </div>
      <div className="mb-4">
        <strong>Current Price:</strong> {product.currentPrice}
      </div>
      <div className="mb-4">
        <strong>Original Price:</strong> {product.originalPrice}
      </div>
      <div className="mb-4">
        <strong>Discount:</strong> {product.discount}
      </div>
      <div className="mb-4">
        <strong>Rating:</strong> {product.rating}
      </div>
      <div className="mb-4">
        <strong>Sold Count:</strong> {product.soldCount}
      </div>
      <div className="mb-4">
        <strong>User Name:</strong> {product.userName}
      </div>
      <div className="mb-4">
        <strong>Specifications:</strong>
        <ul>
          {Object.entries(product.specifications).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Description:</strong>
        <p>{product.description[0].text}</p>
        <div>
          {product.description[0].images.map((image, index) => (
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
          {product.imageLinks.map((image, index) => (
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