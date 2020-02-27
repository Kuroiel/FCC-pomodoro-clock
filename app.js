//audio link from https://codepen.io/freeCodeCamp/pen/XpKrrW

class Clock extends React.Component{
constructor(props){
	super(props)
	this.state = {
		breakLength: 5,
		sessionLength: 25,
		defaultTime: 1500,
		onOff: false,
		mode: 'Session',
		running: 'no'
	}
	this.changeLength = this.changeLength.bind(this);
	this.resetEverything = this.resetEverything.bind(this);
	this.clockDisplay = this.clockDisplay.bind(this);
	this.timerRun = this.timerRun.bind(this);
	this.timerGoing = this.timerGoing.bind(this);
	this.modeSwap = this.modeSwap.bind(this);
}

changeLength (event) {
let UwUTemp = event.target.value;
let temp1 = this.state.breakLength;
let temp2 = this.state.sessionLength;
if (UwUTemp === 'BreakDown') {
	temp1 = temp1 - 1;
} else if (UwUTemp === 'BreakUp') {
	temp1 = temp1 + 1;
} else if (UwUTemp === 'SessionDown') {
	temp2 = temp2 - 1;
} else if (UwUTemp === 'SessionUp') {
	temp2 = temp2 + 1;
}
if (temp1 <= 0) {
	temp1 = 1;
}
if (temp2 <= 0) {
	temp2 = 1;
}
if (temp1 > 60) {
	temp1 = 60;
}
if (temp2 > 60) {
	temp2 = 60;
}
let UwUTemp2 = 60 * temp2;
this.setState ({
	breakLength: temp1,
	sessionLength: temp2,
	defaultTime: UwUTemp2
})
}

resetEverything () {
	clearInterval(this.timer);
	this.setState ({
			breakLength: 5,
		sessionLength: 25,
		defaultTime: 1500,
		onOff: false,
		running: 'no',
		mode: 'Session'
	});
	this.audioRef1.pause();
    this.audioRef1.currentTime = 0;
}

clockDisplay () {
let minute = Math.floor(this.state.defaultTime / 60);
let seconds = this.state.defaultTime % 60;
if (seconds < 10 ) {
	seconds = '0' + seconds
}
if (minute < 10) {
	minute = '0' + minute
}
return minute + ':' + seconds;
}

timerRun () {
	console.log('started at: ' + this.state.onOff)
	let isOn = this.state.onOff;
	if(isOn === false) {
		this.setState({
			onOff: true
		}, () => { this.timerGoing(); console.log("ended at", this.state.onOff) })
	} else if (isOn === true) {
		this.setState({
			onOff: false
		}, () => { this.timerGoing(); console.log("ended at", this.state.onOff) })
	}
}

timerGoing () {
		let isOn = this.state.onOff;
	if (isOn === true) {
		this.timer = setInterval(
			() => 
				this.setState({
					defaultTime: this.state.defaultTime - 1
				}, () => {
							if (this.state.defaultTime < 0) {
			setInterval(this.modeSwap(), 1000);
		this.audioRef1.currentTime = 0;
		this.audioRef1.play();
		}
				})
			 , 1000
			)
		this.setState({
			running: 'yes'
		})

	} else if (isOn === false) {
		clearInterval(this.timer)
		this.setState({
			running: 'no'
		})
	}
}

modeSwap () {
	if (this.state.mode === 'Session') {
		this.setState({
			mode: 'Break',
			defaultTime: this.state.breakLength * 60
		})
	} else if (this.state.mode === 'Break') {
		this.setState({
			mode: 'Session',
			defaultTime: this.state.sessionLength * 60
		})
	}
}

 render(){
  return(
   <div id="everything">

<div id="breaks">
    <h3 id="break-label">Break Length</h3>
    	<button className="buttons" id="break-decrement" value="BreakDown" onClick={this.changeLength}>Down</button>
    	<p id="break-length">{this.state.breakLength}</p>
    	<button className="buttons" id="break-increment" value="BreakUp" onClick={this.changeLength}>Up</button>
    	</div>

    	<div id="sessions">
    <h3 id="session-label">Session Length</h3>
    	<button className="buttons" id="session-decrement" value="SessionDown" onClick={this.changeLength}>Down</button>
    	<p id="session-length">{this.state.sessionLength}</p>
    	<button className="buttons" id="session-increment" value="SessionUp" onClick={this.changeLength}>Up</button>
</div>

	<div id="timer-label">
	<p>{this.state.running}</p>
	<p>{this.state.mode}</p>
	<p id="time-left">{this.clockDisplay()}</p>
	<button id="start_stop" onClick={this.timerRun}>Start/Stop</button>
	</div>

<button id="reset" onClick={this.resetEverything}>Reset</button>

<audio src="https://goo.gl/65cBl1" id="beep" ref={(input) => {this.audioRef1 = input}} ></audio>
   </div>
  );
 }
}
ReactDOM.render(<Clock />, document.getElementById('clock'));
