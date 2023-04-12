import React from 'react';
import { Link } from 'react-router-dom';
import AuthWithForm from './AuthWithForm';

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <AuthWithForm
      title="Регстрация"
      buttonText="Зарегистрироваться"
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
        onChange={handlePasswordChange}/>
      <p className="auth__text">Уже зарегистрированы? <Link className="auth__text-link" to="/sign-in">Войти</Link></p>
    </AuthWithForm>
    
  );
}

export default Register;