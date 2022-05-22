import React from 'react';
import { useState } from 'react';

import './Balance.scss';

function Balance() {
  const [balance, setBalance] = useState(1000);

  return (
    <div className={`Balance${balance < 0 ? ' negative' : ' positive'}`}>
      <div className='Balance__circle'>
        <h1 className='Balance__value'>{balance}BGN</h1>
      </div>
    </div>
  );
}

export default Balance;
