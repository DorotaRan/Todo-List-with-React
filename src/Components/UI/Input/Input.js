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

  return (
    <div className='input-wrapper'>
      <label className='label' forhtml={id}>{label} </label>
      <input
        className='input'
        placeholder={placeholder}
        name={name}
        defaultValue={value}
        type={type}
        id={id}
      />
      {validationError && <p className='label-error'>{validationError}</p>}
    </div>
  );
}

export default Input;



