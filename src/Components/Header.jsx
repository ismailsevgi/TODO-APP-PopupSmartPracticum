import React, { useContext, useRef, useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';
import { nanoid } from 'nanoid';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const filterHigh = ['high', 'medium', 'low', 'done'];
const filterLow = ['low', 'medium', 'high', 'done'];
const filterDone = ['done', 'high', 'medium', 'low'];

function Header() {
  const { setTask, task, setReload, setFilter, userName } =
    useContext(GlobalContext);

  let formRef = useRef('');

  function handleChange(e) {
    setTask({
      ...task,
      content: e.target.value,
    });
  }

  function onlyOne(e) {
    e.preventDefault();
    setTask({
      ...task,
      priority: e.target.id,
      id: nanoid(),

      date: new Date(),
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    !task.priority
      ? toast.warn('Please select a priority', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
        })
      : fetch('https://63187952ece2736550cafa71.mockapi.io/todos', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setReload((prev) => !prev);
            toast.success('Task successfully added', {
              position: 'bottom-center',
              autoClose: 2000,
              hideProgressBar: true,
            });
          });

    //set obj initial

    formRef.current.reset();
  };

  const handleFilter = (e) => {
    let value = e.target.value;

    value === 'highToLow'
      ? setFilter(filterHigh)
      : value === 'lowToHigh'
      ? setFilter(filterLow)
      : setFilter(filterDone);

    setReload((prev) => !prev);
  };

  useEffect(() => {
    setFilter(filterHigh);
  }, []);

  const myReg = /[^"]/g;

  return (
    <form ref={formRef} className='form' onSubmit={handleSubmit}>
      <ToastContainer />
      <span className='form-welcome'>Welcome {userName.match(myReg)}</span>
      <div className='inputBox'>
        <input
          className='inputBox-input'
          placeholder='Add new task...'
          onChange={(e) => handleChange(e)}
          minLength='3'
          maxLength='27'
          required
        />
        <button type='submit'>ADD</button>
      </div>

      <div className='form-priority'>
        <>
          <h2>PRIORITY: </h2>
          <label
            id='highLabel'
            htmlFor='highCheck'
            className={
              task.priority === 'highCheck'
                ? 'labelHigh-activated'
                : 'labelHigh'
            }
          ></label>
          <input id='highCheck' type='checkbox' onClick={(e) => onlyOne(e)()} />
          <label
            id='mediumLabel'
            htmlFor='mediumCheck'
            className={
              task.priority === 'mediumCheck'
                ? 'labelMedium-activated'
                : 'labelMedium'
            }
          ></label>
          <input id='mediumCheck' type='checkbox' onClick={(e) => onlyOne(e)} />
          <label
            id='lowLabel'
            htmlFor='lowCheck'
            className={
              task.priority === 'lowCheck' ? 'labelLow-activated' : 'labelLow'
            }
          ></label>
          <input id='lowCheck' type='checkbox' onClick={(e) => onlyOne(e)} />
        </>
        <>
          <div className='filter'>
            <h2>FILTER: </h2>
            <select className='select' onChange={(e) => handleFilter(e)}>
              <option className='select-highToLow' value={'highToLow'} selected>
                <span>High {'>'} Low</span>
              </option>
              <option className='select-lowToHigh' value={'lowToHigh'}>
                <span>Low {'>'} High</span>
              </option>
              <option className='select-done' value={'done'}>
                <span>Done</span>
              </option>
            </select>
          </div>
        </>
      </div>
    </form>
  );
}

export default Header;
