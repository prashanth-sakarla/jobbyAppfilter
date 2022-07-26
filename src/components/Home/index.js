import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = props => {
  const onChangeFindButton = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="home-container">
      <Header />
      <div className="home-text-content">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-text">
          Millions of people are searching for jobs,salary information,company
          reviews.Find the job that fits your ability and potential
        </p>
        <Link className="link" to="/jobs">
          <button
            onClick={onChangeFindButton}
            type="button"
            className="find-button"
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
