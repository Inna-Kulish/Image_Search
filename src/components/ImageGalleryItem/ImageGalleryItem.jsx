import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { GalleryItem, ImageItem } from "./ImageGalleryItem.styled"

const ImageGalleryItem = ({ image, largeImage, alt }) => {
  const [showModal, setShowModal] = useState(false);

  return (
      <GalleryItem>
  <ImageItem src={image} alt={alt} onClick={() => setShowModal(true)}/>
  {showModal && (
      <Modal largeImage={largeImage} alt={alt} onClose={() => setShowModal(false)}/>
    )}
</GalleryItem>
)
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export { ImageGalleryItem }