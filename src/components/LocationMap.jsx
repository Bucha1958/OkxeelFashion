import React from 'react';

const LocationMap = () => {
  return (
    <div className="relative bg-gray-100 p-8 rounded-lg shadow-lg text-center h-40">
      <h2 className="text-2xl font-bold mb-4">Our Location</h2>
      <p className="mb-6">Find us at our physical location on the map below.</p>
      <div className="absolute w-full overflow-hidden rounded-lg shadow-lg">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.413136919144!2d3.340114473730301!3d6.595465822325471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103befb38659c01b%3A0xc6d84c489ff840ef!2sOkxeel!5e0!3m2!1sen!2sng!4v1718006660560!5m2!1sen!2sng" 
          width="600" 
          height="450" 
          style={{ border: 0, width: '100%', height: '50%' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  );
};

export default LocationMap;
