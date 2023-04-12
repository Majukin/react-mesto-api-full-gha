import React from 'react';
import AuthWithForm from './AuthWithForm';

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setpassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <AuthWithForm
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
    >
      <input 
        name="email" 
        type="email" 
        className="form__input form__input_type_email" 
        required
        maxLength="30" 
        placeholder="Email" 
        value={email || ""} 
        onChange={handleEmailChange}
      />
      <input 
        name="password" 
        type="password" 
        className="form__input form__input_type_password" 
        required
        maxLength="30" 
        placeholder="Пароль" 
        value={password || ""} 
        onChange={handlePasswordChange} 
      />
    </AuthWithForm>
  );
}

export default Login;