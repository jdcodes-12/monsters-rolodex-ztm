import { Component } from 'react';

// CSS will be bundled & applicable to every element
// Watch for name collisions. 
import './searchbox.styles.css'; 

class SearchBox extends Component {
  render() {  
    const { className, placeholder, onChangeHandler } = this.props;

    return (
      <input  type="search"
              className={`search-box ${className}`}
              placeholder={placeholder}
              onChange={onChangeHandler}
      />
    )   
  }
}

export default SearchBox;