import { Component } from 'react';
import {
  Form,
  SearchFormBtn,
  SearchFormlabel,
  SearchFormInput,
} from './SearchForm.styled';
import { FcSearch } from 'react-icons/fc';

export class SearchForm extends Component {
  state = {
    inputValue: '',
  };

  handleChageInputValue = e => {
    this.setState({ inputValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmitForm = e => {
    e.preventDefault();

    this.props.onChange(this.state.inputValue);

    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmitForm}>
        <SearchFormBtn type="submit">
          <FcSearch />
          <SearchFormlabel>Search</SearchFormlabel>
        </SearchFormBtn>

        <SearchFormInput
          name="value"
          required
          value={this.state.inputValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleChageInputValue}
        />
      </Form>
    );
  }
}
