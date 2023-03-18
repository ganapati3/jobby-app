import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LogInForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import JobsPortal from './components/JobsPortal'
import JobDetailedView from './components/JobDetailedView'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobsPortal} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetailedView} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
