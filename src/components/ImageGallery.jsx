import React, { Component } from 'react';
import styled from 'styled-components';
import ImageGalleryItem from './ImageGalleryItem';

const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

class ImageGallery extends Component {
  render() {
    return (
      <Gallery>
        {this.props.images.map(image => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onClick={this.props.onImageClick}
          />
        ))}
      </Gallery>
    );
  }
}

export default ImageGallery; 