
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus, faMinus, faEdit, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../CartContext';
import Head from '../components/Head';
import Footer from '../components/Footer';
import ProductEditModal from '../components/modals/ProductEditModal';
import DeleteProductModal from '../components/modals/DeleteProductModal';
import { useExchangeRate } from '../ExchangeRateContext';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const { formatPrice, currency } = useExchangeRate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [size, setSize] = useState('');
  const [hoveredSize, setHoveredSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customSizes, setCustomSizes] = useState({
    neck: '',
    shoulder: '',
    sleeveLength: '',
    bicep: '',
    chest: '',
    tommy: '',
    shirtLength: '',
    waist: '',
    thigh: '',
    hip: '',
    knee: '',
    ankle: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const zoomRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Fetch product details from API
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.productFound) {
          setProduct(data.productFound);
          setSelectedImage(data.productFound.images[0]);
        } else {
          console.error('Product not found:', data);
        }
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleSubmitProduct = async (formData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        throw new Error(`Failed to update product: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Product Updated:', data);
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        throw new Error(`Failed to delete product: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Product Deleted:', data);
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleCustomSizeChange = (e) => {
    setCustomSizes({
      ...customSizes,
      [e.target.name]: e.target.value
    });
  };

  const requiredCustomSizes = ['chest', 'shoulder', 'sleeveLength', 'shirtLength', 'waist', 'thigh', 'trouserLength'];

  requiredCustomSizes.forEach(key => {
    if (!customSizes.hasOwnProperty(key)) {
      customSizes[key] = '';
    }
  });

  const allRequiredCustomSizesFilled = requiredCustomSizes.every(key => customSizes[key].trim() !== '');

  const addToCartButtonClass = (!size && !allRequiredCustomSizesFilled) ? 'cursor-not-allowed' : 'cursor-pointer';

  const handleAddToCart = () => {
    if (!allRequiredCustomSizesFilled && !size) {
      alert('Please fill all required measurements or select a size.');
      return;
    }

    addToCart(product, quantity, size || customSizes);
    console.log('Cart items:', cartItems);
    navigate('/cart');
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const sizeMeasurements = {
    XS: {
      neck: '13-14',
      shoulder: '14-15',
      sleeveLength: '30-31',
      bicep: '11-12',
      chest: '32-34',
      tommy: '28-30',
      shirtLength: '27-28',
      waist: '26-28',
      thigh: '18-19',
      hip: '32-34',
      knee: '14-15',
      ankle: '8-9',
      trouserLength: '38-39'
    },
    S: {
      neck: '14-15',
      shoulder: '15-16',
      sleeveLength: '31-32',
      bicep: '12-13',
      chest: '34-36',
      tommy: '30-32',
      shirtLength: '28-29',
      waist: '28-30',
      thigh: '19-20',
      hip: '34-36',
      knee: '15-16',
      ankle: '9-10',
      trouserLength: '39-40'
    },
    // Add measurements for other sizes...
  };

  const handleMouseEnter = (size) => {
    setHoveredSize(size);
  };

  const handleMouseLeave = () => {
    setHoveredSize(null);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <Head />
      <div className="container mx-auto px-4 sm:px-8 py-8 flex flex-wrap mt-20 font-poppins max-w-full">
        <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
          <div className="mb-4 zoom-container" ref={zoomRef} onMouseMove={handleMouseMove}>
            <img ref={imageRef} src={selectedImage} alt={product.name} className="w-full h-auto zoom-image" />
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={`w-16 h-16 object-cover cursor-pointer ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="w-full sm:w-1/2 pl-0 sm:pl-8">
          <h1 className="text-2xl font-bold mb-4 uppercase">{product.name}</h1>
          <p className="mb-4">Price: {formatPrice(product.price)}</p>
          <div className="flex space-x-4">
            <FontAwesomeIcon
              icon={faEdit}
              className="text-sm cursor-pointer text-gray-600 hover:text-gray-300"
              onClick={handleOpenModal}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="text-sm cursor-pointer text-gray-600 hover:text-red-500"
              onClick={handleOpenDeleteModal}
            />
          </div>
          <div className="mb-4 relative">
            <div className="w-full text-sm h-[35px] p-2 rounded border-0 focus-visible:ring-0 text-black placeholder-gray-600 relative">
              <select
                id="size"
                value={size}
                onChange={handleSizeChange}
                className="w-full h-full bg-zinc-300/100 cursor-pointer relative focus:outline-none focus:ring-0"
                onMouseEnter={() => handleMouseEnter(size)}
                onMouseLeave={handleMouseLeave}
              >
                <option value="">Select size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>
              {hoveredSize && (
                <div className="absolute left-0 top-full mt-2 p-2 bg-white shadow-lg border rounded z-20">
                  <p>Size: {hoveredSize}</p>
                  <p>Neck: {sizeMeasurements[hoveredSize]?.neck}</p>
                  <p>Shoulder: {sizeMeasurements[hoveredSize]?.shoulder}</p>
                  <p>Sleeve Length: {sizeMeasurements[hoveredSize]?.sleeveLength}</p>
                  <p>Bicep: {sizeMeasurements[hoveredSize]?.bicep}</p>
                  <p>Chest: {sizeMeasurements[hoveredSize]?.chest}</p>
                  <p>Tommy: {sizeMeasurements[hoveredSize]?.tommy}</p>
                  <p>Shirt Length: {sizeMeasurements[hoveredSize]?.shirtLength}</p>
                  <p>Waist: {sizeMeasurements[hoveredSize]?.waist}</p>
                  <p>Thigh: {sizeMeasurements[hoveredSize]?.thigh}</p>
                  <p>Hip: {sizeMeasurements[hoveredSize]?.hip}</p>
                  <p>Knee: {sizeMeasurements[hoveredSize]?.knee}</p>
                  <p>Ankle: {sizeMeasurements[hoveredSize]?.ankle}</p>
                  <p>Trouser Length: {sizeMeasurements[hoveredSize]?.trouserLength}</p>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2 uppercase">Manually enter your measurements:</h2>
            {Object.keys(customSizes).map((key) => (
              <div key={key} className="mb-2">
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={customSizes[key]}
                  placeholder={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  onChange={handleCustomSizeChange}
                  className="p-2 rounded bg-zinc-300/50 border-0 focus-visible:ring-0 text-black placeholder-gray-600"
                />
              </div>
            ))}
          </div>
          <div className='flex items-center mb-4'>
            <div className="flex items-center">
              <button onClick={decrementQuantity} className="h-[40px] w-[40px] bg-gray-300 text-gray-700 px-3 py-1 rounded-l">
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="text-center w-12 border-t border-b border-gray-300 h-[40px]"
              />
              <button onClick={incrementQuantity} className="h-[40px] w-[40px] bg-gray-300 text-gray-700 px-3 py-1 rounded-r">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`ml-4 bg-blue-500 text-white px-6 py-2 font-poppins ${addToCartButtonClass}`}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ProductEditModal product={product} isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitProduct} />
      <DeleteProductModal product={product} isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onSubmit={deleteProduct} />
      <Footer />
    </div>
  );
};

export default ProductDetails;
