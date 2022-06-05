import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar/Avatar';

import './Toolbar.scss';

function Toolbar() {
  const title = useSelector((state) => state.title.text);

  return (
    <div className="Toolbar">
      <div className="Toolbar__title">{title}</div>

      <Avatar />
    </div>
  );
}

export default Toolbar;
