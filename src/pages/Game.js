import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Timer from '../components/Timer';
import { fetchTriviaResetToken, resultsScore } from '../actions';
import '../App.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      indexQuestion: 0,
      loading: true,
      isBttnDisabled: false,
      timerSec: 30,
      enabledNext: false,
      correct: '',
      wrong: '',
    };
    this.validateDifficulty = this.validateDifficulty.bind(this);
  }

  async componentDidMount() {
    this.setState({
      results: await this.fetchTriviaQuestions(),
      loading: false,
    });
  }

  fetchTriviaQuestions = async () => {
    const CODE_ERROR = 3;
    const { getToken } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const resultado = await response.json();
    if (resultado.response_code === CODE_ERROR) {
      await fetchTriviaResetToken(getToken);
      return this.fetchTriviaQuestions();
    }
    return resultado.results;
  }

  handleTimer = (sec) => {
    this.setState({
      timerSec: sec,
    });
  }

  handleClickAnswer = (e, id, difficulty) => {
    const { timerSec } = this.state;
    if (id === 'correct') {
      const { score } = this.props;
      const number = 10;
      score(number + Number(timerSec) * this.validateDifficulty(difficulty));
    }
    this.setState({
      enabledNext: true,
      correct: 'green-border',
      wrong: 'red-border',
    });
  }

  shouldBttnDisable = () => {
    this.setState({ isBttnDisabled: true });
  }

  urlGravatar = (getEmail) => {
    const hashEmail = md5(getEmail).toString();
    return `https://www.gravatar.com/avatar/${hashEmail}`;
  }

  handleLocalStorage = () => {
    const STORAGE_KEY = 'STORAGE_TRIVIA_RANKING';
    const { getName, getEmail, getScore } = this.props;
    let ranking = [];
    if (localStorage.getItem(STORAGE_KEY)) {
      ranking = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const person = {
        name: getName,
        score: getScore,
        picture: this.urlGravatar(getEmail),
      };
      ranking = [...ranking, person];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ranking));
    } else {
      const person = {
        name: getName,
        score: getScore,
        picture: this.urlGravatar(getEmail),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([person]));
    }
  }

  btnNextQuestion = () => {
    const { indexQuestion, results } = this.state;
    const { history } = this.props;
    const limitQuestion = results.length - 1;
    if (indexQuestion < limitQuestion) {
      this.setState((prevState) => ({
        indexQuestion: prevState.indexQuestion + 1,
        enabledNext: false,
        wrong: '',
        correct: '',
      }));
    } else {
      this.handleLocalStorage();
      history.push('/Feedback');
    }
  }

  validateDifficulty(param) {
    const three = 3;
    switch (param) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return three;
    default:
      return 0;
    }
  }

  renderQuestions = () => {
    const randomized = 0.5;
    const { results, indexQuestion, enabledNext } = this.state;
    const { difficulty } = results[indexQuestion];
    const answers = [
      ...results[indexQuestion].incorrect_answers,
      results[indexQuestion].correct_answer];
    return (
      <div className="container-body-game">
        <div className="container-dois">
          <p data-testid="question-category" className="category">
            {results[indexQuestion].category}
          </p>
          <p data-testid="question-text" className="pergunta">
            {results[indexQuestion].question}
          </p>
          <div
            data-testid="answer-options"
            className="container-answer"
          >
            {this.renderQuestionButtons(answers, difficulty)
              .sort(() => randomized - Math.random())}
            {/* https://www.spritely.net/how-to-randomize-the-order-of-an-array-javascript/ */}
          </div>
          { !enabledNext
          && (
            <Timer
              bttnDisable={ this.shouldBttnDisable }
              handleTimer={ this.handleTimer }
            />
          )}
        </div>
      </div>
    );
  }

  renderQuestionButtons = (answers, difficulty) => {
    const { isBttnDisabled, wrong, correct } = this.state;
    return answers.map(
      (answer, index) => {
        const id = (index === answers.length - 1
          ? 'correct'
          : 'wrong');
        return (
          <button
            // className="answer-btn"
            key={ index }
            type="button"
            onClick={ (e) => this.handleClickAnswer(e, id, difficulty) }
            id={ (
              index === answers.length - 1
                ? 'correct'
                : 'wrong'
            ) }
            data-testid={ (
              index === answers.length - 1
                ? 'correct-answer'
                : `wrong-answer-${index}`
            ) }
            className={ (
              index === answers.length - 1
                ? correct
                : wrong
            ) }
            disabled={ isBttnDisabled }
          >
            {answer}
          </button>
        );
      },
    );
  }

  render() {
    const { loading, enabledNext } = this.state;
    return (
      <div>
        <Header />
        {loading ? <Loading /> : (
          this.renderQuestions())}
        { enabledNext && (
          <button
            type="button"
            onClick={ this.btnNextQuestion }
            data-testid="btn-next"
            className="next"
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getToken: state.token,
  getEmail: state.user.email,
  getScore: state.player.score,
  getName: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaResetToken: (e) => fetchTriviaResetToken(e),
  score: (e) => dispatch(resultsScore(e)),
});

Game.propTypes = {
  getToken: PropTypes.string.isRequired,
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  score: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
