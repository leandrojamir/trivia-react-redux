import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HeaderGame from '../components/HeaderGame';
import Question from '../components/Question';

import { fetchQuestion, logout, timer } from '../redux/actions';

const tres = 3;
const trinta = 30;
const cinco = 4;

function Game({ getQuestions, tokenApi, questions, loginRedirect, getimer }) {
  const [index, setIndex] = useState(0);
  const [btnNext, setBtnNext] = useState(false);

  useEffect(() => {
    getQuestions(tokenApi);
  }, [getQuestions, tokenApi]);

  const logoutLogin = () => {
    loginRedirect();
    return (<Redirect to="/" />);
  };
  console.log(questions);
  return (
    <div>
      {index > cinco && <Redirect to="/feed" />}
      {questions.response_code === tres && logoutLogin()}
      <HeaderGame />
      {questions.results && questions.results.map((item, i) => (
        <Question
          key={ i }
          item={ item }
          setNext={ (value) => setBtnNext(value) }
        />))[index]}
      { btnNext && (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => {
            setIndex(index + 1);
            getimer();
          } }
        >
          Next
        </button>)}
    </div>
  );
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  loginRedirect: PropTypes.func.isRequired,
  tokenApi: PropTypes.string.isRequired,
  questions: PropTypes.shape().isRequired,
  getimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tokenApi: state.token.token,
  questions: state.question.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestion(token)),
  loginRedirect: () => dispatch(logout()),
  getimer: () => dispatch(timer(trinta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
