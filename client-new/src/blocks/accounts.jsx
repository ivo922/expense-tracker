import React from 'react';

// Styles
import '../assets/scss/components/accounts.scss';

// Components
import { useUserContext } from '../components/user/use-user-context';
import { usePopupContext } from '../components/popup/use-popup-context';
import Popup from '../components/popup/popup';
import Icon from '../components/Icon/Icon';
import AccountsItem from '../components/accounts/accounts-item';
import AccountsCreate from '../components/accounts/accounts-create';

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
   * Opens delete account confirmation popup.
   *
   * @param {Object} account
   */
  const deleteAccountPopup = (account) => {
    open(
      <Popup>
        <h6 style={{ color: 'red' }}>
          Are you sure you want to delete{' '}
          <span style={{ color: 'black' }}>{account.name}</span>?
        </h6>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            className="btn btn--base btn--red"
            onClick={() => {
              onDelete(account);
            }}
          >
            Delete
          </button>

          <button className="btn btn--base btn--green">Cancel</button>
        </div>
      </Popup>
    );
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

  /**
   * Handles account delete.
   *
   * @param {Object} account
   */
  const onDelete = async (account) => {
    fetch(
      `http://localhost:5000/api/users/${user._id}/accounts/${account._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
        close();
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
                onDelete={deleteAccountPopup}
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
