import React, { useState, useEffect } from 'react';
import './ImageUploader.css';

function ImageUploader({ sceneManager }) {

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
      sceneManager("back");
    }
    else {
      console.log("scene intro bt error");
    }
  }

  return (
    <div className="scene-image-upload">
      <h1>
        - Upload your digital trash(images only) to recylce
      </h1>
      <p>
        The images will be pixelated to protect your privacy
      </p>

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

export default ImageUploader;
