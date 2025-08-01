import React, { useCallback } from 'react';
import styled from 'styled-components';

const GalleryItem = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2),
    0px 1px 1px rgba(0, 0, 0, 0.14),
    0px 2px 1px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  cursor: pointer;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const GalleryImg = styled.img`
  width: 100%;
  height: 260px;
  display: block;
`;

const ImageGalleryItem = React.memo(function ImageGalleryItem({ webformatURL, largeImageURL, tags, onClick }) {
  const handleClick = useCallback(() => {
    onClick(largeImageURL);
  }, [largeImageURL, onClick]);

  return (
    <GalleryItem onClick={handleClick}>
      <GalleryImg src={webformatURL} alt={tags} />
    </GalleryItem>
  );
});

export default ImageGalleryItem; 