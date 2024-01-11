import './index.css'

function EmptyPasswordView() {
  return (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-img"
      />
      <p className="no-passwords-desc">No Passwords</p>
    </div>
  )
}

export default EmptyPasswordView
