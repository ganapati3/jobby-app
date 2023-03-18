import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link className="link-item" to={`/jobs/${id}`}>
      <li className="job-item-container">
        <div className="logo-section">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="job-title">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
