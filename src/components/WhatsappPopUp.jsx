import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WhatsappPopUp = () => {
  const messages = [
    "Welcome to OKXEEL Fashion! How can I assist you today?",
    "Need help with your fashion choices? Chat with me on WhatsApp!",
    "Hello! I'm here to help you with all your fashion needs. Let's chat on WhatsApp!"
  ];
  
  const [showPopup, setShowPopup] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const hidePopup = setTimeout(() => {
      setShowPopup(false);
    }, 15000); // Hide after 10 seconds

    return () => clearTimeout(hidePopup);
  }, [showPopup]);

  useEffect(() => {
    if (messageIndex < messages.length - 1) {
      const interval = setInterval(() => {
        setShowPopup(true);
        setMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
      }, 40000); // Show popup every 20 seconds

      return () => clearInterval(interval);
    }
  }, [messageIndex, messages.length]);

  return (
    <>
      {showPopup && (
        <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg flex items-center space-x-3">
          <a 
            href="https://wa.me/08028612600" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <FaWhatsapp className="text-green-500 text-2xl cursor-pointer" />
            <span>{messages[messageIndex]}</span>
          </a>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default WhatsappPopUp;
