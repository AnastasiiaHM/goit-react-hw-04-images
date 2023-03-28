import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery, Sorry } from './ImageGallery.styled';
import { Audio } from 'react-loader-spinner';
// import PropTypes from 'prop-types';

export function ImageGallery({ hits, status }) {
  if (status === 'idle') {
    return <Sorry>Hi! Please enter your request!</Sorry>;
  }

  if (status === 'rejected') {
    return <Sorry>Sorry but we dont find image for you :(</Sorry>;
  }
  return (
    <>
      <Gallery>
        {hits.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              alt={tags}
              largeImage={largeImageURL}
            />
          );
        })}
      </Gallery>
      {status === 'pending' && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        />
      )}
    </>
  );
}

// ImageGallery.PropTypes = {
//   hits: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       webformatURL: PropTypes.string.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//     })
//   ),
//   status: PropTypes.string.isRequired,
// };
