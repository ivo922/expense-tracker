import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { change } from '../../redux/titleSlice';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import './Deposit.scss';

function Deposit() {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('to be changed');

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    document.title = 'Deposit';
  });

  const dispatch = useDispatch();
  dispatch(change('Deposit'));

  return (
    <div className="Deposit">
      <form className="form">
        <div className="form__row">
          <div className="form__controls">
            <label htmlFor="value" className="visually-hidden">
              Value
            </label>

            <input
              name="value"
              value={value}
              onChange={handleValueChange}
              id="value"
              className="field"
            />
          </div>
        </div>

        <div className="form__row">
          <div className="form__controls">
            <label htmlFor="category" className="visually-hidden">
              Category
            </label>

            <select
              name="category"
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="field"
            >
              <option value="Option">Option</option>
            </select>
          </div>

          <div className="form__controls">
            <DatePicker
              selected={startDate}
              onChange={(date = Date) => setStartDate(date)}
              className="field"
            />
          </div>
        </div>

        <div className="form__row">
          <div className="form__controls">
            <input
              type="submit"
              value="Deposit"
              className="form__submit form__submit--deposit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Deposit;
