import React, { useState, useEffect } from 'react';
import './SceneIntro.css';

function SceneIntro({ sceneManager }) {

  useEffect(() => {
    // componentDidMount

    return () => {
      // componentWillUnmount
    }
  });

  const handleScene = (option) => {
    if (option === "yes") {
      sceneManager("next");
    }
    else if (option === "no") {
      sceneManager("init");
    }
    else {
      console.log("scene intro bt error");
    }
  }

  return (
    <div className="scene-intro">
      <h1>
        - Do you want to bring the files in your computer trash can to life?
      </h1>

      <div className="dialog-intro-bt-container">
        <div className="yes-bt" onClick={() => handleScene("yes")}>
          <span>Yes</span>
        </div>
        <div className="no-bt" onClick={() => handleScene("no")}>
          <span>No</span>
        </div>
      </div>
    </div>
  );
}

export default SceneIntro;
