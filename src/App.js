
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Main from './component/Main/Main';
import NotFound from './component/NotFound/NotFound';
import FriendDetails from './component/FriendDetails/FriendDetails';
import Header from './component/Header/Header';
import Firebase from './component/Firebase/Firebase';


function App() {
  return (
    <div >
      <Router>
        <Header></Header>
        <Firebase></Firebase>
        <Switch>
          <Route path="/main"> 
          <Main/>
          </Route>
          <Route path="/friend/:id">
            <FriendDetails/>
          </Route>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
