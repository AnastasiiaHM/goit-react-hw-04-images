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
      setStatus('pending');
      try {
        const response = await getImages(inputValue, page);
        const data = response.data.hits;
        if (page > 1) {
          setHits(prev => [...prev, ...data]);
        }
        setHits(data);
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
  if (status === 'pending') {
    return (
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
      />
    );
  }
  if (status === 'response') {
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
        {pagesQuantity > 1 && <BtnLoadMore onClick={handleClickLoadMore} />}
      </>
    );
  }
  if (status === 'rejected') {
    return <Sorry>Sorry but we dont find image for you :(</Sorry>;
  }
}
