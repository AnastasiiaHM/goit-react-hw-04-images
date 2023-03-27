import { Component } from 'react';
import {
  ImageGalleryItems,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    modalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  render() {
    const { image, alt, largeImage } = this.props;
    return (
      <>
        <ImageGalleryItems>
          <ImageGalleryItemImage
            src={image}
            alt={alt}
            onClick={this.toggleModal}
          />
        </ImageGalleryItems>

        {this.state.modalOpen && (
          <Modal onClose={this.toggleModal} largeImage={largeImage} alt={alt} />
        )}
      </>
    );
  }
}

// export const ImageGalleyItem = ({ image, alt, largeImage, onClick }) => {
//   return (
//     <>
//       <ImageGalleryItem>
//         <ImageGalleryItemImage src={image} alt={alt} onClick={onClick} />
//       </ImageGalleryItem>

//       <Modal onClose={onClick} largeImage={largeImage} alt={alt} />
//     </>
//   );
// };
