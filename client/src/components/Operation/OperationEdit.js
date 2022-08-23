import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../../redux/sessionSlice';
import Popup from '../Popup/Popup';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function OperationEdit({ operation, onClose, initialData }) {
  // Datepicker state
  const [startDate, setStartDate] = useState(
    !!initialData?.fullDate
      ? new Date(initialData?.fullDate)
      : new Date());

  /**
   * Current user ID.
   * Used for requests.
   */
  const id = useSelector((state) => state.session.user._id);

  // Current account.
  const accounts = useSelector((state) => state.session.user.accounts);
  const activeAccountIndex = useSelector(
    (state) => state.session.activeAccount
  );
  const account = accounts[activeAccountIndex];

  // Dispatch hook.
  const dispatch = useDispatch();

  /**
   * Handles form submit.
   *
   * @param {Event} event
   */
  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:5000/api/users/${id}`);
    const user = await response.json();
    const data = new FormData(event.target);
    const category = data.get('category');
    const date = data.get('date');
    const description = data.get('description');
    let value = data.get('value');

    // Sync DB account with state account in case changes were made from another client.
    const findAccount = user.accounts.find((acc) => {
      return acc.name === account.name;
    });

    if (
      !findAccount &&
      !findAccount.categories[operation].includes(category)
    ) {
      console.log('TODO: No account');
      return;
    }

    if (operation === 'expense') {
      value = -value;
    }

    const transaction = {
      date,
      value,
      description,
      category,
      type: operation,
      account: findAccount.name,
      fullDate: startDate.toString(),
    };

    const newAccount = {
      name: findAccount._id,
      balance: +findAccount.balance + +value,
    };

    console.log(newAccount);
    console.log(transaction);

    fetch(`http://localhost:5000/api/users/update/transaction/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newAccount, transaction }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Build new user for state update.
        const newUserAccounts = user.accounts.map((acc) => {
          if (acc.name === findAccount.name) {
            return { ...findAccount, ...newAccount };
          }
          return acc;
        });

        user.accounts = newUserAccounts;
        user.transactions.push(transaction);

        dispatch(updateSession(user));
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Popup onClose={onClose}>
      <h3>
        {operation} in {account.name}
      </h3>

      <form className="form" onSubmit={onSubmit}>
        <div className="form__row">
          <div className="form__controls">
            <label htmlFor="value">Value</label>

            <input
              name="value"
              type="number"
              defaultValue={Math.abs(initialData?.value) || ''}
              id="value"
              className="form__field"
              min="0"
              placeholder="E.g. 100.50"
              step=".01"
              required
            />
          </div>

          <div className="form__controls">
            <label htmlFor="category">Category</label>

            <select
              name="category"
              id="category"
              className="form__field"
              defaultValue={initialData?.category || ''}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {account.categories[operation].map((category, index) => {
                return (
                  <option key={`${index}-${category}`} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="form__row">
          <div className="form__controls">
            <label htmlFor="date">Date</label>

            <DatePicker
              selected={startDate}
              onChange={(date = Date) => setStartDate(date)}
              className="form__field"
              id="date"
              name="date"
              required
            />
          </div>
        </div>

        <div className="form__row">
          <div className="form__controls">
            <label htmlFor="description">Description</label>

            <input
              name="description"
              defaultValue={initialData?.description || ''}
              placeholder="E.g. Food, Car, Clothes, etc."
              id="description"
              className="form__field"
              maxLength={50}
            />
          </div>
        </div>

        <div className="form__row">
          <div className="form__actions">
            <input
              type="submit"
              value={operation}
              className={`btn btn--base ${
                operation === 'income' ? 'btn--green' : 'btn--red'
              }`}
            />
          </div>
        </div>
      </form>
    </Popup>
  );
}

export default OperationEdit;
