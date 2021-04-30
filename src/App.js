import logo from './logo.svg';
import './App.css';
import Home from './Home';
import AddTodo from './AddTodo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TodoList from './TodoList';


function App() {
  return (
    <div className="App">

      <Router>
        <div>
          <nav>

            <Link to="/">Home</Link>

          </nav>
          <Link to="/addtodo" />

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/addtodo">
              <AddTodo />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
