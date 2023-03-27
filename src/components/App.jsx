import { Component } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';

import { SearchBar } from './SearchBar/SearchBar';
import { SearchForm } from './SearchForm/SearchForm';
import { ToastContainer } from 'react-toastify';
import css from '../components/App.module.css';

export class App extends Component {
  state = {
    inputValue: '',
  };
  handleSubmitForm = inputValue => {
    console.log(this.state.inputValue);
    this.setState({ inputValue });
  };
  render() {
    return (
      <div className={css.App}>
        <SearchBar>
          <SearchForm onChange={this.handleSubmitForm} />
        </SearchBar>

        <ImageGallery inputValue={this.state.inputValue} />

        <ToastContainer />
      </div>
    );
  }
}
