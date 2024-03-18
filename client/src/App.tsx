import 'antd/dist/reset.css';
import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
import { UserProvider } from './context/userContext';
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className='pageDiv'>
          <UserProvider>
            <Router>
              <NavBar></NavBar>
            </Router>
          </UserProvider>
        </div>
      </div>
    );
  }
}

export default App;