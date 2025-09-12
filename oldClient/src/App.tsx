import React from 'react';
import Field from './components/field/field';
import DifficultPanel from './components/difficultPanel/difficultPanel';
function App() {
  return (
    <div className='minesweeper'>
      <DifficultPanel />

      <Field />
    </div>
  );
}

export default App;
