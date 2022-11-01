import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExchange } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, currencies, dispatch } = this.props;
    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(fetchExchange(expense, currencies));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <input
          name="value"
          type="number"
          data-testid="value-input"
          placeholder="Valor da Despesa"
          onChange={ this.handleChange }
          value={ value }
        />
        <input
          name="description"
          type="text"
          data-testid="description-input"
          placeholder="Descrição da Despesa"
          onChange={ this.handleChange }
          value={ description }
        />
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
        >
          {currencies.map((currencyCode) => (
            <option key={ currencyCode } value={ currencyCode }>
              {currencyCode}
            </option>))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
