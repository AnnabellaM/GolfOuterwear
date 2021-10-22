import {Route, Switch} from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <HomePage/>
        </Route>
        <Route path='/login'>
          <LoginPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
