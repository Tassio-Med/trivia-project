import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    this.setState({
      isBttnDisabled: true,
    });
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
      <div>
        <p
          data-testid="question-category"
        >
          {results[indexQuestion].category}
        </p>
        <p
          data-testid="question-text"
        >
          {results[indexQuestion].question}
        </p>
        <div
          data-testid="answer-options"
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaResetToken: (e) => fetchTriviaResetToken(e),
  score: (e) => dispatch(resultsScore(e)),
});

Game.propTypes = {
  getToken: PropTypes.string.isRequired,
  score: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
