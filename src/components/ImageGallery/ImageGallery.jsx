import PropTypes from 'prop-types';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryList } from "./ImageGallery.styled";

const ImageGallery = ({ photos, onImageClick }) => {
        return (
<GalleryList>
  {photos.map(({id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem key={id} image={webformatURL} largeImage={largeImageURL} onImageClick={onImageClick} alt={tags}/>
        ))}
</GalleryList>
        )
    }

    ImageGallery.propTypes = {
        photos: PropTypes.array,
        onImageClick: PropTypes.func,
    }

export { ImageGallery }