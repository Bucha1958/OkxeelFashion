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
      case 'Suits':
        return <SuitsPage />;
      case 'Shirts':
        return <ShirtsPage />;
      case 'Trousers':
        return <TrouserPage />;
      case 'Blazers':
        return <BlazersPage />;
      case 'Natives':
        return <NativesPage />;
      case 'Caps':
        return <CapPage />;
      case 'Shorts':
        return <ShortsPage />;
      case 'Coat':
        return <CoatPage />;
      default:
        return <div>Category not found</div>;
    }
  };

  return <div>{renderCategoryPage(name)}</div>;
};

export default CategoryPage;
