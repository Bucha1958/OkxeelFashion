// src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import Footer from '../components/Footer';


const ProductPage = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;


  useEffect(() => {
    // Fetch products from API
    fetch(`${API_URL}/api/products`, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);


  // Calculate the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container mx-auto px-2 py-8 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {currentProducts.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {products.length > productsPerPage && (
        <div className="mt-20 flex justify-center">
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      
      </div>
      <Footer />
    </>
    
  );
};

export default ProductPage;
