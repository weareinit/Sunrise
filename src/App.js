import React from 'react';
import './App.css';
import QrReader from 'react-qr-reader';
import InfoPanel from './components/InfoPanel'

function App() {
  return (
      <div className="App">
        <QrReader 
          showViewFinder={true}
          facingMode="environment"
          style={{width: "100vh", maxWidth: "100vw"}}
        />
        <InfoPanel />
      </div>
  );
}

export default App;
