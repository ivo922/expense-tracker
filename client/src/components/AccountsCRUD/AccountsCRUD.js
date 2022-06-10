import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountsItem from './AccountsItem';

import './AccountsCRUD.scss';
import Icon from '../Icon/Icon';
import { updateSession } from '../../redux/sessionSlice';

function AccountsCRUD() {
  const accounts = useSelector((state) => state.session.user.accounts);
  const id = useSelector((state) => state.session.user._id);
  const dispatch = useDispatch();

  const onCreate = async () => {
    const response = await fetch(`http://localhost:5000/api/users/${id}`);
    const user = await response.json();
    user.accounts.push({
      name: 'asd',
      balance: '12312',
      categories: {
        deposit: ['Salary', 'Loan'],
        withdrawal: [
          'Food',
          'Entertainment',
          'Car',
          'Health',
          'Education',
          'Clothing',
        ],
      },
    });

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

      <button className="btn AccountsCRUD__create" onClick={onCreate}>
        <Icon icon="plus" /> <span>Create new account</span>
      </button>
    </div>
  );
}

export default AccountsCRUD;
