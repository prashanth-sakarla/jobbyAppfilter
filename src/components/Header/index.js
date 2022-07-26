import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div>
      <div className="mobile-nav-bar">
        <div>
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </div>
        <div className="icons-container">
          <AiFillHome className="icon" />
          <BsFillBriefcaseFill className="icon" />
          <button
            onClick={onClickLogout}
            type="button"
            className="log-out-icon"
          >
            <FiLogOut className="icon" />
          </button>
        </div>
      </div>
      <div className="desktop-nav-bar">
        <Link className="link" to="/">
          <img
            className="desktop-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>

        <ul className="text-container">
          <Link className="link" to="/">
            <li className="text-content">Home</li>
          </Link>
          <Link className="link" to="/jobs">
            <li className="text-content">Jobs</li>
          </Link>
        </ul>
        <button
          onClick={onClickLogout}
          type="button"
          className="log-out-button"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
