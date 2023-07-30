import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  IconStyle,
} from './Searchbar.styled';

const Searchbar = ({onSubmit}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchbarChange = event => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  
  const handleSubmit = event => {
    event.preventDefault();

    if (searchTerm.trim() === '') {
      return;
    }

    onSubmit(searchTerm);
    // setSearchTerm('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <IconStyle />
        </SearchFormBtn>

        <SearchFormInput
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={handleSearchbarChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export { Searchbar };
