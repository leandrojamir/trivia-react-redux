import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { assertions, score } from '../redux/actions';

const num = 0.5;
const level = {
  hard: 3,
  medium: 2,
  easy: 1,
};
const minPoints = 10;
const time = 30;

const red = '3px solid red';

function Question({ item, assertion, dispatchScore }) {
  const [color, setColor] = useState(false);
  const [scoreAmount, setScoreAmount] = useState(0);
  console.log(item);
  function handleClick() {
    if (item.difficulty === 'easy') {
      setScoreAmount(Number(minPoints + time * level.easy));
    }
    if (item.difficulty === 'medium') {
      setScoreAmount(Number(minPoints + time * level.medium));
    }
    if (item.difficulty === 'hard') {
      setScoreAmount(Number(minPoints + time * level.hard));
    }
  }

  useEffect(() => {
    dispatchScore(scoreAmount);
  }, [scoreAmount, dispatchScore]);

  const button4 = [
    <button
      key="1"
      data-testid="correct-answer"
      type="button"
      style={ {
        border: color ? '3px solid rgb(6, 240, 15)' : '',
      } }
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
      onClick={ () => {
        setColor(true);
      } }
    >
      {item.incorrect_answers[2]}
    </button>,
  ];

  const button2 = [
    <button
      key="1"
      data-testid="correct-answer"
      type="button"
      style={ {
        border: color ? '3px solid rgb(6, 240, 15)' : '',
      } }
      onClick={ () => {
        setColor(true);
        assertion();
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
      onClick={ () => {
        setColor(true);
      } }
    >
      {item.incorrect_answers[0]}
    </button>,
  ];

  return (
    <div>
      <p data-testid="question-category">{item.category}</p>
      <p data-testid="question-text">{item.question}</p>
      <section data-testid="answer-options">
        {item.type === 'multiple'
          ? button4.sort(() => Math.random() - num)
          : button2.sort(() => Math.random() - num)}
      </section>

    </div>
  );
}

Question.propTypes = {
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
};

const mapDispatchToProps = (dispatch) => ({
  assertion: () => dispatch(assertions()),
  dispatchScore: (data) => dispatch(score(data)),
});

export default connect(null, mapDispatchToProps)(Question);
