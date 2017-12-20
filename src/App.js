import React from 'react'
import Deals from './Deals.js'
import Login from './Login.js'
import Nav from './Nav.js'
import ProviderSection from './ProviderSection.js'
import Register from './Register.js'
import ShowDeal from './ShowDeal.js'
import ShowUser from './ShowUser.js'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './styles/border-box.css'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      points: []
    }
  }

  setPoints = () => {
    fetch('/points', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        res.json()
          .then((jsonData) => {
            console.log(jsonData)
            this.setState({ points: jsonData })
          })
      })
      .catch((err) => {
        console.log('error:', err)
      })
  }

  setSession = () => {
    if ((document.cookie).match(/session=/)) {
      this.setState({session: true})
    } else {
      this.setState({session: false})
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Nav points={this.state.points} setSession={this.setSession} session={this.state.session} />

          <Route exact path="/" component={Home}/>
          <Route path="/providers" component={ProviderSection}/>
          <Route path="/deals" component={Deals}/>
          <Route path="/deals/:id" component={ShowDeal}/>
          <Route path="/register" component={Register}/>
          <Route path="/users/:id" component={ShowUser}/>
          <Route path="/login" render={(props) => <Login {...props} setPoints={this.setPoints} setSession={this.setSession} /> }/>
        </div>
      </Router>

    )
  }
}

export default App
