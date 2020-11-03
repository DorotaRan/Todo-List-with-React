import React from 'react';
import './Modal.css';

function Modal({ children}) {
  return (
    <modal className="modal">
        {children}
    </modal> 
  );
}

export default Modal;