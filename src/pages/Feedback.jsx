import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions';

function Feedback({ headerDetail, login }) {
  const [redirectLogin, setRedirectLogin] = useState(false);
  const history = useHistory();

  function handleClickPlayAgain() {
    login();
    setRedirectLogin(true);
  }
const tres = 3;

  return (
    <header>
      { redirectLogin && history.push('/') }
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
        type="button"
        data-testid="btn-play-again"
        onClick={ handleClickPlayAgain }
      >
        Play Again
      </button>
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
  login: PropTypes.func.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  headerDetail: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
