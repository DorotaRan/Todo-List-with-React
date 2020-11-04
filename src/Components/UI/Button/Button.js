import React from 'react';
import './Button.css';

function Button({ label, type, callbackFn, variant }) {
  let btnClassName = 'btn';
  
  if (variant === 'delete') {
    btnClassName = btnClassName + ' icon' + ' btn-delete';
  } else if (variant === 'add') {
    btnClassName = btnClassName + ' btn-add';
  } else if (variant === 'edit') {
    btnClassName = btnClassName + ' icon' + ' btn-edit';
  } else if (variant === 'check') {
    btnClassName = btnClassName + ' icon' + ' btn-check';
  }
 
  return (
    <button 
      className={btnClassName} 
      type={type} 
      onClick={callbackFn}
    >
      {label}
    </button>
  );
}

export default Button;