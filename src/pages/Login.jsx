import React, { useState } from 'react';

const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
const num = 3;

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [btn, setBtn] = useState({ name: false, email: false });
  return (
    <div>
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
    </div>
  );
}

export default Login;
