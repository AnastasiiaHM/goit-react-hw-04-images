import { Backdroup, LargeImage, Modals, BtnClose } from './Modal.styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TfiClose } from 'react-icons/tfi';

const modalRoot = document.querySelector('#modalRoot');

export function Modal({ onClose, largeImage, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') onClose();
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Backdroup onClick={handleBackdropClick}>
      <Modals>
        <LargeImage src={largeImage} alt={alt} />
        <BtnClose type="button" aria-label="Close" onClick={onClose}>
          <TfiClose />
        </BtnClose>
      </Modals>
    </Backdroup>,

    modalRoot
  );
}
