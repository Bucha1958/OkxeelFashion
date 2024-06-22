import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Head from './Head';

const Product = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <>
      <Head />
      <div className="mt-20">
        <div
          className="relative h-[80vh] w-[100%] p-4 text-black text-base montserrat-one font-medium product-card"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative h-[75vh] mb-4 overflow-hidden">
            <img
              src={hovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
            />
            <FontAwesomeIcon
              icon={liked ? solidHeart : regularHeart}
              onClick={handleLikeClick}
              className={`absolute top-4 right-4 text-2xl cursor-pointer ${liked ? 'text-pink-500' : 'text-gray-300'}`}
            />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-medium font-medium mb-2">{product.name}</h2>
            <p className="text-sm text-gray-700">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

