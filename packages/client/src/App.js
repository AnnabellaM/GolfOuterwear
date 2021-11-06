<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
import {Route, Switch} from 'react-router-dom';

import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <HomePage/>
        </Route>
        <Route path='/SignIn'>
          <SignInPage/>
        </Route>
        <Route path='/SignUp'>
          <SignUpPage/>
        </Route>
      </Switch>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
