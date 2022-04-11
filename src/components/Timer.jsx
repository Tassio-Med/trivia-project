import React from 'react';
import PropTypes from 'prop-types';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      disabled: true,
    };
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate(prevPros, prevState) {
    const { disabled } = this.state;
    if (disabled && prevState.seconds === TIME_LIMIT) {
      const { bttnDisable } = this.props;
      this.setState({
        seconds: 0,
        disabled: false,
      });
      bttnDisable();
      clearInterval(this.intervalID);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  timer = () => {
    const { handleTimer } = this.props;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
      const { seconds } = this.state;
      handleTimer(seconds);
    }, ONE_SECOND);
  }

  render() {
    const { seconds } = this.state;
    return (
      <h1 className="timer">{seconds}</h1>
    );
  }
}

Timer.propTypes = {
  bttnDisable: PropTypes.func.isRequired,
  handleTimer: PropTypes.func.isRequired,
};

export default Timer;
