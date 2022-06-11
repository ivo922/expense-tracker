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

  const onPopupClose = () => {
    setPopupContent(null);
  };

  const createAccountPopup = () => {
    setPopupContent(
      <AccountsCreate onSubmit={onCreate} onClose={onPopupClose} />
    );
  };

  const editAccountPopup = () => {};

  const onCreate = async (account) => {
    const response = await fetch(`http://localhost:5000/api/users/${id}`);
    const user = await response.json();

    const exists = user.accounts.find((acc) => {
      return acc.name === account.name;
    });

    if (!!exists) {
      setPopupContent(<Popup onClose={onPopupClose}><h6 style={{color: 'red'}}>An account with this name already exists.</h6></Popup>);
      return;
    }

    user.accounts.push(account);

    fetch(`http://localhost:5000/api/users/update/accounts/${id}`, {
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
              <AccountsItem account={account} />
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
