import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImagesSection = ({ userId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/get-user-images/${userId}`)
      .then(res => setImages(res.data))
      .catch(err => console.error('Error fetching images:', err));
  }, [userId]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Photos</h3>
      <div className="grid grid-cols-3 gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:5000/media/${img.fileId}`}
            alt="User Upload"
            className="w-full h-20 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesSection;
