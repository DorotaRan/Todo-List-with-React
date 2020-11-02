import React from 'react';
import './Input.css';

function Input({ 
  label, 
  id, 
  name,
  value = "", 
  type = 'text', 
  placeholder, 
  validationError,
  callbackFn,
  onInputChange = () => {}
}){
  return (
    <div className="input-wrapper">
      <label className="label" forhtml={id}>{label}</label>
      <input 
        onChange = {event => { onInputChange(event.target.value)} }
        onClick={callbackFn}
        className="input" 
        placeholder={placeholder} 
        name={name}
        value={value} 
        type={type} 
        id={id} 
      />
      {validationError && <p className="label label-error">{validationError}</p>}
    </div>
  );
}

export default Input;


