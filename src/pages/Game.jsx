import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HeaderGame from '../components/HeaderGame';
import Question from '../components/Question';

import { fetchQuestion, logout } from '../redux/actions';

const tres = 3;

function Game({ getQuestions, tokenApi, questions, loginRedirect }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getQuestions(tokenApi);
  }, [getQuestions, tokenApi]);

  const logoutLogin = () => {
    loginRedirect();
    return (<Redirect to="/" />);
  };

  return (
    <div>
      {questions.response_code === tres && logoutLogin()}
      <HeaderGame />
      {questions.results && questions.results.map((item, i) => (
        <Question key={ i } item={ item } />))[index]}
      <button
        type="button"
        onClick={ () => {
          setIndex(index + 1);
        } }
      >
        Next
      </button>
    </div>
  );
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  loginRedirect: PropTypes.func.isRequired,
  tokenApi: PropTypes.string.isRequired,
  questions: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  tokenApi: state.token.token,
  questions: state.question.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestion(token)),
  loginRedirect: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
