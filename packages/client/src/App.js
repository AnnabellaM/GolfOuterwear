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
        <Route path='/sign-in'>
          <SignInPage/>
        </Route>
        <Route path='/sign-up'>
          <SignUpPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
