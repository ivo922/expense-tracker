import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveAccount } from '../../redux/sessionSlice';

import './Accounts.scss';

function Accounts() {
  const accounts = useSelector((state) => state.session.user.accounts);
  const current = useSelector((state) => state.session.activeAccount);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="Accounts">
      <span
        className={active ? 'active' : ''}
        onClick={() => {
          setActive(!active);
        }}
      >
        {current.name}
      </span>

      <ul className={active ? 'active' : ''}>
        {accounts.map((account) => {
          return (
            <li
              key={account.name}
              className={account.name === current.name ? 'current' : ''}
              onClick={() => {
                dispatch(setActiveAccount(account));
                setActive(false);
                navigate('/');
              }}
            >{`${account.name} - ${account.balance/100} BGN`}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default Accounts;
