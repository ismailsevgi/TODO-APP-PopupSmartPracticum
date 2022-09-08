import React, { useContext, useState, useRef } from 'react';
import GlobalContext from './GlobalContext';

function FirstPage() {
  const { setUserName } = useContext(GlobalContext);
  const userRef = useRef(null);

  function handleSubmit(e) {
    console.log('submit edildi userRef: ', userRef.current.value);
    localStorage.setItem('userName', userRef.current.value);
  }

  return (
    <div className='first-page'>
      <h1>What is your name?</h1>
      <form onSubmit={handleSubmit}>
        <input ref={userRef} placeholder='Enter your name...' required />
        <button>SUBMIT</button>
      </form>
    </div>
  );
}

export default FirstPage;
