import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { userHash } from '../actions';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      imagem: '',
    };
  }

  componentDidMount() {
    const { getEmail, hash } = this.props;
    const hashEmail = md5(getEmail).toString();
    hash(hashEmail);
    this.setState({
      imagem: `https://www.gravatar.com/avatar/${hashEmail}`,
    });
  }

  render() {
    const { imagem } = this.state;
    const { getName, getScore } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ imagem }
            alt="profile"
          />
          <p
            data-testid="header-player-name"
          >
            { getName }
          </p>
          <p data-testid="header-score">
            { getScore }
          </p>
        </header>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  getName: state.player.name,
  getScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  hash: (e) => dispatch(userHash(e)),
});

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
  hash: PropTypes.func.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
