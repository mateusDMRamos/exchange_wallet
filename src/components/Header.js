import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';
import logoTrybeWallet from '../styles/assets/logoTrybeWallet.png';
import Moedas from '../styles/assets/Moedas.png';
import profile from '../styles/assets/profile.png';

class Header extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { email, expenses, loading } = this.props;
    return (
      <header>
        <img src={ logoTrybeWallet } alt="Logo Trybe Wallet" className="logo-img" />
        <div>
          <img src={ Moedas } alt="simbolo de moedas" className="symbol-img" />
          {
            loading ? <p>Loading</p> : (
              <p data-testid="total-field" id="expense-details">
                <strong>Total de despesas: </strong>
                {
                  expenses.length === 0 ? '0.00' : expenses
                    .reduce((prev, curr) => {
                      const exchangeRate = Number(curr.exchangeRates[curr.currency].ask);
                      const value = Number(curr.value) * exchangeRate;
                      const prevNumber = parseFloat(prev);
                      const total = parseFloat(value + prevNumber).toFixed(2);
                      return total;
                    }, 0)
                }
                <span data-testid="header-currency-field"> BRL</span>
              </p>)
          }
        </div>
        <div>
          <img src={ profile } alt="simbolo de moedas" className="symbol-img" />
          <p data-testid="email-field" id="login-email">{email}</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  loading: state.wallet.loading,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Header);
