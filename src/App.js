import React, { useCallback } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import { useImageGallery } from './hooks/useImageGallery';
import { usePixabayAPI } from './hooks/usePixabayAPI';
import './App.css';

function App() {
  const {
    query,
    images,
    page,
    isLoading,
    showModal,
    largeImageURL,
    setQuery,
    addImages,
    setImages,
    setLoading,
    openModal,
    closeModal,
    loadMoreImages,
    shouldShowLoadMore,
  } = useImageGallery();

  const handleImagesLoaded = useCallback((newImages, currentPage) => {
    if (currentPage === 1) {
      setImages(newImages);
    } else {
      addImages(newImages);
    }
  }, [setImages, addImages]);

  usePixabayAPI({
    query,
    page,
    onImagesLoaded: handleImagesLoaded,
    setLoading,
  });

  return (
    <div>
      <Searchbar onSubmit={setQuery} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {shouldShowLoadMore && <Button onClick={loadMoreImages} />}
      {showModal && <Modal image={largeImageURL} onClose={closeModal} />}
    </div>
  );
}

export default App;
