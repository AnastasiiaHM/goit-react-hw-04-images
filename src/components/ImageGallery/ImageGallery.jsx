import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState, useEffect } from 'react';
import { Gallery, Sorry } from './ImageGallery.styled';
import { BtnLoadMore } from '../BtnLoadMore/BtnLoadMore';
import { Audio } from 'react-loader-spinner';
import { getImages } from 'Services/imageSevice';

export function ImageGallery({ inputValue }) {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPageQuantity] = useState(1);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!inputValue) return;

    async function fetchImages() {
      try {
        setStatus('pending');
        const response = await getImages(inputValue, page);
        const data = response.data.hits;

        if (page > 1) {
          setHits(prev => [...prev, ...data]);
        } else {
          setHits(data);
        }
        setPageQuantity(() => response.data.total / 12);
        setStatus('response');
      } catch {
        setStatus('rejected');
      }
    }

    fetchImages();
  }, [inputValue, page]);

  const handleClickLoadMore = () => {
    setPage(prev => prev + 1);
  };

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
      {pagesQuantity > 1 && <BtnLoadMore onClick={handleClickLoadMore} />}
    </>
  );
}
