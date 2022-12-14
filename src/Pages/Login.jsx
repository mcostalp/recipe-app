import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
// import { useLocalStorage } from '../hooks/useLocalStorage';
import '../Styles/Login.css';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { setUserEmail } = useContext(RecipesContext);

  function onHandleLogin() {
    const setLoginRegister = () => {
      localStorage.setItem('user', JSON.stringify({ email }));
      localStorage.setItem('mealsToken', JSON.stringify(1));
      localStorage.setItem('drinksToken', JSON.stringify(1));
      setUserEmail({ email });
    };
    setLoginRegister();

    history.push('/meals');
  }

  function validationLogin(emailUser, senhaUser) {
    const EMAIL_VALI = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
    const MIN_PASSWORD = 6;
    return !(EMAIL_VALI.test(emailUser) && senhaUser.length > MIN_PASSWORD);
  }

  useEffect(() => {
    setBtnDisabled(validationLogin(email, senha));
  }, [email, senha]);

  // useLocalStorage();

  return (
    <div className="main-container-login">
      <div className="bg-image" />
      <div className="login-card">

        <div className="login-head">
          <h1>Login</h1>
          <h5>Sign up</h5>
        </div>

        <label htmlFor="email">
          <input
            placeholder="Email"
            id="email"
            type="text"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            data-testid="email-input"
          />
        </label>

        <label htmlFor="senha">
          <input
            placeholder="Senha"
            id="senha"
            type="password"
            value={ senha }
            onChange={ ({ target: { value } }) => setSenha(value) }
            data-testid="password-input"
          />
        </label>

        <button
          className="btn"
          type="button"
          data-testid="login-submit-btn"
          disabled={ btnDisabled }
          onClick={ onHandleLogin }
        >
          Entrar
        </button>
      </div>

    </div>
  );
}

export default Login;
