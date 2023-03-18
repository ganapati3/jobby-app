import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    jobDescription,
    employmentType,
  } = jobDetails
  return (
    <li className="similar-job-container">
      <div className="logo-section">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="job-title">{title}</h1>
          <p className="rating">
            <BsFillStarFill padding-right="10px" color="#fbbf24" />
            {rating}
          </p>
        </div>
      </div>
      <h1 className="job-title">Description</h1>
      <p className="job-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobItem
