import { useState } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';

import { SearchBar } from './SearchBar/SearchBar';
import { SearchForm } from './SearchForm/SearchForm';
import { ToastContainer } from 'react-toastify';
import css from '../components/App.module.css';

export default function App() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={css.App}>
      <SearchBar>
        <SearchForm onChange={setInputValue(inputValue)} />
      </SearchBar>

      <ImageGallery inputValue={inputValue} />

      <ToastContainer />
    </div>
  );
}
