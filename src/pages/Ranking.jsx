import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/actions';

const menosUm = -1;
function Ranking({ logoutLigin }) {
  const [players, setPlayers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem('Players'));
    getLocal.sort((a, b) => {
      if (b.score < a.score) return menosUm;
      if (b.score > a.score) return 1;
      return 0;
    });
    setPlayers(getLocal);
    console.log(getLocal);
  }, []);

  return (
    <div>
      <h1 data-testid="ranking-title">Ranking</h1>
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ () => {
          logoutLigin();
          history.push('/');
        } }
      >
        Play Again
      </button>
      {players.map((item, index) => (
        <section key={ index }>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${item.gravatar}` }
            alt="Gravatar"
            width="40px"
          />
          <p>
            Name:
            {' '}
            <span data-testid={ `player-name-${index}` }>{item.name}</span>
          </p>
          <p>
            Score:
            {' '}
            <span data-testid={ `player-score-${index}` }>{item.score}</span>
          </p>
        </section>
      ))}
    </div>
  );
}

Ranking.propTypes = {
  logoutLigin: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  logoutLigin: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(Ranking);
