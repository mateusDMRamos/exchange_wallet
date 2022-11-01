import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class Header extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          { expenses.length === 0 ? 0 : expenses
            .reduce((prev, curr) => {
              const exchangeRate = Number(curr.exchangeRates[curr.currency].ask);
              const value = Number(curr.value) * exchangeRate;
              const prevNumber = parseFloat(prev);
              const total = (value + prevNumber).toFixed(2);
              return (total);
            }, 0) }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
