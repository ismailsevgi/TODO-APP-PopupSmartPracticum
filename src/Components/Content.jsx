//this components are for keeping cards together in order.
import { formatDistance, formatDistanceToNow } from 'date-fns';
import React, { useContext, createContext, useEffect, useState } from 'react';
import check from '../icons/check.png';
import del from '../icons/del.png';

//import card component later

import GlobalContext from './GlobalContext';

const Content = () => {
  const [element, setElement] = useState('');

  const { todoArray, setReload, filter } = useContext(GlobalContext);

  function handleDelete(id) {
    console.log('delete edildi');
    fetch(`https://63187952ece2736550cafa71.mockapi.io/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setReload((prev) => !prev);
    });
  }

  function handleDone(id, priority) {
    console.log('gelen priority', priority);
    let card = {};
    switch (priority) {
      case 'highCheck':
        console.log('highdan çekti');
        card = todoArray.high.filter(
          (obj) => id === obj.id && { ...obj, isCompleted: !obj.isCompleted }
        );
        break;
      case 'mediumCheck':
        console.log('middan çekti');
        card = todoArray.medium.filter(
          (obj) => id === obj.id && { ...obj, isCompleted: !obj.isCompleted }
        );
        break;
      case 'lowCheck':
        console.log('lowdan çekti');
        card = todoArray.low.filter(
          (obj) => id === obj.id && { ...obj, isCompleted: !obj.isCompleted }
        );
        break;
    }

    let item = card[0];
    item['isCompleted'] = true;

    console.log('item after swtich: ', item);

    fetch(`https://63187952ece2736550cafa71.mockapi.io/todos/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then(() => {
      setReload((prev) => !prev);
    });
  }

  console.log('TODO ARR geldi: ', todoArray);
  useEffect(() => {
    filter.length > 0 &&
      setElement(
        filter.map((priority) => {
          if (todoArray[priority].length > 0) {
            return todoArray[priority].map((obj) => {
              let timestamp = new Date(obj.date);

              return (
                <div className='card' key={obj.id}>
                  <div className='card-inner'>
                    <div className={'card-inner-card-' + priority}>
                      <div className='content-div'>
                        <p>{obj.content}</p>
                      </div>

                      <h3>
                        Time Added:{' '}
                        <span>
                          {formatDistance(
                            Date.now(),
                            timestamp,

                            {
                              includeSeconds: true,
                            }
                          )}
                        </span>{' '}
                        ago
                      </h3>
                    </div>
                    <div className={'card-inner-backface-' + priority}>
                      <div
                        className='check'
                        onClick={() => handleDone(obj.id, obj.priority)}
                      >
                        <i class='fa-solid fa-check'></i>
                      </div>

                      <div className='del' onClick={() => handleDelete(obj.id)}>
                        <i class='fa-solid fa-trash-can'></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            });
          }
        })
      );
  }, [todoArray]);

  return <div className='all-cards'>{element != undefined && element}</div>;
};

export default Content;
