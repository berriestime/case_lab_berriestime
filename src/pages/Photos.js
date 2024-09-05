import React, { useEffect, useState } from 'react';
import { getPhotos } from './api/api.js';
import styles from '@/styles/Photos.module.css';
import { ImageModal } from './ImageModal.js';

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photoData = await getPhotos();
        setPhotos(photoData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchPhotos();
  }, []);

  const handleImageClick = (photo) => {
    setSelectedImage(`http://localhost:8055/assets/${photo.awesome_image}`);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="gallery-wrapper">
      <h1 className={styles.center}>Gallery</h1>
      <div className="gallery">
        {photos.map((photo) => (
          <div key={photo.id} onClick={() => handleImageClick(photo)}>
            <img
              className="gallery-item"
              src={`http://localhost:8055/assets/${photo.awesome_image}`}
              alt={`Photo ${photo.id}`}
            />
          </div>
        ))}
      </div>
      <ImageModal
        src={selectedImage}
        alt="Full size image"
        onClose={handleCloseModal}
      />
    </div>
  );
};

export { PhotosPage };
