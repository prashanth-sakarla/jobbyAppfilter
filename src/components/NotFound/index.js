import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <Header />
    <div className="not-found-image-container">
      <img
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      />
      <h1 className="not-found-text">Page Not Found</h1>
      <p className="not-found-para">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)
export default NotFound
