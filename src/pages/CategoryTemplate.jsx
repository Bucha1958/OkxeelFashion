// src/pages/CategoryTemplate.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Head from '../components/Head';
import Product from '../components/Product';
import Footer from '../components/Footer';
import SidebarContact from '../components/SidebarContact';

const CategoryTemplate = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const productsPerPage = 12;
  const API_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products?category=${name}`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('API response is not an array:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [name]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Calculate the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(products) ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Head />
      <SidebarContact isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        />
      )}
      <div className="container mx-auto px-2 py-8 mb-20">
        <h1 className="text-2xl font-bold mb-4 capitalize">{name} Products</h1>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {currentProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        {products.length > productsPerPage && (
          <div className="mt-8 flex justify-center">
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
      <Footer toggleSidebar={toggleSidebar} />
    </>
  );
};

export default CategoryTemplate;

