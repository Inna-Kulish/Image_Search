import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { api } from 'http';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { LoadMore } from 'components/LoadMore/LoadMore';
import { Container } from 'components/App/App.styled';

export class App extends Component {
  state = {
    searchRequest: '',
    photos: [],
    isLoading: false,
    showModal: false,
    modalImageURL: '',
    page: 1,
    showLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchRequest !== this.state.searchRequest) {
      console.log('yes');
      this.setState({ isLoading: true, showLoadMore: false });
     this.getImage();
    }

    if (prevState.page !== this.state.page) {
       this.getImage();
    }
  }

  getImage = async () => {
const { searchRequest, page, photos } = this.state;

    try {
      const result = await api.get(
        `?q=${searchRequest}&page=${page}`
      );
      
      const { hits, totalHits } = result.data;
      const totalPages = Math.ceil(totalHits / 12);

      this.setState({
        photos: [...photos, ...hits],
        isLoading: false,
        showLoadMore: true,
      });

      this.errorCustomize(hits.length, result.status, totalPages)
    } catch (error) {
      console.log(error);
      return toast.error(`Failed, try later`);
    }
  }

  errorCustomize = (arrayLength, statusCode, totalPages) => {
    if (arrayLength === 0) {
      this.setState({ showLoadMore: false });
      return toast.error(`No results found for ${this.state.searchRequest}`);
    }

    if (statusCode === 404) {
      this.setState({ showLoadMore: false });
      return toast.error('Failed, try later');
    }

    if (totalPages <= this.state.page) {
      this.setState({ showLoadMore: false }); 
      return toast.error("We're sorry, but you've reached the end of search results.");
    }
  };

  handleFormSubmit = searchRequest => {
    this.setState({ searchRequest, photos: [], page: 1 });
  };

  openModal = imageURL => {
    this.setState({ showModal: true, modalImageURL: imageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImageURL: '' });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { photos, isLoading, showModal, modalImageURL, showLoadMore } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {photos.length !== 0 && (
          <ImageGallery photos={photos} onImageClick={this.openModal} />
        )}
        {showLoadMore && <LoadMore onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal onClose={this.closeModal} largeImage={modalImageURL} />
        )}
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}
