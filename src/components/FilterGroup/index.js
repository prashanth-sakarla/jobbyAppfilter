import {Component} from 'react'

import './index.css'

class FilterGroup extends Component {
  renderEmploymentType = () => {
    const {employmentTypesList, onChangeEmploymentType} = this.props
    return employmentTypesList.map(eachType => {
      const {label, employmentTypeId} = eachType
      const changeRadioButton = () => {
        onChangeEmploymentType(employmentTypeId)
      }

      return (
        <>
          <li
            key={eachType.employmentTypeId}
            className="input-container-filters"
          >
            <input onChange={changeRadioButton} id={label} type="radio" />
            <label htmlFor={label} className="label">
              {label}
            </label>
          </li>
        </>
      )
    })
  }

  renderSalaryRange = () => {
    const {salaryRangesList, onChangeSalaryRange} = this.props
    return salaryRangesList.map(eachType => {
      const {label, salaryRangeId} = eachType
      const onChangeCheckbox = () => {
        onChangeSalaryRange(salaryRangeId)
      }

      return (
        <>
          <li key={eachType.salaryRangeId} className="input-container-filters">
            <input onChange={onChangeCheckbox} id={label} type="checkbox" />
            <label htmlFor={label} className="label">
              {label}
            </label>
          </li>
        </>
      )
    })
  }

  renderEmploymentTypeCategory = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-groups">{this.renderEmploymentType()}</ul>
    </>
  )

  renderSalaryTypeCategory = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-groups"> {this.renderSalaryRange()}</ul>
    </>
  )

  render() {
    return (
      <>
        {this.renderEmploymentTypeCategory()}
        <hr className="separator" />
        {this.renderSalaryTypeCategory()}
      </>
    )
  }
}

export default FilterGroup
