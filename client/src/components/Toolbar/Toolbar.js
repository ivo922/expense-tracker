import React, { useState } from 'react';

function Toolbar() {
  const [title, setTitle] = useState(document.title);

  return (
    <div className="Toolbar">
      <div className="Toolbar__back"></div>

      <div className="Toolbar__title">{title}</div>
    </div>
  );
}

export default Toolbar;
