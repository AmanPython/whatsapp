import Login from './components/login'
import User from './components/user'
import Test from './components/test';
import Createaccount from './components/create-account';
import './App.css';
import { BrowserRouter as Router, Switch, Route}
    from 'react-router-dom';

function App() {
  return (
    <div>
    <Router>
    <Switch>
        <Route path="/login">
            <Login />
          </Route>
          <Route path="/test">
            <Test/>
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/create-account">
            <Createaccount />
          </Route>
      </Switch>
    </Router>
    </div>
  );}

export default App;
