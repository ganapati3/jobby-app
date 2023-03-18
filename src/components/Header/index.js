import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickUserLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <Link to="/" className="link-item">
        <li>
          <img
            className="header-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </li>
      </Link>
      <div className="sm-link-container">
        <Link to="/" className="link-item">
          <li>
            <AiFillHome className="header-icon" />
          </li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li>
            <BsFillBriefcaseFill className="header-icon" />
          </li>
        </Link>
        <li>
          <button
            className="sm-logout-btn"
            onClick={onClickUserLogout}
            type="button"
          >
            <FiLogOut className="header-icon" />
          </button>
        </li>
      </div>
      <ul className="links-container">
        <Link to="/" className="link-item">
          <li className="link-text">Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="link-text">Jobs</li>
        </Link>
      </ul>
      <button onClick={onClickUserLogout} type="button" className="logout-btn">
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
