import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/actions';

function Ranking({ logoutLigin }) {
  const history = useHistory();
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
