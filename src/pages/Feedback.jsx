import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearPlayes, logout } from '../redux/actions';

const tres = 3;
function Feedback({ headerDetail, login, token, clearPlayer }) {
  const [redirectLogin, setRedirectLogin] = useState(false);
  const history = useHistory();

  function savePlayer() {
    const getLocal = JSON.parse(localStorage.getItem('Players'));
    const player = {
      name: headerDetail.name,
      score: headerDetail.score,
      gravatar: headerDetail.gravatarEmail,
      token: token.token,
    };
    const arrPlayes = [...(getLocal || []), player];
    localStorage.setItem('Players', JSON.stringify(arrPlayes));
    clearPlayer();
  }

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
        onClick={ () => {
          savePlayer();
          login();
          setRedirectLogin(true);
        } }
      >
        Play Again
      </button>
      <button
        data-testid="btn-ranking"
        type="button"
        onClick={ () => {
          savePlayer();
          login();
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
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(logout()),
  clearPlayer: () => dispatch(clearPlayes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
