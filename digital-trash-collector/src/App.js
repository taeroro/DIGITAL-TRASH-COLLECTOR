import React, { Component } from 'react';
import p5 from 'p5';
import SceneManager from 'p5.scenemanager';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.myRef = React.createRef();
  }


  // **********
  // p5 wrapper
  // https://dev.to/christiankastner/integrating-p5-js-with-react-i0d
  // **********
  Sketch = (p) => {
    let currentScene = -1;

    let grid = 20;
    let gridOffset = grid / 2;

    let currentPath = [];
    let pathHistory = [];

    // ############
    // setup
    // ############
    p.setup = () => {
      p.createCanvas(this.state.width, this.state.height);
      p.background(255);

      // Draw grid
      let l = 0;
      p.strokeWeight(0.5);
      p.stroke(150);

      while (l < p.width || l < p.height) {
        p.line(0, l, p.width, l);
        p.line(l, 0, l, p.height);
        l += grid;
      }

      let sceneBt = p.createButton('NEXT SCENE');
      sceneBt.position(10, 10);
      sceneBt.mousePressed(drawScene1);

      console.log("Scene #" + currentScene);
    }

    // ############
    // draw
    // ############
    p.draw = () => {
      drawScene0();
    }


    // ############
    // Scene 0 - 8 bit drawing canvas
    // ############
    let drawScene0 = function() {
      currentScene = 0;

      p.strokeWeight(grid);
      p.strokeCap(p.PROJECT);
      p.stroke(0, 0, 0);

      if (p.mouseIsPressed) {
        // console.log("start");
        let x = snap(p.mouseX);
        let y = snap(p.mouseY);
        let px = snap(p.pmouseX);
        let py = snap(p.pmouseY);

        saveCoord(x, y, currentPath);

        if (x !== px || y !== py) {
          p.line(px, py, px, py);
          p.line(x, y, x, y);
        }
        else {
          p.line(px, py, x, y);
        }
      }
      else {
        pathHistory.push(currentPath);
        currentPath = [];
      }
    }

    // ############
    // Scene 1 -
    // ############
    let drawScene1 = function() {
      currentScene = 1;

      console.log("new");

    }



    // ***************
    // p5 snap to grid
    // https://editor.p5js.org/crhallberg/sketches/SJrrLGiYM
    // ***************
    let snap = function(op) {
      // subtract offset (to center lines) divide by grid to get row/column
      // round to snap to the closest one
      let cell = Math.round((op - gridOffset) / grid);

      // multiply back to grid scale add offset to center
      return cell * grid + gridOffset;
    }

    let saveCoord = function(xVal, yVal, arr) {
      const found = arr.some(el => el.x === xVal && el.y === yVal);
      if (!found) {
        arr.push({ x: xVal, y: yVal });

        console.log(arr);
      }
    }

    let handleUndo = function() {
      if (pathHistory.length !== 0) {
        // this.Sketch.clearCanvas();
      }
    }
  }


  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  render() {
    return (
      <div className="App">
        <div className="drawing-canvas" ref={this.myRef}></div>

        {/* <div className="drawing-tools">
          <h1>Tools</h1>

          <div className="drawing-undo-bt" onClick={this.handleUndo}>
            <span>UNDO</span>
          </div>

        </div> */}
      </div>
    );
  }
}

export default App;
