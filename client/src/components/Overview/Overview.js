import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { change } from '../../redux/titleSlice';
import Balance from '../Balance/Balance';
import Operations from '../Operations/Operations';

import './Overview.scss';

function Overview() {
  useEffect(() => {
    document.title = 'Overview';
  });

  const dispatch = useDispatch();
  dispatch(change('Overview'));

  return (
    <div className="Overview">
      <Balance />

      <Operations />
    </div>
  );
}

export default Overview;
