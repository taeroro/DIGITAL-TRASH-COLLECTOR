import React, { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

import './DrawingCanvas.css';

function DrawingCanvas() {
  const canvas = useRef(null);

  useEffect(() => {
    let canvasSize = 0;
    const sizeMultiplier = 1;
    const gridSizeMultiplier = 50;
    const gridMaxRowCount = 100;
    let gridSize = 0;
    const gridSqr = [];

    // calculate the size of the canvas
    if (window.innerWidth >= window.innerHeight) {
      canvasSize = window.innerHeight * sizeMultiplier;
      gridSize = window.innerHeight / gridSizeMultiplier;
    }
    else {
      canvasSize = window.innerWidth * sizeMultiplier;
      gridSize = window.innerWidth / gridSizeMultiplier;
    }

    console.log(canvasSize);
    console.log(gridSize);

    const app = new PIXI.Application({
      width: canvasSize,
      height: canvasSize,
      view: canvas.current,
      antialias: true
    });
    const { stage } = app;


    // draw grid
    for (let y = 0; y < canvasSize / gridSize; y++) {
      let row = [];
      for (let x = 0; x < canvasSize / gridSize; x++) {
        row[x] = new PIXI.Graphics();
        row[x].beginFill(0x000000);
        row[x].lineStyle(0.5, 0xffffff, 0.2);
        row[x].drawRect(x * gridSize, y * gridSize, gridSize, gridSize);
        row[x].endFill();
        // gridSqr.interactive = true;
        // gridSqr.on('pointerdown', pointerDown);
        // gridSqr.on('pointerup', pointerUp);
        // gridSqr.on('pointermove', pointerMove);

        stage.addChild(row[x]);
      }
      gridSqr[y] = row;
    }

    app.loader.load(setup);

    // app setup
    function setup(loader, resources) {
      stage.interactive = true;
      stage.on('pointerdown', pointerDown);
      stage.on('pointerup', pointerUp);
      stage.on('pointermove', pointerMove);

      let dragging = false;

      function pointerMove(event) {
        if (dragging) {
          let pX = Math.trunc(event.data.global.x / gridSize);
          let pY = Math.trunc(event.data.global.y / gridSize);

          if (pX < canvasSize / gridSize && pY < canvasSize / gridSize) {
            gridSqr[pY][pX].clear();

            gridSqr[pY][pX] = new PIXI.Graphics();
            gridSqr[pY][pX].beginFill(0xffffff);
            gridSqr[pY][pX].lineStyle(0.5, 0xffffff, 0.2);
            gridSqr[pY][pX].drawRect(pX * gridSize, pY * gridSize, gridSize, gridSize);
            gridSqr[pY][pX].endFill();

            stage.addChild(gridSqr[pY][pX]);
          }
          else {
            dragging = false;
          }
        }
      }

      function pointerDown(event) {
        // console.log(event.data.global);

        dragging = true;
        pointerMove(event);
      }

      function pointerUp(event) {
        dragging = false;
      }
    }

  }, [])

  return (
    <div className="scene-1">
      <canvas ref={canvas} />

      <div className="dialog-1-container">
        <h1>← Paint your digital organism</h1>
        <p>Tip: draw slower</p>

        <div className="dialog-1-bt">
          <span>I'm Finished</span>
        </div>
      </div>
    </div>

  );
}

export default DrawingCanvas;
