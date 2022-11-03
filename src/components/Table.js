import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreator } from '../redux/actions';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const { dispatch } = this.props;
    const expenseId = Number(target.classList[1]);
    dispatch(actionCreator('DELETE_EXPENSE', expenseId));
  };

  setUpdate = ({ target }) => {
    const { dispatch } = this.props;
    const editId = Number(target.classList[1]);
    dispatch(actionCreator('SET_EDIT', editId));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-wrap">
        <table className="table">
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          <div className="separation-line" />
          <tbody>
            {expenses.map((expense) => {
              const { id,
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              } = expense;
              const exchange = Number(exchangeRates[currency].ask);
              const { name } = exchangeRates[currency];
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{name}</td>
                  <td>{exchange.toFixed(2)}</td>
                  <td>{(Number(value) * exchange).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      className={ `edit-button ${id}` }
                      type="button"
                      data-testid="edit-btn"
                      onClick={ this.setUpdate }
                    >
                      Editar despesa
                    </button>
                    <button
                      className={ `delete-button ${id}` }
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.deleteExpense }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
