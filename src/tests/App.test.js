import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('', () => {
  const inputEmailId = 'email-input';
  const inputPasswordId = 'password-input';
  const inputValues = {
    Email: 'teste@teste.com',
    password: '123456',
  };
  const totalField = 'total-field';

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });

  it('Quando a aplicação é renderizada, aparecem os inputs de email e senha e o botão de login', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(inputEmailId);
    const passwordInput = screen.getByTestId(inputPasswordId);
    const loginBtn = screen.getByRole('button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toHaveTextContent('Entrar');
  });

  it('Quando a aplicação é renderizada, verifica se o botão está desabilitado e é habilitado somente se email e senhas válidas são informados', () => {
    renderWithRouterAndRedux(<App />);
    const inputValuesDisabled = {
      wrongEmail: 'teste',
      completeEmail: '@teste.com',
      password: '123456',
    };

    const emailInput = screen.getByTestId(inputEmailId);
    const passwordInput = screen.getByTestId(inputPasswordId);

    const loginBtn = screen.getByRole('button');
    expect(loginBtn).toHaveTextContent('Entrar');
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, inputValuesDisabled.wrongEmail);
    expect(loginBtn).toBeDisabled();
    userEvent.type(emailInput, inputValuesDisabled.completeEmail);
    expect(loginBtn).toBeDisabled();
    userEvent.type(passwordInput, inputValuesDisabled.password);
    expect(loginBtn).not.toBeDisabled();
  });

  it('Quando a aplicação é renderizada, o caminho é / e ao clicar no botão, muda para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId(inputEmailId);
    const passwordInput = screen.getByTestId(inputPasswordId);

    const loginBtn = screen.getByRole('button');
    expect(loginBtn).toHaveTextContent('Entrar');

    userEvent.type(emailInput, inputValues.Email);
    userEvent.type(passwordInput, inputValues.password);
    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/carteira');
  });

  it('Quando o botão é clicado, é feita uma requisição a API', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(inputEmailId);
    const passwordInput = screen.getByTestId(inputPasswordId);

    const loginBtn = screen.getByRole('button');
    expect(loginBtn).toHaveTextContent('Entrar');

    userEvent.type(emailInput, inputValues.Email);
    userEvent.type(passwordInput, inputValues.password);
    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  it('O Header está renderizando email, valor 0 e moeda BRL ao ser renderizado', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(inputEmailId);
    const passwordInput = screen.getByTestId(inputPasswordId);

    const loginBtn = screen.getByRole('button');
    expect(loginBtn).toHaveTextContent('Entrar');

    userEvent.type(emailInput, inputValues.Email);
    userEvent.type(passwordInput, inputValues.password);
    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);

    const emailInformation = screen.getByTestId('email-field');
    const totalValueInformation = await screen.findByTestId(totalField);
    const headerCurrency = screen.getByTestId('header-currency-field');

    expect(emailInformation).toHaveTextContent(inputValues.Email);
    expect(totalValueInformation).toHaveTextContent('0');
    expect(headerCurrency).toHaveTextContent('BRL');
  });

  it('O valor do Header está atualizando quando é adicionada ou excluída uma nova despesa', async () => {
    const exchangeRatesValues = mockData.USD.ask;
    const expectedValue = (10 * exchangeRatesValues).toFixed(2);

    renderWithRouterAndRedux(<Wallet />);

    const valueInputField = screen.getByTestId('value-input');
    const descInputField = screen.getByTestId('description-input');
    const addBtn = screen.getByRole('button');

    userEvent.type(valueInputField, '10');
    userEvent.type(descInputField, 'descrição');
    userEvent.click(addBtn);

    expect(valueInputField).toHaveTextContent('');
    expect(descInputField).toHaveTextContent('');
    expect(global.fetch).toHaveBeenCalled();

    const totalValueInformation = await screen.findByTestId(totalField);
    expect(totalValueInformation).toHaveTextContent(expectedValue);

    const deleteBtn = screen.getByRole('button', { name: 'Excluir' });
    userEvent.click(deleteBtn);
    expect(totalValueInformation).toHaveTextContent('0.00');
  });
  it('O formulário passa para a função de editar após o botão de Editar despesa ser clicado', async () => {
    const exchangeRatesValues = mockData.USD.ask;
    const expectedValue = (10 * exchangeRatesValues).toFixed(2);
    const expectedValue2 = (40 * exchangeRatesValues).toFixed(2);

    renderWithRouterAndRedux(<Wallet />);

    const valueInputField = screen.getByTestId('value-input');
    const descInputField = screen.getByTestId('description-input');
    const addBtn = screen.getByRole('button');

    userEvent.type(valueInputField, '10');
    userEvent.type(descInputField, 'descrição');
    userEvent.click(addBtn);

    const totalValueInformation = await screen.findByTestId(totalField);
    expect(totalValueInformation).toHaveTextContent(expectedValue);

    userEvent.type(valueInputField, '30');
    userEvent.type(descInputField, 'descrição 2');
    userEvent.click(addBtn);

    const totalValueInformation2 = await screen.findByTestId(totalField);
    expect(totalValueInformation2).toHaveTextContent(expectedValue2);

    const editBtn = screen.getAllByRole('button', { name: 'Editar despesa' })[0];
    userEvent.click(editBtn);

    userEvent.type(valueInputField, '20');
    userEvent.type(descInputField, 'descrição');
    userEvent.click(addBtn);

    expect(totalValueInformation2).toHaveTextContent('237.65');
  });
});
