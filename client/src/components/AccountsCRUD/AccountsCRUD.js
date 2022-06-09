import React from 'react';
import { useSelector } from 'react-redux';
import AccountsItem from './AccountsItem';

import './AccountsCRUD.scss';
import Icon from '../Icon/Icon';

function AccountsCRUD() {
  const accounts = useSelector((state) => state.session.user.accounts);

  const onCreate = () => {};

  return (
    <div className="AccountsCRUD">
      {accounts.map((account) => {
        return <AccountsItem account={account} />;
      })}

      <button className="btn AccountsCRUD__create" onClick={onCreate}>
        <Icon icon="plus" /> <span>Create new account</span>
      </button>
    </div>
  );
}

export default AccountsCRUD;
