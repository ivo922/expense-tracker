import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

// Styles
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useUserContext } from '../user/use-user-context';
import { usePopupContext } from '../popup/use-popup-context';

function Operation({ type }) {
  // Datepicker state
  const [startDate, setStartDate] = useState(new Date());

  /**
   * Current user.
   *
   */
  const { user, setUser, account } = useUserContext();
  const activeAccount = user.accounts[account];
  const { close } = usePopupContext();

  /**
   * Handles form submit.
   *
   * @param {Event} event
   */
  const onSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    let value = data.get('value');
    const category = data.get('category');
    const date = data.get('date');
    const description = data.get('description');

    if (
      !activeAccount &&
      !activeAccount.categories[type].includes(category)
    ) {
      alert('Invalid transaction');
      return;
    }

    if (type === 'expense') {
      value = -value;
    }

    const transaction = {
      type: type,
      account: activeAccount.name,
      category: category,
      date: date,
      fullDate: startDate.toString(),
      value: value,
      description: description,
    };

    const newAccount = {
      name: activeAccount.name,
      balance: +activeAccount.balance + +value,
    };

    const response = await fetch(`http://localhost:5000/api/users/${user._id}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newAccount, transaction }),
    });
    const updatedUser = await response.json();
    setUser(updatedUser);
    close();
  };

  return (
    <>
      <h3>
        {type} in {activeAccount.name}
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
              {activeAccount.categories[type].map((category, index) => {
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
              value={type}
              className={`btn btn--base ${
                type === 'income' ? 'btn--green' : 'btn--red'
              }`}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default Operation;
