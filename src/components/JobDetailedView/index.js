import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiConstants = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class JobDetailedView extends Component {
  state = {apiStatus: '', jobDetails: {}, similarJobDetails: []}

  componentDidMount() {
    this.getFullJobDetails()
  }

  getFullJobDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedJobDetails = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        componyWebUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        })),
        title: data.job_details.title,
      }
      const similarJobDetails = data.similar_jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
      }))
      this.setState({
        apiStatus: apiConstants.success,
        jobDetails: formattedJobDetails,
        similarJobDetails,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderDetailedJobView = () => {
    const {jobDetails, similarJobDetails} = this.state
    const {
      companyLogoUrl,
      title,
      skills,
      rating,
      packagePerAnnum,
      location,
      lifeAtCompany,
      jobDescription,
      employmentType,
      componyWebUrl,
    } = jobDetails

    return (
      <>
        <div className="job-item-container">
          <div className="logo-section">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <p className="rating">
                <BsFillStarFill padding-right="10px" color="#fbbf24" />
                {rating}
              </p>
            </div>
          </div>
          <div className="employment-section">
            <div className="employment">
              <p className="rating">
                <MdLocationOn className="icons" />
                {location}
              </p>
              <p className="rating">
                <BsFillBriefcaseFill className="icons" />
                {employmentType}
              </p>
            </div>
            <p className="job-title">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="visit-link-container">
            <h1 className="job-title">Description</h1>
            <a className="visit-link" href={componyWebUrl}>
              Visit <FiExternalLink />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="job-title">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachItem => (
              <li key={eachItem.name} className="skill-item">
                <img
                  className="skill-img"
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                />
                <p className="job-description">{eachItem.name}</p>
              </li>
            ))}
          </ul>

          <div className="life-at-company-container">
            <div className="display">
              <h1 className="job-title">Life at Company</h1>
              <p className="job-description">{lifeAtCompany.description}</p>
            </div>
            <img
              className="life-at-img"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobDetails.map(eachItem => (
            <SimilarJobItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  reloadJobsDetailedView = () => {
    this.getFullJobDetails()
  }

  renderFailureView = () => (
    <>
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
        onClick={this.reloadJobsDetailedView}
        type="button"
        className="retry-btn"
      >
        Retry
      </button>
    </>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderDetailedJobView()
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-detailed-view-container">
        <Header />
        <div className="container">{this.renderView()}</div>
      </div>
    )
  }
}

export default JobDetailedView
