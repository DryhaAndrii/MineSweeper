import React from 'react';
import axios from 'axios';
function App() {
  async function button() {
    const response = await axios.get('http://localhost:7070/users');
    console.log(response);
  }
  return <button onClick={button}>kek</button>;
}

export default App;
