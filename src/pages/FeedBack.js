import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const WELL_DONE = 3;

class FeedBack extends React.Component {
  render() {
    const { getAssertions } = this.props;
    return (
      <div>
        <Header />
        {
          Number(getAssertions) >= WELL_DONE
            ? <span data-testid="feedback-text">Well Done!</span>
            : <span data-testid="feedback-text">Could be better...</span>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getAssertions: state.player.assertions,
});

FeedBack.propTypes = {
  getAssertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
