import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyle } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImage, alt, onClose }) => {
  
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyle>
        <img src={largeImage} alt={alt} />
      </ModalStyle>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export { Modal };
