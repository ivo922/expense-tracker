import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeTitle } from '../../redux/titleSlice';
import Balance from '../Balance/Balance';
import Operations from '../Operations/Operations';

import './Overview.scss';

function Overview() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Overview';
    dispatch(changeTitle('Overview'));
  }, []);

  return (
    <div className="Overview">
      <Balance />

      <Operations />
    </div>
  );
}

export default Overview;
