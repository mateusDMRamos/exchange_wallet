import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actionCreator from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disable: true,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { email, password } = this.state;
      const minLength = 5;
      if (email.includes('@') && email.includes('.com') && password.length > minLength) {
        this.setState({
          disable: false,
        });
      } else {
        this.setState({
          disable: true,
        });
      }
    });
  };

  loginAction = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(actionCreator('LOGIN', email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disable } = this.state;
    return (
      <form>
        <input
          type="email"
          name="email"
          onChange={ this.handleChange }
          data-testid="email-input"
          value={ email }
        />
        <input
          type="password"
          name="password"
          onChange={ this.handleChange }
          data-testid="password-input"
          value={ password }
        />
        <button type="button" disabled={ disable } onClick={ this.loginAction }>
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(null)(Login);
