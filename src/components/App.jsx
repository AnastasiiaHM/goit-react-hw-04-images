import { useState, useEffect } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'Services/imageSevice';
import { SearchBar } from './SearchBar/SearchBar';
import { SearchForm } from './SearchForm/SearchForm';
import { ToastContainer } from 'react-toastify';
import { BtnLoadMore } from './BtnLoadMore/BtnLoadMore';
import css from '../components/App.module.css';

export default function App() {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPageQuantity] = useState(1);
  const [status, setStatus] = useState('idle');
  const [inputValue, setInputValue] = useState('');

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

  const searchReset = inputValue => {
    setPage(1);
    setHits([]);
    setInputValue(inputValue);
  };

  return (
    <div className={css.App}>
      <SearchBar>
        <SearchForm onChange={searchReset} />
      </SearchBar>

      <ImageGallery hits={hits} status={status} />
      {pagesQuantity > 1 && <BtnLoadMore onClick={handleClickLoadMore} />}
      <ToastContainer />
    </div>
  );
}
