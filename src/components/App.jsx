import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from 'http';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { LoadMore } from 'components/LoadMore/LoadMore';
import { Container } from 'components/App/App.styled';

function App() {
  const [photos, setPhotos] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!searchRequest) {
      return;
    }

    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const result = await api.get(`?q=${searchRequest}&page=${page}`);
  
        const { hits, totalHits } = result.data;
        const totalPages = Math.ceil(totalHits / 12);
  
        setPhotos(prevPhotos => [...prevPhotos, ...hits]);
        setShowLoadMore(true);
  
        errorCustomize(hits.length, result.status, totalPages);
      } catch (error) {
        console.log(error);
        return toast.error(`Failed, try later`);
      } finally {
        setIsLoading(false);
      }
    }

   fetchPhotos();
  }, [searchRequest, page]);


  function errorCustomize(arrayLength, statusCode, totalPages) {
    if (arrayLength === 0) {
      setShowLoadMore(false);
      return toast.error(`No results found for ${searchRequest}`);
    }

    if (statusCode === 404) {
      setShowLoadMore(false);
      return toast.error('Failed, try later');
    }

    if (totalPages <= page) {
      setShowLoadMore(false);
      return toast.error(
        "We're sorry, but you've reached the end of search results."
      );
    }
  }

  const handleFormSubmit = query => {
    if (searchRequest === query) {
      return;
    }

    setShowLoadMore(false);
    setSearchRequest(query);
    setPhotos([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {photos.length !== 0 && <ImageGallery photos={photos} />}
      {showLoadMore && <LoadMore onClick={handleLoadMore} />}
      <ToastContainer autoClose={2000} />
    </Container>
  );
}

export { App };
