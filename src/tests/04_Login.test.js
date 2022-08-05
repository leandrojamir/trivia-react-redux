import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('1. Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
  it('Testa se o input de nome e e-mail são renderizados', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByPlaceholderText(/Digite seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/Digite seu E-mail/i);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });

  it('Testa se o input de nome e e-mail são editáveis', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByPlaceholderText(/Digite seu nome/i);
    userEvent.type(inputName, 'João');
    
    expect(inputName).toHaveValue('João');

    const inputEmail = screen.getByPlaceholderText(/Digite seu E-mail/i);
    userEvent.type(inputEmail, 'joao@gmail.com');

    expect(inputEmail).toHaveValue('joao@gmail.com');
  });

  it('Testa se o botão "Play" está desabilitado quando os campos de nome e e-mail estão vazios', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByPlaceholderText(/Digite seu nome/i);
    expect(inputName).toHaveValue('');

    const inputEmail = screen.getByPlaceholderText(/Digite seu E-mail/i);
    expect(inputEmail).toHaveValue('');

    const playButton = screen.getByRole('button', { name: 'Play' });
    expect(playButton).toBeDisabled();
  });
})