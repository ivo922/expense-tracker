import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Toolbar.scss';

function Toolbar() {
  const title = useSelector((state) => state.title.text);

  return (
    <div className="Toolbar">
      <div className="Toolbar__back"></div>

      <div className="Toolbar__title">{title}</div>
    </div>
  );
}

export default Toolbar;
