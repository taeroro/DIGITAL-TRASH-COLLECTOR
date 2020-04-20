import React, { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

import './App.css';


function App() {
  const canvas = useRef(null);

  useEffect(() => {

    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      view: canvas.current,
      antialias: true
    });
    const { stage } = app;

    // prepare circle texture, that will be our brush
    const brush = new PIXI.Graphics();
    brush.beginFill(0xffffff);
    brush.drawCircle(0, 0, 50);
    brush.endFill();

    // pixi setup
    function setup(loader, resources) {
      app.stage.interactive = true;
      app.stage.on('pointerdown', pointerDown);
      app.stage.on('pointerup', pointerUp);
      app.stage.on('pointermove', pointerMove);

      let dragging = false;

      function pointerMove(event) {
        if (dragging) {
            brush.position.copyFrom(event.data.global);
            app.renderer.render(brush, renderTexture, false, null, false);
        }
      }

      function pointerDown(event) {
        dragging = true;
        pointerMove(event);
      }

      function pointerUp(event) {
        dragging = false;
      }
    }


  }, [])


  return (
    <div className="App">
      <canvas
       ref={canvas}
     />
    </div>
  );
}

export default App;
