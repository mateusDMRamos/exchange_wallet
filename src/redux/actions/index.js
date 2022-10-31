// Coloque aqui suas actions
export const actionCreator = (type, payload) => ({
  type,
  payload,
});

// export const fetchCurrencies = async () => {
//   const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const currencies = await response.json();
//   console.log(currencies);
//   console.log(actionCreator('GET_CURRENCIES', currencies));
// };

export function fetchCurrencies() {
  return (dispatch) => {
    // dispatch(requestMoviesStarted());
    (fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currenciesInfos) => {
        const codes = Object.keys(currenciesInfos);
        const currencies = codes.filter((currency) => currency !== 'USDT');
        return dispatch(actionCreator('GET_CURRENCIES', currencies));
      }));
  };
}
