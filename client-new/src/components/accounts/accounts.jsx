import React from 'react';

// Styles
import '../../assets/scss/components/accounts.scss';

// Components
import { useUserContext } from '../user/use-user-context';
import { usePopupContext } from '../popup/use-popup-context';
import Popup from '../popup/popup';
import Icon from '../icon/icon';
import AccountsItem from './accounts-item';
import AccountsCreate from './accounts-create';

const Accounts = () => {
  const { user, setUser } = useUserContext();
  const { open } = usePopupContext();

  /**
   * Opens create account popup.
   */
  const createAccountPopup = () => {
    open(<AccountsCreate />);
  };

  /**
   * Opens edit account popup.
   *
   * @param {Object} account
   */
  const editAccountPopup = (account) => {
    open(<AccountsCreate account={account} onSubmit={onEdit} />);
  };

  /**
   * Handles account edit.
   *
   * @param {Object} account
   */
  const onEdit = async (account) => {
    const response = await fetch(`http://localhost:5000/api/users/${user._id}`);
    const user = await response.json();

    fetch(`http://localhost:5000/api/users/${user._id}/accounts/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    })
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
        open(null);
      });
  };

  return (
    <div className="accounts">
      <h6>My accounts:</h6>

      <ul>
        {user.accounts.map((account, index) => {
          return (
            <li key={index}>
              <AccountsItem
                account={account}
                onEdit={editAccountPopup}
              />
            </li>
          );
        })}
      </ul>

      <button className="btn accounts__create" onClick={createAccountPopup}>
        <Icon icon="plus" /> <span>Create new account</span>
      </button>
    </div>
  );
};

export default Accounts;
