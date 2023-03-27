import { useState } from 'react';
import {
  ImageGalleryItems,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ image, alt, largeImage }) {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <ImageGalleryItems>
        <ImageGalleryItemImage src={image} alt={alt} onClick={toggleModal} />
      </ImageGalleryItems>

      {modalOpen && (
        <Modal onClose={toggleModal} largeImage={largeImage} alt={alt} />
      )}
    </>
  );
}
