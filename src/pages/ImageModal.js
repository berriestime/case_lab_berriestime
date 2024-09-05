import React from 'react';
import styles from '@/styles/ImageModal.module.css';

const ImageModal = ({ src, alt, onClose }) => {
  if (!src) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} />
        <button onClick={onClose} className={styles.closeButton}></button>
      </div>
    </div>
  );
};

export { ImageModal };
