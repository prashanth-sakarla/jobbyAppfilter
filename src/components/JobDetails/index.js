import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import SkillsList from '../SkillsList'
import SimilarJob from '../SimilarJob'

import './index.css'
import Header from '../Header'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobCompleteDetails: {},
    similarJobs: [],
    skillsList: [],
    lifeAtCompany: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobCompleteDetails()
  }

  getJobCompleteDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Berear ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = updatedData
      const updatedJobDetails = {
        id: jobDetails.id,
        location: jobDetails.location,
        rating: jobDetails.rating,
        title: jobDetails.title,
        packagePerAnnum: jobDetails.package_per_annum,
        companyLogoUrl: jobDetails.company_logo_url,
        lifeAtCompany: jobDetails.life_at_company,
        companyWebsiteUrl: jobDetails.company_website_url,
        jobDescription: jobDetails.job_description,
        employmentType: jobDetails.employment_type,
        skills: jobDetails.skills,
      }
      const updatedSimilarJobs = similarJobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        companyLogoUrl: eachJob.company_logo_url,
        rating: eachJob.rating,
        location: eachJob.location,
        jobDescription: eachJob.job_description,
        employmentType: eachJob.employment_type,
      }))
      const {skills, lifeAtCompany} = updatedJobDetails
      const updatedSkills = skills.map(eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      const updatedLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      this.setState({
        jobCompleteDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        skillsList: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      jobCompleteDetails,
      similarJobs,
      skillsList,
      lifeAtCompany,
    } = this.state
    const {
      id,
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
      jobDescription,
    } = jobCompleteDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <div className="job-details">
          <div className="logo-and-name-container">
            <img
              className="job-route-logo"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div className="job-route-name-container">
              <h1 className="job-route-title">{title}</h1>
              <div className="job-route-icon-container">
                <AiFillStar className="job-route-icon" />
                <p className="job-route-rating">{rating}</p>
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
            <div>
              <p className="job-package-text">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="separator" />
          <div>
            <div className="job-description-container">
              <div className="job-description-header">
                <h1 className="job-description">Description</h1>
              </div>
              <div className="visit-icon-container">
                <a className="visit-link" href={companyWebsiteUrl}>
                  Visit
                </a>
                <FiExternalLink className="visit-icon" />
              </div>
            </div>
            <div>
              <p className="job-description">{jobDescription}</p>
            </div>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list-container">
              {skillsList.map(eachItem => (
                <SkillsList key={eachItem.name} skill={eachItem} />
              ))}
            </ul>
            <h1 className="skills-heading">Life At Company</h1>
            <div className="job-description-image-container">
              <p className="job-description">{description}</p>
              <img
                className="image-description"
                alt="life at company"
                src={imageUrl}
              />
            </div>
          </div>
        </div>
        <h1 className="similarJob-heading">Similar Jobs</h1>
        <ul className="similarJobs-container">
          {similarJobs.map(eachItem => (
            <SimilarJob key={eachItem.id} similarJob={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-image-container">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-button" type="button">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-route-bg">
        <Header />
        {this.renderOnApiStatus()}
      </div>
    )
  }
}

export default JobDetails
