import React from 'react';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      disabled: false,
    };
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate(prevPros, prevState) {
    if (prevState.seconds === TIME_LIMIT) {
      console.log('ui');
      const { bttnDisable } = this.props;
      this.setState({
        seconds: 0,
      });
      bttnDisable();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  timer = () => {
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { seconds } = this.state;
    return (
      <h1>{seconds}</h1>
    );
  }
}

export default Timer;
