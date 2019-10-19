import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

// The Component class encapsulates all the implementation details of a React component, which allows developers to use classes as components in React.
// Methods exposed by a React Component are its public interface.
class App extends Component {
  // The render() method has to be overridden, because it defines the output of a React Component, so it must be defined.
  render() {
    return (
      <div className="App">
        {list.map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        )}
      </div>
    );
  }
}

export default App;

// You can remove the block body, the curly braces, with the ES6 arrow function. In a concise body, an implicit return is attached; thus, you can remove the return statement. This will happen often in this book, so be sure to understand the difference between a block body and a concise body when using arrow functions.