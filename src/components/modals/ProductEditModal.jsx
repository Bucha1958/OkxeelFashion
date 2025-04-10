import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../Hero.css';

const ProductEditModal = ({ isOpen, onClose, onSubmit, product }) => {
  const API_URL = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.categories[0]?.name || ''); // Assuming categories is an array and you want the first one
      setImages(product.images);
      setImageNames(product.images.map((img) => img.split('/').pop()));
    }
  }, [product]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    // Store image names
    const names = files.map((file) => file.name);
    setImageNames((prevNames) => [...prevNames, ...names]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageNames((prevNames) => prevNames.filter((_, i) => i !== index));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

  

    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('categories', JSON.stringify([category]));

    images.forEach((image) => {
      if (typeof image === 'string') {
        formData.append('existingImages', image); // handle existing images differently
      } else {
        formData.append('images', image);
      }
    });

    try {
      console.log('Submitting form data...', formData);
      await onSubmit(formData);
      console.log('Product submitted successfully');
      onClose();
      setRedirect(category);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate(`/category/${redirect}`);
    }
  }, [redirect, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-black text-xxs">
        <div className='flex justify-end'>
          <button className="text-2xl font-semibold" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className='flex justify-center items-center'>
          <h2 className="text-medium text-black font-bold mb-4 uppercase">Edit Product</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xxs font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 rounded bg-zinc-300/50 border-0 focus:outline-none focus:ring-0 text-black placeholder-gray-600 ${errors.name ? 'border-red-500' : ''}`}
              
            />
            
          </div>
          <div className="mb-4">
            <label className="block text-xxs font-semibold mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full p-2 rounded bg-zinc-300/50 border-0 focus:outline-none focus:ring-0 text-black ${errors.price ? 'border-red-500' : ''}`}
              
            />
            
          </div>
          <div className="mb-4">
            <label className="block text-xxs font-semibold mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full p-2 rounded bg-zinc-300/50 border-0 focus:outline-none focus:ring-0 text-black ${errors.category ? 'border-red-500' : ''}`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            
          </div>
          <div className="mb-4">
            <label className="block text-xxs font-semibold mb-2">Images</label>
            <input
              type="file"
              name="images"
              multiple
              accept=".jpg,.jpeg,.png"
              onChange={handleImageUpload}
              className={`w-full p-2 rounded bg-zinc-300/50 border-0 focus:outline-none focus:ring-0 text-black ${errors.images ? 'border-red-500' : ''}`}
            />
            <div className="mt-2">
              {imageNames.map((name, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="text-xs text-gray-700">{name}</span>
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
            </div>
            
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
