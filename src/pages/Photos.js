import React, { useEffect, useState } from 'react';
import { getPhotos } from './api/api.js';
import styles from '@/styles/Home.module.css';

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="gallery-wrapper">
      <h1 className={`${styles.center}`}>Gallery</h1>
      <div className="gallery">
        {photos.map((photo) => (
          <div key={photo.id}>
            <img
              className="gallery-item"
              src={`http://localhost:8055/assets/${photo.awesome_image}`}
              alt={`Photo ${photo.id}`}
            />
            <p>Date Created: {photo.date_created.toISOString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PhotosPage };
