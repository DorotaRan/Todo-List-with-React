import React, { useState } from 'react';
import './Input.css';

function Input({
  label,
  id,
  name,
  value = '',
  type = 'text',
  placeholder,
  validationError,
}) {
  const [ inputValue, updateValue ] = useState(value)

  const onInputChange = event => { updateValue(event.target.value) } 

  return (
    <div className="input-wrapper">
      <label className="label" forhtml={id}>{label}</label>
      <input
        className="input"
        placeholder={placeholder}
        name={name}
        value={inputValue}
        onChange={onInputChange}
        type={type}
        id={id}
      />
      {validationError && <p className="label label-error">{validationError}</p>}
    </div>
  );
}

export default Input;



