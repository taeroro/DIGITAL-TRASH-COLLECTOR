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
    let mgr;

    let grid = 20;
    let gridOffset = grid / 2;

    let currentPath = [];
    let pathHistory = [];

    // ############
    // setup
    // ############
    p.setup = () => {
      p.createCanvas(this.state.width, this.state.height);

      mgr = new SceneManager();

      mgr.addScene( Scene0 );
      mgr.addScene( Scene1 );

      mgr.showScene( Scene0 );

      // let sceneBt = p.createButton('NEXT SCENE');
      // sceneBt.position(10, 10);
      // sceneBt.mousePressed(drawScene1);
    }

    // ############
    // draw
    // ############
    p.draw = () => {
      mgr.draw();
    }

    p.mousePressed = () => {
      mgr.handleEvent("mousePressed");
    }

    p.keyPressed = () => {
        // You can optionaly handle the key press at global level...
        switch(p.key) {
          case '1':
            console.log('s1');
            mgr.showScene( Scene0 );
            break;
          case '2':
            console.log('s2');
            mgr.showScene( Scene1 );
            break;
        }

        // ... then dispatch via the SceneManager.
        mgr.handleEvent("keyPressed");
    }


    // ############
    // Scene 0 - 8 bit drawing canvas
    // ############
    let Scene0 = function() {
      this.enter = () => {
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

        console.log("setup 0");
      }

      this.draw = () => {
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
    }

    // ############
    // Scene 1 -
    // ############
    let Scene1 = function() {
      this.enter = () => {
        p.background(200);
      }

      this.draw = () => {
        p.line(200, 0, 100, 300);
      }
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
