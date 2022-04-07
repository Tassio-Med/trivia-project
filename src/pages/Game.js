import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { fetchTriviaResetToken } from '../actions';

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
      fetchTriviaResetToken(getToken);
      return this.fetchTriviaQuestions(getToken);
    }
    return resultado.results;
  }

  renderQuestions = () => {
    const randomized = 0.5;
    const { results, indexQuestion } = this.state;
    // const { triviaQuestions } = this.props;
    // if (results.length === 0) {
    //   this.setState({
    //     results: triviaQuestions(token).results,
    //   });
    //   console.log(results);
    // }
    const answers = [
      ...results[indexQuestion].incorrect_answers,
      results[indexQuestion].correct_answer];
    console.log(answers);
    console.log(answers.sort(() => randomized - Math.random()));
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
        {/* { (results[indexQestion].type === 'boolean'
          ? this.renderQuestionTrueFalse(results[indexQestion])
          : this.renderQuestionMulti(results[indexQestion])) } */}
        <div>
          { this.renderQuestionButtons(answers) }
          {/* { .sort(() => randomized - Math.random()) } */}
        </div>
      </div>
    );
  }

  /*
  "category":"Entertainment: Video Games",
  "type":"multiple",
  "difficulty":"easy",
  "question":"What is the first weapon you acquire in Half-Life?",
  "correct_answer":"A crowbar",
  "incorrect_answers":[
    "A pistol",
    "The H.E.V suit",
    "Your fists"
  ]
  */

  renderQuestionButtons = (answers) => answers.map(
    (answer, index) => (
      <button
        key={ index }
        type="button"
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

  // renderQuestionMulti = (question) => {
  //   const answers = [
  //     ...question.incorrect_answers,
  //     question.correct_answer];
  //   const buttons = this.renderQuestionButtons(answers);
  //   console.log(buttons);
  //   return (
  //     <section>
  //       multi
  //     </section>
  //   );
  // }

  // renderQuestionTrueFalse = (question) => {
  //   const answers = [
  //     ...question.incorrect_answers,
  //     question.correct_answer];
  //   const buttons = this.renderQuestionButtons(answers);
  //   console.log(buttons);
  //   return (
  //     <section>
  //       boolean
  //     </section>
  //   );
  // }

  render() {
    const { loading } = this.state;
    console.log('olha eu aq');
    return (
      <div>
        <Header />
        <p>QLQR COISA</p>
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
  // triviaQuestions: (e) => fetchTriviaQuestions(e),
  fetchTriviaResetToken: (e) => fetchTriviaResetToken(e),
});

Game.propTypes = {
  getToken: PropTypes.string.isRequired,
  // triviaQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
