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
    // If you want to access this.state in your class method, it cannot be retrieved because this is undefined. To make this accessible in your class methods, you have to bind the class methods to this.
    this.onDismiss = this.onDismiss.bind(this);
  }

  // The constructor is only there to instantiate your class with all its properties, so the business logic of class methods should be defined outside the constructor
  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  // Class methods can be auto-bound using JavaScript ES6 arrow functions:
  onClickMe = () => {
    console.log(this);
  }
  // The official React documentation sticks to the class method bindings in the constructor

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
              {/* Not putting the method inside an arrow function wouldn't work, because the class method would be executed immediately when you open the application in the browser: */}
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
              {/* When using onClick={doSomething()}, the doSomething() function executes immediately when the application is opened in a browser. The expression in the handler is evaluated. Since the returned value of the function isn’t a function anymore, nothing would happen when you click the button. But using onClick={doSomething} where doSomething is a function, it would only be executed if the button is clicked. */}
              {/* However, using onClick={this.onDismiss} wouldn’t suffice, because the item.objectID property needs to be passed to the class method to identify the item that should be dismissed. We wrap it into another function to sneak in the property. This concept is called higher-order functions */}
              <button
                onClick={this.onClickMe}
                type="button"
              >
                Console Log
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

// A function has to be passed to the element’s handler. As an example, 'onClick={console.log(item.objectID)}' - This method will run when you open the application in the browser, but not when you click the button'

// The following code would only run when you click the button, a function that is executed when you trigger the handler:

// <button
//   onClick={() => console.log(item.objectID)}
//   type="button"
// ></button>

// You should end up with an inlined JavaScript ES6 arrow function with access to the objectID property of the item object.

// Using arrow functions in event handlers directly impacts your application’s performance. For instance, the onClick handler for the onDismiss() method wraps the method in another arrow function to pass the item identifier. Every time the render() method runs, the handler instantiates the higher-order arrow function. It can have an impact on your application performance, but in most cases you won’t notice. If you have a huge table of data with 1000 items and each row or column has an arrow function in an event handler, it is worth thinking about the performance implications.

// so you could implement a dedicated Button component to bind the method in the constructor (of the button component only once). Before that, though, it is premature optimization, and it is more prudent to learn the basics of React before thinking about optimization.