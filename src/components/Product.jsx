import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useExchangeRate } from '../ExchangeRateContext';

const Product = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { formatPrice, currency } = useExchangeRate();

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div className="mt-10 md:mt-20">
      <Link to={`/products/${product._id}`}>
        <div
          className="relative h-[70vh] md:h-[80vh] w-full p-2 md:p-4 text-black text-base montserrat-one font-medium product-card"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative h-[65vh] md:h-[75vh] mb-2 md:mb-4 overflow-hidden">
            <img
              src={hovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
            />
            <FontAwesomeIcon
              icon={liked ? solidHeart : regularHeart}
              onClick={handleLikeClick}
              className={`absolute top-4 right-4 text-xl md:text-2xl cursor-pointer ${liked ? 'text-pink-500' : 'text-white'}`}
            />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-sm md:text-base font-medium mb-1 md:mb-2">{product.name}</h2>
            <p className="text-xs md:text-sm text-gray-700">
               {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;

