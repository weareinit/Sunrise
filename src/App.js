import React from 'react';
import './App.css';
import QrReader from 'react-qr-reader'
import InfoPanel from './components/InfoPanel'

class App extends React.Component {
  render(){
    return (
      <div className="app">
        <QrReader 
          showViewFinder={true}
          facingMode="environment"
          className="reader"

        />
        <InfoPanel />
      </div>
    );
  }
}

export default App;
