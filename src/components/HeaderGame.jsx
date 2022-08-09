import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function HeaderGame(props) {
  const { headerDetail } = props;

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
        data-testid="header-score"
      >
        {`Score: ${headerDetail.score}pts`}
      </p>
    </header>
  );
}

HeaderGame.propTypes = {
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

export default connect(mapStateToProps)(HeaderGame);
