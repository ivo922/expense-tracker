import React from 'react';
import { usePopupContext } from './use-popup-context';

import '../../assets/scss/components/popup.scss';

function Popup({ children }) {
  const { close } = usePopupContext();

  return (
    <div className="popup">
      <div
        className="popup__overlay"
        onClick={() => {
          close();
        }}
      ></div>

      <div className="popup__container">
        <button
          className="btn popup__close"
          onClick={() => {
            close('');
          }}
        >
          <span></span>
        </button>

        <div className="popup__content">{children}</div>
      </div>
    </div>
  );
}

export default Popup;
