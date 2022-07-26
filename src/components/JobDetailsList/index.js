import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobDetailsList = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    rating,
    id,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="card-container">
        <div className="image-logo-container">
          <img
            className="company-logo"
            alt="job details company logo"
            src={companyLogoUrl}
          />
          <div className="company-name-container">
            <h1 className="title">{title}</h1>
            <div className="icon-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-employment">
          <div className="location-and-salary-container">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location-text">{location}</p>
            </div>
            <div className="job-type-container">
              <BsFillBriefcaseFill className="location-icon" />
              <p className="job-text">{employmentType}</p>
            </div>
          </div>
          <div className="lpa-container">
            <p className="package-text">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="separator" />
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobDetailsList
