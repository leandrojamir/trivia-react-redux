import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const tres = 3;

function Feed({ headerDetail }) {
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
      <p
        data-testid="feedback-total-score"
      >
        {Number(headerDetail.score)}
      </p>
      <p
        data-testid="feedback-total-question"
      >
        {Number(headerDetail.assertions)}
      </p>
      {headerDetail.assertions < tres && (
        <p data-testid="feedback-text">Could be better...</p>
      )}
      {headerDetail.assertions >= tres && (
        <p data-testid="feedback-text">Well Done!</p>
      )}
    </header>
  );
}

Feed.propTypes = {
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

export default connect(mapStateToProps)(Feed);
