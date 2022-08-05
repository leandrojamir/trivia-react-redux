import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
const num = 3;

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [btn, setBtn] = useState({ name: false, email: false });
  const [settings, setSettings] = useState(false);
  return (
    <div>
      {settings && <Redirect to="/settings" />}
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

export default Login;
