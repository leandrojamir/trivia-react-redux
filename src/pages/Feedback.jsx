import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const tres = 3;

function Feedback({ headerDetail }) {
  const history = useHistory();
  return (
    <header>
      <img
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${headerDetail.gravatarEmail}` }
        alt="Gravatar"
        width="40px"
      />
      <h5
        data-testid="header-player-name"
      >
        {headerDetail.name}
      </h5>
      <section data-testid="feedback-total-score">
        <p
          data-testid="header-score"
        >
          {Number(headerDetail.score)}
        </p>
      </section>
      <section data-testid="feedback-total-question">
        <p
          data-testid="header-assertions"
        >
          {Number(headerDetail.assertions)}
        </p>
      </section>
      {headerDetail.assertions < tres && (
        <p data-testid="feedback-text">Could be better...</p>
      )}
      {headerDetail.assertions >= tres && (
        <p data-testid="feedback-text">Well Done!</p>
      )}
      <button
        data-testid="btn-ranking"
        type="button"
        onClick={ () => {
          history.push('/ranking');
        } }
      >
        Ranking
      </button>
    </header>
  );
}

Feedback.propTypes = {
  headerDetail: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  headerDetail: state.player,
});

export default connect(mapStateToProps)(Feedback);
