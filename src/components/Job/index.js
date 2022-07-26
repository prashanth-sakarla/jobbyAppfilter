import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import {Loader} from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'
import Profile from '../Profile'
import FilterGroup from '../FilterGroup'

import './index.css'

import JobDetailsList from '../JobDetailsList'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
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

class Job extends Component {
  state = {
    jobsDetails: [],
    apiStatus: apiStatusConstants.initial,
    employmentType: 'FULLTIME',
    salaryRange: '1000000',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {employmentType, salaryRange} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Berear ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        packagePerAnnum: eachItem.package_per_annum,
        jobDescription: eachItem.job_description,
      }))
      this.setState({
        jobsDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeEmploymentType = employmentId => {
    this.setState({employmentType: employmentId}, this.getJobDetails)
  }

  onChangeSalaryRange = salaryId => {
    this.setState({salaryRange: salaryId}, this.getJobDetails)
  }

  renderJobDetails = () => {
    const {jobsDetails} = this.state
    if (jobsDetails.length === 0) {
      return (
        <div className="failure-image-container">
          <img
            className="failure-image"
            alt="no jobs"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          />
          <h1 className="no-jobs">No Jobs Found</h1>
          <p className="no-jobs-text">
            We could not find any jobs.Try other filters
          </p>
        </div>
      )
    }
    return (
      <ul className="cards-container">
        {jobsDetails.map(eachItem => (
          <JobDetailsList jobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
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

  renderViewsOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
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
      <div className="jobs-bg-container">
        <Header />
        <div className="mobile-view-job">
          <div className="search-input-container">
            <input
              placeholder="Search"
              className="search-input"
              type="search"
            />
            <BsSearch className="icon" size="20px" />
          </div>
          <Profile />
          <hr className="separator" />
          <FilterGroup
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
            onChangeEmploymentType={this.onChangeEmploymentType}
            onChangeSalaryRange={this.onChangeSalaryRange}
          />
          {this.renderViewsOnApiStatus()}
        </div>
        <div className="desktop-view">
          <div className="responsive-container">
            <div className="filters-container">
              <Profile />
              <hr className="separator" />
              <FilterGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                onChangeEmploymentType={this.onChangeEmploymentType}
                onChangeSalaryRange={this.onChangeSalaryRange}
              />
            </div>
            <div className="jobs-cards-container">
              <div className="search-input-container">
                <input
                  placeholder="Search"
                  className="search-input"
                  type="search"
                />
                <BsSearch className="icon" size="20px" />
              </div>
              {this.renderViewsOnApiStatus()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Job
