import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class Header extends Component {
  state = {
    selectedCurrency: [],
    expenseValue: 0,
  };

  componentDidMount() {
    const { expenses, dispatch } = this.props;
    const expenseValue = expenses.length === 0 ? 0 : 1;
    this.setState({
      selectedCurrency: 'BRL',
      expenseValue,
    });
    dispatch(fetchCurrencies());
  }

  render() {
    const { expenseValue, selectedCurrency } = this.state;
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{expenseValue}</p>
        <p data-testid="header-currency-field">{selectedCurrency}</p>
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
  expenses: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
