import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../../redux/sessionSlice';
import Popup from '../Popup/Popup';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function OperationCreate(props) {
  // Datepicker state
  const [startDate, setStartDate] = useState(new Date());

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
    let value = data.get('value');
    const category = data.get('category');
    const date = data.get('date');
    const description = data.get('description');

    // Sync DB account with state account in case changes were made from another client.
    const findAccount = user.accounts.find((acc) => {
      return acc.name === account.name;
    });

    if (
      !findAccount &&
      !findAccount.categories[props.operation].includes(category)
    ) {
      console.log('TODO: No account');
      return;
    }

    if (props.operation === 'expense') {
      value = -value;
    }

    const transaction = {
      type: props.operation,
      account: findAccount.name,
      category: category,
      date: date,
      fullDate: startDate.toString(),
      value: value,
      description: description,
    };

    const newAccount = {
      name: findAccount.name,
      balance: +findAccount.balance + +value,
    };

    fetch(`http://localhost:5000/api/users/create/transaction/${id}`, {
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
        props.onClose();
      });
  };

  return (
    <Popup onClose={props.onClose}>
      <h3>
        {props.operation} in {account.name}
      </h3>

      <form className="form" onSubmit={onSubmit}>
        <div className="form__row">
          <div className="form__controls">
            <label htmlFor="value">Value</label>

            <input
              name="value"
              type="number"
              defaultValue=""
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
              defaultValue={''}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {account.categories[props.operation].map((category, index) => {
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
              value={props.operation}
              className={`btn btn--base ${
                props.operation === 'income' ? 'btn--green' : 'btn--red'
              }`}
            />
          </div>
        </div>
      </form>
    </Popup>
  );
}

export default OperationCreate;
