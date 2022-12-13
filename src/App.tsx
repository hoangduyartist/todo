import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { TodoProvider } from './providers/todo.provider';
import Todo from './todo';

function App() {
  return (
    <div className="App App-header">
      {/* <header className="App-header">
        <img 
          // src={logo}
          className="App-logo" alt="logo" 
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </div>
  );
}

export default App;
