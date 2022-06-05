import React from 'react';
import { useSelector } from 'react-redux';

import './Balance.scss';

function Balance() {
  const balance = useSelector(state => state.session.activeAccount.balance);

  return (
    <div className={`Balance${balance < 0 ? ' negative' : ' positive'}`}>
      <div className='Balance__circle'>
        <h1 className='Balance__value'>{balance/100} BGN</h1>
      </div>
    </div>
  );
}

export default Balance;
