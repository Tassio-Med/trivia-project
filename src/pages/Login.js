import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin } from '../actions';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nome: '',
      isBtnDisabled: true,
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validation);
  }

  validation = () => {
    const { nome } = this.state;
    const minSix = 1;
    const nomeMin = nome.length >= minSix;
    if (this.validateEmail() && nomeMin) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  validateEmail() {
    const { email } = this.state;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      return true;
    }
  }

  render() {
    const { email, nome, isBtnDisabled } = this.state;
    // const { login } = this.props;
    return (
      <div className="Login">
        <img src={ logo } className="App-logo" alt="logo" />
        <section className="login-inputs">
          <input
            type="text"
            onChange={ this.handleInput }
            placeholder="nome"
            value={ nome }
            name="nome"
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
          <Link
            to="/"
          >
            <button
              type="button"
              //   onClick={ this.handleClick }
              data-testid="btn-play"
              disabled={ isBtnDisabled }
            >
              Jogar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(userLogin(e)),
});

export default connect(null, mapDispatchToProps)(Login);
