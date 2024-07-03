import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../Hero.css';

const DeleteProductModal = ({ isOpen, onClose, onSubmit, product }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit(product._id); // Pass product ID or necessary data
      console.log('Product deleted successfully');
      onClose();
      navigate(`/`); // Navigate after successful deletion and onClose
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50 montserrat">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-black text-xxs">
        <div className='flex justify-end'>
          <button className="text-2xl font-semibold" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className='flex flex-col justify-center items-center w-full'>
          <h2 className="text-xl text-black font-bold mb-4 uppercase monts">Delete Product</h2>
        
          <form onSubmit={handleSubmit} className='p'>
            <h1 className='text-sm'>Are you sure you want to delete {name}?</h1>
            <div className='flex justify-end'>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded mt-3"
                disabled={isLoading}
              >
                {isLoading ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : 'Delete'}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
