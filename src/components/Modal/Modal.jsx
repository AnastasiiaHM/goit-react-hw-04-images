import { Backdroup, LargeImage, Modals, BtnClose } from './Modal.styled';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { TfiClose } from 'react-icons/tfi';

const modalRoot = document.querySelector('#modalRoot');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, largeImage, alt } = this.props;
    return createPortal(
      <Backdroup onClick={this.handleBackdropClick}>
        <Modals>
          <LargeImage src={largeImage} alt={alt} />
          <BtnClose type="button" aria-label="Close" onClick={onClose}>
            <TfiClose />
          </BtnClose>
        </Modals>
      </Backdroup>,

      modalRoot
    );
  }
}
