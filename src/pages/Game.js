import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { fetchTriviaResetToken } from '../actions';
import '../App.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      indexQuestion: 0,
      loading: true,
    };
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

  handleClickAnswer= (e) => {
    const { target: { parentElement: { childNodes } } } = e;
    childNodes.forEach((element) => {
      if (element.id === 'correct') {
        element.className = 'green-border';
      } else {
        element.className = 'red-border';
      }
    });

    this.setState = {
      right: 'green-border',
      wrong: 'red-border',
    };
  }

  renderQuestions = () => {
    const randomized = 0.5;
    const { results, indexQuestion } = this.state;
    const answers = [
      ...results[indexQuestion].incorrect_answers,
      results[indexQuestion].correct_answer];
    return (
      <div>
        <p
          data-testid="question-category"
        >
          { results[indexQuestion].category }
        </p>
        <p
          data-testid="question-text"
        >
          { results[indexQuestion].question }
        </p>
        <div
          data-testid="answer-options"
        >
          { this.renderQuestionButtons(answers)
            .sort(() => randomized - Math.random()) }
        </div>
      </div>
    );
  }

  renderQuestionButtons = (answers) => answers.map(
    (answer, index) => (
      <button
        key={ index }
        type="button"
        onClick={ this.handleClickAnswer }
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
      >
        { answer }
      </button>
    ),
  );

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Header />
        { loading ? <Loading /> : (
          this.renderQuestions())}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getToken: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (e) => dispatch(e),
  fetchTriviaResetToken: (e) => fetchTriviaResetToken(e),
});

Game.propTypes = {
  getToken: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
