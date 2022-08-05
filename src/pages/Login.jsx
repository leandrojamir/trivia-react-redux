import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions';

const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
const num = 3;

function Login(props) {
  const { disptachFetchToken, redirect } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [btn, setBtn] = useState({ name: false, email: false });
  const [settings, setSettings] = useState(false);
  return (
    <div>
      {settings && <Redirect to="/settings" />}
      {redirect && <Redirect to="/game" />}
      <input
        type="text"
        placeholder="Digite seu nome"
        data-testid="input-player-name"
        value={ name }
        onChange={ ({ target }) => {
          setName(target.value);
          setBtn({ ...btn, name: target.value.length >= num });
        } }
      />
      <input
        type="text"
        placeholder="Digite seu E-mail"
        data-testid="input-gravatar-email"
        value={ email }
        onChange={ ({ target }) => {
          setEmail(target.value);
          setBtn({ ...btn, email: emailValidation.test(target.value) });
        } }
      />
      <button
        type="button"
        data-testid="btn-play"
        disabled={ !(btn.name && btn.email) }
        onClick={ () => {
          disptachFetchToken();
        } }
      >
        Play
      </button>
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ () => {
          setSettings(true);
        } }
      >
        Settings
      </button>
    </div>
  );
}

Login.propTypes = {
  disptachFetchToken: PropTypes.func,
  redirect: PropTypes.bool,
}.isRequired;

const mapStateToProps = ({ token }) => ({
  redirect: token.redirect,
});

const mapDispatchToProps = (dispatch) => ({
  disptachFetchToken: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
