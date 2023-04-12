import React from 'react';

const AuthWithForm = ({ title, buttonText, onSubmit, children }) => {
  return (
    <form className="auth" onSubmit={onSubmit}>
      <h2 className="auth__title">{title}</h2>
        {children}
      <button className="auth__save-button" type="submit">{buttonText}</button>
    </form>
  )
}

export default AuthWithForm;
