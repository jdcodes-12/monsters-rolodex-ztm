// CSS will be bundled & applicable to every element
// Watch for name collisions. 
import './searchbox.styles.css'; 

const SearchBox = ({className, placeholder, onChange}) => (
  <input  type="search"
        className={`search-box ${className}`}
        placeholder={placeholder}
        onChange={onChange}
  />
);

export default SearchBox;