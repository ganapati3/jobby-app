import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserProfile from '../UserProfile'
import JobItem from '../JobItem'
import Header from '../Header'

import './index.css'

const apiConstants = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPortal extends Component {
  state = {
    jobsDetails: [],
    apiStatus: '',
    employment: [],
    salary: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {employment, salary, searchInput} = this.state
    const employmentType = employment.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salary}&search=${searchInput}`
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsDetails: formattedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  updateEmploymentType = event => {
    const {employment} = this.state

    if (employment.includes(event.target.value)) {
      this.setState(
        {employment: employment.filter(item => item !== event.target.value)},
        this.getJobDetails,
      )
    } else {
      this.setState(
        prevState => ({
          employment: [...prevState.employment, event.target.value],
        }),
        this.getJobDetails,
      )
    }
  }

  updateSalaryRange = event => {
    this.setState({salary: event.target.value}, this.getJobDetails)
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateSearchResults = () => {
    this.getJobDetails()
  }

  renderLoaderView = () => (
    <div className="loader-container job-items-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItems = () => {
    const {jobsDetails} = this.state
    const renderJobs = () => (
      <ul>
        {jobsDetails.map(eachItem => (
          <JobItem key={eachItem.id} jobDetails={eachItem} />
        ))}
      </ul>
    )

    const renderNoResults = () => (
      <>
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="failure-text">No Jobs Found</h1>
        <p className="job-description">
          We Could not find any jobs. Try other filters
        </p>
      </>
    )

    return (
      <div className="job-items-container">
        {jobsDetails.length > 0 ? renderJobs() : renderNoResults()}
      </div>
    )
  }

  reloadJobsPortal = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="job-items-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="job-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.reloadJobsPortal}
        type="button"
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderJobView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoaderView()
      case apiConstants.success:
        return this.renderJobItems()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-portal-container">
        <Header />
        <div className="jobs-container">
          <div className="input-sm-container">
            <input
              onChange={this.updateSearchInput}
              placeholder="Search"
              className="search-bar"
              type="search"
            />
            <button
              onClick={this.updateSearchResults}
              className="search-btn"
              type="button"
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="profile-filter-container">
            <UserProfile />
            <hr className="hr" />
            <ul>
              <h1 className="filter-heading">Type of employment</h1>
              {employmentTypesList.map(eachType => (
                <li key={eachType.employmentTypeId}>
                  <input
                    onChange={this.updateEmploymentType}
                    id={eachType.employmentTypeId}
                    type="checkbox"
                    value={eachType.employmentTypeId}
                  />
                  <label
                    className="filter-label"
                    htmlFor={eachType.employmentTypeId}
                  >
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="hr" />
            <ul>
              <h1 className="filter-heading">Salary Range</h1>
              {salaryRangesList.map(eachType => (
                <li key={eachType.salaryRangeId}>
                  <input
                    onChange={this.updateSalaryRange}
                    id={eachType.salaryRangeId}
                    type="radio"
                    name="salary"
                    value={eachType.salaryRangeId}
                  />
                  <label
                    className="filter-label"
                    htmlFor={eachType.salaryRangeId}
                  >
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-container">
            <div className="input-lg-container">
              <input
                onChange={this.updateSearchInput}
                placeholder="Search"
                className="search-bar"
                type="search"
              />
              <button
                onClick={this.updateSearchResults}
                className="search-btn"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobView()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPortal
