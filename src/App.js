import { Component } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/searchbox/searchbox.component';

/*
  "Render & Re-Render Flow"
  Class Component Lifecycle (Execution Order):
    1. constructor 
    2. render()
    3. Lifecycle Method: componentDidMount()
    4. Lifecycle Method: 
*/

class App extends Component {
  constructor() {
    super();

    /*
      Important: ReactDOM uses the `key` or `id` value to know what to rerender an element. This means that React will ONLY rerender what has changed & not the whole component. This increases performance by reducing what needs to be rerendered. (Keeping call stack clean). 

      React will hide the key value when converting to HTML. It's only needed for React, not HTML.
    */
    this.state = {
      monsters: [],
      searchField: '', // ADd this prop to state to not modify original list
    }
    console.log('constructor');
  }

  /* Used to setup intial state once the component is mounted. Mounting = intially put on the DOM. This event only happens once*/
  componentDidMount() {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(monsterData => {
        this.setState(
          () => {
            return { monsters: monsterData};
          },
          () => {
            console.log(this.state);
          }
        );
      });
  }

  // Move to onSearchChagnge; preventing unncessary
  // memory allocation (won't create anon func over & over
  // each time the component is rendered)
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    
    // Shallow Merge
    this.setState(() => {
      return { searchField } // shorthand prop setting
    });
  }
  

  render() {
    console.log('render');

    // Destructure for readability
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <input type="search"
                className='search-box'
                placeholder='search monster catalog'
                onChange={onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;

/*
  When modifying an Array, make sure to keep
  the structure of the original array - "Immutable"

  This means, DONT modify the array (or other DS) in state! 
  Do it else where.
*/