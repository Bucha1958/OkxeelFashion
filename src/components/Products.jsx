// src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import Product from './Product';



const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const API_URL = import.meta.env.VITE_API_BASE_URL;


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
      <div id="next-section" className="container mx-auto px-2 py-8 mb-20">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {currentProducts.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

    </>
    
  );
};

export default Products;
