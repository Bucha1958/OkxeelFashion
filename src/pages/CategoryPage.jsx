// src/pages/CategoryPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import SuitsPage from './SuitsPage';
import ShirtsPage from './ShirtsPage';
import TrouserPage from './TrouserPage';
import BlazersPage from './BlazersPage';
import NativesPage from './NativesPage';
import CapPage from './CapPage';
import ShortsPage from './ShortsPage';
import CoatPage from './CoatPage';

const CategoryPage = () => {
  const { name } = useParams();

  const renderCategoryPage = (categoryName) => {
    switch (categoryName) {
      case 'suits':
        return <SuitsPage />;
      case 'shirts':
        return <ShirtsPage />;
      case 'trousers':
        return <TrouserPage />;
      case 'blazers':
        return <BlazersPage />;
      case 'natives':
        return <NativesPage />;
      case 'caps':
        return <CapPage />;
      case 'shorts':
        return <ShortsPage />;
      case 'coat':
        return <CoatPage />;
      default:
        return <div>Category not found</div>;
    }
  };

  return <div>{renderCategoryPage(name)}</div>;
};

export default CategoryPage;
