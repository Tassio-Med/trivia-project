import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const WELL_DONE = 3;

class FeedBack extends React.Component {
  render() {
    const { getAssertions, getScore, history } = this.props;
    return (
      <div>
        <Header />
        {
          Number(getAssertions) >= WELL_DONE
            ? <span className="res" data-testid="feedback-text">Well Done!</span>
            : <span className="res" data-testid="feedback-text">Could be better...</span>
        }
        <h2 className="res" data-testid="feedback-total-score">{ getScore }</h2>
        <h2 className="res" data-testid="feedback-total-question">{ getAssertions }</h2>
        <div className="container-btn-feed">
          <button
            className="btn-result"
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/Ranking') }
          >
            Ranking
          </button>
          <button
            className="btn-result"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getAssertions: state.player.assertions,
  getScore: state.player.score,
});

FeedBack.propTypes = {
  getAssertions: PropTypes.number.isRequired,
  getScore: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(FeedBack);
