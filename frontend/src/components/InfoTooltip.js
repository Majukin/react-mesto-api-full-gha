import SuccessIcon from "../images/SuccessIcon.svg";
import FailIcon from "../images/FailIcon.svg";
import React from "react";

function InfoToolTip(props) {
  return (
    <div className={`popup popup__tooltip ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container"> {props.isSuccess ? (
          <>
            <img src={`${SuccessIcon}`} alt="Зарегистрировались" className="popup__tooltip_image"/>
            <p className="popup__tooltip_message">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img src={`${FailIcon}`} alt="Ошибка" className="popup__tooltip_image"/>
            <p className="popup__tooltip_message">Что-то пошло не так. Попробуйте ещё раз!</p>
          </>
      )}
        <button onClick={props.onClose} className="popup__close-button" type="reset"></button>
      </div>
    </div>
  );
}

export default InfoToolTip;