import React from 'react';
import './App.css';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTime: 300,
      session: 1500,
      timeleft: 1500,
      timer: 25,
      break: 5,
      pause_start: false,
      label: 'Work',
      reset: null,
      buzz: {
        src: 'https://goo.gl/65cBl1', id: "beep"
      }
    }
  }
  componentWillUpdate() {
    if (this.state.timeleft === 0 && this.state.label === 'Work') {
      this.setState({ label: 'Break' })
      let val = this.state.break * 60
      this.play()
      this.setState({ timeleft: val })
    } else if (this.state.timeleft === 0 && this.state.label === 'Break') {
      this.setState({ label: 'Work' })

      let val = this.state.timer * 60
      this.setState({ timeleft: val })
    }
  }

  play() {
    let buzzer = document.getElementById('beep');
    buzzer.play()
  }

  pause_start() {
    var timer;
    if (this.state.pause_start === false) {
      this.interval()
      this.setState({ pause_start: true })
    } else {
      timer = this.state.timeleft;
      this.setState({ timeleft: timer });
      this.setState({ pause_start: false });
      clearInterval(this.inter);
    }
  }

  inc() {
    if (this.state.timer >= 60) {
      this.setState({ timer: 59 })
      this.setState(prevState => ({ timer: prevState.timer + 1 }))
    } else if (this.state.timer === 0) {
      this.setState({ timer: 1 })
      this.setState(prevState => ({ timer: prevState.timer + 1 }))
    } else {
      let increment = this.state.timer * 60 + 59;
      this.setState(prevState => ({ timer: prevState.timer + 1 }));
      this.setState(prevState => ({ timeleft: increment + 1 }));
    }
  }

  dec() {
    if (this.state.timer >= 60) {
      this.setState({ timer: 59 })
    } else if (this.state.timer <= 1) {
      this.setState({ timer: 1 })
    } else {
      let decrement = this.state.timer * 60 - 59;
      this.setState(prevState => ({ timer: prevState.timer - 1 }));
      this.setState(prevState => ({ timeleft: decrement - 1 }));
    }
  }

  incBreak() {
    if (this.state.break >= 60) {
      this.setState({ break: 60 })
    } else if (this.state.break === 0) {
      this.setState({ break: 1 })
    } else {
      let increment = this.state.break * 60 + 59;
      this.setState(prevState => ({ break: prevState.break + 1 }));
      if (this.state.label === 'Break') {
        this.setState(prevState => ({ timeleft: increment + 1 }));
      }
    }
  }

  decBreak() {
    if (this.state.break >= 60) {
      this.setState({ break: 59 })
    } else if (this.state.break <= 1) {
      this.setState({ break: 1 })
    } else {
      let decrement = this.state.break * 60 - 59;
      this.setState(prevState => ({ break: prevState.break - 1 }));
      if (this.state.label === 'Break') {
        this.setState(prevState => ({ timeleft: decrement - 1 }));
      }
    }
  }

  convertTime() {
    let mins = Math.floor(this.state.timeleft % 3600 / 60);
    let seconds = Math.floor((this.state.timeleft % 3600 % 60));
    if (this.state.timeleft < 3600) {
      if (mins === 0 && seconds === 0) {
        return mins + '0:0' + seconds;
      } else if (mins < 10 && seconds < 10) {
        return '0' + mins + ':0' + seconds;
      } else if (mins < 10 && seconds > 10) {
        return '0' + mins + ':' + seconds;
      } else if ((mins > 10 && seconds < 10)) {
        return mins + ':0' + seconds;
      } else {
        return mins + ':' + seconds;
      }
    } else {
      return '60:0' + seconds;
    }
  }

  reset() {
    this.setState({ breakTime: 300 });
    this.setState({ session: 1500 });
    this.setState({ timeleft: 1500 });
    this.setState({ timer: 25 });
    this.setState({ break: 5 });
    if (this.state.label === 'Break') {
      this.setState({ label: 'Work' })
      this.setState({ timeleft: 1500 });
    }
    let buzzer = document.getElementById('beep');
    buzzer.load()
    buzzer.pause();

    this.setState({ pause_start: false });
    clearInterval(this.inter);
  }

  interval() {
    this.inter = setInterval(() => {
      this.setState(prevState => ({ timeleft: prevState.timeleft - 1 }))
    }, 1000);
  }
  render() {
    return (
      <div style={{ 'textAlign': 'center', 'marginTop': '20vh' }} >
        <div>
          <span id={'session-label'} className={'Btn'}> <text> {this.state.label} </text> </span>
          <button id={"start_stop"} className={'Btn'} onClick={() => { this.pause_start() }}> <text> Start/Stop </text> </button>
          <button id={'reset'} className={'Btn'} onClick={() => { this.reset() }}> <text> Reset </text></button>
        </div>
        <div className={'App-header'} >
          <span id="timer-label"> <text> {this.state.label} </text> </span>
          <span id="time-left">
            {this.convertTime(this.state.timeleft)}
          </span> <br />
          <span id="break-label"> <text> {this.state.label} </text> </span>
        </div>

        <audio id="beep" src={this.state.buzz.src} > </audio>

        <div style={{ 'flexDirection': 'row' }}>
          <button id={'session-increment'} className={'Btn'} onClick={() => { this.inc() }}>  <span> Increase </span> </button>
          <span id={"session-length"} style={{ 'fontSize': '2em' }}>{this.state.timer}</span>
          <button id={'session-decrement'} className={'Btn'} onClick={() => { this.dec() }} > <span>  Decrease </span>  </button>
          <button id={'break-increment'} className={'Btn'} onClick={() => { this.incBreak() }} > <span> Increase </span> </button>
          <span id={'break-length'} style={{ 'fontSize': '2em' }}>{this.state.break}</span>
          <button id={'break-decrement'} className={'Btn'} onClick={() => { this.decBreak() }} > <span> Decrease </span> </button>
        </div>
      </div>
    );
  }
}

export default Counter;
