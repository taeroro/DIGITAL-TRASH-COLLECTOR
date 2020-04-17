import React, { Component } from 'react';
import p5 from 'p5';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.myRef = React.createRef();

    this.grid = 20;
    this.gridOffset = this.grid / 2;
  }

  // **********
  // p5 wrapper
  // https://dev.to/christiankastner/integrating-p5-js-with-react-i0d
  // **********
  Sketch = (p) => {
    // ############
    // setup
    // ############
    p.setup = () => {
      p.createCanvas(500, 500);
      p.background(255);

      // Draw grid
      let l = 0;
      p.strokeWeight(0.5);
      p.stroke(150);

      while (l < p.width || l < p.height) {
        p.line(0, l, p.width, l);
        p.line(l, 0, l, p.height);
        l += this.grid;
      }
    }

    // ############
    // draw
    // ############
    p.draw = () => {
      p.strokeWeight(this.grid);
      p.strokeCap(p.PROJECT);
      p.stroke(0, 0, 0);

      if (p.mouseIsPressed) {
        let x = this.snap(p.mouseX);
        let y = this.snap(p.mouseY);
        let px = this.snap(p.pmouseX);
        let py = this.snap(p.pmouseY);

        console.log(x + ', ' + y + ', ' + px + ', ' + py);
        
        
        if (x !== px || y !== py) {
          p.line(px, py, px, py);
          p.line(x, y, x, y);
        }
        else {
          p.line(px, py, x, y);
        }
      }
    }
  }

  // ***************
  // p5 snap to grid
  // https://editor.p5js.org/crhallberg/sketches/SJrrLGiYM
  // ***************
  snap(op) {
    // subtract offset (to center lines) divide by grid to get row/column
    // round to snap to the closest one
    let cell = Math.round((op - this.gridOffset) / this.grid);

    // multiply back to grid scale add offset to center
    return cell * this.grid + this.gridOffset;
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
      <div className="App" ref={this.myRef}>
        
      </div>
    );
  }
}

export default App;
