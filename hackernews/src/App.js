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
  // It is mandatory to call super(props);. It sets this.props in your constructor in case you want to access them there. They would be undefined when accessing this.props in your constructor otherwise.
  constructor(props) {
    super(props);

    this.state = {
      list,
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  // The render() method has to be overridden, because it defines the output of a React Component, so it must be defined.
  render() {
    return (
        //  Every time you change your component state, the render() method of your component will run again.
      <div className="App">
        {this.state.list.map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              {/* As you can see, the onDismiss() method in the onClick handler is enclosed by an arrow function. You can use it to peek at the objectID property of the item object and identify the item to be dismissed. An alternative way would be to define the function outside of the onClick handler and only pass the defined function to it. 
              The this object is your class instance*/}
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default App;

// What you experienced is the unidirectional data flow of React. An action is triggered in the view layer with onClick(), a function or class method modifies the local component state, and then the render() method of the component runs again to update the view.

// You can remove the block body, the curly braces, with the ES6 arrow function. In a concise body, an implicit return is attached; thus, you can remove the return statement. This will happen often in this book, so be sure to understand the difference between a block body and a concise body when using arrow functions.