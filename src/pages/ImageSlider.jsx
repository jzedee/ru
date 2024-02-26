// ImageSlider.jsx
import React, { useState, useEffect } from 'react';
import '../styles/slider.css'; // Add CSS file for styling

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="image-slider">
      <div className="slider-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="slider-slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
