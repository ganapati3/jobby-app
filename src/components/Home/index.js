import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickShowJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <div className="home-container">
        <Header />
        <div className="content-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button
              onClick={onClickShowJobs}
              type="button"
              className="jobs-btn"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
