import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {similarJob} = props
  const {
    title,
    rating,
    companyLogoUrl,
    location,
    employmentType,
    jobDescription,
  } = similarJob
  return (
    <li className="similar-bg-container">
      <div className="similar-image-name-container">
        <div className="similar-image-container">
          <img
            className="similar-logo"
            alt="similar job company logo"
            src={companyLogoUrl}
          />
        </div>
        <div className="similar-name-container">
          <h1 className="similar-job-heading">{title}</h1>
          <div className="similar-rating-container">
            <AiFillStar className="similar-icon-star" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description">Description</h1>
      <p className="similar-job-description-para">{jobDescription}</p>
      <div className="similar-location-type-container">
        <div className="similar-location-icon">
          <MdLocationOn className="similar-icon" />
          <p className="similar-icon-text">{location}</p>
        </div>
        <div className="similar-job-type-icon">
          <BsFillBriefcaseFill className="similar-icon" />
          <p className="similar-icon-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
