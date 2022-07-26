import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', showErrorMsg: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
    console.log(event.target.value)
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
    console.log(event.target.value)
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({showErrorMsg: true, errorMessage: errorMsg})
  }

  onsubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  render() {
    const {password, username, showErrorMsg, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-card">
          <div className="logo-container">
            <img
              className="logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <form onSubmit={this.onsubmitLogin}>
            <div className="inputs-container">
              <label className="label-text" htmlFor="username">
                USERNAME
              </label>
              <div className="input-container">
                <input
                  placeholder="Username"
                  className="input"
                  id="username"
                  type="text"
                  value={username}
                  onChange={this.onChangeUserName}
                />
              </div>
            </div>
            <div className="inputs-container">
              <label className="label-text" htmlFor="password">
                PASSWORD
              </label>
              <div className="input-container">
                <input
                  placeholder="Password"
                  className="input"
                  id="password"
                  type="password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg ? <p className="error-msg">*{errorMessage}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
