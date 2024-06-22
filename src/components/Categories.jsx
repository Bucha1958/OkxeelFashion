import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  { name: 'suits', imageUrl: 'https://images.unsplash.com/photo-1620511450270-47162b983078?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHN1aXRzfGVufDB8fDB8fHww' },
  { name: 'trousers', imageUrl: 'https://media.istockphoto.com/id/1277130165/photo/dark-blue-classic-trousers-with-laces.jpg?s=1024x1024&w=is&k=20&c=uNscO6DzTyrSEKrz7BW2Aq0t2PZBZMgBLmNa3hL6Xjk=' },
  { name: 'caps', imageUrl: 'https://plus.unsplash.com/premium_photo-1703259737782-fd43f9895e5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW9ydWJhJTIwY2Fwc3xlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'shorts', imageUrl: 'https://orangeculture.com.ng/cdn/shop/files/14B.jpg?v=1700258271&width=360' },
  { name: 'coat', imageUrl: 'https://plus.unsplash.com/premium_photo-1674719144570-0728faf14f96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvYXR8ZW58MHx8MHx8fDA%3D' },
  { name: 'blazers', imageUrl: 'https://images.unsplash.com/photo-1621061410695-3c32f51bf934?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fEJsYXplcnN8ZW58MHx8MHx8fDA%3D' },
  { name: 'shirts', imageUrl: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFNoaXJ0c3xlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'natives', imageUrl: 'https://res.cloudinary.com/djlbplw5y/image/upload/v1716624185/ecommerce-images/design%20senator.jpg' },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate.push(`/category/${categoryName}`)
  };


  return (
    <div id="next-section" className='h-full flex flex-col bg-gray-100 py-16'>
      <h1 className='font-poppins text-4xl mb-8 mx-auto mt-8'>Shop By Categories</h1>
      <div className=' mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 mx-8'>
        {categories.map((category, index) => (
          <Link key={index} to={`/category/${category.name}`} className='relative h-[50rem] w-full group-hover:opacity-100 transition-opacity duration-300'>
            <img src={category.imageUrl} alt={category.name} className='w-full h-full object-cover' />
            <div className='absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-lg p-4 text-center'>
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
