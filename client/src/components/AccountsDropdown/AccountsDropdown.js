import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveAccount } from '../../redux/sessionSlice';

import './AccountsDropdown.scss';

function AccountsDropdown() {
  const accounts = useSelector((state) => state.session.user.accounts);
  const activeAccount = useSelector((state) => state.session.activeAccount);
  const current = accounts[activeAccount];
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="AccountsDropdown">
      <span
        className={active ? 'active' : ''}
        onClick={() => {
          setActive(!active);
        }}
      >
        {current.name}
      </span>

      <ul className={active ? 'active' : ''}>
        {accounts.map((account, index) => {
          return (
            <li
              key={account.name}
              className={account.name === current.name ? 'current' : ''}
              onClick={() => {
                dispatch(setActiveAccount(index));
                setActive(false);
              }}
            >{`${account.name} - ${account.balance / 100} BGN`}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default AccountsDropdown;
