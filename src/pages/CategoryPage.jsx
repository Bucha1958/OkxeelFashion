// src/pages/CategoryPage.jsx


import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CategoryTemplate = lazy(() => import('./CategoryTemplate'));

const CategoryPage = () => {
  const { name } = useParams();

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <i className="fas fa-circle-notch fa-spin text-4xl"></i>
      </div>
    }>
      <CategoryTemplate categoryName={name} />
    </Suspense>
  );
};

export default CategoryPage;
