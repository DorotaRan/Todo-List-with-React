import React from 'react';
import './Input.css';

function Input({ label, id, name, type = 'text', placeholder, validationError }) {
  return (
    <>
      <label className="label" forhtml={id}>{label}</label>
      <input className="input" placeholder={placeholder} name={name} type={type} id={id} />
      {validationError && <p className="label label-error">{validationError}</p>}
    </>
  );
}

export default Input;


