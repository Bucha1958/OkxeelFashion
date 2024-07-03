import React, { useState, useEffect } from 'react';
import yellowKaftan2 from '../assets/yellow kaftan2.jpg';
import okxeel1 from '../assets/okxeel.jpg';
import okxeel2 from '../assets/okxeel2.jpg';
import whitekaf from '../assets/white kaf.jpg';
import chocolate from '../assets/chocolate.jpg';
import '../App.css';
import { Header } from '../components/Header';
import Categories from '../components/Categories';
import Hero from '../components/Hero';
import { Shop } from '../components/Shop';
import BlogPosts from '../components/Blogposts';
import Footer from '../components/Footer';
import LocationMap from '../components/LocationMap';
import WhatsAppPopup from '../components/WhatsappPopUp';
import Products from '../components/Products';
import SidebarContact from '../components/SidebarContact';

const HomePage = () => {
  const images = [yellowKaftan2, okxeel1, okxeel2, whitekaf, chocolate];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initialState, setInitialState] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    setInitialState(true); // Set initial state when component mounts
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // Match the duration of the CSS animation
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [nextImageIndex, images.length]);

  return (
    <div className='overflow-hidden App'>
      <div className="relative h-full overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-image ${isTransitioning ? 'transition-active' : ''}`}
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        />
        <div
          className={`absolute inset-0 bg-cover bg-center transition-image transition-next ${isTransitioning ? 'transition-active' : ''}`}
          style={{ backgroundImage: `url(${images[nextImageIndex]})` }}
        />
        <Header />
        <Hero />
      </div>
      <Products />
      <Shop />
      <LocationMap />
      <BlogPosts />
      <WhatsAppPopup />
      <Footer toggleSidebar={toggleSidebar}/>
      <SidebarContact isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default HomePage;

