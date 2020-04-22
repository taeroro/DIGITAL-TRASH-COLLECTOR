import React, { useState, useEffect } from 'react';
import './App.css';

import DrawingCanvas from './component/DrawingCanvas'

function App() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    // componentDidMount

    return () => {
      // componentWillUnmount
    }
  });

  return (
    <div className="App">
      <DrawingCanvas />
    </div>
  );
}

export default App;
