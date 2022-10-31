class Timer{
  constructor(durationInput, startButton, pausebutton, callbacks){
    this.durationInput = durationInput
    this.startButton = startButton
    this.pauseButton = pausebutton
    if(callbacks){  //Checks if a callback argument has been passed in.
      this.onStart = callbacks.onStart //Saves reference to callback that was passed in.
      this.onTick = callbacks.onTick
      this.onComplete = callbacks.onComplete
    }
    
    this.startButton.addEventListener('click', this.start) //Runs start() method on click
    this.pauseButton.addEventListener('click', this.pause) //Runs pause() method on click

  }

  //Runs when start button is pressed
  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    if(!this.interval){
      this.tick()
      this.interval = setInterval(this.tick, 20);
    }
    else{
      clearInterval(this.interval)
      this.interval = setInterval(this.tick, 20);
    }
  };

  //Runs when pause button is pressed.
  pause = () => {
    clearInterval(this.interval)
  }

  //Runs every tick (20ms)
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause()
      if(this.onComplete) {
        this.onComplete()
      }
    } else{
      this.timeRemaining = this.timeRemaining - 0.02;
      if(this.onTick){
        this.onTick(this.timeRemaining)
      }
    }
}

get timeRemaining() {
  return parseFloat(this.durationInput.value)
}

set timeRemaining(time){
  this.durationInput.value = time.toFixed(2)
}
}