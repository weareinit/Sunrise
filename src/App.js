import React, { setGlobal } from 'reactn';
import './App.css';
import QR from './components/QR'
import InfoPanel from './components/InfoPanel'
import { INITIAL_STATE } from './store/store'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import axios from 'axios';
import { ENDPOINTS } from './utils';


const authToken = JSON.parse(window.localStorage.getItem("authToken"));

setGlobal(
  {
    ...INITIAL_STATE,
    authToken,
  }
);



class App extends React.Component {
  componentDidMount(){
    axios.get(ENDPOINTS.SCHEDULE)
    .then((res) => {
      this.setGlobal({events: res.data.data})
    })
  }

  render(){
    return (
      <div className="app">
        <ReactNotification />
        <QR />
        <InfoPanel />
      </div>
    );
  }
}

export default App;