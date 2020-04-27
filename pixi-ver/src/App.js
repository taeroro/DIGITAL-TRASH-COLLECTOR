import React, { useState, useEffect } from 'react';
import './App.css';

import DrawingCanvas from './component/DrawingCanvas';
import SceneIntro from './component/SceneIntro';
import ImageUploader from './component/ImageUploader';

function App() {
  const [scene, setScene] = useState(1);

  useEffect(() => {
    // componentDidMount

    return () => {
      // componentWillUnmount
    }
  });

  const sceneHandler = (val) => {
    switch (val) {
      case "next":
        setScene(scene + 1);
        break;
      case "back":
        setScene(scene - 1);
        break;
      default:
        setScene(0);
    }
  }

  const renderScene = () => {
    switch (scene) {
      case 0:

        break;
      case 1:
        return (<SceneIntro sceneManager={sceneHandler} />);
      case 2:
        return (<ImageUploader sceneManager={sceneHandler} />)
      case 5:
        return (<DrawingCanvas />);

      default:

    }
  }

  return (
    <div className="App">
      {renderScene()}
    </div>
  );
}

export default App;
