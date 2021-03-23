import styled, { keyframes } from 'styled-components';

const LoadingKeyFrame = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

export const Loading = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100px;
  width: 100px;
  margin: -50px 0 0 -50px;
  border: 3px solid transparent;
  border-top-color: #333;
  border-radius: 50%;
  animation: ${LoadingKeyFrame} 2s linear infinite;
  
  &:before {
    content: "";
    position: absolute;
    top: 7px;
    right: 7px;
    bottom: 7px;
    left: 7px;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: #999;
    animation: ${LoadingKeyFrame} 1.5s linear infinite;
  }

  &:after {
    content: "";
    position: absolute;
    top: 15px;
    right: 15px;
    bottom: 15px;
    left: 15px;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: #ccc;
    animation: ${LoadingKeyFrame} 2s linear infinite;
  }
`;
