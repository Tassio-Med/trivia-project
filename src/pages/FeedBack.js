import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const WELL_DONE = 3;

class FeedBack extends React.Component {
  render() {
    const { getAssertions, getScore } = this.props;
    return (
      <div>
        <Header />
        {
          Number(getAssertions) >= WELL_DONE
            ? <span data-testid="feedback-text">Well Done!</span>
            : <span data-testid="feedback-text">Could be better...</span>
        }
        <h2 data-testid="feedback-total-score">{ getScore }</h2>
        <h2 data-testid="feedback-total-question">{ getAssertions }</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getAssertions: state.player.assertions,
  getScore: state.player.score,
});

FeedBack.propTypes = {
  getAssertions: PropTypes.string.isRequired,
  getScore: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
