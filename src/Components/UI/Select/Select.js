import React from 'react';
import './Select.css';

function Select({ 
  label, 
  id, 
  onInputChange = () => {}
}){
  return (
    <div className='select-wrapper'>
      <label className='label' forhtml={id}>{label}</label>
      <select className='select' id={id} label={label}>
        <option value='1'>Low</option> 
        <option value='2'>Medium</option> 
        <option value='3'>High</option> 
      </select>
    </div>
  );
}

export default Select;


