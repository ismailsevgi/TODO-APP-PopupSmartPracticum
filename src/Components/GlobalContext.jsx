import React, { createContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

//card filter arrays

export const GlobalContextProvider = ({ children }) => {
  const [task, setTask] = useState({
    content: '',
    time: '',
    priority: '',
  });

  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState([]);

  const [todoArray, setTodoArray] = useState({
    high: [],
    medium: [],
    low: [],
    done: [],
  });

  useEffect(() => {
    setTodoArray({
      high: [],
      medium: [],
      low: [],
      done: [],
    });

    fetch('https://63187952ece2736550cafa71.mockapi.io/todos')
      .then((res) => {
        console.log(res.ok);
        return res.json();
      })
      .then((res) => {
        res.map((obj) => {
          if (!obj.priority) {
            obj, (obj.priority = 'highCheck');
          }

          setTodoArray((prev) => {
            if (obj.isCompleted === true) {
              return { ...prev, done: [...prev.done, obj] };
            } else if (obj.priority === 'mediumCheck') {
              return { ...prev, medium: [...prev.medium, obj] };
            } else if (obj.priority === 'lowCheck') {
              return { ...prev, low: [...prev.low, obj] };
            } else if (obj.priority === 'highCheck') {
              return { ...prev, high: [...prev.high, obj] };
            }
          });
        });
      });
  }, [reload]);

  return (
    <GlobalContext.Provider
      value={{
        todoArray,
        setReload,
        task,
        setTask,

        setFilter,
        filter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
