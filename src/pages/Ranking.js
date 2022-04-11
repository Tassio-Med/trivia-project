import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RankingPerson from '../components/RankingPerson';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: '',
    };
  }

  componentDidMount() {
    this.setState({
      ranking: this.getLocalStorage(),
    });
  }

  getLocalStorage = () => {
    const STORAGE_KEY = 'STORAGE_TRIVIA_RANKING';
    if (localStorage.getItem(STORAGE_KEY)) {
      const sorting = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return this.renderLocalStorage(sorting.sort((a, b) => b.score - a.score));
    }
    return '';
  }

  renderLocalStorage = (storage) => (
    storage.map((rank, index) => (
      <RankingPerson
        key={ Math.random() }
        index={ index }
        name={ rank.name }
        score={ rank.score }
        picture={ rank.picture }
      />
    ))
  );

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <div>
        <h2
          data-testid="ranking-title"
        >
          Ranking
        </h2>
        <section className="section-ranking">
          { ranking }
        </section>
        <button
          type="button"
          data-testid="btn-go-home"
          className="btn-result"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getAssertions: state.player.assertions,
  getScore: state.player.score,
});

Ranking.propTypes = {
  // getAssertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
