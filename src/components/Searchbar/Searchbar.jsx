import { Component } from "react";
import PropTypes from 'prop-types';
import { SearchbarHeader, SearchForm, SearchFormBtn, SearchFormInput, IconStyle } from "./Searchbar.styled";

class Searchbar extends Component {
    state = {
searchTerm: '',
    }

    handleSearchbarChange = (event) => {
this.setState({ searchTerm: event.currentTarget.value.toLowerCase() });
    }

    handleSubmit = (event) => {
event.preventDefault();
const { searchTerm } = this.state;

if(searchTerm.trim() === '') {
  return;
}

this.props.onSubmit(searchTerm);
this.setState({searchTerm: ''});
    }

   render() {
    return (
    <SearchbarHeader>
  <SearchForm onSubmit={this.handleSubmit}>
    <SearchFormBtn type="submit">
      <IconStyle/>
    </SearchFormBtn>

    <SearchFormInput
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      type="text"
      name="searchTerm"
      value={this.state.searchTerm}
      onChange={this.handleSearchbarChange}
    />
  </SearchForm>
</SearchbarHeader>)
   } 
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}

export { Searchbar }