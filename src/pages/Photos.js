import React, { useEffect, useState } from 'react';
import { getPhotosWithThumbnails } from './api/api.js';
import styles from '@/styles/Photos.module.css';
import { ImageModal } from './ImageModal.js';

const PhotosPage = () => {
  const itemsPerPage = 12;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  const lastPhotoIndex = currentPage * itemsPerPage;
  const firstPhotoIndex = lastPhotoIndex - itemsPerPage;
  const currentPhotos = photos.slice(firstPhotoIndex, lastPhotoIndex);

  const totalPages = Math.ceil(photos.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <div className={styles.pagination}>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={styles.pageNumber}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
      </div>
      <div className={styles.gallery}>
        {currentPhotos.map((photo) => (
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
