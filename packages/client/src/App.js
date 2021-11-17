import {Route, Switch} from 'react-router-dom';

import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import {CartNumberProvider} from "./providers/CartNumberProvider";
import {AuthProvider} from "./providers/AuthProvider";

function App() {
  return (
    <div>
      <AuthProvider>
        <Switch>
          <Route path='/sign-in'>
            <SignInPage/>
          </Route>
          <Route path='/sign-up'>
            <SignUpPage/>
          </Route>
          <Route path='/'>
            <CartNumberProvider>
              <HomePage/>
            </CartNumberProvider>
          </Route>
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
