import { useState } from 'react';
import {
  Form,
  SearchFormBtn,
  SearchFormlabel,
  SearchFormInput,
} from './SearchForm.styled';
import { FcSearch } from 'react-icons/fc';

export function SearchForm({ onChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleChageInputValue = e => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    onChange(inputValue);

    setInputValue('');
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <SearchFormBtn type="submit">
        <FcSearch />
        <SearchFormlabel>Search</SearchFormlabel>
      </SearchFormBtn>

      <SearchFormInput
        name="value"
        required
        value={inputValue}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleChageInputValue}
      />
    </Form>
  );
}
