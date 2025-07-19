import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProfileImages({ userId }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/images`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [userId]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Photos</h3>
      <div className="grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image.url} 
            alt={`Profile ${index}`} 
            className="w-full h-20 object-cover rounded" 
          />
        ))}
      </div>
    </div>
  );
}

export default ProfileImages;