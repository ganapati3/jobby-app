import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errMsg: ''}

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessfulRequest = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureRequest = errMsg => {
    this.setState({errMsg})
  }

  onSubmitLoginUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    this.setState({username: '', password: ''})
    if (response.ok) {
      this.onSuccessfulRequest(data.jwt_token)
    } else {
      this.onFailureRequest(data.error_msg)
    }
  }

  render() {
    const {username, password, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form onSubmit={this.onSubmitLoginUser} className="form-container">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="inputs-container">
            <div className="input-container">
              <label htmlFor="username">USERNAME</label>
              <br />
              <input
                value={username}
                onChange={this.updateUsername}
                className="input-bar"
                placeholder="Username"
                type="text"
                id="username"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">PASSWORD</label>
              <input
                value={password}
                onChange={this.updatePassword}
                className="input-bar"
                placeholder="Password"
                type="password"
                id="password"
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          {errMsg !== '' && <p className="error-msg">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
