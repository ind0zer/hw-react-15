import React, { useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1300;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  background: transparent;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
`;

const ModalImg = styled.img`
  display: block;
  max-width: 100%;
  max-height: 90vh;
`;

function Modal({ image, onClose }) {
  useEffect(() => {
    const handleEsc = e => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBox>
        <ModalImg src={image} alt="Large preview" />
      </ModalBox>
    </Overlay>
  );
}

export default Modal; 