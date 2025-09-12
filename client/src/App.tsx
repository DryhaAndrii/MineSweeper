import React from 'react';
import Field from './components/field/field';
import DifficultPanel from './components/difficultPanel/difficultPanel';
import VersionSwitcher from './components/versionSwitcher/versionSwitcher';
import './components/versionSwitcher/versionSwitcher.scss';

function App() {
  return (
    <div className='minesweeper'>
      <header className='game-header'>
        <div className='header-content'>
          <div className='title-section'>
            <h1 className='game-title'>
              <span className='title-icon'>💣</span>
              Minesweeper
            </h1>
            <p className='game-subtitle'>Classic puzzle game with modern design</p>
          </div>
          <VersionSwitcher />
        </div>
      </header>

      <DifficultPanel />
      <Field />
    </div>
  );
}

export default App;
