import React from 'react';
import { useSelector } from 'react-redux';

import './Balance.scss';

function Balance() {
  // TODO: show active account balance
  const balance = useSelector(state => state.session.user.accounts[0].balance);

  return (
    <div className={`Balance${balance < 0 ? ' negative' : ' positive'}`}>
      <div className='Balance__circle'>
        <h1 className='Balance__value'>{balance}BGN</h1>
      </div>
    </div>
  );
}

export default Balance;
