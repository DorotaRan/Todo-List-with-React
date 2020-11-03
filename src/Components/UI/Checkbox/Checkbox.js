import React from 'react';
import './Checkbox.css';

function Checkbox({ 
  name,
  callbackFn,
  type,
}){
  return (
    <input 
    onClick = {callbackFn}
    className="checkbox" 
    name={name}
    type={type} 
    />
  );
}

export default Checkbox;