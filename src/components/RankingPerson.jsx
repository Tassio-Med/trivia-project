import React from 'react';
import PropTypes from 'prop-types';

class FeedbackPerson extends React.Component {
  render() {
    const { index, name, score, picture } = this.props;
    return (
      <>
        <header>
          <img
            src={ picture }
            alt="img"
          />
          <p
            data-testid={ `player-name-${index}` }
          >
            { name }
          </p>
          <p data-testid={ `player-score-${index}` }>
            { score }
          </p>
        </header>
        <hr />
      </>
    );
  }
}

FeedbackPerson.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
};

export default FeedbackPerson;
