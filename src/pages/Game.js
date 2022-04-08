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
    const { target: { parentElement: { childNodes } } } = e;
    const { timerSec } = this.state;
    if (id === 'correct') {
      const { score } = this.props;
      const number = 10;
      console.log(number);
      console.log(timerSec);
      console.log(difficulty);
      console.log(this.validateDifficulty(difficulty));
      score(number + Number(timerSec) * this.validateDifficulty(difficulty));
    }
    childNodes.forEach((element) => {
      if (element.id === 'correct') {
        element.className = 'green-border';
      } else {
        element.className = 'red-border';
      }
    });
  }

  // 10 + (timer * dificuldade)

  shouldBttnDisable = () => {
    this.setState({
      isBttnDisabled: true,
    });
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
    const { results, indexQuestion } = this.state;
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
        <Timer
          bttnDisable={ this.shouldBttnDisable }
          handleTimer={ this.handleTimer }
        />
      </div>
    );
  }

  renderQuestionButtons = (answers, difficulty) => {
    const { isBttnDisabled } = this.state;
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
            disabled={ isBttnDisabled }
          >
            {answer}
          </button>
        );
      },
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Header />
        {loading ? <Loading /> : (
          this.renderQuestions())}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
