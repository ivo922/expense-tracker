import React, { useState } from 'react';

import './Popup.scss';

function Popup(props) {
  return (
    <div className="Popup">
      <div className='Popup__overlay' onClick={props.onClose}></div>

      <div className="Popup__container">
        <button className='btn Popup__close' onClick={props.onClose}><span></span></button>

        <div className='Popup__content'>{props.children}</div>
      </div>
    </div>
  );
}

export default Popup;
