import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountsItem from './AccountsItem';

import './AccountsCRUD.scss';
import Icon from '../Icon/Icon';
import { updateSession } from '../../redux/sessionSlice';
import Popup from '../Popup/Popup';
import AccountsCreate from './AccountsCreate';

function AccountsCRUD() {
  const accounts = useSelector((state) => state.session.user.accounts);
  const id = useSelector((state) => state.session.user._id);
  const dispatch = useDispatch();
  const [popupContent, setPopupContent] = useState(null);

  /**
   * Handles popup close.
   */
  const onPopupClose = () => {
    setPopupContent(null);
  };

  /**
   * Opens create account popup.
   */
  const createAccountPopup = () => {
    setPopupContent(
      <AccountsCreate onSubmit={onCreate} onClose={onPopupClose} />
    );
  };

  /**
   * Opens edit account popup.
   *
   * @param {Object} account
   */
  const editAccountPopup = (account) => {
    setPopupContent(
      <AccountsCreate
        account={account}
        onSubmit={onEdit}
        onClose={onPopupClose}
      />
    );
  };

  /**
   * Opens delete account confirmation popup.
   *
   * @param {Object} account
   */
  const deleteAccountPopup = (account) => {
    setPopupContent(
      <Popup onClose={onPopupClose}>
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

          <button className="btn btn--base btn--green" onClick={onPopupClose}>
            Cancel
          </button>
        </div>
      </Popup>
    );
  };

  /**
   * Handles account creation.
   *
   * @param {Object} account
   */
  const onCreate = async (account) => {
    const response = await fetch(`http://localhost:5000/api/users/${id}`);
    const user = await response.json();

    const exists = user.accounts.find((acc) => {
      return acc.name === account.name;
    });

    if (!!exists) {
      setPopupContent(
        <Popup onClose={onPopupClose}>
          <h6 style={{ color: 'red' }}>
            An account with this name already exists.
          </h6>
        </Popup>
      );
      return;
    }

    user.accounts.push(account);

    fetch(`http://localhost:5000/api/users/update/account/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateSession(user));
        setPopupContent(null);
      });
  };

  /**
   * Handles account edit.
   *
   * @param {Object} account
   */
  const onEdit = async (account) => {
    const response = await fetch(`http://localhost:5000/api/users/${id}`);
    const user = await response.json();

    const exists = user.accounts.find((acc) => {
      return acc.name === account.name;
    });

    if (!exists) {
      setPopupContent(
        <Popup onClose={onPopupClose}>
          <h6 style={{ color: 'red' }}>
            An account with this name doesn't exists.
          </h6>
        </Popup>
      );
      return;
    }

    const newAccounts = user.accounts.map((acc) => {
      if (acc.name === account.name) {
        return account;
      }
      return acc;
    });

    user.accounts = newAccounts;

    fetch(`http://localhost:5000/api/users/update/account/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateSession(user));
        setPopupContent(null);
      });
  };

  /**
   * Handles account delete.
   *
   * @param {Object} account
   */
  const onDelete = async (account) => {
    const response = await fetch(`http://localhost:5000/api/users/${id}`);
    const user = await response.json();

    const exists = user.accounts.find((acc) => {
      return acc.name === account.name;
    });

    if (!exists) {
      setPopupContent(
        <Popup onClose={onPopupClose}>
          <h6 style={{ color: 'red' }}>
            The account you wish to delete doesn't exists.
          </h6>
        </Popup>
      );
      return;
    }

    const newAccounts = user.accounts.filter((acc) => {
      return acc.name !== account.name;
    });

    user.accounts = newAccounts;

    fetch(`http://localhost:5000/api/users/update/account/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateSession(user));
        setPopupContent(null);
      });
  };

  return (
    <div className="AccountsCRUD">
      <h6>My accounts:</h6>

      <ul>
        {accounts.map((account, index) => {
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

      <button className="btn AccountsCRUD__create" onClick={createAccountPopup}>
        <Icon icon="plus" /> <span>Create new account</span>
      </button>

      {popupContent}
    </div>
  );
}

export default AccountsCRUD;
