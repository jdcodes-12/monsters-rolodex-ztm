import { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/searchbox/searchbox.component';


const App = () => {
  const [monstersList, setMonstersList] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monstersList);
  const [searchField, setSearchField] = useState('');

  console.log('render');
  console.log(searchField);

  // infinite re-rendering of the FC, if no side effect is used.
  // need to utilize useEffect(). This is b/c fetching from external
  // source will always send an array of data in NEW MEMORY (even if
  // the data is the same). The state is pointed to the new memory. 
  // casuing state to update & re-render the entire FC, over and over.

  // fetch('https://jsonplaceholder.typicode.com/users')
  //   .then((response) => response.json())
  //   .then((users) => setMonstersList(users));

  // Trigger on mount. Then only use this function when the state
  // when needed again. In this case, don't need to retrigger, so 
  // put an empty array
  useEffect(() => {
    console.log('fetch effect fire');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonstersList(users));
  }, []);

  useEffect(() => {
    console.log('filter effect fired');
    const newFilteredMonsters = monstersList.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })

    setFilteredMonsters(newFilteredMonsters);
  }, [monstersList, searchField]);
   // filter monsters only if `monsters` or `searchField` changes

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString); // set searchField
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox type="search"
                 className='monsters-search-box'
                 placeholder='search monster catalog'
                 onChange={onSearchChange}
      />
      <CardList monsters={filteredMonsters}/>
    </div>
  )
}

export default App;

/*

  FC have no lifecycle methods like class (e.g. componentDidMount, componentUnmount, etc.). FC, when used with hooks, are impure functions that use side effects to modify state.
  
  Pure functions & Impure functions:

  **Pure** = returns exact samething, when given same args.
  **Impure** = affects/modifies something outside the function block (side effect).

  FC are rendered everytime state or props change. All the code in the function is re-rendered, not just the return piece. Cannot rerun single parts of a FC. The whole function will rerun.
*/