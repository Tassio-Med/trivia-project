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
      right: '',
      wrong: '',
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

 /*  data-testid={
    answer === answers.correct_answer ? 'correct-answer' : `wrong-answer-${index}`
  }
  className={
    answer === answers.correct_answer ? correct : wrong
  }
  onClick={ this.addClassName } */


  handleClickAnswer= (e) => {
    const { parentNode } = e.target;
    const answerList  = e.target.parentNode.childNode[0];
    answerList.toString().includes('correct') 
    answerList.forEach((answer) => {
      if (answer.includes.id === 'correct-answer') {
      answer.style.border = correct;
      } else {
      answer.style.border = wrong;
      } 
    answerList.

    // e.target.parentElement.childNodes[0]
    this.setState = {
      right: 'green-border',
      wrong: 'red-border',
    };
    console.log(e.target.parentNode.childNode.);
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

  renderQuestionButtons = (answers) => {
    const { right, wrong } = this.state;
    return answers.map(
      (answer, index) => (
        <button
          key={ index }
          type="button"
          onClick={ this.handleClickAnswer }
          // className={ (
          //   index === answers.length - 1
          //     ? right
          //     : wrong
          // ) }
          className="red-border"
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
  }

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
