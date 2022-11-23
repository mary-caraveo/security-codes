import React from 'react';
import { UseState } from './components/UseState';
import { UseReducer } from './components/UseReducer';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>React.js: Manejo Profesional del Estado</h1>
      <div className="content-app">
        <UseState name="Use State" />
        <UseReducer name="Use reducer" />
      </div>
    </div>
  );
}

export default App;
