// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: ['BRL'], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  loading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ('GET_CURRENCIES'):
    return ({ ...state, currencies: action.payload });
  case ('SET_LOADING'):
    return ({ ...state, loading: true });
  case ('SAVE_EXPENSE'):
    return ({ ...state,
      expenses: [...state.expenses, action.payload],
      loading: false,
    });
  case ('DELETE_EXPENSE'):
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    });
  case ('UPDATE_EXPENSE'):
    return ({
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.payload.id),
        action.payload].sort((a, b) => a.id - b.id),
      editor: false,
    });
  case ('SET_EDIT'):
    return ({
      ...state,
      idToEdit: action.payload,
      editor: true,
    });
  default:
    return state;
  }
};

export default wallet;
