import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfiled] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users));
  }, [])

  const onSearchChange = (event) => {
    setSearchfiled(event.target.value);
  }

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return !robots.length ?
    <h1 className='tc'> Loading ... </h1> :
    (
      <div className='tc' >
        <h1> Robo Friends </h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
}

export default App;
