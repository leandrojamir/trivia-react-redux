import PropTypes from 'prop-types';
import React from 'react';

const num = 0.5;

function Question({ item }) {
  console.log(item);

  const button4 = [
    <button
      key="1"
      data-testid="correct-answer"
      type="button"
    >
      {item.correct_answer}
    </button>,
    <button
      key="2"
      data-testid="wrong-answer-0"
      type="button"
    >
      {item.incorrect_answers[0]}
    </button>,
    <button
      key="3"
      data-testid="wrong-answer-1"
      type="button"
    >
      {item.incorrect_answers[1]}
    </button>,
    <button
      key="4"
      data-testid="wrong-answer-2"
      type="button"
    >
      {item.incorrect_answers[2]}
    </button>,
  ];

  const button2 = [
    <button
      key="1"
      data-testid="correct-answer"
      type="button"
    >
      {item.correct_answer}
    </button>,
    <button
      key="2"
      data-testid="wrong-answer-0"
      type="button"
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
  item: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default Question;
