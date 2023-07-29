import PropTypes from 'prop-types';
import { GalleryItem, ImageItem } from "./ImageGalleryItem.styled"

const ImageGalleryItem = ({ image, largeImage, onImageClick, alt }) => (
    <GalleryItem>
  <ImageItem src={image} alt={alt} onClick={() => onImageClick(largeImage)}/>
</GalleryItem>
)

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onImageClick: PropTypes.func,
  alt: PropTypes.string.isRequired,
}

export { ImageGalleryItem }