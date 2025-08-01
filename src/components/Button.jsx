import React from 'react';
import styled from 'styled-components';

const LoadMoreButton = styled.button`
  padding: 8px 16px;
  border-radius: 2px;
  background-color: #3f51b5;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: block;
  margin: 20px auto;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover,
  &:focus {
    background-color: #303f9f;
  }
`;

const Button = React.memo(function Button({ onClick }) {
  return (
    <LoadMoreButton type="button" onClick={onClick}>
      Load more
    </LoadMoreButton>
  );
});

export default Button; 