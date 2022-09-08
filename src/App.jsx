import { useState, useContext } from 'react';
import Content from './Components/Content';
import FirstPage from './Components/FirstPage';
import Footer from './Components/Footer';
import GlobalContext from './Components/GlobalContext';

import Header from './Components/Header';

function App() {
  const { userName } = useContext(GlobalContext);
  console.log('App Gelen userName:', userName);
  return (
    <div className='App'>
      {userName === 'null' ? (
        <FirstPage />
      ) : (
        <>
          <Header />
          <div className='container'>
            <Content />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
