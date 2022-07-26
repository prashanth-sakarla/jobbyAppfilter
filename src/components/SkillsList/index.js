import './index.css'

const SkillsList = props => {
  const {skill} = props
  const {imageUrl, name} = skill
  return (
    <li className="skill-container">
      <img className="skill-image" alt={name} src={imageUrl} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillsList
