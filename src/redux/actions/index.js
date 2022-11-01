// Coloque aqui suas actions
export const actionCreator = (type, payload) => ({
  type,
  payload,
});

export function fetchCurrencies() {
  return (dispatch) => {
    (fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currenciesInfos) => {
        const codes = Object.keys(currenciesInfos);
        const currencies = codes.filter((currency) => currency !== 'USDT');
        return dispatch(actionCreator('GET_CURRENCIES', currencies));
      }));
  };
}

export function fetchExchange(expenseInfo, currencies) {
  return (dispatch) => {
    dispatch(actionCreator('SET_LOADING'));
    (fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currenciesInfos) => {
        const exchangeRates = {};
        currencies.forEach((currency) => {
          exchangeRates[currency] = currenciesInfos[currency];
        });
        const newExpense = {
          ...expenseInfo,
          exchangeRates: currenciesInfos,
        };
        return dispatch(actionCreator('SAVE_EXPENSE', newExpense));
      }));
  };
}
