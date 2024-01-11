import './index.css'

const startsImg = (
  <img
    src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
    alt="stars"
    className="starts-img"
  />
)

function PasswordItem(props) {
  const {passwordDetails, isChecked, deleteItem} = props
  const {id, website, username, password, backgroundClassName} = passwordDetails
  const showOrMaskedPassword = isChecked ? password : startsImg
  const onClickDelete = () => {
    deleteItem(id)
  }
  return (
    <li className="password-item">
      <div className="user-logo-password-details-container">
        <p className={`${backgroundClassName} user-icon`}>
          {username.slice(0, 1)}
        </p>
        <div className="password-details">
          <p className="password-detail">{website}</p>
          <p className="password-detail">{username}</p>
          <p className="password-detail">{showOrMaskedPassword}</p>
        </div>
      </div>
      <button
        type="submit"
        className="delete-btn"
        data-testid="delete"
        onClick={onClickDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
