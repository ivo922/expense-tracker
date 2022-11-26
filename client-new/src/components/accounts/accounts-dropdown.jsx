import React, { useState } from 'react';

// Components
import { useUserContext } from '../user/use-user-context';

// Styles
import '../../assets/scss/components/accounts-dropdown.scss';

function AccountsDropdown() {
  const { user, account, setAccount, getAccount } = useUserContext();
  const activeAccount = user.accounts[account];
  const [active, setActive] = useState(false);

  return (
    <div className="accounts-dropdown">
      <span
        className={active ? 'active' : ''}
        onClick={() => {
          setActive(!active);
        }}
      >
        {activeAccount.name}
      </span>

      <ul className={active ? 'active' : ''}>
        {user.accounts.map((account, index) => {
          return (
            <li
              key={account.name}
              className={account.id === activeAccount.id ? 'current' : ''}
              onClick={() => {
                setAccount(index);
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
