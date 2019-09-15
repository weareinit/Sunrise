import React, { setGlobal } from 'reactn';
import './App.css';
import QR from './components/QR'
import InfoPanel from './components/InfoPanel'
import { INITIAL_STATE } from './store/store'


const authToken = JSON.parse(window.localStorage.getItem("authToken"));

setGlobal(
  {
    ...INITIAL_STATE,
    authToken,
  }
);

class App extends React.Component {
  render(){
    return (
      <div className="app">
        <QR />
        <InfoPanel />
      </div>
    );
  }
}

export default App;