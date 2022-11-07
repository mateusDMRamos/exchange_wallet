import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExchange, actionCreator } from '../redux/actions';

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
    const { expenses, currencies, dispatch, editor, idToEdit } = this.props;
    if (!editor) {
      const expense = {
        id: expenses.length,
        value,
        description,
        currency,
        method,
        tag,
      };
      dispatch(fetchExchange(expense, currencies));
    } else {
      const expense = {
        id: idToEdit,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: expenses[idToEdit].exchangeRates,
      };
      dispatch(actionCreator('UPDATE_EXPENSE', expense));
    }
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form className="expense-form">
        <div className="expense-inputs">
          <label htmlFor="description" id="description-wrapper">
            <strong>Descrição da despesa </strong>
            <input
              id="description"
              name="description"
              type="text"
              data-testid="description-input"
              placeholder="Descrição da Despesa"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="tag" id="tag-wrapper">
            <strong>Categoria da despesa </strong>
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="value" id="value-wrapper">
            <strong>Valor </strong>
            <input
              id="value"
              name="value"
              type="number"
              data-testid="value-input"
              placeholder="Valor da Despesa"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="method" id="method-wrapper">
            <strong>Método de pagamento </strong>
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency" id="currency-wrapper">
            <strong>Moeda </strong>
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((currencyCode) => (
                <option key={ currencyCode } value={ currencyCode }>
                  {currencyCode}
                </option>))}
            </select>
          </label>
        </div>
        <div className="expense-btn">
          <button type="button" onClick={ this.handleClick }>
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    exchangeRates: PropTypes.shape({
      USD: PropTypes.shape({
        code: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
