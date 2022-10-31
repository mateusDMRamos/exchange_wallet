import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input
          name="value"
          type="number"
          data-testid="value-input"
          placeholder="Valor da Despesa"
        />
        <input
          name="description"
          type="text"
          data-testid="description-input"
          placeholder="Descrição da Despesa"
        />
        <select name="currencies" data-testid="currency-input">
          {currencies.map((currency) => (
            <option key={ currency } value={ currency }>
              {currency}
            </option>))}
        </select>
        <select data-testid="method-input" name="method">
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>

        <select data-testid="tag-input" name="tag">
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
