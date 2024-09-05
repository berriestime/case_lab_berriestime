import React, { useEffect, useState } from 'react';
import { getPhotosWithThumbnails } from './api/api.js';
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
        const photoData = await getPhotosWithThumbnails();
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
    setSelectedImage(photo.fullImageUrl);
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
    <div className={styles.galleryWrapper}>
      <h1 className={styles.center}>GALLERY</h1>
      <div className={styles.gallery}>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={styles.galleryItem}
            onClick={() => handleImageClick(photo)}
            style={{ backgroundImage: `url(${photo.thumbnailUrl})` }}
          ></div>
        ))}
      </div>
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Full size image"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export { PhotosPage };
