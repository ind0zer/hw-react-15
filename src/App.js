import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import './App.css';

const API_KEY = '48387831-a27bd27e818d37c055dee1b6c';
const PER_PAGE = 12;

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const apiUrl = useMemo(() => {
    if (!query) return '';
    return `https://pixabay.com/api/?q=${encodeURIComponent(query)}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
  }, [query, page]);

  useEffect(() => {
    if (!apiUrl) return;
    setIsLoading(true);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setImages(prev => (page === 1 ? data.hits : [...prev, ...data.hits]));
      })
      .finally(() => setIsLoading(false));
  }, [apiUrl, page]);

  const handleSearch = useCallback((newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  }, [query]);

  const handleLoadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const openModal = useCallback((url) => {
    setLargeImageURL(url);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setLargeImageURL('');
  }, []);

  const shouldShowLoadMore = useMemo(() => {
    return images.length > 0 && !isLoading;
  }, [images.length, isLoading]);

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {shouldShowLoadMore && <Button onClick={handleLoadMore} />}
      {showModal && <Modal image={largeImageURL} onClose={closeModal} />}
    </div>
  );
}

export default App;
