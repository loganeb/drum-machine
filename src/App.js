import React, { Component } from 'react';
import './App.css';

const DRUMDATA = [
  {
    keyID: 'Q',
    keycode: 113,
    fileName: './acoustic_hat.wav',
    audioID: 'acousticHat'
  },
  {
    keyID: 'W',
    keycode: 119,
    fileName: './acoustic_kick.wav',
    audioID: 'acousticKick'
  },
  {
    keyID: 'E',
    keycode: 101,
    fileName: './acoustic_snare.wav',
    audioID: 'acousticSnare'
  },
  {
    keyID: 'A',
    keycode: 97,
    fileName: './loose_kick.wav',
    audioID: 'looseKick'
  },
  {
    keyID: 'S',
    keycode: 115,
    fileName: './ludwig_snare.wav',
    audioID: 'ludwigSnare'
  },
  {
    keyID: 'D',
    keycode: 100,
    fileName: './piccolo_snare.wav',
    audioID: 'piccoloSnare'
  },
  {
    keyID: 'Z',
    keycode: 122,
    fileName: './sonic_snare.wav',
    audioID: 'sonicSnare'
  },
  {
    keyID: 'X',
    keycode: 120,
    fileName: './sabian_hh.wav',
    audioID: 'sabianHh'
  },
  {
    keyID: 'C',
    keycode: 99,
    fileName: './trash_cymbal.wav',
    audioID: 'trashCymbal'
  }
]

class DrumMachine extends Component {
  constructor(props){
    super(props);
    this.state = {
      drumData : DRUMDATA,
      drums: []
    }
    this.loadDrums = this.loadDrums.bind(this);
  }

  //loads Drum components into drums array from DRUMDATA const
  loadDrums(){
      var tempDrums = this.state.drumData.map((drum) => 
       <Drum key={drum.keycode} keyID={drum.keyID} keycode={drum.keycode} fileName={drum.fileName} audioID={drum.audioID}/>
      )
      this.setState({
        drums: tempDrums
      });
  }

  //load Drum components into array once DrumMachine has mounted
  componentDidMount(){
    this.loadDrums();
  }

  render(){
    return (
      <div id="drum-machine">
        <div>{this.state.drums[0]} {this.state.drums[1]} {this.state.drums[2]}</div><br/>
        <div>{this.state.drums[3]} {this.state.drums[4]} {this.state.drums[5]}</div><br/>
        <div>{this.state.drums[6]} {this.state.drums[7]} {this.state.drums[8]}</div><br/>
      </div>
    );
  }
}

class Drum extends Component {
  constructor(props){
    super(props);
    this.state = {
      opacity: 0.7
    }
    this.fileName = this.props.fileName;
    this.audio = new Audio(this.fileName);
    this.audio.loop = false;
    this.playSound = this.playSound.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  playSound(){
    this.audio.load();
    this.audio.play();
    this.setState({ opacity: 1});
      setTimeout(() => {
        this.setState({ opacity: 0.7});
      }, 500);
  }

  keyPress(e){
    if(e.keyCode === this.props.keycode){
      this.playSound();
    }
  }

  render(){
    return (
      <div className="drum-key">
        {window.addEventListener('keypress', this.keyPress, false)}
        <button 
          id={this.props.keyID} 
          onClick={() => {this.playSound()}}
          style={{ opacity: this.state.opacity }}>
            {this.props.keyID}
        </button>
      </div>
     
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <DrumMachine />
      </div>
    );
  }
}

export default App;
