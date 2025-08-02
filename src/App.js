import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import './App.css';

const API_KEY = '48387831-a27bd27e818d37c055dee1b6c';
const PER_PAGE = 12;

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: ''
  };

  componentDidUpdate(prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      if (!this.state.query) return;
      this.fetchImages();
    }
  }

  fetchImages = () => {
    this.setState({ isLoading: true });
    fetch(
      `https://pixabay.com/api/?q=${encodeURIComponent(this.state.query)}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({
          images: this.state.page === 1 ? data.hits : [...prevState.images, ...data.hits],
          isLoading: false
        }));
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearch = newQuery => {
    if (newQuery === this.state.query) return;
    this.setState({
      query: newQuery,
      page: 1,
      images: []
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  };

  openModal = url => {
    this.setState({
      largeImageURL: url,
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: ''
    });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && <Button onClick={this.handleLoadMore} />}
        {showModal && <Modal image={largeImageURL} onClose={this.closeModal} />}
      </div>
    );
  }
}

export default App;
