import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
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
      <Typewriter
        options={{
          delay: 20
        }}
        onInit={(typewriter) => {
        typewriter
          .typeString('- Upload your digital trash(images only) to recylce')
          .start();
        }}
      />

      {/* <h1>
        - Upload your digital trash(images only) to recylce
      </h1> */}
      <p>
        The images will be <u>pixelated</u> to protect your privacy
      </p>



      <div className="dialog-intro-bt-container">
        <div className="yes-bt" onClick={() => handleScene("yes")}>
          <span>Next</span>
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
