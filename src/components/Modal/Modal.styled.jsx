import styled from 'styled-components';

export const Backdroup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const Modals = styled.div`
  max-width: 75vw;
  max-height: 75vh;
  position: relative;
`;
export const LargeImage = styled.img`
  max-width: 75vw;
  max-height: 75vh;
  object-fit: cover;
`;

export const BtnClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 4px;
  color: white;
  background-color: rgba(100, 100, 100, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
`;
