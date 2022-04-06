import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userLogin, playerLogin, fetchTriviaToken } from '../actions';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isBtnDisabled: true,
      redirect: false,
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validation);
  }

  validation = () => {
    const { name } = this.state;
    const minSix = 1;
    const nomeMin = name.length >= minSix;
    if (this.validateEmail() && nomeMin) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  handleRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  handleClick = (event) => {
    const { email, name } = this.state;
    const { login, player, triviaToken } = this.props;
    event.preventDefault();
    login({ email });
    player({ name });
    triviaToken();
    this.handleRedirect();
    // console.log('handleClick');
    // history.push('/carteira');
  }

  validateEmail() {
    const { email } = this.state;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      return true;
    }
  }

  render() {
    const { email, name, isBtnDisabled, redirect } = this.state;
    // const { login } = this.props;
    return (
      <div className="Login">
        <img src={ logo } className="App-logo" alt="logo" />
        <section className="login-inputs">
          <input
            type="text"
            onChange={ this.handleInput }
            placeholder="nome"
            value={ name }
            name="name"
            data-testid="input-player-name"
          />
          <input
            type="text"
            onChange={ this.handleInput }
            placeholder="email"
            data-testid="input-gravatar-email"
            value={ email }
            name="email"
          />
        </section>
        <div className="link">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isBtnDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          { redirect && <Redirect to="/Game" /> }

        </div>
        <div className="link">
          <Link
            to="/Settings"
          >
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configuração
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(userLogin(e)),
  player: (e) => dispatch(playerLogin(e)),
  triviaToken: () => dispatch(fetchTriviaToken()),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  player: PropTypes.func.isRequired,
  triviaToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
