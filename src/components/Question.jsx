import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { assertions, score } from '../redux/actions';
import Timer from './Timer';

const num = 0.5;
const red = '3px solid red';

const level = {
  hard: 3,
  medium: 2,
  easy: 1,
};

function Question({ item, assertion, dispatchScore, timer0, setNext }) {
  const [color, setColor] = useState(false);
  const [sort, setSort] = useState(true);
  function handleClick() {
    if (item.difficulty === 'easy') {
      dispatchScore(level.easy);
    }
    if (item.difficulty === 'medium') {
      dispatchScore(level.medium);
    }
    if (item.difficulty === 'hard') {
      dispatchScore(level.hard);
    }
  }

  if (color) setNext(true);

  useEffect(() => {
    setColor(timer0);
  }, [timer0]);

  const buttons = {
    btn4: [
      <button
        key="1"
        data-testid="correct-answer"
        type="button"
        style={ {
          border: color ? '3px solid rgb(6, 240, 15)' : '',
        } }
        disabled={ timer0 }
        onClick={ () => {
          setColor(true);
          assertion();
          handleClick();
        } }
      >
        {item.correct_answer}
      </button>,
      <button
        key="2"
        data-testid="wrong-answer-0"
        type="button"
        style={ {
          border: color ? red : '',
        } }
        disabled={ timer0 }
        onClick={ () => {
          setColor(true);
        } }
      >
        {item.incorrect_answers[0]}
      </button>,
      <button
        key="3"
        data-testid="wrong-answer-1"
        type="button"
        style={ {
          border: color ? red : '',
        } }
        disabled={ timer0 }
        onClick={ () => {
          setColor(true);
        } }
      >
        {item.incorrect_answers[1]}
      </button>,
      <button
        key="4"
        data-testid="wrong-answer-2"
        type="button"
        style={ {
          border: color ? red : '',
        } }
        disabled={ timer0 }
        onClick={ () => {
          setColor(true);
        } }
      >
        {item.incorrect_answers[2]}
      </button>,
    ],
    btn2: [
      <button
        key="1"
        data-testid="correct-answer"
        type="button"
        style={ {
          border: color ? '3px solid rgb(6, 240, 15)' : '',
        } }
        disabled={ timer0 }
        onClick={ () => {
          setColor(true);
          setColor(true);
          assertion();
          handleClick();
        } }
      >
        {item.correct_answer}
      </button>,
      <button
        key="2"
        data-testid="wrong-answer-0"
        type="button"
        style={ {
          border: color ? red : '',
        } }
        disabled={ timer0 }
        onClick={ () => {
          setColor(true);
        } }
      >
        {item.incorrect_answers[0]}
      </button>,
    ],
  };
  // console.log(buttons);
  if (sort) {
    buttons.btn4 = buttons.btn4.sort(() => Math.random() - num);
    buttons.btn2 = buttons.btn2.sort(() => Math.random() - num);
    setSort(false);
  }
  return (
    <div>
      <Timer />
      <p data-testid="question-category">{item.category}</p>
      <p data-testid="question-text">{item.question}</p>
      <section data-testid="answer-options">
        {item.type === 'multiple'
          ? buttons.btn4.sort(() => Math.random() - num)
          : buttons.btn2.sort(() => Math.random() - num) }
      </section>
    </div>
  );
}

Question.propTypes = {
  setNext: PropTypes.func.isRequired,
  assertion: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  item: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  timer0: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  assertion: () => dispatch(assertions()),
  dispatchScore: (data) => dispatch(score(data)),
});

const mapStateToProps = (state) => ({
  timer0: state.player.timer === 0,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
