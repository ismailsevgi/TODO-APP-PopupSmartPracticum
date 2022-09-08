import { useState } from 'react';
import Content from './Components/Content';
import Footer from './Components/Footer';

import Header from './Components/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='container'>
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;
