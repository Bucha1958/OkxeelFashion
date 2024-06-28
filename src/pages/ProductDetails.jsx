
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../CartContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Head from '../components/Head';
import Footer from '../components/Footer';
import '../ProductDetails.css';

const ProductDetail = () => {
  const navigate = useNavigate(); 
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customSizes, setCustomSizes] = useState({
    neck: '',
    shoulder: '',
    sleeveLength: '',
    bicep: '',
    chest: '',
    tommy:'',
    shirtLength: '',
    waist: '',
    thigh: '',
    hip: '',
    knee: '',
    ankle: '',
    trouserlength: ''
  });

  const zoomRef = useRef(null);
  const imageRef = useRef(null);
  const { addToCart, cartItems } = useCart();

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

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleCustomSizeChange = (e) => {
    setCustomSizes({
      ...customSizes,
      [e.target.name]: e.target.value
    });
  };


  const requiredCustomSizes = ['chest', 'shoulder', 'sleeveLength', 'shirtLength', 'waist', 'thigh', 'trouserLength']
  const allRequiredCustomSizesFilled = requiredCustomSizes.every(key => customSizes[key].trim() !== '');

  const addToCartButtonClass = (!size && !allRequiredCustomSizesFilled) ? 'cursor-not-allowed' : 'cursor-pointer';
  
  const handleAddToCart = () => {
    if (!allRequiredCustomSizesFilled && !size) {
      alert('chest, shoulder, sleeveLength, shirtLength, waist, thigh, trouserLength are required or predefined size')
      return;
    } 

    console.log('Adding to cart...');
    addToCart(product, quantity);
    console.log('Cart items:', cartItems);
    // Navigate to cart page to check
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

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <i className="fas fa-circle-notch fa-spin text-4xl"></i>
      </div>
    );
  }


  return (
    <>
      <Head />
      <div className="container mx-auto px-2 py-8 flex mt-20 font-poppins">
        <div className="w-1/2">
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
        <div className="w-1/2 pl-8">
          <h1 className="text-2xl font-bold mb-4 uppercase">{product.name}</h1>
          <p className="mb-4">Price: ${product.price}</p>
          <div className="mb-4">
            <select id="size" value={size} onChange={handleSizeChange} className="w-full text-sm h-[35px] p-2 rounded bg-zinc-300/50 border-0 focus-visible:ring-0 text-black placeholder-gray-600">
              <option value="">Select size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
            </select>
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
          <div className='flex px-8 h-[60px] mt-20'>
            <div className="mb-4 flex items-center py-4 px-4 mt-4">
              <button onClick={decrementQuantity} className="h-[60px] w-[60px] bg-gray-300 text-gray-700 px-3 py-1 rounded-l">
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="text-center w-12 border-t border-b border-gray-300 h-[60px]"
              />
              <button onClick={incrementQuantity} className="h-[60px] w-[60px] bg-gray-300 text-gray-700 px-3 py-1 rounded-r">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <button 
              onClick={handleAddToCart} 
              className={`bg-blue-500 text-white px-6 py-4 font-poppins ${addToCartButtonClass}`}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Add to Cart
            </button>
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
