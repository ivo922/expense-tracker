import React from 'react';
import Balance from '../Balance/Balance';
import Operations from '../Operations/Operations';

import './Overview.scss';

function Overview() {
  return (
    <div className="Overview">
      <Balance />

      <Operations />
    </div>
  );
}

export default Overview;
